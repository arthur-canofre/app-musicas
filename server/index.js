import Express from "express";
//import { criarTabelas } from "./db.js";
import { rotas } from "./router/rotas_autenticacao.js";
import { rotasU } from "./router/rotas_users.js";
import cors from 'cors'

const app = Express()
app.use(Express.json())
app.use(cors())

app.use('/autenticacao', rotas)
app.use('/admin', rotasU)
//criarTabelas()

app.listen(8000)