import React, {useContext, useState, useEffect} from "react";
import {View, Text, FlatList, Pressable, StyleSheet, Image, ScrollView} from 'react-native'
import { AppContext } from "../scripts/appContext";
import { Redirect, Link } from "expo-router";
import Header from "../components/Header";

const style = StyleSheet.create({
    artFoto: {
        width: 140,
        height: 140,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    albFoto: {
        width: 180,
        height: 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    container: {
        //display: 'flex',
        //justifyContent: 'flex-start',
        backgroundColor: '#03045E'
    },
    listContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        margin: 10
    },
    botaoArt: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 140,
        height: 180,
        backgroundColor: '#0096C7',
        borderRadius: 20,
    },
    botaoAlb: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 180,
        height: 230,
        backgroundColor: '#0096C7',
        borderRadius: 20
    },
    titulo: {
        fontSize: 30,
        color: '#CAF0F8',
        fontWeight: 'bold',
        paddingBottom: 30
    }
})
export default Home = () => {
    const {user, setUser} = useContext(AppContext)
    const {album, setAlbum} = useContext(AppContext)

    if (!user.email) {
       return <Redirect href={'/musica'} />;
    }
    if(album){
        return <Redirect href={'/'}/>
    }
    
    const [artistas, setArtistas] = useState([])
    const [albuns, setAlbuns] = useState([])

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
        getArtists()
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
        getAlbums()
    },[])

    return(
        <ScrollView>
            <Header titulo="Home"/>
            <View style={style.container}>
                <View style={style.listContainer}>
                    <Text style={style.titulo}>Artistas recomendados</Text>
                    <FlatList
                        data={artistas}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => <Link href="/">
                                                    <View style={style.botaoArt}>
                                                        <Image resizeMethod="" source={{uri: item.imageUrl}} style={style.artFoto}/>
                                                        <Text style={{fontWeight: 'bold', fontSize: 17}}>{item.nome}</Text>
                                                    </View>
                                                </Link>
                        }
                        horizontal
                        contentContainerStyle={{gap: 5}}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={style.listContainer}>
                    <Text style={style.titulo}>Albuns recomendados</Text>
                    <FlatList
                        data={albuns}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => <Link href="/">
                                                    <View style={style.botaoAlb}>
                                                        <Image resizeMode="contain" source={{uri: item.coverImageUrl}} style={style.albFoto}/>
                                                        <Text style={{fontWeight: 'bold', fontSize: 17}}>{item.title}</Text>
                                                        <Text>{artistas[item.artista_id - 1].nome}</Text>
                                                    </View>
                                                </Link>
                        }
                        numColumns={2}
                        contentContainerStyle={{gap: 10}}
                        columnWrapperStyle={{gap: 10}}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        </ScrollView>
    )
}