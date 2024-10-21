import React,{useState} from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'

const style = StyleSheet.create({

})

export default Cadastro = () => {
    return(
        <View>
                <TextInput
                    placeholder="Email"
                />
                <TextInput
                    placeholder="Senha"
                />
                <Button
                    title="Confirmar"
                />
        </View>
    )
}