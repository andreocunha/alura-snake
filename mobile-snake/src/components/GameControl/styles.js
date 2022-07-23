import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  button: {
    width: width / 4,
    height: width / 4,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  leftRightArea: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
  }
});
