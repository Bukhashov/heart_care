import { View, Text, Dimensions } from "react-native";
import { Input, Button } from '@rneui/themed';
import { useState } from "react";
import config from "../../config/config";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const SinginScreen = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    const onChangePassword = (pass) => {
        setPassword(pass);
    }
    const onChangeEmail = (mail) => {
        setEmail(mail);
    }
    const auth = () => {
        try{
            console.log(email);
            console.log(password);
        }
        catch(e){
            setEmail("");
            setPassword("");
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

        </View>
    )
}

export default SinginScreen;