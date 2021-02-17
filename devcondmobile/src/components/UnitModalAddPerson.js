import React,{useState} from 'react';
import styled from 'styled-components/native';
import { useStateValue } from '../context/StateContext';
import DatePicker from 'react-native-date-picker';
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

    const[name,setName] = useState('');
    const [date,setDate] = useState(new Date());

    const handleAdd = async () => {
        if(name && date){
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDay();

            month = month < 10 ? '0'+month : month;
            day = day < 10 ? '0'+day : day;

            let birthdate = `${year}-${month}-${day}`;

            const result = await api.addUnitItem('person',{
                name, birthdate
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
            <Title>Adicionar Morador</Title>
            <Label>Nome completo</Label>
            <Field
                placeholder="Digite o nome completo"
                value={date}
                onChangeText={t=>setName(t)}
            />

            <Label>Data de Nascimento</Label>

            <DatePicker
                mode="date"
                date={date}
                onDateChange={setDate}
                locale="pt-BR"
            />

            <ButtonArea>
                <SaveButton title="Adicionar" onPress={handleAdd} />
                <CancelButton title="Cancelar"  color="#ff0000" onPress={hadleCancel}/>
            </ButtonArea>
        </Box>
    );
}