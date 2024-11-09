import React, {useEffect, useContext, useState} from "react";
import { Text, View, Image, Pressable, StyleSheet } from 'react-native'
import { AppContext } from "../../scripts/appContext"

const style = StyleSheet.create({

})

export default Perfil = () => {

    const {user, setUser} = useContext(AppContext)
    const [usuario, setUsuario] = useState({})

    useEffect(() => {
        const getUser = async() =>{
            const email = {
                email: "fodase@gmail.com"
            }
            try{
                const response = await fetch('http://localhost:8000/admin/pegarUm', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(email)
                }
            )
            const data =  await response.json()
            setUsuario(data)
            console.log(usuario)
            }catch(error){
                console.error(error)
            }
        }
        getUser()
    }, [])
    return(
        <View>
            <Text>{usuario.nome}</Text>
        </View>
    )
}