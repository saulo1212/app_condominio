import React from 'react';
import  styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Box = styled.View`
    background-color:#fff;
    border-width:2px;
    border-color:#e8e9ed;
    border-radius:20px;
    padding:15px;
    margin-bottom:10px;
`;
const HeaderArea = styled.View`
    flex-direction:row;
    align-items:center;
`;
const InfoArea = styled.View`
    margin-left:15px;
    flex:1;
`;
const Title = styled.Text`
    font-size:17px;
    font-weight:bold;
    color:#000;
`;
const Date = styled.Text`
    font-size:14px;
    font-weight:bold;
    color:#9c9d9b;
`;
const Body = styled.Text`
    font-size:15px;
    color:#000;
    margin:15px 0;
`;
const FooterArea = styled.View`
    flex-direction:row;
    align-items:center;
`;
const LikeButton = styled.TouchableOpacity`
    width:20px;
    height:20px;
    align-items:center;
    justify-content:center;
`;
const LikeText = styled.Text`
        margin-left:5px;
        font-size:13px;
        color:#9c9db9;
`;

export default ({data}) => {
    return(
        <Box>
            <HeaderArea>
                <Icon  name="newspaper-o" size={30} color="8b63e7" />
                <InfoArea>
                    <Title>Titulo</Title>
                    <Date>Data de criação</Date>
                </InfoArea>
            </HeaderArea>
            <Body>
                Texto do aviso
            </Body>
            <FooterArea>
                <LikeButton>
                    <Icon  name="heart"  size={17} color="#ff0000"/>
                </LikeButton>
                <LikeText>99 Pessoas curtiram</LikeText>
            </FooterArea>
        </Box>
    );
}