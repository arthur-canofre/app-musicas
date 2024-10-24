import Express from "express";
import { criarTabelas, User } from "./db.js";
import bcryptjs from "bcryptjs"
import jasonwebtoken from 'jsonwebtoken'
import cors from 'cors'

const app = Express()
app.use(Express.json())
app.use(cors())
//criarTabelas()

app.post('/registro', async (req, res) => {
    const {nome, sobrenome, email, senha, dataNascimento} = req.body
    if(!nome || !sobrenome || !senha || !email || !dataNascimento){
        res.send("PREENCHA OS CAMPOS")
        return
    } 
    const userExist = await User.findOne({ where: {email:email}})
    if(userExist){
        res.send('usuario ja existe')
        return
    }
    const senhaCripto = bcryptjs.hashSync(senha, 10)

    const teste = await User.create({nome, sobrenome, email, senha:senhaCripto, dataNascimento})

    res.send(`usuario criado`)
})

app.post('/login', async (req, res) => {
    const {email, senha} = req.body
    if(!senha || !email){
        res.send("PREENCHA OS CAMPOS")
    } 

    const userExist = await User.findOne({ where: {email:email}})
    if(!userExist){
        res.send('Ta errado')
        return
    }
    const senhaValida = bcryptjs.compareSync(senha, userExist.senha)
    if(!senhaValida){
        res.send("Ta errado")
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
    res.send({
        msg: "Logado com sucesso!",
        tokenJWT: token 
    })
})

app.listen(8000)