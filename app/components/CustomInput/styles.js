import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  calc: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 28,
  },
  countries: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fromTo: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fromToText: { fontWeight: 'bold', fontSize: 16 },
});

export default styles;
