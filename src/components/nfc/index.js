import React, {useState} from 'react';
import {Text, TouchableOpacity, View, TextInput, Alert, Modal} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import styles from './styles';

NfcManager.start();

const Nfc = () => {
  const [modalWrite, setModalWriteOpen] = useState(false);
  const [modalRead, setModalReadOpen] = useState(false);
  const [modalTagFound, setModalTagFoundOpen] = useState(false);
  const [input, setInput] = useState('');
  const [tagValue, setValue] = useState('');

  async function readNdef() {
    setModalReadOpen(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log(
        'Tag found',
        Ndef.text.decodePayload(tag.ndefMessage[0].payload),
      );
      setModalReadOpen(false);
      setModalTagFoundOpen(true);
      setValue(Ndef.text.decodePayload(tag.ndefMessage[0].payload));
    } catch (ex) {
      console.log('Oops!', ex);
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  }

  async function writeNdef() { 
    let result = false;
    setModalWriteOpen(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.textRecord({input}.input)]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        console.log('Wrote' + {input}.input)
        result = true;
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
    return result;
  }

  function cancelScan(){
    setModalReadOpen(false)
    NfcManager.cancelTechnologyRequest();
  }

  return (
    <View>
      <Modal visible={modalRead} transparent={true}>
        <View style={styles.readModalOuter}>
          <View style={styles.readModalInner}>
            <Text style={styles.modalContent}>Scanning for NFC tag...</Text>
            <TouchableOpacity onPress={cancelScan}>
              <Text style={{fontSize: 16, color: '#0079ce', marginTop: 15}}>CANCEL SCAN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalTagFound} transparent={true}>
        <View style={styles.readModalOuter}>
          <View style={styles.readModalInner}>
            <Text style={styles.modalTitle}>Tag Found</Text>
            <Text style={styles.modalContent}>{tagValue}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalTagFoundOpen(false)}>
                <Text style={{fontSize: 16, color: '#0079ce'}}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalWrite} transparent={true}>
        <View style={styles.readModalOuter}>
          <View style={styles.readModalInner}>
            <Text style={styles.modalTitle}>Input:</Text>
            <TextInput style={styles.modalContent} placeholder="Input text" onChangeText={text => setInput(text)}/>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalWriteOpen(false)}>
              <Text style={{fontSize: 16, color: '#0079ce'}}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} accessible={true} accessibilityLabel="Tap to enable read mode" onPress={readNdef}>
          <Text style={{color: 'white', fontSize: 40}}>READ MODE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} accessible={true} accessibilityLabel="Tap to enable write mode" onPress={writeNdef}>
          <Text style={{color: 'white', fontSize: 40}}>WRITE MODE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


export default Nfc;