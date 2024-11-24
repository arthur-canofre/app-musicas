import { StyleSheet, Pressable, Image, Text, View } from "react-native";
import { useContext } from "react";
import { AppContext } from "../scripts/appContext";

const style = StyleSheet.create({
    foto: {
        width: 50,
        height: 50,
        borderRadius: 50
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
        <View>
            <Text>{titulo}</Text>
            <Pressable>
                <Image source={user.foto ? { uri: user.foto } : require('../assets/images/profile.png')} style={style.foto}/>
            </Pressable>
        </View>
    )
}