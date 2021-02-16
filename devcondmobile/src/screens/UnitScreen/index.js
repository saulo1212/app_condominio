import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import C from  './style';
import api from '../../services/api';

export default () => {

    const navigation             = useNavigation();
    const[context,dispatch]      = useStateValue();
  
    const[loading,setLoading]    = useState(false);
    const[peopleList, setPeopleList] = useState([]);
    const[vehicleList, setVeicleList] = useState([]);
    const[petList, setPetList] = useState([]);

    useEffect(() => {
        navigation.setOptions({headerTitle: `Dados da unidade (${context.user.property.name})`});
        getUnitInfo();
    },[]);

    const getUnitInfo =  async () => {

        
        setLoading(true);

            const result = await api.getUnitInfo();
            
        setLoading(false);

        if(result.error === ''){
            setPeopleList(result.peoples);
            setVeicleList(result.vehicles);
            setPetList(result.pets);
        }else{
            alert(result.error);
        }
    }

    return(
        <C.Container>
            <C.Scroller>

                {loading &&
                    <C.LoadingIcon color="8b63e7" size="large" />
                }

                {!loading &&
                    <>

                    </>
                }

            </C.Scroller>
        </C.Container>
    )
}