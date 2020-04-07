const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/User')
const listHelper = require('../utils/list_helper')
const api = supertest(app)

let token = ''
beforeAll(async()=>{
  await User.deleteMany({})
  await api.post('/api/users/').send({ username : listHelper.validUser.username, password:listHelper.validUser.password})
  const login_data = await api.post('/api/login/').send({ username : listHelper.validUser.username, password:listHelper.validUser.password})
  token = login_data.body.token
})
beforeEach(async () => {
  await Blog.deleteMany({})
  
  let blogObject = new Blog(listHelper.initialData[0])
  await blogObject.save()

  blogObject = new Blog(listHelper.initialData[1])
  await blogObject.save()
})



  describe('returns the correct amount of blog posts in the JSON format', () => {

    test('returns blog posts in the JSON format', async () => {
      await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      })

      test('returns corrent amount of blog posts', async () => {
        const data = await api.get('/api/blogs')
        expect(data.body).toHaveLength(listHelper.initialData.length)
        })
    
  })

  describe('verifies that the unique identifier property of the blog posts is named id ', () => {

      test('verify blog post has id property', async () => {
        const data = await api.get('/api/blogs')
        expect(data.body[0].id).toBeDefined()
        })
    
  })

  describe('a valid blog can be added', () => {

    test('add a new valid blog', async () => {
      await api.post('/api/blogs').set('Authorization', 'Bearer ' + token).send(listHelper.newBlog).expect(200).expect('Content-Type', /application\/json/)
      const lastBlog = await listHelper.blogsInDB()
      expect(lastBlog).toHaveLength(listHelper.initialData.length + 1)
      })

      test('assing 0 to like if like is missing', async () => {
        await api.post('/api/blogs').set('Authorization', 'Bearer ' + token).send(listHelper.dataWithoutLike).expect(200).expect('Content-Type', /application\/json/)
        const lastBlog = await listHelper.blogsInDB()
        expect(lastBlog[2].likes).toBeDefined()
      })
        
      test('return 400 BAD REQUEST if title and url is missing', async () => {
        await api.post('/api/blogs').set('Authorization', 'Bearer ' + token).send(listHelper.inValidBlog).expect(400)
      })

      test('return 401 Unauthorized if token is missing', async () => {
        await api.post('/api/blogs').send(listHelper.newBlog).expect(401)
      })

          
})
  
  
  afterAll(() => {
    mongoose.connection.close()
   
  })
