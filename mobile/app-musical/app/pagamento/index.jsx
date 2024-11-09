import React,{ useState } from "react";
import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";

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
        paddingBottom: 20
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
        paddingHorizontal: 10,
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
    }
})

export default Pagamento = () =>{

    const [formData, setFormData] = useState({
        titular: "",
        cpf: "",
        numero: "",
        validade: "",
        cvv: ""
    })
    const [isValid, setIsValid] = useState(null)

    const onChangeText = (value, campo) =>{
        const newFormData = {...formData, [campo]: value}
        setFormData(newFormData)
    }

    const concluir = () =>{
        if(!formData.titular, !formData.cpf, !formData.numero, !formData.validade, !formData.cvv){
            return setIsValid(false)
        }else{
            setFormData({
                titular: "",
                cpf: "",
                numero: "",
                validade: "",
                cvv: ""
            })
            return setIsValid(true)
        }
    }

    return(
        <View style={style.fundo}>
            <View style={style.container}>
                <Text style={style.titulo}>Pagamento</Text>
                <View style={style.inpContainer}>
                    <TextInput
                            style={style.input}
                            placeholder="Titular"
                            value={formData.titular}
                            onChangeText={(value) => {onChangeText(value, "titular")}}
                    />
                    <TextInput
                            style={style.input}
                            placeholder="cpf"
                            value={formData.cpf}
                            onChangeText={(value) => {onChangeText(value, "cpf")}}
                    />
                    <TextInput
                            style={style.input}
                            placeholder="numero do cartao"
                            value={formData.numero}
                            onChangeText={(value) => {onChangeText(value, "numero")}}
                    />
                    <TextInput
                            style={style.input}
                            placeholder="validade (mm/aa)"
                            value={formData.validade}
                            onChangeText={(value) => {onChangeText(value, "validade")}}
                    />
                    <TextInput
                            style={style.input}
                            placeholder="CVV"
                            value={formData.cvv}
                            onChangeText={(value) => {onChangeText(value, "cvv")}}
                    />
                    { isValid === false? <Text style={style.errText}>Preencha todos os campos</Text>: null}
                </View>
                <Pressable 
                    onPress={concluir}
                    style={style.botao}
                >
                    <Text style={style.btText}>Concluir pagamento</Text>
                </Pressable>
            </View>
        </View>
    )
}