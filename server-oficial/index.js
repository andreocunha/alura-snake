const { Game } = require('./Game');
const { User } = require('./User');
const { Fruit } = require('./Fruit');

const PORT = process.env.PORT || 4000;
const io = require('socket.io')(PORT, { cors: { origin: '*' } });

const game = new Game();

// a function to sand a fruit to each game room ID every 5 seconds
// const sendFruit = () => {
//   game.usersInGameRoom.forEach(q => {
//     const fruit = new Fruit();
//     console.log(`Sending fruit to game room ${q.gameRoomId}`);
//     io.to(q.gameRoomId).emit('newFruit', fruit);
//   });
// }
// setInterval(sendFruit, 2000);

io.on("connection", (socket) => {
  console.log("USER: " + socket.id); // socket.id is the id of the user
  socket.emit("userId", socket.id);

  socket.on("startGame", (roomId) => {
    console.log("USER: " + socket.id + " started a new game");
    const fruit = new Fruit();
    io.to(`${roomId}`).emit('newFruit', fruit);
    game.updateHasFruit();
  })

  socket.on('newGame', () => {
    const roomId = game.newGameRoom();
    socket.emit('gameRoomId', roomId);
  })

  // when a new user joins a game room
  socket.on('newUserInRoom', (name, roomId) => {
    const user = new User(socket.id, name);
    game.addUser(user);
    game.addUserInGameRoom(user, roomId);
    socket.join(`${roomId}`);

    console.log(`USER: ${socket.id} joined room: ${roomId}`);

    // emit all users in the game roomId
    const users = game.getAllUsersInGame(roomId);
    io.to(`${roomId}`).emit('allUsersInGame', users);
  });

  socket.on('updatePosition', (position, roomId) => {
    const user = game.getUser(socket.id);
    user.updatePosition(position);
    
    // emit all users in the game roomId
    const users = game.getAllUsersInGame(roomId);
    io.to(`${roomId}`).emit('allUsersInGame', users);
  })

  // when a user leaves a game room
  socket.on('leaveGameRoom', (roomId) => {
    const user = game.getUser(socket.id);
    game.removeUser(user);
    game.removeUserInGameRoom(user, roomId);
    socket.leave(`${roomId}`);
    
    // emit all users in the game roomId
    io.to(`${roomId}`).emit('allUsersInGame', game.getAllUsersInGame(roomId));
  });
  
  // when someone get a fruit
  socket.on('getFruit', (roomId) => {
    const user = game.getUser(socket.id);
    if(game.getHasFruit()){
      user.updateScore();
      game.updateHasFruit();
    }

    // emit all users in the game roomId
    io.to(`${roomId}`).emit('allUsersInGame', game.getAllUsersInGame(roomId));

    // await 2 seconds
    const interval = setInterval(() => {
      // emit a new fruit
      const fruit = new Fruit();
      console.log(`Sending fruit to game room ${roomId}`);
      io.to(`${roomId}`).emit('newFruit', fruit);
      game.updateHasFruit();
      clearInterval(interval);
    }, 2000);

    const score = user.getScore();
    if(score === 10){
      io.to(`${roomId}`).emit('endGame', user);
    }

  });


  // when a user leaves the game app
  socket.on("disconnect", () => {
    console.log("USER: " + socket.id + " DISCONNECTED");
    const user = game.getUser(socket.id);
    const roomId = game.getGameRoomId(user);
    game.removeUser(user);
    io.emit('allUsersInGame', game.getAllUsersInGame(roomId));
  })

})