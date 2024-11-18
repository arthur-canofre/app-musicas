import Express from "express"
import { getAlbum, getAlbuns, getArtists, getMusica } from "../controller/controlador_geral.js"

const rotasG = Express.Router()

rotasG.get("/getAlbuns", getAlbuns)
rotasG.get("/getArtistas", getArtists)
rotasG.post("getMusica", getMusica)
rotasG.post("getAlbum", getAlbum)

export {rotasG}