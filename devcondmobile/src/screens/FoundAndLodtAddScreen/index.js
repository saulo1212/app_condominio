import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import C from  './style';
import {launchCamera} from 'react-native-image-picker';



export default () => {

    const navigation             = useNavigation();
    const[context,dispatch]      = useStateValue();
    const[photo,setPhoto] = useState({});
    const[description,setDescription] = useState('');
    const[where,setWhere] = useState('');


    useEffect(() => {
        navigation.setOptions(
            {headerTitle: 'Adicioanar um perdido'
        });
        
    },[]);

    const handleAddPhoto = () => {
        launchCamera({
            mediaType:'photo',
            maxWidth:1280
        },(response) => {
            if(!response.didCancel){
                setPhoto(response);
            }

        });
    }

    return(
        <C.Container>
            <C.Scroller>
                <C.PhotoArea>
                    {!photo.uri &&
                        <C.ButtonArea onPress={handleAddPhoto}>
                            <C.ButtonText>Tirar um foto</C.ButtonText>
                        </C.ButtonArea>
                    }
                    {photo.uri &&
                    <>
                        <C.PhotoItem source={{uri:photo.uri}} resizeMode="cover" />
                        <C.ButtonArea onPress={handleAddPhoto}>
                            <C.ButtonText>Tirar outra  foto</C.ButtonText>
                        </C.ButtonArea>
                    </>    
                    }
                </C.PhotoArea>
                <C.Title>Descreva o produto</C.Title>
                <C.Field 
                    placeholder="Descrição"
                    value={description}
                    onChangeText={t=>setDescription(t)}
                />

                <C.Title>onde foi encontrado</C.Title>
                <C.Field 
                    placeholder="Descrição"
                    value={where}
                    onChangeText={t=>setWhere(t)}
                />

                <C.ButtonArea onPress={null}>
                    <C.ButtonText>Salvar</C.ButtonText>
                </C.ButtonArea>
            </C.Scroller >  
        </C.Container>
    )
}