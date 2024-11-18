import React, { useEffect, useContext, useState } from "react";
import { Text, View, Image, Pressable, StyleSheet, ImageBackground, Modal, Button, TextInput } from 'react-native'
import { AppContext } from "../../scripts/appContext"
import { Redirect } from "expo-router";
import * as ImagePicker from 'expo-image-picker'

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
        justifyContent: 'flex-end'
    },
    editIcon: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    infoContainer: {
        marginHorizontal: 10,
        height: "60%",
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
    botao: {
        margin: 15,
        backgroundColor: '#0096C7',
        borderRadius: 10,
        width: 160,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btText: {
        fontSize: 18
    },
    textNome: {
        fontSize: 28,
        color: '#227FCF',
        fontWeight: 'bold'
    },
    fotoContainer: {
        alignItems: "center"
    },
    input: {
        backgroundColor: '#0096C7',
        borderRadius: 10,
        width: 250,
        height: 45,
        padding: 15,
        textAlign: 'left'
    },
    titulo: {
        fontSize: 30,
        color: '#CAF0F8',
        fontWeight: 'bold',
        paddingBottom: 30
    },
    modalSenha: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        backgroundColor: '#03045E'
    }
})


export default Perfil = () => {

    const { user, setUser } = useContext(AppContext)

    if (!user) {
        return <Redirect href={'/login'} />;
    }

    const [usuario, setUsuario] = useState({})
    const [newFoto, setNewFoto] = useState(usuario.foto)
    const [visivel, setVisivel] = useState(false)
    const [modalSenha, setModalSenha] = useState(false)
    const [senhaOld, setSenhaOld] = useState("")
    const [senhaNova1, setSenhaNova1] = useState("")
    const [senhaNova2, setSenhaNova2] = useState("")
    const [isValid, setIsValid] = useState(null)
    const [errorText, setErrorText] = useState("")


    const setImage = (image) => {
        var newUsuario = { ...usuario, foto: image }
        setUsuario(newUsuario)
    }

    const pickImage = async () => {
        var result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setNewFoto(result.assets[0].uri, 'fotoURI')
            setVisivel(true)
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch('http://localhost:8000/admin/pegarUm', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: user })
                }
                )
                const data = await response.json()
                setUsuario(data)
            } catch (error) {
                console.error(error)
            }
        }
        user ? getUser() : null
    }, [])

    const changeImg = async () => {
        console.log(usuario.foto)
        try {
            const response = await fetch('http://localhost:8000/edit/editar', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user, alt: usuario.foto })
            })
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    const changePassword = async () => {
        if (!senhaNova1 || !senhaOld || !senhaNova2) {
            setIsValid(false)
            setErrorText("Preencha todos os campos.")
            return
        }
        if (senhaNova1 != senhaNova2) {
            setIsValid(false)
            setErrorText("As senhas devem ser iguais.")
            return
        }
        try {
            const response = await fetch('http://localhost:8000/edit/trocarSenha', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user, senhaAntiga: senhaOld, senhaNova: senhaNova2 })
            })
            const result = response.status
            if (result == 401) {
                setIsValid(false)
                setErrorText("Senha invalida.")
                return
            }
        } catch (e) {
            console.log(e)
        }
        setModalSenha(false)
    }

    const handleSendImage = async () => {
        try {
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
            changeImg()
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={style.container}>
            <Modal
                visible={modalSenha}
            >
                <View style={style.modalSenha}>
                    <Text style={style.titulo}>Trocar senha</Text>
                    <TextInput
                        style={style.input}
                        value={senhaOld}
                        onChangeText={(value) => setSenhaOld(value)}
                        placeholder="senha atual"
                    />
                    <TextInput
                        style={style.input}
                        value={senhaNova1}
                        onChangeText={(value) => setSenhaNova1(value)}
                        placeholder="Nova senha"
                    />
                    <TextInput
                        style={style.input}
                        value={senhaNova2}
                        onChangeText={(value) => setSenhaNova2(value)}
                        placeholder="confirme a nova senha"
                    /> 
                    {!isValid && <Text style={{ color: 'red' }}>{errorText}</Text>}
                    <Pressable onPress={changePassword} style={style.botao}>
                        <Text>Confirmar</Text>
                    </Pressable>
                </View>
            </Modal>
            <Modal
                visible={visivel}
            >
                <View style={style.modalSenha}>
                    <Text style={style.titulo}>Você tem certeza?</Text>
                    <View>
                        <Pressable onPress={handleSendImage} style={{...style.botao, backgroundColor: "green"}}>
                            <Text style={style.btText}>sim</Text>
                        </Pressable>                        
                        <Pressable onPress={() => setVisivel(false)} style={{...style.botao, backgroundColor: "red"}}>
                            <Text style={style.btText}>nao</Text>
                        </Pressable>                  
                    </View>
                </View>
            </Modal>
            <View style={style.fotoContainer}>
                <ImageBackground
                    style={style.foto}
                    source={usuario.foto ? { uri: usuario.foto } : require('../../assets/images/profile.png')}
                    borderRadius={200}
                >
                    <Pressable onPress={() => pickImage()}>
                        <Image style={style.editIcon} source={require('../../assets/images/edit.png')} />
                    </Pressable>
                </ImageBackground>
                <Text style={style.textNome}>{`${usuario.nome} ${usuario.sobrenome}`}</Text>
            </View>
            <View style={style.infoContainer}>
                <View style={style.campoContainer}>
                    <Text style={style.textCampo}>Email:</Text>
                    <Text style={style.textCampo2}>{usuario.email}</Text>
                </View>
                <View style={style.campoContainer}>
                    <Text style={style.textCampo}>Data de Nascimento:</Text>
                    <Text style={style.textCampo2}>{usuario.dataNascimento}</Text>
                </View>
                <Pressable
                    onPress={() => setModalSenha(true)}
                    style={style.botao}>
                    <Text style={style.btText}>Mudar senha</Text>
                </Pressable>
            </View>
        </View>
    )
}