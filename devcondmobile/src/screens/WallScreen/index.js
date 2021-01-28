import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import C from  './style';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {

    const navigation = useNavigation();
    const[context,dispatch] = useStateValue();

    const[loading,setLoading] = useState(true);

    return(
        <C.Container>
            <C.Scroller>
                {loading &&
                    <C.LoadingIcon color="#8863e6" size="large" />
                }
                
            </C.Scroller>
        </C.Container>
    )
}