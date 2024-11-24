import React, {useState, useContext} from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { Link, Redirect } from "expo-router";
import { AppContext } from "../../scripts/appContext";

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
    const [errorText, setErrorText] = useState("")

    const {user, setUser} = useContext(AppContext)

    const onChangeText = (value, campo) =>{
        const newCredenciais = {...credenciais, [campo]: value}
        setCredenciais(newCredenciais)
    }

    const cadastrar = async() => {
        const dados = JSON.stringify(credenciais)
        if (!credenciais.email || !credenciais.senha || !credenciais.nome || !credenciais.sobrenome || !credenciais.dataNascimento){
            setIsValid(false)
            setErrorText("Preencha todos os campos")
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

            const data = response.status;

            if(!response.ok){
                switch (data) {
                    case 409: [setIsValid(false), setErrorText("Este email ja esta sendo utilizado")]
                    break
                }
            }else{
                alert("Cadastro realizado com sucesso!")
                setUser({...user , email: credenciais.email})
            }
        }catch(err){
            console.error(err)
        }
    }
    return(
        <View style={style.fundo}> 

            {user.email && <Redirect href={"/"}/>}
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
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Data de Nascimento"
                        value={credenciais.dataNascimento}
                        onChangeText={(value) => {onChangeText(value, "dataNascimento")}}
                    />
                    
                    { isValid === false? <Text style={style.errText}>{errorText}</Text>: null}
                </View>
                <Pressable
                        style={style.botao}
                        onPress={cadastrar}
                    ><Text style={style.btText}>Confirmar</Text></Pressable>
                <Link href='/login'><Text style={style.link}>Ja tem conta?</Text></Link>
            </View>
        </View>
    )
}