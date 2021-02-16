import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import C from  './style';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import UnitPeopleSection from '../../components/UnitPeopleSection';

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
                        <C.TitleArea>
                            <C.Title>Moradores</C.Title>
                            <C.TitleAddButton onPress={null}>
                                <Icon name="plus" size={24} color="#000" />
                            </C.TitleAddButton>
                        </C.TitleArea>
                        <C.ListArea>
                            <UnitPeopleSection  list={peopleList}/>
                        </C.ListArea>



                        <C.TitleArea>
                            <C.Title>Veiculos</C.Title>
                            <C.TitleAddButton onPress={null}>
                                <Icon name="plus" size={24} color="#000" />
                            </C.TitleAddButton>
                        </C.TitleArea>
                        <C.ListArea>
                            
                        </C.ListArea>



                        <C.TitleArea>
                            <C.Title>Petis</C.Title>
                            <C.TitleAddButton onPress={null}>
                                <Icon name="plus" size={24} color="#000" />
                            </C.TitleAddButton>
                        </C.TitleArea>
                        <C.ListArea>
                            
                        </C.ListArea>
                    </>
                }

            </C.Scroller>
        </C.Container>
    )
}