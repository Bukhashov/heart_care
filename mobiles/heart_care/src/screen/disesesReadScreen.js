import React, { useState } from "react";
import { View, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import ActivityIndicatorComponent from '../components/activityIndicator';
import ContentContainer from '../components/content';
import Line from '../components/line';
import config from '../../config/config';
import axios from 'axios';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const DisesesReadScreen = (props) => {
    const [containers, setContainers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
``
    const featData = async () => {
        try {
            await axios.get(`${config.API_URI}${config.API_VERSION}/diseses/${props.route.params.content.id}`).then(async(response) => {
                await setContainers(response.data);
                setIsLoading(false);
               
            })
        }
        catch(e) {
            console.log(e);
        }
    }

    useFocusEffect(
        React.useCallback(()=> {
            featData();
        }, [])
    );

    return (
        <View>
            {
                isLoading
                ? ( 
                    <ActivityIndicatorComponent /> 
                ) 
                :(
                    <SafeAreaView>
                        <ScrollView 
                            horizontal={false}
                            showsHorizontalScrollIndicator={true}
                        >
                            <View style={{padding: 8}}>
                                <Text style={{color: "#A5ABAB", paddingHorizontal: 8, paddingVertical: 5}}>Ауру</Text>
                                <Text style={{fontSize: 16, paddingHorizontal: 8, paddingVertical: 5}}>{containers.name}</Text>
                                <Line/>
                            </View>
                            <View style={{padding: 8}}>
                                <Text style={{color: "#A5ABAB", paddingHorizontal: 8, paddingVertical: 5}}>Аурудын туындауы</Text>
                                <Text style={{fontSize: 16, paddingHorizontal: 8, paddingVertical: 5}}>{containers.problems}</Text>
                                <Line/>
                            </View>
                            <View style={{padding: 8}}>
                                <Text style={{color: "#A5ABAB", paddingHorizontal: 8, paddingVertical: 5}}>Емдеу жолдары</Text>
                                <Text style={{fontSize: 16, paddingHorizontal: 8, paddingVertical: 5}}>{containers.waysOfTreatment}</Text>
                                <Line/>
                            </View>
                            <View style={{padding: 8}}>
                                <Text style={{color: "#A5ABAB", paddingHorizontal: 8, paddingVertical: 5}}>Жаттығу түрлері</Text>
                                <Text style={{fontSize: 16, paddingHorizontal: 8, paddingVertical: 5}}>{containers.TypesOfExercise}</Text>
                                <Line/>
                            </View>
                            
                        </ScrollView>
                    </SafeAreaView>
                )
            }
        </View>
    )
}

export default DisesesReadScreen;