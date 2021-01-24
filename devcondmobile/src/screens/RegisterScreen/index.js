import React,{useState,useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import C from './style';
import { useStateValue } from '../../context/StateContext';
import api from '../../services/api';

export default () => {

    const navigation = useNavigation();
    const[context, dispatch] = useStateValue();

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[cpf,setCpf] = useState('');
    const[password,setPassword] = useState('');
    const[passwordConfir,setPasswordConfir] = useState('');

    useEffect(() => {
        navigation.setOptions({headerTitle:"Cadastro"})
    },[]);

    return(
        <C.Container>

            <C.Field 
                placeholder="Digite seu Nome"
                value={name}
                onChangeText={t=>setName(t)}
            />
    
            <C.Field 
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={t=>setCpf(t)}
            />
            <C.Field 
                placeholder="Digite seu E-mail"
                value={email}
                onChangeText={t=>setEmail(t)}
            />
            <C.Field 
                placeholder="Digite sua  senha"
                value={password}
                secureTextEntry={true}
                onChangeText={t=>setPassword(t)}
            />
            <C.Field 
                placeholder="Digite sua  senha novamente"
                value={passwordConfir}
                secureTextEntry={true}
                onChangeText={t=>setPasswordConfir(t)}
            />

            <C.ButtonArea onPress={null}>
                <C.ButtonText>CADASTRAR</C.ButtonText>
            </C.ButtonArea>
        </C.Container>  
    );
};