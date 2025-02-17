import { User } from "../db.js"

const getUsers = async(req, res) => {
    const users = await User.findAll({ attributes: ['nome', 'email', 'status']})
    res.send(users)
}

const getUser = async(req, res) => {
    const {email} = req.body
    const user = await User.findOne({where: {email: email}, attributes: ['nome', 'sobrenome', 'email', 'status', 'dataNascimento', 'foto']})
    if(!user){
        res.status(404).send(email)
        return
    }
    res.send({
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        status: user.status,
        dataNascimento: user.dataNascimento,
        foto: user.foto 
    })
}

const deleteUsers = async (req, res) => {
    const {email} = req.body
    const user = await User.findOne({where: {email: email}})
    if(!user){
        res.send("Usuário não encontrado")
        return
    }
    const deleta = await User.destroy({where: {email: email}})
    res.send("Usuário deletado com sucesso")
}

const getFoto = async (req, res) =>{
    const {email} = req.body
    const user = await User.findOne({where: {email: email}, attributes: ['foto']})

    if(!user){
       return res.status(404).send("usuario nao encontrado")
    }
    return res.status(200).send(user)
}
export { getUsers, deleteUsers, getUser, getFoto }