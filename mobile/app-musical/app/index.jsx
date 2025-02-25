import React, {useContext, useState, useEffect} from "react";
import {View, Text, FlatList, Pressable, StyleSheet, Image, ScrollView} from 'react-native'
import AlbumBt from "../components/AlbumBt";
import ArtBt from "../components/ArtBt";
import { AppContext } from "../scripts/appContext";
import { Redirect } from "expo-router";
import Header from "../components/Header";

const style = StyleSheet.create({
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
    titulo: {
        fontSize: 30,
        color: '#CAF0F8',
        fontWeight: 'bold',
        paddingBottom: 30
    }
})
export default Home = () => {
    const {user, setUser} = useContext(AppContext)

    if (!user.email) {
       return <Redirect href={'/login'} />;
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
                        renderItem={({item}) => <ArtBt item={item}/>}
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
                        renderItem={({item}) => <AlbumBt item = {item} artNome = {artistas[item.artista_id - 1].nome}/>}
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