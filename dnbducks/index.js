const kick = new Audio('./media/707 Kick.flac');
const snare = new Audio('./media/808 Snare.flac');
const hat = new Audio('./media/808 ClosedHat.flac');
const cowbell = new Audio('./media/808 Cowbell.flac');

const kickDuck = document.querySelector('#kick_duck');
const snareDuck = document.querySelector('#snare_duck');
const hatDuck = document.querySelector('#hat_duck');
const cowbellDuck = document.querySelector('#cowbell_duck');

kickDuck.addEventListener('click', () => {
  let kickAudio = kick.cloneNode();
  kickAudio.play();
  kickAudio.remove();
});

snareDuck.addEventListener('click', () => {
  let snareAudio = snare.cloneNode();
  snareAudio.play();
  snareAudio.remove();
});

hatDuck.addEventListener('click', () => {
  let hatAudio = hat.cloneNode();
  hatAudio.play();
  hatAudio.remove();
});

cowbellDuck.addEventListener('click', () => {
  let cowbellAudio = cowbell.cloneNode();
  cowbellAudio.play();
  cowbellAudio.remove();
});