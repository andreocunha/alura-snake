import React, { useEffect, useState } from 'react';
import socket from './server/socket';

export default function App() {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [fruit, setFruit] = useState(null);
  const [time, setTime] = useState(0);

  useEffect(() => { 
    socket.on('gameRoomId', (roomId) => {
      console.log(roomId);
      setRoomId(roomId);
    });

    socket.on('allUsersInGame', (users) => {
      console.log(users);
    });

    socket.on('newFruit', (fruit) => {
      // console.log(fruit);
      setFruit(fruit);
    });

    socket.on('endGame', (user) => {
      console.log("Fim do jogo");
      console.log(user);
    })

    socket.on('time', (time) => {
      setTime(time);
    })
    
  }, []);

  async function newGame() {
    socket.emit('newGame', name);
  }

  async function newUserInRoom() {
    socket.emit('newUserInRoom', name, roomId);
  }

  async function startGame(){
    socket.emit('startGame', roomId);
  }

  async function getFruit(){
    socket.emit('getFruit', roomId);
  }

  async function updatePosition(){
    socket.emit('updatePosition', {
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100)
    }, roomId);
  }

  return (
    <div style={styles.container}>

      <h3>{time}</h3>

      <h1>Snake Game</h1>

      <input placeholder='Nome do jogador' type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={newGame}>CRIAR NOVO JOGO</button>

      <br />
      <br />

      <input placeholder='ID da sala' type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <button onClick={newUserInRoom}>ENTRAR NA SALA</button>

      <br />
      <br />

      <button onClick={startGame}>INICIAR JOGO</button>

      <br />
      <br />

      <button onClick={getFruit}>PEGAR FRUTA</button>

      <br />
      <br />

      <button onClick={updatePosition}>ATUALIZAR POSIÇÃO</button>

      {fruit && <div style={styles.fruit}>
        <div styles={{ backgroundColor: 'gray' }} />
        <div style={styles.fruitPosition}>
          <div>x: {fruit.position.x}</div>
          <div>y: {fruit.position.y}</div>
        </div>
      </div>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  }
}