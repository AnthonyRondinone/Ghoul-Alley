

export const distance = (playerXPos, ghoul) => {
  if(ghoul.startSide === -20) {
    return (Math.abs((playerXPos + 70) - ghoul.dx));
  } else{
    return (Math.abs((playerXPos + 170) - ghoul.dx));
  }
};
