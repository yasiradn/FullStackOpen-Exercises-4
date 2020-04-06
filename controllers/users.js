const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


userRouter.post('/', async(request, response) => {
    const body = request.body
    if(body.password.length < 3 || body.username.length < 3){
        return response.status(400).json({error: 'Length of username or password must be grater than 3'})
    } 

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })
    
        const savedUser = await user.save()
    
        response.json(savedUser.toJSON())
   
  })

  userRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('blogs')
  
    response.json(users.map(u => u.toJSON()))
  })

  module.exports = userRouter