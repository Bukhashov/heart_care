import React, {useState} from 'react'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AccountScreen from '../screen/accountScreen';
import MapScreen from '../screen/mapScreen';
import ExitScreen from '../screen/exitScreen';
import DisesesNavigation from './disesesNavigation';
import ContactsScreen from '../screen/contactsScreen';

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
        <Drawer.Navigator initialRouteName='Басты бет'>
            <Drawer.Screen name="Басты бет" component={DisesesNavigation} />
            <Drawer.Screen name="Профиль" component={AccountScreen} />
            <Drawer.Screen name="Байланыс" component={ContactsScreen} />
            <Drawer.Screen name="Карта" component={MapScreen} />
            <Drawer.Screen name="exit" component={ExitScreen} />
        </Drawer.Navigator>
    )
}

export default HomeNavigation;