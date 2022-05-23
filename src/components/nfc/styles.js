import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  button: {
    padding: 10,
    width: 350,
    height: 300,
    alignItems: 'center',
    backgroundColor: '#000000',
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
  modalOuter: {
    backgroundColor: '#00000080',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner: {
    width: 350,
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#202124',
    color: 'white',
  },
  modalTitle: {
    fontSize: 23,
    paddingBottom: 10,
    color: 'white'
  },
  modalContent: {
    fontSize: 20,
    paddingTop: 5,
    color: '#aaaaaa',
  },
  modalInput: {
    padding: 14,
    fontSize: 18,
    color: '#aaaaaa',
  },
  modalButton: {
    marginTop: 30,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    padding: 10
  },
});

export default Styles;