import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';

const Settings = () => {
    return(
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={Linking.open}>
          <View style={styles.settingWrapper}>
            <Text style={{color: 'black', fontSize: 22}}>NFC:</Text>
            <Text style={{color: 'black', fontSize: 22, padding: 5}}>Tap here to edit NFC settings.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.settingWrapper}>
            <Text style={{color: 'black', fontSize: 22}}>TalkBack:</Text>
            <Text style={{color: 'black', fontSize: 22, padding: 5}}>Tap here to edit TalkBack settings.</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
}

export default Settings;