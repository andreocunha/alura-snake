const stc = require('string-to-color');

class User {
  constructor (id, name) {
    this.id = id;
    this.name = name;
    this.color = this.generateColor();
    this.position = this.randomPosition();
    this.score = 0;
  }
  
  generateColor() {
    return stc(this.id);
  }
  
  randomPosition() {
    return {
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100)
    };
  }

  updatePosition(position) {
    this.position = position;
  }
  
  updateScore() {
    this.score++;
  }

  getScore() {
    return this.score;
  }
}

module.exports = {
  User
};