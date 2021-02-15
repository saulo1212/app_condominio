import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import C from  './style';
import api from '../../services/api';
import LostItem from '../../components/LostItem';

export default () => {

    const navigation             = useNavigation();
    const[context,dispatch]      = useStateValue();
    const[lostList, setLostlList] = useState([]);
    const[recovereList, setRecoveredlList] = useState([]);
    const[loading,setLoading]    = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Achados e perdidos',
            headerRight: () => (
                <C.AddButton onPress={handleAdditem}>
                    <Icon name="plus" size={24} color="#000" />
                </C.AddButton>
            )
        });
        getFoundAndLost();
    },[]);

    const getFoundAndLost =  async () => {

        setLostlList([]);
        setRecoveredlList([]);
        setLoading(true);

            const result = await api.getFoundAndLost();
            
        setLoading(false);

        if(result.error === ''){
            setLostlList(result.lost);
            setRecoveredlList(result.recovered)
        }else{
            alert(result.error);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getFoundAndLost();
        });

        return unsubscribe;
    },[navigation])

    const handleAdditem = () => {
        navigation.navigate('FoundAndLodtAddScreen');
    }

    return(
        <C.Container>
            <C.Scroller>

            {loading &&
               <C.LoadingIcon color="e8e9ed" size="large"/> 
            }
           
                {!loading && lostList.length === 0 &&  recovereList.length === 0 &&
                    <C.NoListArea>
                        <C.NoListText>Não ha items</C.NoListText>  
                    </C.NoListArea>
                }

                {!loading && lostList.length > 0 && 
                    <>
                        <C.Title>Itens Perdidos</C.Title>
                        <C.ProductScroller horizonta={true} showsHorizontalScrollIndicator={false}>
                            {lostList.map((item,index) => (
                                <LostItem key={index} data={item} showButton={true} refreshFunction={getFoundAndLost} />
                            ))}
                        </C.ProductScroller>
                    </>
                }

                {!loading && recovereList.length > 0 && 
                    <>
                        <C.Title>Itens Recuperados</C.Title>
                        <C.ProductScroller horizonta={true} showsHorizontalScrollIndicator={false}>
                            {recovereList.map((item,index) => (
                                    <LostItem key={index} data={item} showButton={false} />
                             ))}
                        </C.ProductScroller>
                    </>
                }
            </C.Scroller>  
        </C.Container>
    )
}