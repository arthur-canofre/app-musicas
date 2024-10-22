import React,{useState} from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

const style = StyleSheet.create({

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
        console.log(credenciais)
    }
    return(
        <View>
                <TextInput
                    placeholder="Email"
                    value={credenciais.email}
                    onChangeText={(value) => {onChangeText(value, "email")}}
                />
                <TextInput
                    placeholder="Senha"
                    value={credenciais.senha}
                    onChangeText={(value) => {onChangeText(value, "senha")}}
                />
                { isValid === false? <Text>Crenciais Invalidas</Text>: null}
                <Button
                    title="Confirmar"
                    onPress={() => {!credenciais.email || !credenciais.senha? setIsValid(false): [setIsValid(true),alert("tudo certo amigao")]}}
                />
                <Link href='/cadastro'><Text>Não tem conta?</Text></Link>
        </View>
    )
}