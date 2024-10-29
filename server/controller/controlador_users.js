import { User } from "../db.js"

const getUsers = async(req, res) => {
    const users = await User.findAll()
    console.log("ta conectado")
    res.send(users)
}

const deleteUsers = async (req, res) => {
    const {id} = req.body
    const user = await User.findOne({where: {id: id}})
    res.send(user)
    const deleta = await User.destroy({where: {id: id}})
}

export { getUsers, deleteUsers }