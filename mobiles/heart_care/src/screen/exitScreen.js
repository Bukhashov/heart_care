import React from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExitScreen = () => {
    useFocusEffect(
        React.useCallback(()=>{
            setTimeout(() => {
                BackHandler.exitApp();
            }, 10);
        }, [])
    );
}

export default ExitScreen;