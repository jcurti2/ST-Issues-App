const { User } = require('../models')

const CreateUser = async (req, res) => {
    try {
        let user = await User.create(req.body)
        res.send(user)
    } catch (error) {
        throw error
    }
}

const GetUserByEmail = async (req, res) => {
  try {
    const {email} = req.body
    const user = await User.findOne({ where: {email:email} })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const GetUserById = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findOne({ where: {id:id} })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const DeleteUser = async (req, res) => {
    try {
      let id = +req.params.id
      await User.destroy({ where: { id: id } })
      res.send({ message: `Deleted user with an id of ${id}` })
    } catch (error) {
      throw error
    }
  }

module.exports = {
    CreateUser,
    DeleteUser,
    GetUserByEmail,
    GetUserById
}