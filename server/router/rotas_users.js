import Express from "express"
import { getUsers, deleteUsers, getUser } from "../controller/controlador_users.js"

const rotasU = Express.Router()

rotasU.get('/pegar', getUsers)
rotasU.post('/pegarUm', getUser)
rotasU.delete('/deletar', deleteUsers)

export {rotasU}