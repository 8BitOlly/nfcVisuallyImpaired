import React, {useState} from 'react';
import {Text, TouchableOpacity, View, TextInput, Modal, Appearance} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import styles from './styles';

NfcManager.start();

const Nfc = () => {
  const [modalWrite, setModalWriteOpen] = useState(false);
  const [modalRead, setModalReadOpen] = useState(false);
  const [modalTagFound, setModalTagFoundOpen] = useState(false);
  const [modalWritten, setModalWrittenOpen] = useState(false);
  const [input, setInput] = useState('');
  const [tagValue, setValue] = useState('');
  const [hasNfc, setHasNfc] = useState(null);

  React.useEffect(() =>{
    async function checkNfc(){
      setHasNfc(await NfcManager.isSupported());
    }

    checkNfc();
  }, []);

  if (hasNfc == null) {
    return null;
  } else if (!hasNfc) {
    return (
      <View>
        <Text style={{color: 'black', fontSize: 20}}>Your device doesn't support NFC!</Text>
      </View>
    )
  }

  async function readNdef() {
    setModalReadOpen(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log(
        'Tag found: ',
        Ndef.text.decodePayload(tag.ndefMessage[0].payload),
      );
      setModalReadOpen(false);
      setModalTagFoundOpen(true);
      setValue(Ndef.text.decodePayload(tag.ndefMessage[0].payload));
    } catch (err) {
      console.log('Error: ', err);
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  }

  async function writeNdef() { 
    let result = false;
    setModalWriteOpen(false);
    setModalReadOpen(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.textRecord({input}.input)]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        console.log('Wrote: ' + {input}.input)
        result = true;
        setModalReadOpen(false);
        setModalWrittenOpen(true);
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
    return result;
  }

  function cancelScan(){
    setModalReadOpen(false);
    setModalWriteOpen(false);
    NfcManager.cancelTechnologyRequest();
  }

  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme);
  });

  return (
    <View>
      <Modal visible={modalRead} transparent={true}>
        <View style={styles.modalOuter}>
          <View style={styles.modalInner}>
            <Text style={styles.modalTitle}>Scanning for NFC tag...</Text>
            <View>
              <TouchableOpacity style={styles.modalButton} accessible={true} accessibilityLabel="Tap to cancel scan" onPress={cancelScan}>
                <Text style={{fontSize: 16, color: '#0079ce'}}>CANCEL SCAN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={modalTagFound} transparent={true}>
        <View style={styles.modalOuter}>
          <View style={styles.modalInner}>
            <Text style={styles.modalTitle}>Tag Found</Text>
            <Text style={styles.modalContent}>{tagValue}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalTagFoundOpen(false)}>
                <Text style={{fontSize: 16, color: '#0079ce'}}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalWrite} transparent={true}>
        <View style={styles.modalOuter}>
          <View style={styles.modalInner}>
            <Text style={styles.modalTitle}>Enter text to be saved to NFC tag:</Text>
            <TextInput style={styles.modalInput} placeholder="Example: Blue shirt" placeholderTextColor="#aaaaaa" onChangeText={text => setInput(text)}/>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity style={styles.modalButton} accessible={true} accessibilityLabel="Tap to cancel" accessibilityRole="button"                                                      onPress={cancelScan}>
                  <Text style={{fontSize: 16, color: '#0079ce'}}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} accessible={true} accessibilityLabel="Tap to submit" accessibilityRole="button" onPress={writeNdef}>
                  <Text style={{fontSize: 16, color: '#0079ce'}}>SUBMIT</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>

      <Modal visible={modalWritten} transparent={true}>
        <View style={styles.modalOuter}>
          <View style={styles.modalInner}>
            <Text style={styles.modalTitle}>Text Written</Text>
            <Text style={styles.modalContent}>{input}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalWrittenOpen(false)}>
                <Text style={{fontSize: 16, color: '#0079ce'}}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} accessible={true} accessibilityLabel="Tap to enable read mode" accessibilityRole="button" onPress={readNdef}>
          <Text style={{color: 'white', fontSize: 40}}>READ MODE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} accessible={true} accessibilityLabel="Tap to enable write mode" accessibilityRole="button" onPress={() => setModalWriteOpen(true)}>
          <Text style={{color: 'white', fontSize: 40}}>WRITE MODE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Nfc;