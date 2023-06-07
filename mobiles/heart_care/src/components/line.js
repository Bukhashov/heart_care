import { View, Dimensions } from "react-native"

const width = Dimensions.get('window').width;

const LineComponent = () => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        }}>
            <View style={{
                width: width-60,
                height: 3,
                margin: 5,
                borderRadius: 2,
                backgroundColor: "#D4D9DA"
            }}/>
        </View>
       
    )
}

export default LineComponent;