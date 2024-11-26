import { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import Header from '../../components/Header'

const style = StyleSheet.create({
    foto: {
        width: 300,
        height: 300
    },
    container: {
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '70%'
    }
})

export default home = () =>{
    const [musica, setMusica] = useState({
        titulo: "Jesus Walks", 
        duracao: 240, 
        fileUrl: "URL_URL", 
        createdAt: '26/11/2024', 
        updatedAt: '26/11/2024',
        artista_id: 1, 
        album_id: 1  
    })
    const [isPlaying, setIsPlayng] = useState(false)
    return(
        <View>
            <Header titulo="música"/>
            <View style={style.container}>
                <Image source={{uri: "https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da847a45ed9366f92446f48eb588"}} style={style.foto}/>
                <Text>{musica.titulo}</Text>
                <View style={style.btContainer}>
                    <Text>00:00</Text>
                    <Text>{Math.trunc(musica.duracao/60)}:{musica.duracao % 60}</Text>
                </View>
                <View style={style.btContainer}>
                    <Pressable>
                        <Image source={require('../../assets/images/previous.png')} style={{width: 40, height: 40}}/>
                    </Pressable>
                    <Pressable onPress={() => setIsPlayng(!isPlaying)}>
                        <Image source={require(isPlaying?'../../assets/images/pause.png' : '../../assets/images/next.png')} style={{width: 50, height: 50}}/>
                    </Pressable>
                    <Pressable>
                        <Image source={require('../../assets/images/next.png')} style={{width: 40, height: 40}}/>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}