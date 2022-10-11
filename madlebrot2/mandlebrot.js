


// helper function to convert x and y cordoinates into the element of the clamped aray
// to set for the red color

/*
params:
x - x cord
y - y cord
width - width of canvas 
color - (0 = red, 1=green, 2=blue, opage=3)
*/


var prevStartX;
var prevStartY;
var prevWidthScale;
var prevHeightScale;


function getIdx(x, y, width, color) {
  let red = y * (width * 4) + x * 4;
  return red + color
}

function draw(startX, startY, endX, endY, first) {
  // get width and height of canvas - and get context
  var mandCanvas = document.querySelector("#mandlbrotCanvas");
  var mandCtx = mandCanvas.getContext('2d');
  let canWidth = mandCanvas.width;
  let canHeight = mandCanvas.height;

  // get width and height of our new window - this is in terms of 3840 x 2160
  let width = endX - startX;
  let height = endY - startY;

  // maybe do this after to have rela time rendering style if that works - might have to add piece by piece
  mandCtx.clearRect(0, 0, 3840, 2160)

  let width_scale = width / canWidth;
  let height_scale = height / canHeight;


  if(!first) {
    startX = (prevWidthScale * startX) + prevStartX;
    startY = (prevHeightScale * startY) + prevStartY;
    width_scale = width_scale * prevWidthScale;
    height_scale = height_scale * prevHeightScale;
  }


  let newCanHeight;
  let newCanWidth;
  if(height_scale > width_scale) {
    newCanHeight = canHeight;
    newCanWidth = canHeight * (width/height);
    width_scale = (canWidth/newCanWidth) * width_scale

  } else {
    newCanWidth = canWidth;
    newCanHeight = canWidth * (height/width);
    height_scale = (canHeight/newCanHeight) * height_scale
  }






  // make array of size width * height * 4 because each element will be rgba
  let pixelData = new Uint8ClampedArray(3840 * 2160 * 4)

  // new for loop 
  for(let x = 0; x < newCanWidth; x++) {
    for(let y = 0; y < newCanHeight; y++) {

      // this gets the correct new x values for the second iteration
      // scaling is off 
      let new_x = (((width_scale * x) + startX) - 3840/2) / (2160/2) -.55
      let new_y = (((height_scale * y) + startY) - 2160/2) / (2160/2)

      let iterations = mandlebrot(new_x,new_y);


      pixelData[getIdx(x,y, 3840, 1)] = iterations * 8;
      pixelData[getIdx(x,y, 3840, 3)] = 255;



    }
  }

  prevStartX = startX;
  prevStartY = startY;
  prevWidthScale = width_scale;
  prevHeightScale = height_scale;


  // // iterate over very pixel
  // for(let x = startX; x < endX; x++) {
  //   for(let y = startY; y < endY; y++) {
  //     // x is x position of pixel, y is y position of pixel 
  //     // that we want to set color of

  //     // get x and y to an approioate scale for the mandlebrot set, and keep it correctly
  //     // scaled in terms of not morphing the data

  //     // shift x over by .55 too 

  //     // width/2 --- height/2 is shifting up or down on the y/x axis - 1/2 shifts up .5 --- height shifts down by .5
  //     // height/2 changes the squishiness/stretch of the grap
  //     //  shifts left/right - higher is right  zoom      move right/left - right is negative 
  //     let new_x = (x-3840/2) / (2160/2) - 0.55
  //     //             move up     zoom
  //     let new_y = (y-2160/2) / (2160/2)

  //     // let new_y = canvasToCord(x,y)[1];
  //     // let new_x = canvasToCord(x,y)[0];
  //     // let new_y = tmp[1];

  //     // find the amount of iterations (0 if in set) to get above 4 outside 0 
  //     let iterations = mandlebrot(new_x,new_y);


  //     pixelData[getIdx(x,y, 3840, 1)] = iterations * 8;
  //     pixelData[getIdx(x,y, 3840, 3)] = 255;

    

  //     // TDOD make rgb one array element with reducers and such - then turn into one d array

  //     // set color of red at x,y to iterations * 8 to get it to 0 - 256
  //     // pixelData[red] = iterations * 8;

  //     // make opaque
  //     //pixelData[red+ 3] = 255;

  //   }

  // }

  let output = pixelData.reduce((acc, cur) => `${acc}\n${cur}`);

  console.log(pixelData);

  //console.log(output);
  //document.querySelector("#mandlebrotOutput").innerHTML = output;


  // get image data object from width and height and the pixel data 
  let data = new ImageData(pixelData, 3840, 2160);

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
  //iterations: 32
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



var mandCanvas = document.querySelector("#mandlbrotCanvas");
var mandCtx = mandCanvas.getContext('2d');
//let scale =  1
//mandCanvas.width  = 1280 * scale;
//mandCanvas.height = 739 * scale;
// client width in width of inner canvas in pixels
let width = mandCanvas.width;
let height = mandCanvas.height;
draw(0,0,width, height, true);

let rectCanvas = document.querySelector("#rectCanvas");

let rectCtx = rectCanvas.getContext("2d");

// event listners for mouse stuff
rectCanvas.addEventListener("mousedown", e => mouseDown(e));
rectCanvas.addEventListener("mousemove", e => mouseMove(e));
rectCanvas.addEventListener("mouseup", e => mouseUp(e));


// global vars needed for box stuff 
var startX;
var startY;
var isDown;


// set context stuff for rect 
rectCtx.strokeStyle = "red";
rectCtx.lineWidth = 5;


function myDrawRect(startX, startY, endX, endY) {

  let rectWidth = endX - startX - rectCtx.lineWidth;
  let rectHeight = endY - startY - rectCtx.lineWidth;

  console.log(startX, startY);
  console.log(endX, endY);

  draw(startX, startY, endX, endY, false)

  // call draw with right stuff
  // var mandCanvas = document.querySelector("#mandlbrotCanvas");
  // var mandCtx = mandCanvas.getContext('2d');
  // mandCtx.fillStyle = "red";
  // mandCtx.fillRect(startX, startY, rectWidth, rectHeight);

  
  

}

function mouseUp(e) {
  e.preventDefault();
  
  // the 3840/ 356 and 2160/ 200 is to convert from the pixel range to the css size range - 356 and 200 is size of the canvas in css pixels
  let endX = parseInt(e.offsetX) * (3840 / 356);
  let endY = parseInt(e.offsetY) * (2160 / 200);

  isDown = false;
  rectCtx.clearRect(0,0, rectCanvas.width, rectCanvas.height);

  myDrawRect(Math.round(startX), Math.round(startY), Math.round(endX), Math.round(endY));



}



function mouseDown(e) {
  e.preventDefault();


  // the 3840/ 356 and 2160/ 200 is to convert from the pixel range to the css size range - 356 and 200 is size of the canvas in css pixels
  startX = parseInt(e.offsetX) * (3840 / 356) //+ parseInt(e.offsetX);
  startY = parseInt(e.offsetY) * (2160 / 200) //+ parseInt(e.offsetY);
  isDown=true;
  console.log(e);
}

function mouseMove(e) {

  e.preventDefault();

  if(!isDown) {
    return
  }

  // the 3840/ 356 and 2160/ 200 is to convert from the pixel range to the css size range - 356 and 200 is size of the canvas in css pixels 
  let mouseX = parseInt(e.offsetX) * (3840 / 356)
  let mouseY = parseInt(e.offsetY) * (2160 / 200)


  // width and height of the box to be drawn based on 
  // starting and this current
  let width = mouseX - startX;
  let height = mouseY - startY;
  

  // clear rect that is on the cvans now
  rectCtx.clearRect(0,0, rectCanvas.width, rectCanvas.height);
  console.log("here")
  rectCtx.strokeRect(startX, startY, width, height);

  

}

function canvasToCord(canX, canY, width, height) {

  return [(canX-width/2) / (height/2) - 0.55, (canY-height/2) / (height/2)]


}