import bcryptjs from "bcryptjs"
import { User } from "../db.js"
import jasonwebtoken from 'jsonwebtoken'



const registro = async (req, res) => {
    const {nome, sobrenome, email, senha, dataNascimento} = req.body
    if(!nome || !sobrenome || !senha || !email || !dataNascimento){
        res.status(400).send("Preencha todos os campos")
        return
    } 
    const userExist = await User.findOne({ where: {email:email}})
    if(userExist){
        res.status(409).send('usuario ja existe')
        return
    }
    const senhaCripto = bcryptjs.hashSync(senha, 10)

    const teste = await User.create({nome, sobrenome, email, senha:senhaCripto, dataNascimento})

    res.status(200).send(`usuario criado`)
}

const login = async (req, res) => {
    const {email, senha} = req.body
    if(!senha || !email){
        res.status(400).send("PREENCHA OS CAMPOS")
    } 

    const userExist = await User.findOne({ where: {email:email}})
    if(!userExist){
        res.status(401).send('Email ou senha invalidos')
        return
    }
    const senhaValida = bcryptjs.compareSync(senha, userExist.senha)
    if(!senhaValida){
        res.status(401).send('Email ou senha invalidos')
        return
    }
    
    const token = jasonwebtoken.sign(
        {
            "nome completo": `${userExist.nome} ${userExist.sobrenome}`,
            "email": userExist.email,
            "status": userExist.status
        },
        'chavecriptografiajwt',
        {expiresIn: 1000*60*5}
    )
    res.status(200).send({
        msg: "Logado com sucesso!",
        tokenJWT: token 
    })
}

export { registro, login }