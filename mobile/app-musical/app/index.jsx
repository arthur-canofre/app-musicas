import React, {useContext} from "react";
import {View, Text} from 'react-native'
import { AppContext } from "../scripts/appContext";
import { Redirect } from "expo-router";

export default Home = () => {
    const {user, setUser} = useContext(AppContext)
    return(
        <View>
            {!user && <Redirect href="/login"/>}
            <Text>{user}</Text>
        </View>
    )
}