const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const config = require('../utils/config')
const Blog = require('../models/blog')

const api = supertest(app)

const initialData = [
  {
    title: 'This is a test',
    author: 'Khon Doe',
    url: 'hackernews.com',
    likes: 10
  },
  {
    title: 'This is another tes',
    author: 'Jhon Doe',
    url: 'cnn.com',
    likes: 17
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialData[0])
  await blogObject.save()

  blogObject = new Blog(initialData[1])
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
        expect(data.body).toHaveLength(initialData.length)
        })
    
  })

  describe('verifies that the unique identifier property of the blog posts is named id ', () => {

      test('verify blog post has id property', async () => {
        const data = await api.get('/api/blogs')
        expect(data.body[0].id).toBeDefined()
        })
    
  })
  
  
  afterAll(() => {
    mongoose.connection.close()
   
  })
