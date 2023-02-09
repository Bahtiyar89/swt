import { StyleSheet } from 'react-native';
import Colors from '../../utils/Сolors';

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    fontFamily: 'Nunito',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 21,
    paddingRight: 10,
  },
  containerStyle: {
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.defaultBlack,
    borderRadius: 10,
    height: 48,
  },
  labelStyle: {
    paddingHorizontal: 5,
    marginTop: 15,
    color: Colors.white,
  },
  inputStyle: {
    color: Colors.white,
    paddingHorizontal: 10,
  },
  labelText: {
    width: '100%',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.black,
  },
});

export default styles;
