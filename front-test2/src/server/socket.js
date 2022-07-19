import socketIO from 'socket.io-client';

// const socket = socketIO('http://localhost:4000');
const socket = socketIO('https://alura-snake-server.herokuapp.com');

export default socket;