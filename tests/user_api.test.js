const supertest = require('supertest')
const app = require('../index')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')
const api = supertest(app)



beforeEach(async () => {
  await User.deleteMany({})
})

test('system does not add invalid user', async()=> {
    await api.post('/api/users').send(listHelper.invalidUser)
    expect(listHelper.usersInDB.length).toBe(0)
})

test('return error message and status code for invalid user add', async()=> {
    const result = await api.post('/api/users').send(listHelper.invalidUser)
    expect(400)
    expect(result.text).toContain('Length of username or password must be grater than 3')
})