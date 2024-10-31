import React, {useEffect, useState} from "react";
import { View, Text, Flatlist, Button, StyleSheet } from 'react-native'

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
            setListaUsers(data)
            console.log(data)
            }catch(error){
                console.error(error)
            }
        }
        getUsers()
    }, [])
    return(
        console.log(listaUsers[0])
        // <View>
        //     {/* <Flatlist
        //     data={listaUsers}
        //     renderItem = {({item}) => <View>
        //         <Text>{item.nome}</Text>
        //     </View>}
        //     /> */}
        // </View>
    )
}