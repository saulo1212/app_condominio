import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import C from  './style';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import  {launchCamera} from 'react-native-image-picker';

export default () => {

    const navigation             = useNavigation();
    const[context,dispatch]      = useStateValue();

    const[warnText,setWarnText] = useState('');
    const[photoList,setPhotoList] = useState([]);
    

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Adicionar uma nova ocorrencia',
         });
    },[]);

    const handleAddPhoto = async () => {

        launchCamera({
            mediaType:'photo',
            maxWidth: 1280
        }, async (response) =>{

            if(!response.didCancel){
                
                let result = await api.addWarningFile(response);
                
                if(result.error === ''){
                    let list = [...photoList];
                    list.push(result.photoList);
                    setPhotoList(list);
                }else{
                    alert(result.error)
                }
            }
        });
    }


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
                        <C.PhotoAddButton onPress={handleAddPhoto}>
                            <Icon name="camera"  size={24} color="#000"/>
                        </C.PhotoAddButton>
                        {photoList.map((item,index) => (
                            <C.PhotoItem key={index} >
                                <C.Photo source={{uri:item}} />
                                <C.PhotoRemoveButton  onPress={null}>
                                    <Icon name="remove" size={16} color="#ff0000" />
                                </C.PhotoRemoveButton>
                            </C.PhotoItem>
                        ))}
                    </C.PhotoScroll>
                </C.PhotoArea>

                <C.ButtonArea onPress={null}>
                    <C.ButtonText>Salvar</C.ButtonText>
                </C.ButtonArea>
            </C.Scroller> 
        </C.Container>
    )
}