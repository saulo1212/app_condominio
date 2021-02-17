import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStateValue} from '../../context/StateContext';
import C from  './style';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import UnitPeopleSection from '../../components/UnitPeopleSection';
import UnitVeichleSection from '../../components/UnitVeichleSection';
import UnitPetSection from '../../components/UnitPatSection';
import UnitModalAddPerson  from  '../../components/UnitModalAddPerson';
import UnitModalAddVehicle from '../../components/UnitModalAddVehicle';
import UnitModalAddPet from '../../components/UnitModalAddPet';

export default () => {

    const navigation             = useNavigation();
    const[context,dispatch]      = useStateValue();
  
    const[loading,setLoading]    = useState(false);
    const[peopleList, setPeopleList] = useState([]);
    const[vehicleList, setVeicleList] = useState([]);
    const[petList, setPetList] = useState([]);

    const[showModal,setShowModal] = useState(false);
    const[modalType, setModalType] = useState('');

    useEffect(() => {
        navigation.setOptions({headerTitle: `Dados da unidade (${context.user.property.name})`});
        getUnitInfo();
    },[]);

    const getUnitInfo =  async () => {

        
        setLoading(true);

            const result = await api.getUnitInfo();
            
        setLoading(false);

        if(result.error === ''){
            setPeopleList(result.peoples);
            setVeicleList(result.vehicles);
            setPetList(result.pets);
        }else{
            alert(result.error);
        }
    }

    const handleAdd =  (type) => {
        setModalType(type);
        setShowModal(true);
    }

    return(
        <C.Container>
            <C.Scroller>

                {loading &&
                    <C.LoadingIcon color="8b63e7" size="large" />
                }

                {!loading &&
                    <>
                        <C.TitleArea>
                            <C.Title>Moradores</C.Title>
                            <C.TitleAddButton onPress={() =>handleAdd('person')}>
                                <Icon name="plus" size={24} color="#000" />
                            </C.TitleAddButton>
                        </C.TitleArea>
                        <C.ListArea>
                            <UnitPeopleSection  list={peopleList} refreshFunction={getUnitInfo}/>
                        </C.ListArea>



                        <C.TitleArea>
                            <C.Title>Veiculos</C.Title>
                            <C.TitleAddButton onPress={() =>handleAdd('vehicle')}>
                                <Icon name="plus" size={24} color="#000" />
                            </C.TitleAddButton>
                        </C.TitleArea>
                        <C.ListArea>
                            <UnitVeichleSection list={vehicleList} refreshFunction={getUnitInfo} />
                        </C.ListArea>



                        <C.TitleArea>
                            <C.Title>Petis</C.Title>
                            <C.TitleAddButton onPress={() =>handleAdd('pet')}>
                                <Icon name="plus" size={24} color="#000" />
                            </C.TitleAddButton>
                        </C.TitleArea>
                        <C.ListArea>
                            <UnitPetSection list={petList} refreshFunction={getUnitInfo} />
                        </C.ListArea>
                    </>
                }

            </C.Scroller>

            <C.ModalArea
                visible={showModal}
                transparent={true}
                animationType="slide"
            >
                <C.ModalBg>
                    <C.ModalBody>
                        {modalType === 'person' &&
                            <UnitModalAddPerson  
                                refreshFunction={getUnitInfo} 
                                setShowModal={setShowModal} 
                            />
                        }

                       {modalType === 'vehicle' &&
                            <UnitModalAddVehicle 
                                refreshFunction={getUnitInfo} 
                                setShowModal={setShowModal} 
                            />
                    }

                        {modalType === 'pet' &&
                            <UnitModalAddPet 
                                refreshFunction={getUnitInfo} 
                                setShowModal={setShowModal} 
                            />
                }
                    </C.ModalBody>  
                </C.ModalBg>  
            </C.ModalArea>
        </C.Container>
    )
}