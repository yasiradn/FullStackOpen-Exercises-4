const blogRouter = require('express').Router()
const Blog = require('../models/blog')
blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      }).catch(err => next(err))
  })
  
blogRouter.post('/', (request, response) => {
    const body = new Blog(request.body)
    body
      .save()
      .then(result => {
        response.status(201).json(result)
      }).catch(err => next(err))
  })

  module.exports = blogRouter
