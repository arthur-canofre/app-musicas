import Express from "express";
import { registro, login } from "../controller/controlador_autenticacao.js";

const rotasA = Express.Router()

rotasA.post('/registro', registro)
rotasA.post('/login', login)

export { rotasA }