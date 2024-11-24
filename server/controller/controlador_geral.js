import { Artista, Musica, Album } from "../db.js"

const getAlbuns = async(req, res) => {
    const albuns = await Album.findAll()
    res.status(200).send(albuns)
}

const getArtists = async(req, res) => {
    const artistas = await Artista.findAll()
    res.status(200).send(artistas)
}

const getAlbum = async(req, res) => {
    const {id} = req.body
    const album = await Album.findOne({where: {id: id}})
    if(!album){
        return res.status(404).send("Album não encontrado")
    }
    const musicas = await Musica.findAll({where: {album_id: id}})
    res.status(200).send({album: album, musicas: musicas})
}

const getMusica = async(req, res) => {
    const {id} = req.body
    const musica = await Musica.findOne({where: {id: id}})
    if(!musica){
        return res.status(404).send("Musica não encontrada")
    }
    res.status(200).send(musica)
}

export {getAlbum, getArtists, getMusica, getAlbuns}