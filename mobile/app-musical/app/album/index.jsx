import React, {useState, useEffect, useContext} from "react";
import { View, StyleSheet, Text, Image, FlatList, Pressable, ScrollView } from "react-native";
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
    musicContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    musFoto: {
        width: 65,
        height: 65
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
    const {musica, setMusica} = useContext(AppContext)

    if(musica){
        return <Redirect href={'/musica'}/>
    }

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
                setAlbum(null)
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
                        renderItem={({item}) => <Pressable onPress={() => setMusica(item.id)}>
                                                    <View style={style.musicContainer}>
                                                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                                            <Image resizeMethod="" source={{uri: albumData.coverImageUrl}} style={style.musFoto}/>
                                                            <Text style={{fontWeight: 'bold', fontSize: 17}}>{item.titulo}</Text>
                                                        </View>
                                                        <Text>{Math.trunc(item.duracao/60).toString().padStart(2, '0')}:{(item.duracao % 60).toString().padStart(2, '0')}</Text>
                                                    </View>
                                                </Pressable>
                    }
                    contentContainerStyle={{gap: 5}}
                    scrollEnabled={false}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

