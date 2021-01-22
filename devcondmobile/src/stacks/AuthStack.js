import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Preload from '../screens/PreloadScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();


export default () => {
    return(
       <Stack.Navigator>
           <Stack.Screen 
                name="PreloadScreen"
                component={Preload}
                options={{headerShown:false}}
           />

            <Stack.Screen 
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown:false}}
           />
       </Stack.Navigator> 
    );
};