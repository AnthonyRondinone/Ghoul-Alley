class Sound {
  constructor() {
    this.fx = {
      modalMusic: new Audio("./assets/sounds/modalMusic.mp3"),
      BackgroundMusic: new Audio("./assets/sounds/BackgroundMusic.mp3"),
      deadAudio: new Audio("./assets/sounds/dead.mp3"),
      nonHit: new Audio("./assets/sounds/nonHit.mp3"),
      punch: new Audio("./assets/sounds/punch.mp3"),
      coin: new Audio("./assets/sounds/coin.mp3"),
      splatMan: new Audio("./assets/sounds/splatMan.wav")
    };
    this.muted = false;
  }


  mute() {
    this.fx.modalMusic.muted = true;
    this.fx.BackgroundMusic.muted = true;
    this.fx.deadAudio.muted = true;
    this.fx.nonHit.muted = true;
    this.fx.punch.muted = true;
    this.fx.coin.muted = true;
    this.fx.splatMan.muted = true;
  }

  unMute() {
    this.fx.modalMusic.muted = false;
    this.fx.BackgroundMusic.muted = false;
    this.fx.deadAudio.muted = false;
    this.fx.nonHit.muted = false;
    this.fx.punch.muted = false;
    this.fx.coin.muted = false;
    this.fx.splatMan.muted = false;
  }



}

export default Sound;
