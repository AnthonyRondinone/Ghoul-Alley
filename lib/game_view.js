import Game from './game';


class GameView{
  constructor(game, ctx, sound) {
    this.ctx = ctx;
    this.game = game;
    this.modal = "open";
    this.sound = sound;
    this.database = firebase.database();
    this.addHandlers();
    // this.printScores = this.printScores.bind(this);
    this.logScore = this.logScore.bind(this);
  }

  start() {
    this.player = this.game.addPlayer();
    this.game.ghoulsOnParade();

    this.sound.fx.BackgroundMusic.volume = 0.6;
    this.sound.fx.BackgroundMusic.play();
    this.sound.fx.BackgroundMusic.loop = true;
    requestAnimationFrame(this.animate.bind(this));
  }


  addHandlers() {
    document.addEventListener('keydown', (e) => {
      switch(e.keyCode) {
        case 37:  // left
          this.player.moveBool.left = true;
          this.player.direction = "left";
          this.player.animationSelector = 4;
          break;
        case 39: // right
          this.player.moveBool.right = true;
          this.player.direction = "right";
          this.player.animationSelector = 0;
          break;
      }
    });

    document.addEventListener('keypress', (e) => {
      switch(e.keyCode) {
        case 32: // punch
          this.player.punch();
          if (this.player.alive) {
            this.sound.fx.nonHit.volume = 0.3;
            this.sound.fx.nonHit.play();
            this.sound.fx.nonHit.currentTime = 0;
          }
          break;
        case 115:
          this.player.alive = true;
          break;
      }
    });


    document.addEventListener('keyup', (e) => {

      switch(e.keyCode) {
        case 37:  // left
          this.player.moveBool.left = false;
          break;
        case 39: // right
          this.player.moveBool.right = false;
          break;
        case 32:
          this.sound.fx.nonHit.currentTime = 0;
          break;
      }
    });

    document.getElementById('mute-off').addEventListener('click', this.controlSound.bind(this));
  }


  controlSound() {
    window.mute = this.sound.mute;
    if (this.sound.muted === false) {
      this.sound.muted = true;
      this.sound.mute();
      let muteStatus = document.getElementById('mute-off');
      muteStatus.id = muteStatus.id.replace('mute-off', 'mute-on');
    } else if (this.sound.muted === true) {
      this.sound.unMute();
      let muteStatus = document.getElementById('mute-on');
      muteStatus.id = muteStatus.id.replace('mute-on', 'mute-off');
      this.sound.muted = false;
    }
  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);
    if (this.player.alive) {

      requestAnimationFrame(this.animate.bind(this));
    }
    if (!this.player.alive) {
      this.sound.fx.splatMan.play();
      this.sound.fx.deadAudio.volume = 0.4;
      this.sound.fx.deadAudio.play();
      this.sound.fx.BackgroundMusic.pause();
      this.sound.fx.BackgroundMusic.currentTime = 0;
      this.sound.fx.modalMusic.currentTime = 0;
      // this.game.endDraw(this.ctx);
      // const scope = this;
      window.setTimeout(() => {
        this.sound.fx.modalMusic.play();
      }, 3400);

      this.callInitialModal();
      document.querySelector('.high-form').addEventListener('submit', this.logScore);
    }
  }


  logScore(e) {
    e.preventDefault();
    const input = document.getElementById('initials');
    const initials = input.value;
    const score = this.game.players[0].score;
    let ref = this.database.ref('scores/');

    let data = {
      userInitials: initials,
      userScore: score
    };
    ref.push(data);

    this.closeInitialModal();
    this.retrieveScores();

  }

  retrieveScores() {
    return this.database.ref('scores/').orderByChild('userScore').limitToLast(5).on("value", (snap) => {
      let scores = snap.val();

      const highscores = Object.values(scores);
      let sortedScores = highscores.sort(function(a,b) {return (a.userScore < b.userScore) ? 1 : ((b.userScore < a.userScore) ? -1 : 0);} );

      let parentUl = document.getElementById('score-contain');
      let list = document.querySelectorAll('.score-listing');
      for (var i = 0; i < list.length; i++) {
        list[i].remove();
      }

      for(let i = 0; i < sortedScores.length; i++) {
        let highScore = sortedScores[i];
        let li = document.createElement('li');
        li.innerHTML = highScore.userInitials + ": " + highScore.userScore;
        li.className = 'score-listing';
        parentUl.appendChild(li);
      }
      this.callScoreListModal();
      document.addEventListener('keypress', window.reStartGame);
    });
  }

  callScoreListModal() {
    this.modal = "open";
    let scoreListModal = document.getElementsByClassName('end-mod');
    [].forEach.call(scoreListModal, function(el) {
      el.className = el.className.replace('hidden-score-list', 'show-score-list');
    });
  }

  closeScoreListModal() {
    this.modal = "close";
    let scoreListModal = document.getElementsByClassName('end-mod');
    [].forEach.call(scoreListModal, function(el) {
      el.className = el.className.replace('show-score-list', 'hidden-score-list');
    });
    this.sound.fx.modalMusic.pause();
  }

  callInitialModal() {
    this.modal = "open";
    let input = document.getElementById('initials');
    input.value = "";
    input.placeholder = "enter initials";
    let initialModal = document.getElementsByClassName('enter-initials');
    [].forEach.call(initialModal, function(el) {
      el.className = el.className.replace('hidden-high-score', 'show-high-score');
    });
  }

  closeInitialModal() {
    this.modal = "close";
    let initialModal = document.getElementsByClassName('enter-initials');
    [].forEach.call(initialModal, function(el) {
      el.className = el.className.replace('show-high-score', 'hidden-high-score');
    });
  }


  callStartModal(scope) {
    this.modal = "open";
    let startModal = document.getElementsByClassName('start-modal');
    [].forEach.call(startModal, function(el) {
      el.className = el.className.replace('hidden', 'show');
    });
    scope.sound.fx.modalMusic.currentTime = 0;
    scope.sound.fx.modalMusic.volume = 0.4;
    scope.sound.fx.modalMusic.play();
  }

  closeStartModal() {
    this.modal = "close";
    let startModal = document.getElementsByClassName('start-modal');
    [].forEach.call(startModal, function(el) {
      el.className = el.className.replace('show', 'hidden');
    });
    this.sound.fx.modalMusic.pause();
  }


}

export default GameView;
