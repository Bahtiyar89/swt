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
    alignSelf: 'center',
    width: '90%',
  },
  send: { marginTop: 10, fontSize: 16 },
  calc: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 28,
  },
  countries: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fromTo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fromToText: { fontWeight: 'bold', fontSize: 16 },
  giveToDep: {
    backgroundColor: '#333333',
    width: '100%',
    marginTop: 20,
    height: 40,
  },
  receiver: { fontSize: 20, marginTop: 10 },
  priceWrapper: {
    width: '100%',
    marginTop: 10,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oform: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#333333',
  },
  ensureTxt: { width: '100%', paddingTop: '2%', color: '#979797' },
});

export default styles;
