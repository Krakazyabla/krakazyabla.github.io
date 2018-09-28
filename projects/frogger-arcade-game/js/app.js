// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Set initial location:
    // set x out of view, set y to place the enemy at random row
    this.x = -101;
    this.y = 63 + 83 * Math.floor(Math.random() * 3);
    // Set speed between 50 and 300
    this.speed = 50 + Math.random()*250;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
  // The image/sprite for player
  this.sprite = 'images/char-boy.png';
  Player.prototype.update.call(this);
}

// Return the player to the initial position
Player.prototype.update = function() {
  this.x = 202;
  this.y = 395;
}

// Draw player on the game field
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Method handleInput receives a name of pressed key, checks if player won't
// out of the game field, and changes coordinates of player
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      if (this.x > 0) {
        this.x -= 101;
      }
      break;
    case 'right':
      if (this.x < 404) {
        this.x += 101;
      }
      break;
    case 'up':
      if (this.y > -20) {
        this.y -= 83;
      }
      break;
    case 'down':
      if (this.y < 395) {
        this.y += 83;
      }
      break;
  }
//  Check win conditions after changing position of player
  this.checkWin();
}


// Check if player reached the water
Player.prototype.checkWin = function() {
  if (this.y === -20) {
    win();
  };
}

// Make new enemy instance in a random period of time
function makeNewEnemy() {
  setTimeout(function() {
    var enemy = new Enemy;
    allEnemies.push(enemy);
  }, Math.random() * 5000)
}

// Display message, return the player to initial place
function gameOver() {
  alert('Game over!');
  player.update();
}

// Display win message, return the player to initial place
function win() {
  alert('You won!');
  player.update();
}

var player = new Player;
var allEnemies = [];

// Create 5 enemies when the game is initialized
for (var i = 0; i < 5; i++) {
  makeNewEnemy();
}


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
