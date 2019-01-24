// Enemies our player must avoid
var Enemy = function(x, y, sprite,step, boundary, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y + 55;        // +55 makes the y axis of enemy and player to be constant
    this.sprite = sprite;
    this.step = step,
    this.boundary = this.step * boundary,
    this.speed = speed;

    this.resetPos = -this.step;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    

    // if enemy is not passed boundry
    if (this.x < this.boundary) {
        // move forward
        // increment x by speed * dt
        this.x += this.speed * dt;

    }  
     else {
        // reset postion to start
            this.x = this.resetPos;

        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



class Hero {
    constructor() { 
        this.step = 101;     // distance between one block to the next on the x axis
        this.jump = 83;       // distance between one block to the next on the y axis
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.sprite = 'images/char-boy.png'
        this.winner = false;
    }

    // draw hero sprite on x, y coordinates
    render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // direction to move (key input)
    handleInput(keyInput) {
        if(keyInput === 'left') {
            if (this.x > 0) {
                this.x -= this.step;
            }

        } else if(keyInput === 'up') {
            if (this.y > 0) {
                this.y -= this.jump;
            }

        } else if(keyInput === 'right') {
            if (this.x < this.step * 4) {
                this.x += this.step;
            }

        }else if(keyInput === 'down') {
            if (this.y < this.jump * 5)
            this.y += this.jump;
        }
    }

    update() {
        for(let enemy of allEnemies) {
            if(this.y === enemy.y && (enemy.x + enemy.step / 2 > this.x && enemy.x < this.x + this.step / 2) ) {
                this.reset();
            }
        }

        if(this.y < 55) {
            this.winner = true;
        }
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

}


const player = new Hero();

const bug1 = new Enemy(0, 0, 'images/enemy-bug.png', 101, 5, 200);
const bug2 = new Enemy(0, 83, 'images/enemy-bug.png', 101, 5, 500);
const bug3 = new Enemy(0, 166, 'images/enemy-bug.png', 101, 5, 100);
const bug4 = new Enemy(0, 0, 'images/enemy-bug.png', 101, 5, 300);
const bug5 = new Enemy(0, 83, 'images/enemy-bug.png', 101, 5, 100);
const bug6 = new Enemy(0, 166, 'images/enemy-bug.png', 101, 5, 300);
const bug7 = new Enemy(0, 249, 'images/enemy-bug.png', 101, 5, 700);


const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6, bug7);







// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
