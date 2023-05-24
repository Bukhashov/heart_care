import {ActivityIndicator} from 'react-native';

const ActivityIndicatorComponent = () => {
    return (
        <ActivityIndicator
            size="large"
            color="red"
            style={{
                flex: 1, 
                justifyContent: 'center', 
                flexDirection: 'row', 
                justifyContent: 'space-around', 
                paddingTop: 25, 
            }}
        />
    )
}

export default ActivityIndicatorComponent;