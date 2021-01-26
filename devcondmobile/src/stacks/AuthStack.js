import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Preload from '../screens/PreloadScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ChoosePropertScreen from '../screens/ChoosePropertScreen';

const Stack = createStackNavigator();


   let headerStyle = {
        backgroundColor:'#f5f5fa',
        elevation:0,
        shadowOffset:0
    }
    
    


export default () => {
    return(
       <Stack.Navigator screenOptions={{headerStyle}}>
           <Stack.Screen name="PreloadScreen" component={Preload} options={{headerShown:false}}/>
           <Stack.Screen  name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
           <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:true}}/>
           <Stack.Screen  name="ChoosePropertScreen" component={ChoosePropertScreen} options={{headerShown:false}}/>
       </Stack.Navigator> 
    );
};