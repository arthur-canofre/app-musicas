import React, {useEffect, useContext, useState} from "react";
import { Text, View, Image, Pressable, StyleSheet, ImageBackground } from 'react-native'
import { AppContext } from "../../scripts/appContext"
import { Redirect } from "expo-router";
import * as ImagePicker from 'expo-image-picker'

const style = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    foto: {
        width: 200,
        height: 200,
        borderRadius: 400,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    editIcon: {
        width: 50,
        height: 50,
        borderRadius: 50
    }
})


export default Perfil = () => {

    const {user, setUser} = useContext(AppContext)
    const [usuario, setUsuario] = useState({
        nome: "Jose",
        sobrenome: "Pereira",
        email: user,
        dataNascimento: "20/01/2001",
        status: "inativo",
        foto: null
    })

    const setImage = (image) => {
        var newUsuario = {...usuario, foto: image}
        setUsuario(newUsuario)
    }

    const pickImage = async() =>{
        var result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if(!result.canceled){
            console.log(result.assets[0])
            //setImage(result.assets[0].uri, 'fotoURI')
        }
    }

    useEffect(() => {
        const getUser = async() =>{
            try{
                const response = await fetch('http://localhost:8000/admin/pegarUm', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email: user})
                }
            )
            const data =  await response.json()
            setUsuario(data)
            console.log(usuario)
            }catch(error){
                console.error(error)
            }
        }
       // getUser()
    }, [])

    const handleSendImage = async() => {
        try{
            const data = {
                "file": usuario.foto,
                "upload_preset": "ml_default",
                "name": "teste"
            }
            const res = await fetch('https://api.cloudinary.com/v1_1/dpiyzzueo/upload',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await res.json()
            console.log(result)
        }catch(e){
            console.log(e)
        }
    }
    return(
        <View style={style.container}>
            {/* { !user? <Redirect href={'/login'}/>:null } */}
            <View>
                <ImageBackground 
                    style={style.foto}
                    source={usuario.foto? {uri: usuario.foto}: require('../../assets/images/profile.png')} 
                >
                    <Pressable onPress={() => pickImage()}>
                        <Image style={style.editIcon} source={require('../../assets/images/edit.png')}/>
                    </Pressable>
                </ImageBackground>
                <Pressable onPress={handleSendImage}><Text>toma</Text></Pressable>
                <Text>{`${usuario.nome} ${usuario.sobrenome}`}</Text>
            </View>
            <View></View>
        </View>
    )
}