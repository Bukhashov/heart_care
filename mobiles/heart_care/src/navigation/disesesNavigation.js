import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screen/mainScreen';
import DisesesReadScreen from '../screen/disesesReadScreen';

const Stack = createNativeStackNavigator();

const DisesesNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="diseses">
            <Stack.Screen name="diseses" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="disesesRead" component={DisesesReadScreen} options={{ headerShown: false }} />
        </Stack.Navigator> 
    )
}

export default DisesesNavigation;