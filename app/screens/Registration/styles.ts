import Colors from 'app/utils/Сolors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  login: {
    padding: 8,
  },

  loginHeaderText: { color: 'black', fontWeight: 'bold', fontSize: 28 },
  signInText: { color: 'black', fontWeight: 'bold', fontSize: 28 },
  textInput: { width: '90%' },
  rowDirection: { flexDirection: 'row' },
  rowButton: { backgroundColor: '#2819ae', marginLeft: 10 },
  buttonText: { color: 'white' },
  forgot: {
    marginRight: 0,
    flex: 1,
    color: '#321fdb',
    textAlign: 'right',
    fontSize: 12,
  },
  forgotStyle: {
    marginRight: 10,
    flex: 1,
    color: '#321fdb',
    textAlign: 'right',
    fontSize: 16,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  modelContainer: { backgroundColor: 'white', padding: 10 },
  modelHeaderText: { color: 'black', fontWeight: '500', fontSize: 20 },
  modelTextAndError: { marginTop: 10, flexDirection: 'row', width: '100%' },
  modelHelperText: { alignItems: 'flex-end' },
  modelYesNo: { flexDirection: 'row', justifyContent: 'flex-end' },
  modelButtonNoColor: { color: 'black' },
  modelButtonYesColor: { color: '#397AF9' },
  title: { marginTop: 5, width: '90%' },
  pencil: {
    width: '90%',
    marginTop: 20,
    marginBottom: 10,
  },
  generate: { textAlign: 'center', color: '#000' },
  keys: { marginTop: 5, flexDirection: 'row', width: '90%' },
  check: {
    marginTop: 10,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  checkButton: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  checkText: { color: Colors.black },
  regButton: {
    width: '90%',
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: '#333333',
  },
});

export default styles;
