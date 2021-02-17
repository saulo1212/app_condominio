import React,{useState} from 'react';
import styled from 'styled-components/native';
import api from '../services/api';

const Box = styled.View`
    padding:20px;
`;

const Title = styled.Text`
    font-size:17px;
    font-weight:bold;
    margin-bottom:20px;
`;
const Label = styled.Text`
    font-size:16px;
    color:#000;
    margin-bottom:10px;
`;
const Field = styled.TextInput`
    background-color:#fff;
    border-width:1px;
    border-color:#ccc;
    border-radius:5px;
    color:#000;
    font-size:15px;
    margin-bottom:15px;
    padding:10px;
`;
const ButtonArea = styled.View`
    flex-direction:row;
    justify-content:space-around;
    margin-top:20px;
`;

const SaveButton = styled.Button`
    flex:1;
`;

const CancelButton = styled.Button`
    flex:1;
`;

export default ({refreshFunction,setShowModal}) => {

    const[title,setTitle] = useState('');
    const [color,setColor] = useState('');
    const [plate,setPlate] = useState('');

    const handleAdd = async () => {
        if(color && title && plate){


            const result = await api.addUnitItem('vehicle',{
                title,color,plate
            });

            if(result.error === ''){
                   refreshFunction();
                   setShowModal(false); 
            }else{
                alert(result.error);
            }
        }else{
            alert("Preencha os campos!");
        }
    }

    const hadleCancel = () => {
        setShowModal(false)
    }

    return(
        <Box>
            <Title>Adicionar veiculo</Title>
            <Label>veiculo</Label>
            <Field
                placeholder="Digite o veiculo"
                value={title}
                onChangeText={t=>setTitle(t)}
            />

            <Label>cor</Label>
            <Field
                placeholder="Digite a cor"
                value={color}
                onChangeText={t=>setColor(t)}
            />

            <Label>placa</Label>
            <Field
                placeholder="Digite a placa"
                value={plate}
                onChangeText={t=>setPlate(t)}
            />




            <ButtonArea>
                <SaveButton title="Adicionar" onPress={handleAdd} />
                <CancelButton title="Cancelar"  color="#ff0000" onPress={hadleCancel}/>
            </ButtonArea>
        </Box>
    );
}