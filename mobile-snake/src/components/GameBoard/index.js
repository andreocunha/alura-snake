import { View } from 'react-native';
import styles from './styles';
import { GameBoardConfig } from '../../utils/constants';

export function GameBoard({
  snakesPosition,
  snakePosition,
  foodPosition,
  snakeColor,
  foodColor
}) {
  
  const oneDArray = new Array(GameBoardConfig.numberOfRowsAndColumns).fill(null);

  function hasSnakeOnPosition(x, y) {
    return snakesPosition.some(snake => snake.some(position => position.x === x && position.y === y));
  }

  function hasFoodOnPosition(x, y) {
    return foodPosition.x === x && foodPosition.y === y;
  }

  // const isSnakeOnCoordinates = (x, y) =>
  //   (snakePosition.x === x && snakePosition.y === y) ||
  //   snakePosition.some((segment) => segment.x === x && segment.y === y);

  // const isFoodOnCoordinates = (x, y) =>
  //   foodPosition.x === x && foodPosition.y === y;

  return (
    <View style={styles.container}>
      {oneDArray.map((_, rowIndex) => {
        return (
          <View key={`row-${rowIndex}`} style={styles.rowStyle}>
            {oneDArray.map((_, columnIndex) => {
              return (
                <View
                  key={`column-${columnIndex}`}
                  style={[
                    styles.columnStyle,
                    hasSnakeOnPosition(columnIndex, rowIndex)
                      ? { backgroundColor: snakeColor }
                      : null,
                    hasFoodOnPosition(columnIndex, rowIndex)
                      ? { backgroundColor: foodColor }
                      : null,
                  ]}
                ></View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}