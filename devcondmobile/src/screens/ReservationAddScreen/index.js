import React, { useState,useEffect } from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import CalendarPicker from 'react-native-calendar-picker';
import C from  './style';
import api from '../../services/api';

export default () => {

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    let days  = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    let months = ['Janeiro','Fevereiro', 'Março', 'Abril','Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'] 

    const navigation             = useNavigation();
    const route                  = useRoute();
    const[context,dispatch]      = useStateValue();
   
    const[loading,setLoading]    = useState(false);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus',() => {

            navigation.setOptions({
                headerTitle: `Reservar ${route.params.data.title}`
            });
        });
        
        return unsubscribe;
        
    },[navigation, route]);

    const handleDateChange = () => {

    }

    return(
        <C.Container>
            <C.Scroller contentContainerStyle={{paddingBottom:40}}>
                <C.CoverImage source={{uri: route.params.data.cover}} resizeMode="cover" />
                {loading &&
                    <C.LoadingIcon size="large" color="#8863e6" />
                }

                {!loading &&
                    <C.CalendarArea>
                        <CalendarPicker 
                            onDateChange={handleDateChange}
                            minDate={minDate}
                            maxDate={maxDate}
                            weekdays={days}
                            months={months}
                            previousTitle="Anterior"
                            nextTitle="Proximo"
                            selectedDayColor="#8863e6"
                            selectedDayTextColor="#fff"
                            todayBackgroundColor="transparent"
                            todayTextStyle="#000"
                        />
                    </C.CalendarArea>
                }
            </C.Scroller>  
        </C.Container>
    )
}