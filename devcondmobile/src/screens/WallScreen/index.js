import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import C from  './style';
import api from '../../services/api';
import Wallitem from '../../components/Wallitem';

export default () => {

    const navigation = useNavigation();
    const[context,dispatch] = useStateValue();
    const[wallList, setWallList] = useState([]);

    const[loading,setLoading] = useState(false);

    useEffect(() => {

        navigation.setOptions({
            headerTitle: 'Mural de avisos'
        });

        getWall();

    },[]);

    const getWall =  async () => {

        setLoading(true);
            const result = await api.getWall();
        setLoading(false);

        if(result.error === ''){
           setWallList(result.list);
        }else{
            alert(result.error);
        }
    }

    return(
        <C.Container>
           
                {loading &&
                    <C.LoadingIcon color="#8863e6" size="large" />
                }
                {!loading && wallList.length === 0 &&
                    <C.NoListArea>
                        <C.NoListText>Não ha avisos</C.NoListText>  
                    </C.NoListArea>
                }

                <C.List
                    data={wallList}
                    renderItem={({item}) => <Wallitem data={item} />}
                    keyExtractor={(item)=> item.id.toString()}
                />
                
        </C.Container>
    )
}