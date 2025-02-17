import React, {useContext} from "react";
import { AppContext } from "../scripts/appContext";
import { StyleSheet, Pressable,  Image, Text, View} from "react-native";
import { useRouter } from "expo-router";

const style = StyleSheet.create({
    botaoArt: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 140,
        height: 180,
    },
    artFoto: {
        width: 140,
        height: 140,
        borderRadius: "50%"
    }
})

export default ArtBt = ({item}) => {
    const router = useRouter()
    const {artista, setArtista} = useContext(AppContext)
    const ArtBtClick = (id) => {
        setArtista(id)
        router.push('/artista')
    }
    return(
        <Pressable onPress={() => ArtBtClick(item.id)}>
            <View style={style.botaoArt}>
                <Image resizeMethod="" source={{uri: item.imageUrl}} style={style.artFoto}/>
                <Text style={{fontWeight: 'bold', fontSize: 17, color: "white"}}>{item.nome}</Text>
            </View>
        </Pressable>
    )
}