import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import C from  './style';
import api from '../../services/api';
import DocItem from '../../components/DocItem';

export default () => {

    const navigation             = useNavigation();
    const[context,dispatch]      = useStateValue();
    const[docList, setDoclList] = useState([]);
    const[loading,setLoading]    = useState(false);

    useEffect(() => {
        navigation.setOptions({headerTitle: 'Boletos'});
        getBillets();
    },[]);

    const getBillets =  async () => {

        setDoclList([]);
        setLoading(true);

            const result = await api.getBillets();
            
        setLoading(false);

        if(result.error === ''){
            setDoclList(result.list);
        }else{
            alert(result.error);
        }
    }

    return(
        <C.Container>
           
                {!loading && docList.length === 0 &&
                    <C.NoListArea>
                        <C.NoListText>Não ha Boletos</C.NoListText>  
                    </C.NoListArea>
                }

                <C.List
                    data={docList}
                    onRefresh={getBillets}
                    refreshing={loading}
                    renderItem={({item}) => <DocItem data={item} />}
                    keyExtractor={(item)=> item.id.toString()}
                />
                
        </C.Container>
    )
}