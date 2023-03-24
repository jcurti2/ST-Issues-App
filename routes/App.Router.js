const Router = require('express').Router()

const UserRouter = require('./UserRouter')
const PostRouter = require('./PostRouter')
// const CommentRouter = require('./CommentRouter')

Router.use('/user', UserRouter)
Router.use('/post', PostRouter)
// Router.use('/comment', CommentRouter)


module.exports = Router
