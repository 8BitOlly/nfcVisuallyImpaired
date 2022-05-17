import React from 'react';
import { View, Alert } from 'react-native';
import Nfc from '../../components/nfc';
import Styles from './styles';

const Home = () => {

  Alert.alert(
    'Welcome',
    'To access the settings click the button in the top right corner of the screen.'
    
  );

    return(
      <View style={Styles.wrapper}>
        <Nfc></Nfc>
      </View>
    )
}

export default Home;