import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import C from  './style';
import api from '../../services/api';
import RerservationItem from '../../components/RerservationItem';

export default () => {

    const navigation             = useNavigation();
    const[context,dispatch]      = useStateValue();
    const[list, setList] = useState([]);
    const[loading,setLoading]    = useState(false);

    useEffect(() => {
        navigation.setOptions({headerTitle: 'Reservas disponiveis'});
        getReservations();
    },[]);

    const getReservations =  async () => {

        setList([]);
        setLoading(true);

            const result = await api.getReservations();
            
        setLoading(false);

        if(result.error === ''){
            setList(result.list);
        }else{
            alert(result.error);
        }
    }

    return(
        <C.Container>
            <C.Scroller contentContainerStyle={{paddingBottom:40}}>
                <C.ButtonArea onPress={() => navigation.navigate('ReservationMyScreen')}>
                    <C.ButtonText>Minhas Reservas</C.ButtonText>
                </C.ButtonArea>
                <C.Title>Selecione uma area</C.Title>

                {loading &&
                    <C.LoadingIcon size="large" color="#8863e6" />
                }

                {!loading && list.length === 0 &&
                    <C.NoListArea>
                        <C.NoListText>Não ha areas disponiveis</C.NoListText>
                    </C.NoListArea>
                }

                {list.map((item,index) => <RerservationItem key={index} data={item} />)}

            </C.Scroller>  
        </C.Container>
    )
}