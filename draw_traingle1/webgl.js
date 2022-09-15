

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if(success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program,gl.LINK_STATUS);
  if(success) {
    return program;
  }
}


function main() {
  // THIS IS CODE THAT GETS RUN ON INITIZLATIZION NOT ON RENDERING

  // make_array();


  var canvas = document.querySelector("#c");
  var gl = canvas.getContext("webgl");
  if(!gl) {
    console.log("no webgl");
  }
  
  var vertexShaderSource = document.querySelector('#vertex-shader-2d').text;
  var fragmentShaderSource = document.querySelector('#fragment-shader-2d').text;

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  var program = createProgram(gl, vertexShader, fragmentShader);

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  var positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // three 2d points
  // var positions = [
  //   0, 0, 
  //   0 ,0.5, 
  //   0.7, 0,
  // ]
  var positions = make_array();
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  ///////////////////// 

  // THIS IS CODE THAT GETS RUN ON RENDERING 

  // let css determine size and match
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // clip space to pixies
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // clear canvas
  gl.clearColor(0,0,0,0);
  gl.clear(gl.COLOR_BUFFER_BIT); // TODO ?

  // tell it to use our program 
  gl.useProgram(program);


  gl.enableVertexAttribArray(positionAttributeLocation);

  // bind the position buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // TODO ?

  // tell the attrivture how to get data out of position buffer (ARRAY_BUFFER)
  var size = 2;           // 2 componenets per iteration 
  var type = gl.FLOAT;    // the data is 32bit floats
  var normalize = true;  // don't normalize the data ??? 
  var stride = 0;         // 0 = move forward size * sizeof(type) each iteration to get the next psotion 
  var offset = 0;         // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset);

  var primativeType = gl.POINTS;
  var offset = 0; 
  var count = positions.length / 2;
  gl.drawArrays(primativeType, offset, count);
}

main();

// every time a number from 0 to 1 is passed in it will be multiplied by this 
// const scale = 1000




function make_array() {

  let canvas = document.querySelector("#c");

    width = canvas.clientWidth;
    height = canvas.clientHeight;

    console.log(canvas.clientWidth, canvas.clientHeight);
    console.log(canvas.width, canvas.height);
    

    let in_set = []
    // const max_iterations = 80
    // let scale = 1000;
    // // -2 to .6 on x ----- -1 to 1 on y 
    // for(let x = -1600; x < 1600; x++) {
    //   for(let y = -1600; y < 1600; y++) {


    //     let iters = mandlebrot(x / 800 , y / 800)

    //     if(iters === 0) {
    //       // console.log(x / 800, y /800 )

    //       // 
    //       in_set.push(x /800, y/ 800)
    //     }x
        
    //   }
    // }

    const max_iterations = 80
    let scale = 800;
    // -2 to .6 on x ----- -1 to 1 on y 
    for(let x = -2 * scale; x < 2 * scale; x++) {
      
      for(let y = -2 * scale; y < 2 * scale; y++) {

        console.log()

        let new_x = x / scale;
        let new_y = y / scale;

      
        let iters = mandlebrot(new_x, new_y)
        if(iters === 0) {

          // convert -2 to .6 x to -1 to 1      -.6 - 2 = 1.6 scaled down to 1 --- 1/1.6
          in_set.push(new_x * .5, new_y * .5, 7)
        }x
        
      }
    }

    console.log(in_set)


    return in_set
  }


  // x + iy is complex number
  //  z_{n+1}=z_{n}^{2}+c    --- remains bounded after c (a complex number) is applied to this repetatively
  function mandlebrot(x, y) {

    // get source 
    c_r = x;
    c_i = y;
    z_r = 0.0;
    z_i = 0.0;
    for(var i = 1 ; i < 80 ; i++) {
      z_r2 = (z_r * z_r) - (z_i * z_i) + c_r;
      z_i = (2 * z_r * z_i) + c_i;
      z_r = z_r2;
      if( ( (z_r * z_r) + (z_i * z_i)) > 2) {
        return i;
        }
      }
    return 0;
    
  }