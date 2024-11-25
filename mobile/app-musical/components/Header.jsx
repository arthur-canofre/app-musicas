import { StyleSheet, Image, Text, View } from "react-native";
import { useContext } from "react";
import { AppContext } from "../scripts/appContext";
import { Link } from 'expo-router'

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#023E8A',
        height: 65,
        gap: 90,
        paddingLeft: 5
    },
    foto: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    texto: {
        fontSize: 34,
        color: '#CAF0F8'
    }
})

export default Header = ({titulo}) => {
    const {user, setUser} = useContext(AppContext)

    const getFoto = async() =>{
        try{
            const response = await fetch('http://localhost:8000/admin/pegarFoto',{
                method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: user.email })
            })
            if(response.ok){
                const data = await response.json()
                setUser({...user, profile: data.foto})
            }
        }catch(e){
            console.log(e)
        }
    }

    if(!user.profile){
        //getFoto()
    }
    return(
        <View style={style.container}>
            <Link href={'/profile'}>
                <Image source={user.foto ? { uri: user.foto } : require('../assets/images/profile.png')} style={style.foto}/>
            </Link>
            <Text style={style.texto}>{titulo}</Text>
        </View>
    )
}