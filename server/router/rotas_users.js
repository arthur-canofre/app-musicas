import Express from "express"
import { getUsers, deleteUsers, getUser, getFoto } from "../controller/controlador_users.js"

const rotasU = Express.Router()

rotasU.get('/pegar', getUsers)
rotasU.post('/pegarUm', getUser)
rotasU.post('/pegarFoto', getFoto)
rotasU.delete('/deletar', deleteUsers)

export {rotasU}