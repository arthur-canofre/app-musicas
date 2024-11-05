import React, {useEffect, useState} from "react";
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'

const style = StyleSheet.create({

})

export default Admin = () =>{
    const [listaUsers, setListaUsers] = useState([])

    const deletar = async(id) => {
        try{
            const response = await fetch('http://localhost:8000/admin/deletar', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'email': id})
                })
        }catch(error){
            console.log(error)
        }
        const item = listaUsers.find(o => o.email === id)
        const index = listaUsers.indexOf(item)
        const lista = [...listaUsers]
        lista.splice(index, 1)
        setListaUsers(lista)
    }

    useEffect(() => {
        const getUsers = async() =>{
            try{
                const response = await fetch('http://localhost:8000/admin/pegar', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: null
                }
            )
            const data =  await response.json()
            setListaUsers(data)
            }catch(error){
                console.error(error)
            }
        }
        getUsers()
    }, [])
    return(
        <View>
            
            <FlatList
            data={listaUsers}
            keyExtractor={(item) => item.email}
            renderItem = {({item}) => <View>
                                            <Text>{item.nome}</Text>
                                            <Button title="deletar" onPress={() => deletar(item.email)}/>
                                      </View>
            }
            ListEmptyComponent={<Text>Nenhum usuario registrado.</Text>}
            />
        </View>
    )
}