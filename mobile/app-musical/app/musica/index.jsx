import { useState, useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import Header from '../../components/Header'
import { AppContext } from "../../scripts/appContext";

const style = StyleSheet.create({
    foto: {
        width: 300,
        height: 300
    },
    container: {
        height: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    btContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300
    },
    text: {
        color: 'white'
    },
    titulo: {
        color: 'white',
        fontSize: 25
    },
    btImg: {
        width: 40, 
        height: 40,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white'
    }
})

export default home = () =>{
    const [musicaData, setMusicaData] = useState({})
    const [isPlaying, setIsPlayng] = useState(false)

    const {musica, setMusica} = useContext(AppContext)
    
    useEffect(() => {
        console.log(JSON.stringify({id: musica}))
        const getMusica = async() => {
            try{
                const response = await fetch('http://localhost:8000/geral/getMusica',{
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({id: musica})
                })
                if(response.ok){
                const data = await response.json()
                setMusicaData(data)
                setMusica(null)
                }
            }catch(e){
                console.log(e)
            }
        }
        getMusica()
    },[])

    return(
        <View style={{backgroundColor: '#03045E', height: `100%`}}>
            <Header titulo="música"/>
            <View style={style.container}>
                <Image source={{uri: musicaData.foto}} style={style.foto}/>
                <Text style={style.titulo}>{musicaData.titulo}</Text>
                <View style={style.btContainer}>
                    <Text style={style.text}>00:00</Text>
                    <Text style={style.text}>{Math.trunc(musicaData.duracao/60).toString().padStart(2, '0')}:{(musicaData.duracao % 60).toString().padStart(2, '0')}</Text>
                </View>
                <View style={{borderColor: 'white', borderBottomWidth: 2, width: 300}}></View>
                <View style={style.btContainer}>
                    <Pressable>
                        <Image source={require('../../assets/images/previous.png')} style={style.btImg}/>
                    </Pressable>
                    <Pressable onPress={() => setIsPlayng(!isPlaying)}>
                        <Image source={isPlaying? require('../../assets/images/pause.png') : require('../../assets/images/play.png')} style={{...style.btImg, width: 60, height: 60}}/>
                    </Pressable>
                    <Pressable>
                        <Image source={require('../../assets/images/next.png')} style={style.btImg}/>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}