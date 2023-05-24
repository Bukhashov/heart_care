import React, { useState } from "react";
import { View, Text, Dimensions} from "react-native"
import { Input, Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from "../../config/config";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const SingUpScreen = ({navigation}) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");

    const onChangeLastname = (val) => {
        setLastname(val);
    }
    const onChangeFirstname = (val) => {
        setFirstname(val);
    }
    const onChangeEmail = (val) => {
        setEmail(val);
    }
    const onChangePassword = (val) => {
        setPassword(val);
    }

    const auth = async () => {
        try{
            await axios.post(`${config.API_URI}${config.API_VERSION}/auth/singup`, {
                lastname: lastname,
                firstname: firstname,
                email: email,
                password: password
            }).then(async (response) => {
                console.log(response);
                if(response.status == 201){
                    navigation.navigate("singin")
                }
            })
        }catch(e){
            console.log(e);
            setEmail("");
            setFirstname("");
            setLastname("");
            setPassword("");
        }
    }

    return (
        <View style={{ width: width, height: height, display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
            <View style={{width: width-50, }}>
                <Input 
                    placeholder="Lastname"
                    value={lastname}
                    onChangeText={(vel) => onChangeLastname(vel)}
                />
            </View>
            <View style={{width: width-50, }}>
                <Input 
                    placeholder="Firstname"
                    value={firstname}
                    onChangeText={(val) => onChangeFirstname(val)}
                />
            </View>

            
            <View style={{width: width-50, }}>
                <Input 
                    placeholder="Email"
                    value={email}
                    onChangeText={(val) => onChangeEmail(val)}
                />
            </View>
            <View style={{width: width-50, }}>
                <Input 
                    placeholder="Password" 
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(val) => onChangePassword(val)}
                />
            </View>
            <View>
                <Button onPress={() => { auth()}} title="Sing up" color="black" />
            </View>
            <View style={{ padding: 5, width: width-80, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text onPress={()=> navigation.navigate("singin") }>back to sing in</Text>
            </View>
        </View>
    )
}

export default SingUpScreen;