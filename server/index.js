import Express from "express";

const app = Express()
app.use(Express.json())

app.post('/registro', (req, res) => {
    const {nome, sobrenome, email, senha, dataNasc} = req.body
    if(!nome || !sobrenome || !senha || !email || !dataNasc){
        res.send("PREENCHA OS CAMPOS")
    } 
    res.send(`nome: ${nome} ${sobrenome}`)
})

app.post('/login', (req, res) => {
    const {email, senha} = req.body
    if(!senha || !email){
        res.send("PREENCHA OS CAMPOS")
    } 
    res.send(`nome: ${nome} ${sobrenome}`)
})

app.listen(8000)