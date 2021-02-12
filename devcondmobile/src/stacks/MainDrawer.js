import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import WallScreen from '../screens/WallScreen';
import DocumentScreen from '../screens/DocumentScreen';
import BilletScreen from '../screens/BilletScreen';
import WarningScreen from '../screens/WarningScreen';
import WarningAddScreen from '../screens/WarningAddScreen';
import ReservationScreen from '../screens/ReservationScreen';
import ReservationAddScreen from '../screens/ReservationAddScreen';
import ReservationMyScreen from '../screens/ReservationMyScreen';
import FoundLostScreen from '../screens/FoundLostScreen';
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
            <Drawer.Screen name="BilletScreen" component={BilletScreen}/>
            <Drawer.Screen name="WarningScreen" component={WarningScreen}/>
            <Drawer.Screen name="WarningAddScreen" component={WarningAddScreen}/>
            <Drawer.Screen name="ReservationScreen" component={ReservationScreen}/>
            <Drawer.Screen name="ReservationAddScreen" component={ReservationAddScreen}/>
            <Drawer.Screen name="ReservationMyScreen" component={ReservationMyScreen}/>
            <Drawer.Screen name="FoundLostScreen" component={FoundLostScreen}/>
           
        </Drawer.Navigator>
    )
}