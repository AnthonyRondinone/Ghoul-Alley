## Ghoul-Alley

### Live (Working) Demo

[Ghoul-Alley](https://anthonyrondinone.github.io/Ghoul-Alley/)


### Background

Anthony steps into an alley, not knowing that it is full of Ghouls.  The object of the game is to stay alive as long as possible and get a point for each ghoul you avoid.  

![Ghoul_Alley Demo](https://media.giphy.com/media/9IFAneTjwemIg/giphy.gif)

### Functionality & MVP  

Ghoul-Alley will allow users to:

- [ ] Walk horizontally to dodge ghouls
- [ ] Punch ghouls once they get too close to stay alive
- [ ] See animated sprite which I created an original, custom sprite sheet
- [ ] Mute and unMute sounds
- [ ] See ghouls fly up and change once they are hit


### Technical Implementation

I utilize JavaScript, HTML5 Canvas and CSS. Sprite sheet animation is achieved through a combination of Canvas `requestAnimationFrame`, and JavaScript; determining how much of the sprit sheet to render and which section of the sprite sheet to render resulting in character movement.  Key control with `eventListeners` also determine which sprites should be iterated through resulting in the correct movements and responsive gameplay for users through VanillaJS.
Collision detection is achieved through calculating distance between ghoul objects and player.  Taking advantage of conditional logic, collision detection works on both sides of the player and well as ghouls coming from both directions.  The player either dies if he does not punch or lives and gets a point if he punches the ghouls.
