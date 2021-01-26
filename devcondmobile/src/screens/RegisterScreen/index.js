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

    const handleRegisterButton = async () => {
        if(name && email && cpf && password && passwordConfir){
            let result = await api.register(name,email,cpf,password, passwordConfir);

            if(result.error === ''){
                dispatch({
                    type:'setToken',
                    payload:{ token: result.token}
                });

                dispatch({
                    type:'setUser',
                    payload:{user:result.user}
                });

                navigation.reset({
                    index:1,
                    routes:[{name:'ChoosePropertScreen'}]
                });
            }else{
                alert(result.error)
            }
        }else{
            alert("campos vazios")
        }
    }

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

            <C.ButtonArea onPress={handleRegisterButton}>
                <C.ButtonText>CADASTRAR</C.ButtonText>
            </C.ButtonArea>
        </C.Container>  
    );
};