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
        dataNascimento: ""
    })

    const [isValid, setIsValid] = useState(null)

    const onChangeText = (value, campo) =>{
        const newCredenciais = {...credenciais, [campo]: value}
        setCredenciais(newCredenciais)
    }

    const cadastrar = async() => {
        if (!credenciais.email || !credenciais.senha || !credenciais.nome || !credenciais.sobrenome || !credenciais.dataNascimento){
            setIsValid(false)
            return
        }
        try{
            const response = await fetch('http://localhost:8000/registro', {
                method: 'POST',
                headers: {
                    Accept: 'applicaton/json',
                    'Content-Type': 'applicaton/json'
                },
                body: JSON.stringify(credenciais)
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data)
        }catch(err){
            console.error(err)
        }
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
                    value={credenciais.dataNascimento}
                    onChangeText={(value) => {onChangeText(value, "dataNascimento")}}
                />
                { isValid === false? <Text>Crenciais Invalidas</Text>: null}
                <Button
                    title="Confirmar"
                    onPress={() => cadastrar()}
                />
                <Link href='/login'><Text>Ja tem conta?</Text></Link>
        </View>
    )
}