import Express from "express";
import { criarTabelas, User } from "./db.js";
import bcryptjs from "bcryptjs"

const app = Express()
app.use(Express.json())
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
        res.send('usuario nao existe')
        return
    }
    const senhaValida = bcryptjs.compareSync(senha, userExist.senha)
    if(!senhaValida){
        res.send("Senha invalida!")
        return
    }

    res.send("Logado com sucesso!")
})

app.listen(8000)