import { StyleSheet } from 'react-native';
import Colors from 'app/utils/Сolors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: Colors.black,
  },
  buttonText: { color: 'white' },
  floatLeft_right: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
  },
  uploadBtn: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    height: 40,
    borderRadius: 10,
  },
  tBtn: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
  },
  btnText: {
    color: Colors.black,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  textRegist: {
    color: Colors.blue,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  notRegist: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default styles;
