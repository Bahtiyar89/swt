import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft:10,
    marginRight:10,
  },
  mainHeader: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', 
    width: '90%',
  },
  profileHeaderText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
  },
  badgeStyle: {
    position: 'absolute',
    top: 16,
    right: 14,
  },
  profileHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
  },
  profileNameSurname: {
    marginLeft: 20,
    flexDirection: 'column',
  },
  buttonMenuContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    marginTop: 10,
    flexDirection: 'column',
    width: '90%',
  },
  modelContainer: { backgroundColor: 'white', padding: 10 },
  modelHeaderText: { color: 'black', fontWeight: '500', fontSize: 20 },
  modelTextAndError: { marginTop: 10, flexDirection: 'row', width: '100%' },
  modelHelperText: { alignItems: 'flex-end' },
  modelYesNo: { flexDirection: 'row', justifyContent: 'flex-end' },
  modelButtonNoColor: { color: 'black' },
  modelButtonYesColor: { color: '#397AF9' },
  titleSize:{fontSize:26, fontWeight:'400', lineHeight:34},
  textSize:{fontSize:14, fontWeight:'400', lineHeight:22},
  userTextSize:{fontSize:18,  lineHeight:26},
  scanText:{fontSize:16,  lineHeight:22},
  sendCountryText:{fontSize:14,  lineHeight:18}
});

export default styles;
