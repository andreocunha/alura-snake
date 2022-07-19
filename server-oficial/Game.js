class Game {
  constructor (){
    this.usersInGameRoom = []; // dicionario de usuarios que estao nas respectivas salas de jogo
    this.users = []; // lista com todos os usuarios
    this.hasFruit = false;
  }

  addUser(user) {
    // verifica se o usuario ja existe
    const userExists = this.users.find(u => u.id == user.id);
    if(!userExists) {
      this.users.push(user);
    }
  }

  addUserInGameRoom(user, gameRoomId) {
    /* this.usersInGameRoom = [
      gameRoomId: [
        {user},
        {user},
        {user}
      ],
      gameRoomId: [
        {user},
        {user},
        {user}
      ]
    ] 
    */
    const gameExists = this.usersInGameRoom.find(u => u.gameRoomId == gameRoomId);
    // console.log(gameRoomId);
    // console.log(gameExists);
    if(!gameExists) {
      this.usersInGameRoom.push({
        gameRoomId: gameRoomId,
        users: [user]
      });
    }
    else {
      const userExists = gameExists.users.find(u => u.id == user.id);
      if(!userExists) {
        gameExists.users.push(user);
      }
    }
  }

  removeUserInGameRoom(user, gameRoomId) {
    const gameExists = this.usersInGameRoom.find(u => u.gameRoomId == gameRoomId);
    if(gameExists) {
      const userExists = gameExists.users.find(u => u.id == user.id);
      if(userExists) {
        gameExists.users.splice(gameExists.users.indexOf(userExists), 1);
      }
    }
  }

  removeUser(user) {
    this.users = this.users.filter(u => u !== user);
    // find all the games that the user is in
    const games = this.usersInGameRoom.filter(q => q.users.find(u => u.id == user?.id));
    // remove the user from the games
    games.forEach(q => {
      q.users = q.users.filter(u => u !== user);
    });
  }

  newGameRoom() {
    const gameRoomId = this.generateGameRoomId();
    return gameRoomId;
  }

  generateGameRoomId() {
    return Math.floor(Math.random() * 1000000);
  }

  getGameRoomId(user) {
    const game = this.usersInGameRoom.find(q => q.users.find(u => u.id == user.id));
    return game?.gameRoomId || null;
  }

  getUser(id) {
    return this.users.find(u => u.id == id);
  }

  getAllUsers() {
    return this.users;
  }

  getAllUsersInGame(gameRoomId) {
    const game = this.usersInGameRoom.find(q => q.gameRoomId == gameRoomId);
    return game?.users || [];
  }

  updateHasFruit(){
    this.hasFruit = !this.hasFruit;
  }

  getHasFruit(){
    return this.hasFruit;
  }

}

module.exports = {
  Game
};