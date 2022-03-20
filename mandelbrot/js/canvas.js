var myCanvas = document.createElement("canvas");;

function createCanvas() {
  // Create Canvas
  myCanvas.width=600;
  myCanvas.height=600;
  document.body.appendChild(myCanvas);
  const ctx = myCanvas.getContext("2d");

}