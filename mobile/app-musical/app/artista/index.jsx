import React, { useEffect, useContext, useState } from "react";
import { Text, View, Image, Pressable, StyleSheet, FlatList, ScrollView } from 'react-native'
import { AppContext } from "../../scripts/appContext"
import { Link, Redirect } from "expo-router";
import Header from "../../components/Header";

const style = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 50,
        gap: 15,
        backgroundColor: '#03045E',
        height: '100%'
    },
    foto: {
        width: 200,
        height: 200,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        borderRadius: 200
    },
    infoContainer: {
        marginHorizontal: 10,
        //height: "60%",
        backgroundColor: "#006296",
        borderRadius: 30,
        gap: 10,
        width: "90%"
    },
    campoContainer: {
        gap: 5,
        margin: 15
    },
    textCampo: {
        fontSize: 20,
        color: "#03045E"
    },
    textCampo2: {
        fontSize: 17,
        color: "#03045E"

    },
    textNome: {
        fontSize: 28,
        color: '#227FCF',
        fontWeight: 'bold'
    },
    titulo: {
        fontSize: 30,
        color: '#CAF0F8',
        fontWeight: 'bold',
        paddingBottom: 30
    },
    botaoAlb: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 180,
        height: 230,
        backgroundColor: '#0096C7',
        borderRadius: 20
    },
    listContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        margin: 10
    },
    albFoto: {
        width: 180,
        height: 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})


export default Artista = () => {

    const {artista, setArtista} = useContext(AppContext)
    const {album, setAlbum} = useContext(AppContext)
    
    if(album){
        return <Redirect href={`/album`}/>
    }

    const [artistaData, setArtistaData] = useState({})
    const [albums, setAlbuns] = useState([])

    useEffect(() => {
        const getArtist = async () => {
            try {
                const response = await fetch('http://localhost:8000/geral/getArtista', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: artista })
                }
                )
                if(response.ok){
                    const data = await response.json()
                    setArtistaData(data.artista)
                    setAlbuns(data.albums)
                    setArtista(null)
                }
            } catch (error) {
                console.error(error)
            }
        }
        getArtist()
    }, [])

    return (
        <ScrollView style={{backgroundColor: '#03045E', height: '100%'}}>
            <Header titulo="artista"/>
            <View style={style.container}>
                <View style={style.fotoContainer}>
                    <Image
                        style={style.foto}
                        source={{uri: artistaData.imageUrl}}
                        borderRadius={200}
                    />
                    <Text style={style.textNome}>{artistaData.nome}</Text>
                </View>
                <View style={style.infoContainer}>
                    <View style={style.campoContainer}>
                        <Text style={style.textCampo}>Bio:</Text>
                        <Text style={style.textCampo2}>{artistaData.bio}</Text>
                    </View>
                </View>
                <View style={style.listContainer}>
                    <Text style={style.titulo}>Albuns recomendados</Text>
                    <FlatList
                        data={albums}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => <Pressable onPress={() => setAlbum(item.id)}>
                                                    <View style={style.botaoAlb}>
                                                        <Image resizeMode="contain" source={{uri: item.coverImageUrl}} style={style.albFoto}/>
                                                        <Text style={{fontWeight: 'bold', fontSize: 17}}>{item.title}</Text>
                                                        <Text>{artistaData.nome}</Text>
                                                    </View>
                                                </Pressable>
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