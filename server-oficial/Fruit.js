class Fruit {
  constructor () {
    this.position = this.randomPosition();
  }
  
  randomPosition() {
    return {
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100)
    };
  }
}

module.exports = {
  Fruit
};