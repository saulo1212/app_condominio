import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import C from  './style';
import api from '../../services/api';

export default () => {

    const navigation = useNavigation();
    const[context,dispatch] = useStateValue();

    const[loading,setLoading] = useState(true);

    const handleLogout = () => {

    }

    return(
        <C.Container>
            <C.Scroller>
                {loading &&
                    <C.LoadingIcon color="#8863e6" size="large" />
                }
                {!loading && context.user.user.properties.length > 0 &&
                    <>
                        <C.HeaderTitle>olá {context.user.user.name}</C.HeaderTitle>
                        <C.HeaderTitle>Escolha uma das suas propriedades</C.HeaderTitle>
                    </>
                }

                {!loading && context.user.user.properties.length <= 0 &&
                    <C.BigArea>
                        <C.HeaderTitle>
                            {context.user.user.name}, Parabens pelo cadastro
                        </C.HeaderTitle>
                        <C.HeaderTitle>
                           Administração precisa liberar seu acesso
                        </C.HeaderTitle>
                    </C.BigArea>
                }
            </C.Scroller>
            <C.ExiButtonArea onPress={handleLogout}>
                <C.ExitButtonText>Sair</C.ExitButtonText>
            </C.ExiButtonArea>
        </C.Container>
    )
}