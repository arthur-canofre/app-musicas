import React, {useContext} from "react";
import { AppContext } from "../scripts/appContext";
import { StyleSheet, Pressable,  Image, Text, View} from "react-native";
import { useRouter } from "expo-router";

const style = StyleSheet.create({
    musicContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    musFoto: {
        width: 65,
        height: 65
    }
})

export default MusicBt = ({item, foto}) => {
    const {musica, setMusica} = useContext(AppContext)
    const router = useRouter()
    const onClick = (id) => {
        setMusica(id)
        router.push('/musica')
    }

    return(
        <Pressable onPress={() => onClick(item.id)}>
            <View style={style.musicContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Image resizeMethod="" source={{uri: foto}} style={style.musFoto}/>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>{item.titulo}</Text>
                </View>
                <Text>{Math.trunc(item.duracao/60).toString().padStart(2, '0')}:{(item.duracao % 60).toString().padStart(2, '0')}</Text>
            </View>
        </Pressable>
    )
}