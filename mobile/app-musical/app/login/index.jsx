import React,{useState, useContext} from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native'
import { AppContext } from "../../scripts/appContext";
import { Link, Redirect } from 'expo-router'

const style = StyleSheet.create({
    fundo: {
        backgroundColor: '#03045E',
        height: '100%'
    },
    container:{
        height: '90%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        backgroundColor: '#03045E'
    },
    inpContainer:{
        gap: 20,
        alignItems: 'center'
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
        fontSize: 24
    },
    img: {
        width: 240,
        height: 240
    },
    titulo:{
        fontSize: 35,
        color: '#227FCF',
        fontWeight: 'bold'
    },
    containerTitulo:{
        alignItems: 'center',
        paddingBottom: 20
    },
    titulo2:{
        fontSize: 30,
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

export default Login = () => {
    const [credenciais, setCredenciais] = useState({
        email: "",
        senha: ""
    })

    const [isValid, setIsValid] = useState(null)
    const [errorText, setErrorText] = useState("")
    
    const {user, setUser} = useContext(AppContext)

    const onChangeText = (value, campo) =>{
        const newCredenciais = {...credenciais, [campo]: value}
        setCredenciais(newCredenciais)
    }

    const logar = async() => {
        const dados = JSON.stringify(credenciais)
        console.log(dados)
        if (!credenciais.email || !credenciais.senha){
            setIsValid(false)
            setErrorText("Preencha todos os campos")
            return
        }
        try{
            const response = await fetch('http://localhost:8000/autenticacao/login', {
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
                    case 401: [setIsValid(false), setErrorText("Senha ou email invalido")]
                    break
                }
            }else{
                alert("Login efetuado com sucesso") 
                setUser({...user, email: credenciais.email})
                console.log(user)
            }
        }catch(err){
            console.error(err)
        }
    }
    
    return(
        <View style={style.fundo}>

            {user.email && <Redirect href="/"/>}
            <View style={style.container}>
                <View style={style.containerTitulo}>
                    <Image style={style.img} source={require('../../assets/images/logo-app.png')}/>
                    <Text style={style.titulo}>A Sinfonia da Noite</Text>
                </View>
                <Text style={style.titulo2}>Login</Text>
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
                        secureTextEntry={true}
                    />
                    { isValid === false? <Text style={style.errText}>{errorText}</Text>: null}
                </View>
                    <Pressable
                        style={style.botao}
                        onPress={logar}
                    ><Text style={style.btText}>Entrar</Text></Pressable>
                    <Link href='/cadastro'><Text style={style.link}>Não tenho conta</Text></Link>
            </View>
        </View>
    )
}