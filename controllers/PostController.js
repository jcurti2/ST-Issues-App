const { Post } = require('../models')

const CreatePost = async (req, res) => {
    try {
        let userId = parseInt(req.params.userId)
        let postBody = {
            userId,
            ...req.body,
        }
        let post = await Post.create(postBody)
        res.send(post)
    } catch (error) {
        throw error
    }
}

module.exports = {
    CreatePost,
}