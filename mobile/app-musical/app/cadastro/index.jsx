import React, {useState} from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { Link } from "expo-router";

const style = StyleSheet.create({
    fundo: {
        backgroundColor: '#03045E',
        height: '100%'
    },
    container:{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        backgroundColor: '#03045E'
    },
    inpContainer:{
        gap: 20,
        alignItems: 'center',
        paddingBottom: 40
    },
    input:{
        backgroundColor: '#0096C7',
        borderRadius: 10,
        width: 250,
        height: 45,
        padding: 15,
        textAlign: 'left'
    },
    botao: {
        backgroundColor: '#0096C7',
        borderRadius: 10,
        width: 110,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btText:{
        fontSize: 20
    },
    titulo:{
        fontSize: 34,
        color: '#CAF0F8',
        fontWeight: 'bold',
        paddingBottom: 30
    },
    errText:{
        color: 'red'
    },
    link:{
        color: '#48CAE4',
        textDecorationLine: 'underline'
    }
})

export default Cadastro = () => {
    const [credenciais, setCredenciais] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        dataNascimento: ""
    })

    const [isValid, setIsValid] = useState(null)

    const onChangeText = (value, campo) =>{
        const newCredenciais = {...credenciais, [campo]: value}
        setCredenciais(newCredenciais)
    }

    const cadastrar = async() => {
        //console.log(credenciais)
        const dados = JSON.stringify(credenciais)
        console.log(dados)
        if (!credenciais.email || !credenciais.senha || !credenciais.nome || !credenciais.sobrenome || !credenciais.dataNascimento){
            setIsValid(false)
            return
        }
        try{
            const response = await fetch('http://localhost:8000/autenticacao/registro', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credenciais)
            })
            const data = await response.json();
            console.log(data)
        }catch(err){
            console.error(err)
        }
    }
    return(
        <View style={style.fundo}> 
            <View style={style.container}>
                <Text style={style.titulo}>Cadastro</Text>
                <View style={style.inpContainer}>
                    <TextInput
                        style={style.input}
                        placeholder="Nome"
                        value={credenciais.nome}
                        onChangeText={(value) => {onChangeText(value, "nome")}}
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Sobrenome"
                        value={credenciais.sobrenome}
                        onChangeText={(value) => {onChangeText(value, "sobrenome")}}
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Email"
                        value={credenciais.email}
                        onChangeText={(value) => {onChangeText(value, "email")}}
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Senha"
                        value={credenciais.senha}
                        onChangeText={(value) => {onChangeText(value, "senha")}}
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Data de Nascimento"
                        value={credenciais.dataNascimento}
                        onChangeText={(value) => {onChangeText(value, "dataNascimento")}}
                    />
                    
                    { isValid === false? <Text style={style.errText}>Crenciais Invalidas</Text>: null}
                </View>
                <Pressable
                        style={style.botao}
                        onPress={cadastrar}
                    ><Text style={style.btText}>Confirmar</Text></Pressable>
                <Link href='/'><Text style={style.link}>Ja tem conta?</Text></Link>
            </View>
        </View>
    )
}