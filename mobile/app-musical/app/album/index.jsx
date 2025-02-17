import React, {useState, useEffect, useContext} from "react";
import { View, StyleSheet, Text, Image, FlatList, Pressable, ScrollView } from "react-native";
import MusicBt from "../../components/MusicBt";
import { AppContext } from "../../scripts/appContext";
import { Redirect } from "expo-router";
import Header from "../../components/Header";

const style = StyleSheet.create({
    capa: {
        width: 200,
        height: 200
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 20
    },
    titulo: {
        color: 'white',
        fontSize: 25
    },
    listContainer: {
        backgroundColor: "#006296",
        borderRadius: 30,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    }
})

export default Album = () => {
    const {album, setAlbum} = useContext(AppContext)

    const [albumData, setAlbumData] = useState({})
    const [musicsData, setMusicsData] = useState([])

    useEffect(() => {
        const getAlbum = async() =>{
            try{
            const response = await fetch('http://localhost:8000/geral/getAlbum', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: album})
            })

            if(response.ok){
                const data = await response.json()
                setAlbumData(data.album)
                setMusicsData(data.musicas)
            }
            }catch(e){
                console.log(e)
            }
        }
        getAlbum()
    }, [])

    return(
        <ScrollView style={{backgroundColor: '#03045E'}}>
            <Header titulo='Album'/>
            <View style={style.container}>
                <View style={style.container}>
                    <Image source={{uri: albumData.coverImageUrl}} style={style.capa}/>
                    <Text style={style.titulo}>{albumData.title}</Text>
                </View>
                <View style={style.listContainer}>
                    <FlatList
                        data={musicsData}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => <MusicBt item = {item} foto = {albumData.coverImageUrl}/>
                    }
                    contentContainerStyle={{gap: 5}}
                    scrollEnabled={false}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

