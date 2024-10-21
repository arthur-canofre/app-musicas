import React, {useState} from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'

const style = StyleSheet.create({

})

export default Cadastro = () => {
    const [credenciais, setCredenciais] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        dataNasc: ""
    })
    return(
        <View>
                <TextInput
                    placeholder="Nome"
                    onChange={setCredenciais(prevState => ({
                        ...prevState,
                        [nome] : value
                    }))}
                />
                <Text>{credenciais.nome}</Text>
                <TextInput
                    placeholder="Sobrenom"
                />
                <TextInput
                    placeholder="Email"
                />
                <TextInput
                    placeholder="Senha"
                /><TextInput
                placeholder="Data de Nascimento"
                />
                <Button
                    title="Enviar"
                />
        </View>
    )
}