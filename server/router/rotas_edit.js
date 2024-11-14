import Express from "express"
import {edit, trocarSenha} from '../controller/controlador_edit.js'

const rotasE = Express.Router()

rotasE.put('/editar', edit)
rotasE.put('/trocarSenha', trocarSenha)

export {rotasE}