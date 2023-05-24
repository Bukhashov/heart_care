import React, { useState } from "react";
import { View, Text, Dimensions, SafeAreaView, ScrollView, FlatList} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import ActivityIndicatorComponent from '../components/activityIndicator';
import config from '../../config/config';

import { SearchBar } from '@rneui/themed';
import axios from 'axios';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const MainScreen = () => {
    const [containers, setContainers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [search, setSearch] = useState('');

    const featData = async () => {
        try {
            await axios.get(`${config.API_URI}${config.API_VERSION}/medicines`).then((response) => {
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

    const ItemView = ({ item }) => {
        return (
            <Text style={{ padding: 10 }} onPress={() => getItem(item)}>
                {item._id}
                {'.'}
                {item.name.toUpperCase()}
            </Text>
        );
    };

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

            <FlatList
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
            />
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
                                        <ContainerConponent 
                                            key={container._id}
                                            navigation={navigation}
                                            id={container._id}
                                            image={container.image}
                                            title={container.name}
                                            pharmachologicEffect={container.pharmachologicEffect}
                                        />
                                    ))
                                }
                            </View>
                            <View style={{ height: 130 }} />
                        </ScrollView>
                    </SafeAreaView>
                )
            }


        </View>
        
        // <SafeAreaView>
        //     <ScrollView horizontal={false} showsHorizontalScrollIndicator={true}>
        //         <View style={{width: width, display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
        //             <View style={{margin: 10, width: width-40, height: 180, borderRadius: 10, backgroundColor: "#E8EBEC"}}>
                        
        //                 <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
        //                     <View style={{margin: 8}}><Text>Status</Text></View>
        //                     <View style={{margin: 8, width: 45, height: 8, borderRadius: 8, backgroundColor: '#EE0E29'}}></View>
        //                 </View>
        //             </View>
        //         </View>
                
        //         <View style={{width: width, display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
        //             <View style={{margin: 10, width: width-40, height: 180, borderRadius: 10, backgroundColor: "#E8EBEC"}}>
        //                 <Text>{NowDate}</Text>
        //             </View>
        //         </View>
                

        //     </ScrollView>
        // </SafeAreaView>
    )
}

export default MainScreen;
