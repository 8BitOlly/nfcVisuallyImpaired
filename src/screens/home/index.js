import React from 'react';
import { View, Text } from 'react-native';
import Nfc from '../../components/nfc';
import Styles from './styles';

const Home = () => {
    return(
      <View style={Styles.wrapper}>
        <Nfc></Nfc>
      </View>
    )
}

export default Home;