import React, {useState} from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { Link } from "expo-router";

const style = StyleSheet.create({

})

export default Cadastro = () => {
    const [credenciais, setCredenciais] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        dataNasc: ""
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
                    placeholder="Nome"
                    value={credenciais.nome}
                    onChangeText={(value) => {onChangeText(value, "nome")}}
                />
                <TextInput
                    placeholder="Sobrenome"
                    value={credenciais.sobrenome}
                    onChangeText={(value) => {onChangeText(value, "sobrenome")}}
                />
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
                <TextInput
                    placeholder="Data de Nascimento"
                    value={credenciais.dataNasc}
                    onChangeText={(value) => {onChangeText(value, "dataNasc")}}
                />
                { isValid === false? <Text>Crenciais Invalidas</Text>: null}
                <Button
                    title="Confirmar"
                    onPress={() => {!credenciais.email || !credenciais.senha || !credenciais.nome || !credenciais.sobrenome || !credenciais.dataNasc? setIsValid(false): [setIsValid(true),alert("tudo certo amigao")]}}
                />
                <Link href='/login'><Text>Ja tem conta?</Text></Link>
        </View>
    )
}