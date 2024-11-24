import React, {useContext, useState, useEffect} from "react";
import {View, Text, FlatList, Pressable, StyleSheet, Image} from 'react-native'
import { AppContext } from "../scripts/appContext";
import { Redirect, Link } from "expo-router";
import Header from "../components/Header";

const style = StyleSheet.create({

})
export default Home = () => {
    const {user, setUser} = useContext(AppContext)

    if (!user.email) {
       // return <Redirect href={'/login'} />;
    }
    
    const [artistas, setArtistas] = useState([
        {
            "id": 1,
            "nome": "Kanye West",
            "bio": "Kanye West é um rapper, produtor musical, designer de moda e empresário americano. Ele é conhecido por sua influência significativa na música e na cultura pop, com álbuns icônicos como \"The College Dropout\" e \"My Beautiful Dark Twisted Fantasy\". Além de sua carreira musical, Kanye é fundador da marca Yeezy e tem sido uma figura polêmica por suas opiniões e ações públicas.",
            "imageUrl": "https://s2-quem.glbimg.com/sJ_TO6vO5xchGjme4Npg9eg8PEE=/fit-in/324x299/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_b0f0e84207c948ab8b8777be5a6a4395/internal_photos/bs/2022/c/p/mt8TzETbqajAy0gKKK2A/2021-01-07-kanye-west.jpeg",
            "createdAt": "2024-11-23T01:13:58.770Z",
            "updatedAt": "2024-11-23T01:13:58.770Z"
        },
        {
            "id": 2,
            "nome": "Michael Jackson",
            "bio": "Michael Jackson, conhecido como o \"Rei do Pop\", foi um cantor, compositor, dançarino e filantropo americano. Reconhecido como um dos artistas mais influentes de todos os tempos, ele lançou álbuns icônicos como \"Thriller\", \"Bad\" e \"Dangerous\". Jackson também revolucionou o mundo do entretenimento com suas performances e videoclipes inovadores, além de ser amplamente admirado por sua contribuição à música e à cultura global.",
            "imageUrl": "https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2024/02/10121216/Michael-Jackson-3.jpg",
            "createdAt": "2024-11-23T01:13:58.770Z",
            "updatedAt": "2024-11-23T01:13:58.770Z"
        },
        {
            "id": 3,
            "nome": "MF DOOM",
            "bio": "MF DOOM, nascido Daniel Dumile, foi um rapper e produtor britânico-americano conhecido por sua persona mascarada e estilo lírico único. Considerado uma lenda do rap underground, ele lançou álbuns clássicos como \"Operation: Doomsday\" e \"Madvillainy\" (em parceria com Madlib). MF DOOM era famoso por seus jogos de palavras complexos e beats inovadores, consolidando-se como um dos artistas mais influentes do gênero.",
            "imageUrl": "https://i.scdn.co/image/ab6761610000e5eb6c8167ef48a872b6f190078f",
            "createdAt": "2024-11-23T01:13:58.770Z",
            "updatedAt": "2024-11-23T01:13:58.770Z"
        }
    ])
    const [albuns, setAlbuns] = useState([
        {
            "id": 1,
            "title": "The College Dropout",
            "releaseYear": 2004,
            "coverImageUrl": "https://i.ytimg.com/vi/6Misle653EM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDETFNOkVF7CE55YEXG1gJruOWrpw",
            "createdAt": "2024-11-23T01:15:00.513Z",
            "updatedAt": "2024-11-23T01:15:00.513Z",
            "artista_id": 1
        },
        {
            "id": 2,
            "title": "Late Registration",
            "releaseYear": 2005,
            "coverImageUrl": "https://upload.wikimedia.org/wikipedia/pt/b/b4/Lateregistration.jpg",
            "createdAt": "2024-11-23T01:15:00.513Z",
            "updatedAt": "2024-11-23T01:15:00.513Z",
            "artista_id": 1
        },
        {
            "id": 3,
            "title": "Graduation",
            "releaseYear": 2007,
            "coverImageUrl": "https://upload.wikimedia.org/wikipedia/pt/7/7b/Graduation_%28%C3%A1lbum_de_Kanye_West%29.jpg",
            "createdAt": "2024-11-23T01:15:00.513Z",
            "updatedAt": "2024-11-23T01:15:00.513Z",
            "artista_id": 1
        },
        {
            "id": 4,
            "title": "Thriller",
            "releaseYear": 1982,
            "coverImageUrl": "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
            "createdAt": "2024-11-23T01:15:00.513Z",
            "updatedAt": "2024-11-23T01:15:00.513Z",
            "artista_id": 2
        },
        {
            "id": 5,
            "title": "Bad",
            "releaseYear": 1987,
            "coverImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStep0q8UYqVHVo4DfoNdFHSKDjWQInSrRSjw&s",
            "createdAt": "2024-11-23T01:15:00.513Z",
            "updatedAt": "2024-11-23T01:15:00.513Z",
            "artista_id": 2
        },
        {
            "id": 6,
            "title": "Operation: Doomsday",
            "releaseYear": 1999,
            "coverImageUrl": "https://fr.rarevinyl.com/cdn/shop/files/mf-doom-operation-doomsday-us-cd-album-cdlp-mf-93-cd-847162_1000x898.jpg?v=1727530513",
            "createdAt": "2024-11-23T01:15:00.513Z",
            "updatedAt": "2024-11-23T01:15:00.513Z",
            "artista_id": 3
        },
        {
            "id": 7,
            "title": "Madvillainy",
            "releaseYear": 2004,
            "coverImageUrl": "https://upload.wikimedia.org/wikipedia/en/a/a0/Madvillainy.jpg",
            "createdAt": "2024-11-23T01:17:57.065Z",
            "updatedAt": "2024-11-23T01:17:57.065Z",
            "artista_id": 3
        }
    ])

    useEffect(() => {
        const getArtists = async() =>{
            try{
                const response = await fetch('http://localhost:8000/geral/getArtistas',{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: null
                })
                const data = await response.json()
                setArtistas(data)
            }catch(e){
                console.log(e)
            }
        }
        //getArtists()
    },[])

    useEffect(() => {
        const getAlbums = async() =>{
            try{
                const response = await fetch('http://localhost:8000/geral/getAlbuns',{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: null
                })
                const data = await response.json()
                setAlbuns(data)
            }catch(e){
                console.log(e)
            }
        }
        //getAlbums()
    },[])

    return(
        <View>
            <Header titulo="Home"/>
            <View>
                <Text>Artistas recomendados</Text>
                <FlatList
                    data={artistas}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Link href="/">
                        <Image source={{uri: item.imageUrl}} style={style.artFoto}/>
                        <Text>{item.nome}</Text>
                        </Link>
                    }
                    horizontal
                />
            </View>
            <View>
                <Text>Albuns recomendados</Text>
                <FlatList
                    data={albuns}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Link href="/">
                        <Image source={{uri: item.coverImageUrl}} style={style.artFoto}/>
                        <Text>{item.title}</Text>
                        </Link>
                    }
                    numColumns={2}
                />
            </View>
        </View>
    )
}