import React,{useState} from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

const style = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        backgroundColor: '#03045E',
    },
    inpContainer:{

    },
    input:{
        backgroundColor: '#0096C7',
        borderColor: '#00B4D8',
        borderWidth: 1,
        borderRadius: 10,
        width: 250,
        height: 45
        
    },
    botao: {
        
    }
})

export default Cadastro = () => {
    const [credenciais, setCredenciais] = useState({
        email: "",
        senha: ""
    })

    const [isValid, setIsValid] = useState(null)

    const onChangeText = (value, campo) =>{
        const newCredenciais = {...credenciais, [campo]: value}
        setCredenciais(newCredenciais)
    }
    return(
        <View style={style.container}>
            <View style={style.inpContainer}>
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
                { isValid === false? <Text>Crenciais Invalidas</Text>: null}
            </View>
                <Pressable
                    style={style.botao}
                    title="Confirmar"
                    onPress={() => {!credenciais.email || !credenciais.senha? setIsValid(false): [setIsValid(true),alert("tudo certo amigao")]}}
                ><Text>Entrar</Text></Pressable>
                <Link href='/cadastro'><Text style={style.link}>Não tenho conta</Text></Link>
        </View>
    )
}