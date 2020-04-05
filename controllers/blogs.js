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
