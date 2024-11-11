import React, {useEffect, useContext, useState} from "react";
import { Text, View, Image, Pressable, StyleSheet } from 'react-native'
import { AppContext } from "../../scripts/appContext"
import { Redirect } from "expo-router";
// import { AdvancedImage } from 'cloudinary-react-native';
// import { Cloudinary } from "@cloudinary/url-gen";
import * as ImagePicker from 'expo-image-picker'

const style = StyleSheet.create({
    foto: {
        width: 400,
        height: 400
    },
})

// const cld = new Cloudinary({
//     cloud: {
//         cloudName: 'demo'
//     }
// })

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
            setImage(result.assets[0].uri, 'fotoURI')
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
        //getUser()
    }, [])
    return(
        <View>
            {/* { !user? <Redirect href={'/login'}/>:null } */}
            <View>
                <Pressable onPress={() => pickImage()}>
                    <Image 
                        style={style.foto}
                        source={usuario.foto? {uri: usuario.foto}: require('../../assets/images/profile.png')} 
                    />
                </Pressable>
                <Text>{`${usuario.nome} ${usuario.sobrenome}`}</Text>
            </View>

        </View>
    )
}