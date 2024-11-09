import { User } from "../db.js"

const edit = async(req, res) => {
    const { campo, email, alt } = req.body
    const user = User.findOne({where: {email: email}})

    if(!user){
        res.status(404).send("O usuario nao foi encontrado.")
    }
        User.update({ [campo]: alt },
            {where: {email: email}} 
        )
   res.status(200).send("usuario editado com sucesso!")
}

export { edit }