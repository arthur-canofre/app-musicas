import React, {useContext} from "react";
import { AppContext } from "../scripts/appContext";
import { StyleSheet, Pressable,  Image, Text, View} from "react-native";
import { useRouter } from "expo-router";

const style = StyleSheet.create({
    botaoAlb: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 180,
        height: 230,
        backgroundColor: '#0096C7',
        borderRadius: 20
    },
    albFoto: {
        width: 180,
        height: 180,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})

export default AlbumBt = ({item, artNome}) => {
    const router = useRouter()
    const {album, setAlbum} = useContext(AppContext)
    const AlbumBtClick = (id) => {
            setAlbum(id)
            router.push('/album')
        }

    return(
        <Pressable onPress={() => AlbumBtClick(item.id)}>
            <View style={style.botaoAlb}>
                <Image resizeMode="contain" source={{uri: item.coverImageUrl}} style={style.albFoto}/>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>{item.title}</Text>
                <Text>{artNome}</Text>
            </View>
        </Pressable>
    )
}