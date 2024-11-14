import React, {useEffect, useContext, useState} from "react";
import { Text, View, Image, Pressable, StyleSheet, ImageBackground, Modal, Button } from 'react-native'
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
    const [newFoto, setNewFoto] = useState(usuario.foto)
    const [visivel, setVisivel] = useState(false)

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
            setNewFoto(result.assets[0].uri, 'fotoURI')
            setVisivel(true)
        }
    }

    useEffect(() => {
        console.log(user)
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
            }catch(error){
                console.error(error)
            }
        }
       getUser()
    }, [])

    useEffect(() => {
        const changeImg = async() => {
            const response = await fetch('http://localhost:8000/edit/editar', {
                method: 'PUT',
                headers:{
                    'Accept': 'application/json'
                },
                body: JSON.stringify({campo: 'foto', email: user, alt: usuario.foto})
            })
        }
        changeImg()
    }, [usuario.foto])

    const handleSendImage = async() => {
        try{
            const data = {
                "file": newFoto,
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
            setImage(result.url)
            setVisivel(false)
        }catch(e){
            console.log(e)
        }
    }
    return(
        <View style={style.container}>
            { !user? <Redirect href={'/login'}/>:null }
            <Modal
                visible={visivel}
            >
                <Text>Você tem certeza?????</Text>
                <Button title="Sim" onPress={handleSendImage}/>
                <Button title="Não" onPress={() => setVisivel(false)}/>
            </Modal>
            <View>
                <ImageBackground 
                    style={style.foto}
                    source={usuario.foto? {uri: usuario.foto}: require('../../assets/images/profile.png')}
                    borderRadius={200} 
                >
                    <Pressable onPress={() => pickImage()}>
                        <Image style={style.editIcon} source={require('../../assets/images/edit.png')}/>
                    </Pressable>
                </ImageBackground>
                <Text>{`${usuario.nome} ${usuario.sobrenome}`}</Text>
            </View>
            <View></View>
        </View>
    )
}