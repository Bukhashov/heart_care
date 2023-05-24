import React, { useState } from "react";
import { View, Text, Dimensions} from "react-native"
import { Input, Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../../config/config';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const SingInScreen = ({navigation}) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const onChangePassword = (pass) => {
        setPassword(pass);
    }
    const onChangeEmail = (mail) => {
        setEmail(mail);
    }

    const auth = async () => {
        try{
            console.log(email);
            console.log(password);
            await axios.post(`${config.API_URI}${config.API_VERSION}/auth/singin`, {
                email: email,
                password: password
            }).then(async (response) => {
                console.log(response);
                AsyncStorage.setItem("token", response.data.token);
                AsyncStorage.setItem("uid", response.data.uid);
                AsyncStorage.setItem("lastname", response.data.lastname);
                AsyncStorage.setItem("firstname", response.data.firstname);
                AsyncStorage.setItem("email", email);

                navigation.navigate("home")
            })
        }
        catch(e){
            setEmail("");
            setPassword("");
            console.log(e)
            console.log("status err");
        }
    }

    return (
        <View style={{width: width, height: height, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <View style={{width: width-50, }}>
                <Input 
                    placeholder="Email"
                    value={email}
                    onChangeText={(mail) => onChangeEmail(mail)}
                />
            </View>
            <View style={{width: width-50, }}>
                <Input 
                    placeholder="Password" 
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(pass) => onChangePassword(pass)}
                />
            </View>

            <View>
                <Button onPress={() => { auth()}} title="Login" color="black" />
            </View>
            <View style={{ padding: 5, width: width-80, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text onPress={()=> navigation.navigate("singup") }>sing up</Text>
            </View>

        </View>
    )
}

export default SingInScreen