import { User } from "../db.js"

const getUsers = async(req, res) => {
    const users = await User.findAll({ attributes: ['nome', 'email', 'status']})
    res.send(users)
}

const getUser = async(req, res) => {
    const {id} = req.body
    const user = await User.findOne({where: {id: id}})
    res.send({
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        status: user.status,
        dataNascimento: user.dataNascimento
    })
}

const deleteUsers = async (req, res) => {
    const {id} = req.body
    const user = await User.findOne({where: {id: id}})
    if(!user){
        res.send("Usuário não encontrado")
        return
    }
    const deleta = await User.destroy({where: {id: id}})
    res.send("Usuário deletado com sucesso")
}

export { getUsers, deleteUsers, getUser }