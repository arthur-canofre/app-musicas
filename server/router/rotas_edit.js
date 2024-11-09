import Express from "express"
import {edit} from '../controller/controlador_edit.js'

const rotasE = Express.Router()

rotasE.put('/editar', edit)

export {rotasE}