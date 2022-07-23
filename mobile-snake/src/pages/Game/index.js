import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { GameBoard } from '../../components/GameBoard';
import { GameControl } from '../../components/GameControl';
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

  function checkGetFood(headPosition){
    if (headPosition.x === foodPosition.x && headPosition.y === foodPosition.y) {
      setScore(score + 1);
      setFoodPosition({
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      });
    }
  }

  function updateSnakePosition(newDirection) {
    const newSnakePosition = [...snakePosition];
    const head = newSnakePosition[0];
    const newHead = {
      x: head.x,
      y: head.y
    };
    
    switch (newDirection) {
      case 'RIGHT':
        newHead.x += 1;
        break;
      case 'LEFT':
        newHead.x -= 1;
        break;
      case 'UP':
        newHead.y -= 1;
        break;
      case 'DOWN':
        newHead.y += 1;
        break;
      default:
        break;
    }
    checkGetFood(newHead);
    newSnakePosition.unshift(newHead);
    newSnakePosition.pop();
    setSnakePosition(newSnakePosition);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.score}>Score: {score}</Text>
      <GameBoard 
        numberOfRows={10}
        snakePosition={snakePosition}
        foodPosition={foodPosition}
        snakeColor="#FF0000"
        foodColor="#00FF00"
      />
      <GameControl 
        onClick={(direction) => {
          updateSnakePosition(direction);
        }}
      />
    </View>
  );
}