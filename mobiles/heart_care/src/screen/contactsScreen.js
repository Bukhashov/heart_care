import { View, Text, SafeAreaView, ScrollView, Linking} from 'react-native';
import Polyclinics from '../constes/polyclinics';

const ContactsScreen = ({navigation}) => {
    return (
        <View>
            <SafeAreaView>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={true} style={{ paddingHorizontal: 15}}>
                {
                    Polyclinics.map((polyclinic) => (
                        <View key={polyclinic.id}
                            style={{
                               paddingVertical: 10,
                               paddingVertical: 25,
                               backgroundColor: "#fff",
                               marginVertical: 15,
                               borderRadius: 12,
                            }}
                            
                        >
                            {/* title */}
                            <Text style={{ backgroundColor: "#E5E7E9", borderRadius: 5, paddingHorizontal: 12, paddingVertical: 12, fontSize: 18 }}>{polyclinic.title}</Text>
                            
                            <View style={{ paddingVertical: 10, paddingHorizontal: 12, display: 'flex', flexDirection: 'row', }}>
                                <Text>Адрес: </Text>
                                <Text>{polyclinic.addres}</Text> 
                            </View>
                            <View style={{ paddingHorizontal: 12, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',  }}>
                                 <Text style={{  backgroundColor: "#E5E7E9", borderRadius: 8, paddingHorizontal: 5, paddingVertical: 8, }}>{polyclinic.phone}</Text>
                                 <Text 
                                    onPress={() => Linking.openURL(`https://wa.me/${polyclinic.phone}`)}
                                 style={{ backgroundColor: "#E5E7E9", borderRadius: 8, paddingHorizontal: 5, paddingVertical: 8, }}>Веб байланыс</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 12 }}>
                                <Text onPress={() => { 
                                    navigation.navigate('Карта', {
                                        content: {
                                            latitude: polyclinic.latitude,
                                            longitude: polyclinic.longitude,
                                            title: polyclinic.title,
                                        }
                                    })
                                }} 
                                style={{ backgroundColor: "#E5E7E9", borderRadius: 8, paddingHorizontal: 5, paddingVertical: 8, }}>Картада ашу</Text>
                                <Text onPress={() => Linking.openURL(`https://wa.me/${polyclinic.traner}`)}
                                style={{ backgroundColor: "#E5E7E9", borderRadius: 8, paddingHorizontal: 5, paddingVertical: 8, }}>Тренерге хабарласу</Text>
                            </View>
                        </View>
                    ))
                }
                </ScrollView>
            </SafeAreaView>        
        </View>
    )
}

export default ContactsScreen;