import { User } from "../db.js"
import bcryptjs from "bcryptjs"

const edit = async(req, res) => {
    const { email, alt } = req.body
    const user = await User.findOne({where: {email: email}})

    if(!user){
        res.status(404).send("O usuario nao foi encontrado.")
        return
    }
    User.update({ foto: alt },
        {where: {email: email}} 
    )
    res.status(200).send("Usuario editado com sucesso")
}

const trocarSenha = async(req, res) => {
    const { senhaAntiga, email, senhaNova } = req.body
    const user = await User.findOne({where: {email: email}})

    if(!user){
        res.status(404).send("O usuario nao foi encontrado.")
        return
    }

    const senhaValida = bcryptjs.compareSync(senhaAntiga, user.senha)

    if(!senhaValida){
        res.status(401).send('Senha invalidos')
        return
    }

    const novaSenhaCript = bcryptjs.hashSync(senhaNova, 10)
    User.update({ senha: novaSenhaCript }, {where: {email: email}} )
    res.status(200).send("Senha trocada com sucesso!")
}

export { edit, trocarSenha }