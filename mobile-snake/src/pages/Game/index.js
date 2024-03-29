import React, { useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { GameBoard } from '../../components/GameBoard';
import { GameControl } from '../../components/GameControl';
import { GameBoardConfig, Direction } from '../../utils/constants';
import styles from './styles';

export default function Game() {
  const [snakePosition, setSnakePosition] = useState([
    { x: 4, y: 5 },
    { x: 3, y: 5 },
    { x: 2, y: 5 },
  ]);
  const [snake2Position, setSnake2Position] = useState([
    { x: 4, y: 3 },
    { x: 3, y: 3 },
    { x: 2, y: 3 },
  ]);

  const [snakes, setSnakes] = useState([ snakePosition, snake2Position ]);
  const [foodPosition, setFoodPosition] = useState({ x: 3, y: 2 });
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState(Direction.right);

  function checkGetFood(headPosition){
    if (headPosition.x === foodPosition.x && headPosition.y === foodPosition.y) {
      setScore(score + 1);
      setFoodPosition({
        x: Math.floor(Math.random() * GameBoardConfig.numberOfRowsAndColumns),
        y: Math.floor(Math.random() * GameBoardConfig.numberOfRowsAndColumns),
      });
    }
  }

  function checkIsOutOfBounds(headPosition){
    if (headPosition.x < 0 || headPosition.x >= GameBoardConfig.numberOfRowsAndColumns || headPosition.y < 0 || headPosition.y >= GameBoardConfig.numberOfRowsAndColumns) {
      return true;
    }
    return false;
  }

  function updateSnakePosition(newDirection) {
    setDirection(newDirection);
    const newSnakePosition = [...snakePosition];
    const head = newSnakePosition[0];
    const newHead = {
      x: head.x,
      y: head.y
    };
    
    switch (newDirection) {
      case Direction.right:
        newHead.x += 1;
        break;
      case Direction.left:
        newHead.x -= 1;
        break;
      case Direction.up:
        newHead.y -= 1;
        break;
      case Direction.down:
        newHead.y += 1;
        break;
      default:
        break;
    }
    checkGetFood(newHead);
    if (checkIsOutOfBounds(newHead)) {
      if (newHead.x < 0) {
        newHead.x = GameBoardConfig.numberOfRowsAndColumns - 1;
      }
      if (newHead.x >= GameBoardConfig.numberOfRowsAndColumns) {
        newHead.x = 0;
      }
      if (newHead.y < 0) {
        newHead.y = GameBoardConfig.numberOfRowsAndColumns - 1;
      }
      if (newHead.y >= GameBoardConfig.numberOfRowsAndColumns) {
        newHead.y = 0;
      }
    }
    newSnakePosition.unshift(newHead);
    newSnakePosition.pop();
    setSnakePosition(newSnakePosition);
    setSnakes([newSnakePosition, snake2Position]);
  }

  // a function to update the snake position every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      updateSnakePosition(direction);
    }, 200);
    return () => clearInterval(interval);
  }, [snakePosition]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.score}>Score: {score}</Text>
      <GameBoard 
        numberOfRows={10}
        snakesPosition={snakes}
        foodPosition={foodPosition}
        snakeColor="#FF0000"
        foodColor="#00FF00"
      />
      <GameControl onClick={(direction) => { updateSnakePosition(direction)}}/>
    </View>
  );
}