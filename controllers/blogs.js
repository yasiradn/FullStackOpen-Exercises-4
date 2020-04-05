const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async(request, response) => {
  const getBlogs = await Blog.find({})
  response.json(getBlogs)
  })
  
blogRouter.post('/', async(request, response) => {
    const body = new Blog(request.body)
    if(!body.title && !body.url){
      return response.status(400).end()
    }
    const savedNote = await body.save()
    response.json(savedNote.toJSON())
  })

  module.exports = blogRouter
