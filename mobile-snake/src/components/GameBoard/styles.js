import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

export default StyleSheet.create({
  container: {
    width: '100%',
    height: width,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowStyle: {
    flex: 1, 
    borderColor: "#fff", 
    flexDirection: "row", 
    height: width,
  },
  columnStyle: {
    flex: 1, 
    borderWidth: 1, 
    borderColor: "#fff"
  },
});
