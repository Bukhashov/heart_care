import React, { useState } from "react";
import { View, Text, Dimensions, SafeAreaView, ScrollView, FlatList, TouchableOpacity} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import ActivityIndicatorComponent from '../components/activityIndicator';
import config from '../../config/config';

import { SearchBar } from '@rneui/themed';
import axios from 'axios';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const MainScreen = ({navigation}) => {
    const [containers, setContainers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [search, setSearch] = useState('');

    const featData = async () => {
        try {
            await axios.get(`${config.API_URI}${config.API_VERSION}/diseses/all`).then((response) => {
                setContainers(response.data);
                setFilteredDataSource(response.data);
                setIsLoading(false);
            })
        }
        catch(e) {
            console.log(e);
        }
    }

    const searchFilter = (text) => {
        if(text){            
            const newData = containers.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1
            })
            setFilteredDataSource(newData);
            setSearch(text);
        }else{
            setFilteredDataSource(containers);
            setSearch(text)
        }
    }
    const getItem = (item) => {
        console.log('Id : ' + item._id + ' Title : ' + item.name);
    };

    // const ItemView = ({ item }) => {
    //     return (
    //         <Text style={{ padding: 10 }} onPress={() => getItem(item)}>
    //             {item._id}
    //             {'.'}
    //             {item.name.toUpperCase()}
    //         </Text>
    //     );
    // };

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                backgroundColor: '#C8C8C8',
                }}
            />
        );
    }


    useFocusEffect(
        React.useCallback(()=> {
            featData();
            // let t = Date.now();
            // setNowDate(t.toString);
        }, [])
    );

    return (
        <View>
            <SearchBar
                round
                searchIcon={{size: 24}}
                onChangeText={(text) => searchFilter(text)}
                onClear={(text) => searchFilter('')}
                value={search}
                inputStyle={{backgroundColor: '#fff', borderRadius: 3, }}
                inputContainerStyle={{backgroundColor: '#D4D9DA', borderRadius: 8, }}
                containerStyle={{backgroundColor: "#fff", borderBottomColor: "#fff", borderTopColor: "#fff"}}
                placeholderTextColor={'#D4D9DA'}
                placeholder={'Search'}
            />

            {/* <FlatList
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
            /> */}
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
                            <View style={{ padding: 8 }}>
                                {
                                    filteredDataSource.map((container)=> (
                                        <TouchableOpacity
                                            key={container._id}
                                            onPress={() => {
                                                navigation.navigate('disesesRead', {
                                                    content: {
                                                        id: container._id
                                                    }
                                                })
                                            }}
                                        >
                                            <View style={{
                                                width: width-50,
                                                paddingHorizontal: 15,
                                                paddingVertical: 25,
                                            }}>
                                                <Text style={{paddingVertical: 5, fontSize: 18}}>{container.name}</Text>
                                                <Text numberOfLines={5}>{container.problems}</Text>
                                            </View>
                                        </TouchableOpacity>  
                                    ))
                                }
                            </View>
                            <View style={{ height: 130 }} />
                        </ScrollView>
                    </SafeAreaView>
                )
            }


        </View>
    )
}

export default MainScreen;
