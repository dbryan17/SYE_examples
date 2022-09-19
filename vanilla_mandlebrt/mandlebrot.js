


// helper function to convert x and y cordoinates into the element of the clamped aray
// to set for the red color

/*
params:
x - x cord
y - y cord
width - width of canvas 
color - (0 = red, 1=green, 2=blue, opage=3)
*/
function getIdx(x, y, width, color) {
  let red = y * (width * 4) + x * 4;
  return red + color
}

function draw() {
  let mandCanvas = document.querySelector("#mandlbrotCanvas");
  let mandCtx = mandCanvas.getContext('2d');
  let scale =  1
  mandCanvas.width  = 1280 * scale;
  mandCanvas.height = 739 * scale;
  // client width in width of inner canvas in pixels
  let width = mandCanvas.width 
  let height = mandCanvas.height
  //let width = 1280;
  //let height = 1280;

  console.log(width, height)
  

  // make array of size width * height * 4 because each element will be rgba
  let pixelData = new Uint8ClampedArray(width * height * 4)

  // iterate over very pixel
  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      // x is x position of pixel, y is y position of pixel 
      // that we want to set color of

      // get x and y to an approioate scale for the mandlebrot set, and keep it correctly
      // scaled in terms of not morphing the data

      // shift x over by .55 too 
      let new_x = 2*(x-width/2) / height - 0.55
      let new_y = 2*(y-height/2) / height

      // find the amount of iterations (0 if in set) to get above 4 outside 0 
      let iterations = mandlebrot(new_x,new_y);

      // *** WHAT THEY DID IN EXAMPLE DIFFERENT FROM MDN ***
      pixelData[((y * width + x)*4) + 1] = iterations * 8;
      pixelData[(y * width + x)*4 + 3] = 255;


      let red = getIdx(new_x, new_y, width, 0)

      // set color of red at x,y to iterations * 8 to get it to 0 - 256
      // pixelData[red] = iterations * 8;

      // make opaque
      //pixelData[red+ 3] = 255;

    }

  }
  // get image data object from width and height and the pixel data 
  let data = new ImageData(pixelData, width, height);

  // put the image data in the context
  mandCtx.putImageData(data, 0,0)


}

// source: https://forest-flower.com/projects/fractal/#Javascript
function mandlebrot(x, y) {
	// People have made libraries for complex algebra
	// but the math is pretty simple.
	c_r = x;
	c_i = y;
	z_r = 0.0;
	z_i = 0.0;
  //iterations: 33
	for(var i = 1 ; i < 33 ; i++) {
		z_r2 = (z_r * z_r) - (z_i * z_i) + c_r;
		z_i = (2 * z_r * z_i) + c_i;
		z_r = z_r2;
		if( ( (z_r * z_r) + (z_i * z_i)) > 4) {
			return i;
			}
		}
	return 0;
}


function mouseDown(e) {
  e.preventDefault();

  startX = parseInt(e.clientX);
  startY = parseInt(e.clientY);
  console.log(startX, startY);
  isDown=true;



  console.log(e);


}

function mouseMove(e) {

  let mouseX = parseInt(e.clientX);
  let mouseY = parseInt(e.clientY);

  // width and height of the box to be drawn based on 
  // starting and this current
  let width = mouseX - startX;
  let height = mouseY - startY;

  // clear rect that is on the cvans now
  rectCtx.clearRect(0,0, rectCanvas.width, rectCanvas.height);
  rectCtx.strokeRect(startX, startY, width, height);



  e.preventDefault();

  if(isDown) {

    ctx.stroke

  }
  

}


let rectCanvas = document.querySelector("#rectCanvas");
var isDown = false;
var rectCtx = rectCanvas.getContext('2d');
var startX;
var startY;
rectCanvas.addEventListener("mousedown", e => mouseDown(e));
rectCanvas.addEventListener("mousemove", e => mouseMove(e));



draw();