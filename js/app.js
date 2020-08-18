// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Sets the rules for collisions and resets the player if one occurs.
    if (this.x + 50 >= player.x &&
    this.x < player.x + 50 &&
    this.y + 50 >= player.y &&
    this.y < player.y + 50) {
        player.x = 200;
        player.y = 380;
    }

    // reset the enemy position after crossing.
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 200);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-pink-girl.png';
};

Player.prototype.update = function() {
    // Keeps the player on screen
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Resets the player after winning
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//This sets the rules for player movement.
Player.prototype.handleInput = function(key){
  if (key === "left" && this.x > 0){
    this.x -= 101;
  } else if (key === "right" && this.x < 400){
    this.x += 101;
  } else if (key === "up" && this.y > 2){
    this.y -= 83;
  } else if (key === "down" && this.y < 350){
    this.y += 83;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];

// Places the enemies and player in starting postions
const enemyStart = [65, 135, 225];
const player = new Player(200, 380, 50);

enemyStart.forEach(function(positionY) {
    enemy = new Enemy(0, positionY, 100 + Math.floor(Math.random() * 200));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
