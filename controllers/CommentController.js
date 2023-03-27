const { Comment } = require('../models')

const CreateComment = async (req, res) => {
    try {
        let userId = parseInt(req.params.userId)
        let postId = parseInt(req.params.postId)
        let commentBody = {
            userId, postId,
            ...req.body,
        }
        let comment = await Comment.create(commentBody)
        res.send(comment)
    } catch (error) {
        throw error
    }
}

const GetPostComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { postId: req.params.postId }
        })
        res.send(comments)
    } catch (error) {
        throw error
    }
}

// const DeleteComment = async (req,res) => {
//     try {
//         post mvp
//     }
// }

module.exports = {
    CreateComment,
    GetPostComments
}