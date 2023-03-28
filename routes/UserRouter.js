const Router = require('express').Router()
const controller = require('../controllers/UserController')

Router.post('/', controller.CreateUser)
Router.delete('/:id', controller.DeleteUser)
Router.get('/:id', controller.GetUserById)

module.exports = Router
