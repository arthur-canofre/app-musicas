import React, {useEffect, useState} from "react";
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'

const style = StyleSheet.create({

})

export default Admin = () =>{
    const [listaUsers, setListaUsers] = useState([])
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
           // const data2 = await JSON.parse(data)
            setListaUsers(data)
            console.log(data)
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
                                      </View>
            }
            ListEmptyComponent={<Text>Nenhum usuario registrado.</Text>}
            />
        </View>
    )
}