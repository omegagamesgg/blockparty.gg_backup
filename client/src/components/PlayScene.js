import Phaser from 'phaser';
import { auth, db } from '../firebase';

class PlayScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PlayScene',
    });
    this.birdStates = {
      INACTIVE: 0,
      ACTIVE: 1,
      DEAD: 2
    }
    this.currentBird = null;
    this.otherBirds = [];
    this.birdState = null;
    this.score = 0;
  }

  preload() {
    this.load.image('block', 'images/FlappyBlock.png');
  }

  create() {
    // Handle mouse / keyboard input
    this.input.keyboard.on('keydown_SPACE', this.flap, this);
    this.input.on('pointerdown', this.flap, this);

    // Setup the pipes
    this.pipes = this.add.group();

    // Setup recurring pipe creation
    this.event = this.time.addEvent({
      delay: 3000,
      callback: this.addPipes,
      callbackScope: this,
      loop: true
    });

    
    
  }

  addCurrentPlayer(playerStateSnapshot) {
    // Create the bird sprite and apply gravity
    console.log('adding current player');
    this.currentBird = this.physics.add.sprite(playerStateSnapshot.val().x, playerStateSnapshot.val().y, 'block');
    this.currentBird.setTint(0xff0000);

    // Setup collision detection
    this.physics.add.overlap(this.currentBird, this.pipes, this.collide, null, this);

    this.setInactive();
  }

  addOtherPlayer(playerStateSnapshot) {
    var otherBird = this.add.sprite(playerStateSnapshot.val().x, playerStateSnapshot.val().y, 'block');
    otherBird.id = playerStateSnapshot.key;
    this.otherBirds.push(otherBird);

    db.getGamePlayerState(otherBird.id).on('value', snapshot => {
      otherBird.x = snapshot.val().x;
      otherBird.y = snapshot.val().y;
    });
  }

  flap() {
    if(this.birdState === this.birdStates.INACTIVE) {
      this.setActive();
    }
    if(this.birdState === this.birdStates.ACTIVE) {
      this.currentBird.body.velocity.y = -300;
    }
  }

  addPipes() {
    let holeY = Math.floor(Math.random() * 5) + 1;
    for(let y = 0; y < 12; y++) {
      if(y !== holeY && y !== holeY + 1) {
        this.pipe = this.physics.add.image(window.innerWidth, y * 60 + 10, 'block');
        this.pipe.setVelocity(-100, 0);
        this.pipe.setGravityY(0);
        this.pipes.add(this.pipe);
      }
      if(y === 0) {
        this.pipe.scorePipe = true;
      }
    }
  }

  collide() {
    if(this.birdState === this.birdStates.ACTIVE) {
      this.setDead();
    }
  }
  
  setInactive() {
    this.birdState = this.birdStates.INACTIVE;
    //this.currentBird.setPosition(window.innerWidth / 2, window.innerHeight / 2);
    this.currentBird.setVelocity(0);
    this.currentBird.setGravityY(0);
  }

  setActive() {
    this.birdState = this.birdStates.ACTIVE;
    this.currentBird.setGravityY(1000);
  }

  setDead() {
    this.birdState = this.birdStates.DEAD;
    this.currentBird.setVelocityX(-100);
    this.respawnEvent = this.time.addEvent({
      delay: 3000,
      callback: this.setInactive,
      callbackScope: this,
      loop: false
    });
  }

  update() {
    if(this.birdState === this.birdStates.INACTIVE) {
      this.currentBird.setPosition(50, 50 + (8 * Math.cos(Date.now() / 200)));
    }
    if(this.birdState === this.birdStates.ACTIVE) {
      if(this.currentBird.oldPosition && 
        (this.currentBird.x !== this.currentBird.oldPosition.x ||
        this.currentBird.y !== this.currentBird.oldPosition.y)) {
          db.setGamePlayerState(auth.getCurrentUser().uid, this.currentBird.x, this.currentBird.y);
        }

    this.currentBird.oldPosition = {
      x: this.currentBird.x,
      y: this.currentBird.y
    }

      if(this.currentBird.y <= 0 || this.currentBird.y > window.innerHeight) {
        this.setDead();
      }  
    }

    this.pipes.getChildren().forEach(pipe => {
      if(pipe.scorePipe && this.currentBird.x >= pipe.x) {
        if(this.birdState === this.birdStates.ACTIVE) {
          this.score++;
        }
        
        pipe.scorePipe = null;
      }
    });
  }
}

export default PlayScene;