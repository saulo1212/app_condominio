import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import C from  './style';
import api from '../../services/api';
import WarningItem from '../../components/WarningItem';
import Icon from 'react-native-vector-icons/FontAwesome';

export default () => {

    const navigation             = useNavigation();
    const[context,dispatch]      = useStateValue();
    const[list, setList] = useState([]);
    const[loading,setLoading]    = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Livro de ocorrencias',
            headerRight: () => (
                <C.AddButton onPress={() => navigation.navigate('WarningAddScreen')}>
                    <Icon name="plus" size={24} color="#000" />
                </C.AddButton>
            )
        });
        getWarnings();
    },[]);

    const getWarnings =  async () => {

        setList([]);
        setLoading(true);

            const result = await api.getWarnings();
            
        setLoading(false);

        if(result.error === ''){
            setList(result.list);
        }else{
            alert(JSON.stringify(result));
        }
    }

    return(
        <C.Container>
           
                {!loading && list.length === 0 &&
                    <C.NoListArea>
                        <C.NoListText>Não ha Ocorrencias</C.NoListText>  
                    </C.NoListArea>
                }

                <C.List
                    data={list}
                    onRefresh={getWarnings}
                    refreshing={loading}
                    renderItem={({item}) => <WarningItem data={item} />}
                    keyExtractor={(item)=> item.id.toString()}
                />
                
        </C.Container>
    )
}