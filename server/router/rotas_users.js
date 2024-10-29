import Express from "express"
import { getUsers, deleteUsers } from "../controller/controlador_users.js"

const rotasU = Express.Router()

rotasU.get('/pegar', getUsers)
rotasU.delete('/deletar', deleteUsers)

export {rotasU}