
function checkIfBelongsToMandelbrotSet(x, y, maxIterations) {
  let realComponentOfResult = x;
  let imaginaryComponentOfResult = y;
  // let maxIterations = 10;

  for(let i = 0; i < maxIterations; i++) {
      // Calculate the real and imaginary components of the result
      // separately
      let tempRealComponent = realComponentOfResult * realComponentOfResult
                              - imaginaryComponentOfResult * imaginaryComponentOfResult
                              + x;

      let tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                              + y;

      realComponentOfResult = tempRealComponent;
      imaginaryComponentOfResult = tempImaginaryComponent;

      // return number as percentage
      if (realComponentOfResult * imaginaryComponentOfResult > 5) {
        return (i/maxIterations * 100);
      }
  }

  return 0; //return 0 if in set
}

function drawMandelbrot(maxIterations = 100) {
  for(let x=0; x < myCanvas.width; x++) {
  for(let y=0; y < myCanvas.height; y++) {
      let belongsToSet = 
            checkIfBelongsToMandelbrotSet(x/magnificationFactor - panX, 
                                          y/magnificationFactor - panY, maxIterations);
      if(belongsToSet === 0) {
          ctx.fillStyle = "#000";
          ctx.fillRect(x,y, 1,1); // Draw a black pixel
      } else {
        ctx.fillStyle = "hsl(0, 100%, " + belongsToSet + "%)";
        ctx.fillRect(x,y, 1,1) // Draw coloured pixel
      }
  } 
  }
}