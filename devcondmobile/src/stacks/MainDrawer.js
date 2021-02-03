import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import WallScreen from '../screens/WallScreen';
import DocumentScreen from '../screens/DocumentScreen';
import DrawerCustom from '../components/DrawerCustom';


const Drawer = createDrawerNavigator();

export default () => {

    let config = {
        headerShown:true,
        headerTitle:'',
            headerStyle:{
                backgroundColor:'#f5f6fa',
                shadowOpacity:0,
                elevation:0
            }
    }


    return(
        <Drawer.Navigator 
            drawerContent={(props) => <DrawerCustom {...props}/>} 
            screenOptions={config}
        >
            <Drawer.Screen name="WallScreen" component={WallScreen}/>
            <Drawer.Screen name="DocumentScreen" component={DocumentScreen}/>
        </Drawer.Navigator>
    )
}