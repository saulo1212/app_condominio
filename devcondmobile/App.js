
import React from 'react';
import {View,Button} from 'react-native';
import  {StateProvider} from './src/context/StateContext';


export default  () => {



  return (
    <>
      <StateProvider>
          <View >
            <Button title="Suportesss" />
          </View>
      </StateProvider>
    </>
  );
};

