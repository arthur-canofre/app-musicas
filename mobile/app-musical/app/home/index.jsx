import React, {useContext} from "react";
import {View, Text} from 'react-native'
import { AppContext } from "../../scripts/appContext";

export default Home = () => {
    const {user, setUser} = useContext(AppContext)
    return(
        <Text>{user}</Text>
    )
}