import React, {useState} from 'react'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainScreen from '../screen/mainScreen';
import AccountScreen from '../screen/accountScreen';
import ExitScreen from '../screen/exitScreen';

const Drawer = createDrawerNavigator();

const HomeNavigation = ({navigation}) => {
    const [token, setToken] = useState("");

    const authControl = async () => {
        let t = await AsyncStorage.getItem("token");
        if(!t) navigation.navigate("singin")
        setToken(t); 
    }

    useFocusEffect(
        React.useCallback(() => {
            authControl();
        })
    )

    return (
        <Drawer.Navigator initialRouteName='main'>
            <Drawer.Screen name="main" component={MainScreen} />
            <Drawer.Screen name="account" component={AccountScreen} />
            <Drawer.Screen name="exit" component={ExitScreen} />
        </Drawer.Navigator>
    )
}

export default HomeNavigation;