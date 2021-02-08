import React, { useState,useEffect,useRef } from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import CalendarPicker from 'react-native-calendar-picker';
import C from  './style';
import api from '../../services/api';

export default () => {

    const scroll = useRef();
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    let days  = ['Dom','Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    let months = ['Janeiro','Fevereiro', 'Março', 'Abril','Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'] 

    const navigation             = useNavigation();
    const route                  = useRoute();
    const[context,dispatch]      = useStateValue();
   
    const[loading,setLoading]    = useState(true);
    const[disableDates, setDisableDates] = useState([]);
    const[selectedDate,setSelectedDate] = useState(null);
    const[timeList,setTimeList] = useState([]);
    const[selectedTime,setSelectedTime] = useState(null);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus',() => {

            navigation.setOptions({
                headerTitle: `Reservar ${route.params.data.title}`
            });

            getDisabledDates();
        });
        
        return unsubscribe;
        
    },[navigation, route]);

    useEffect(()=> {
        getTimes();
    },[selectedDate])

    const getDisabledDates = async () => {
        setDisableDates([]);
        setTimeList([]);
        setSelectedDate(null);
        setSelectedTime(null);
        setLoading(true);

        const result = await api.getDisabledDates(route.params.data.id);
        setLoading(false);

        if(result.error === ''){

            let dateList = [];

            for(let i in result.list){
                dateList.push(new Date(result.list[i]));
            }

            setDisableDates(dateList);

        }else{
            alert(result.error)
        }


    }

    const handleDateChange = (date) => {

        let dateEl = new Date(date);

        let year = dateEl.getFullYear();
        let month = dateEl.getMonth() + 1;
        let day = dateEl.getDate();

        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day: day;
        
        setSelectedDate(`${year}-${month}-${day}`);

    }

    const showTextDate = ( date) => {
        let dateEl = new Date(date);

        let year = dateEl.getFullYear();
        let month = dateEl.getMonth() + 1;
        let day = dateEl.getDate();

        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day: day;

        return `${day}/${month}/${year}`;
    }

    const getTimes = async () => {
        if(selectedDate){
            const result = await api.getReservationTimes(
                route.params.data.id,
                selectedDate
            );

            if(result.error === ''){
                setSelectedTime(null);
                setTimeList(result.list);

                setTimeout(() => {
                    scroll.current.scrollToEnd();
                },500);
                
            }else{
                alert(JSON.stringify(result))
            }
        }
    }

    return(
        <C.Container>
            <C.Scroller ref={scroll} contentContainerStyle={{paddingBottom:40}}>
                <C.CoverImage source={{uri: route.params.data.cover}} resizeMode="cover" />
                {loading &&
                    <C.LoadingIcon size="large" color="#8863e6" />
                }

                {!loading &&
                    <C.CalendarArea>
                        <CalendarPicker 
                            onDateChange={handleDateChange}
                            disabledDates={disableDates}
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
                {!loading && selectedDate && 
                    <>
                        <C.Title>Horarios disponiveis em {showTextDate(selectedDate)}</C.Title>

                        <C.TimeListArea>
                            {timeList.map((item,index) => (
                                <C.TimeItem 
                                    key={index} 
                                    onPress={()=>setSelectedTime(item.id)}
                                    active={selectedTime === item.id}
                                >
                                    <C.TimeItemText  active={selectedTime === item.id}>{item.title}</C.TimeItemText>
                                </C.TimeItem>
                            ))}
                        </C.TimeListArea>
                    </>
                }
            </C.Scroller>  
        </C.Container>
    )
}