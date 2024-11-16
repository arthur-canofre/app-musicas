import Express from "express";
import { criarTabelas } from "./db.js";
import { rotasA } from "./router/rotas_autenticacao.js";
import { rotasU } from "./router/rotas_users.js";
import { rotasE } from "./router/rotas_edit.js";
import cors from 'cors'

const app = Express()
app.use(Express.json())
app.use(cors())

app.use('/autenticacao', rotasA)
app.use('/admin', rotasU)
app.use('/edit', rotasE)
//criarTabelas()

app.listen(8000)