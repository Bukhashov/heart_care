import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeHavigation from './homeNavigation';
import SingInScreen from '../screen/singInScreen';
import SingUpScreen from '../screen/singUpScreen';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={HomeHavigation} options={{ headerShown: false }} />
            <Stack.Screen name="singin" component={SingInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="singup" component={SingUpScreen} options={{ headerShown: false }} />
        </Stack.Navigator> 
    )
}

export default MainNavigation;