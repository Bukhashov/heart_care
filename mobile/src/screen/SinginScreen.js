import { View, Text, Dimensions } from "react-native";
import { Input, Button } from '@rneui/themed';
import { useState } from "react";
import config from "../../config/config";
import axios from 'axios';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const SinginScreen = ({navigation}) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    const onChangePassword = (pass) => {
        setPassword(pass);
    }
    const onChangeEmail = (mail) => {
        setEmail(mail);
    }
    const auth = async () => {
        console.log("auth");
        try{
            await axios.post(`${config.API_URI}${config.API_VERSION}/auth/singin`, {
                email: email,
                password: password
            }).then((data) => {
                console.log(data)
            })
        }
        catch(e){
            setEmail("");
            setPassword("");
            console.log(e)
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

export default SinginScreen;