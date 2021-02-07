import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import C from  './style';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

export default () => {

    const navigation             = useNavigation();
    const[context,dispatch]      = useStateValue();

    const[warnText,setWarnText] = useState('');
    

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Adicionar uma nova ocorrencia',
         });
    },[]);


    return(
        <C.Container>
            <C.Scroller>
                <C.Title>Descreva a ocorrencia</C.Title>

                <C.Field 
                    placeholder="Ex: vizinho esta com o som alto" 
                    value={warnText}
                    onChangeText={t=>setWarnText(t)}
                />

                <C.Title>Fotos relacionadas</C.Title>

                <C.PhotoArea>
                    <C.PhotoScroll horizontal={true} >
                        <C.PhotoAddButton onPress={null}>
                            <Icon name="camera"  size={24} color="#000"/>
                        </C.PhotoAddButton>
                    </C.PhotoScroll>
                </C.PhotoArea>

                <C.ButtonArea onPress={null}>
                    <C.ButtonText>Salvar</C.ButtonText>
                </C.ButtonArea>
            </C.Scroller> 
        </C.Container>
    )
}