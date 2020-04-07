const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getToken = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async(request, response) => {
  const getBlogs = await Blog.find({})
  response.json(getBlogs)
  })
  
blogRouter.post('/', async(request, response) => {
    const body = new Blog(request.body)
    if(!body.title && !body.url){
      return response.status(400).end()
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
     return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id
    })
    const savedNote = await blog.save()
    user.blogs = user.blogs.concat(savedNote._id)
    response.json(savedNote.toJSON())
   })

  blogRouter.delete('/:id', async(request, responce) => {
    await Blog.findByIdAndRemove(request.params.id)
    responce.status(204).end()
  })

  blogRouter.put('/:id', async(request, responce) => {
    const getBody = request.body
    const blog = {
      title: getBody.title, author:getBody.author, url:getBody.url, likes:getBody.likes
    }
    const getBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
    responce.json(getBlog.toJSON())

  })

  module.exports = blogRouter
