import { StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const Styles = StyleSheet.create({
  button: {
    padding: 10,
    width: 350,
    height: 300,
    alignItems: 'center',
    backgroundColor: '#2196f3',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonWrapper: {
    margin: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    width: 200,
    padding: 10,
  },
  readModalOuter: {
    backgroundColor: '#00000080',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  readModalInner: {
    width: 300,
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#202124',
    color: 'white',
  },
  modalTitle: {
    fontSize: 23,
    paddingBottom: 10,
  },
  modalContent: {
    fontSize: 20,
    paddingTop: 5,
    color: '#aaaaaa'
  },
  modalButton: {
    marginTop: 30,
    justifyContent: 'flex-end',
  },
});

export default Styles;