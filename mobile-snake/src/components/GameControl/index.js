import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { Direction } from '../../utils/constants';

export function GameControl({ onClick }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onClick(Direction.up)}>
        <Text>UP</Text>
      </TouchableOpacity>

      <View style={styles.leftRightArea}>
        <TouchableOpacity style={styles.button} onPress={() => onClick(Direction.left)}>
          <Text>LEFT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => onClick(Direction.right)}>
          <Text>RIGHT</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => onClick(Direction.down)}>
        <Text>DOWN</Text>
      </TouchableOpacity>
    </View>
  );
}