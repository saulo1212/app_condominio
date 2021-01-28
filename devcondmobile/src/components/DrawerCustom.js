import React from 'react';
import  styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../context/StateContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const DrawerArea = styled.View`
    flex:1;
    background-color: #ff0000;
`;

const DrawerLogoArea = styled.View``;

const DrawerLogo = styled.Image ``;

const DrawerScroller = styled.ScrollView``;

const ChangeUnitArea = styled.View``;

const ChangeUnitButton = styled.TouchableOpacity``;

const ChangeUnitButtonText = styled.Text``;

const FooterArea = styled.View``;
const FooterInfo = styled.View``;
const FooterProfile = styled.Text``;
const FooterUnitText = styled.Text``;
const FooterUnitButton = styled.TouchableOpacity``;

export default (props) => {

    const navigation = useNavigation();
    const[context,dispatch] = useStateValue();


    return(
        <DrawerArea>
            <DrawerLogoArea>
                <DrawerLogo source={require('../assets/undraw_home.png')} resizeMode="contain" />
            </DrawerLogoArea>

            <DrawerScroller>

            </DrawerScroller>

            <ChangeUnitArea>
                <ChangeUnitButton>
                    <ChangeUnitButtonText>Trocar unidade</ChangeUnitButtonText>
                </ChangeUnitButton>
            </ChangeUnitArea>

            <FooterArea>
                <FooterInfo>
                    <FooterProfile>Saulo</FooterProfile>
                    <FooterUnitText>propriedade</FooterUnitText>
                </FooterInfo>
                <FooterUnitButton>
                    <Icon name="gear" size={24} color="#66e78" />
                </FooterUnitButton>
            </FooterArea>
        </DrawerArea>
    )
}