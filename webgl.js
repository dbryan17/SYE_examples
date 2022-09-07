

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
  var positions = [
    0, 0, 
    0 ,0.5, 
    0.7, 0
  ]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  ///////////////////// 

  // THIS IS CODE THAT GETS RUN ON RENDERING 

  // let css determine size and match
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // clip space to pixies
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // clear canvas
  gl.clearColor(0,0,0,0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // tell it to use our program 
  gl.useProgram(program);


  gl.enableVertexAttribArray(positionAttributeLocation);

  // bind the position buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // tell the attrivture how to get data out of position buffer (ARRAY_BUFFER)
  var size = 2;           // 2 componenets per iteration 
  var type = gl.FLOAT;    // the data is 32bit floats
  var normalize = false;  // don't normalize the data 
  var stride = 0;         // 0 = move forward size * sizeof(type) each iteration to get the next psotion 
  var offset = 0;         // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset);

  var primativeType = gl.TRIANGLES;
  var offset = 0; 
  var count = 3;
  gl.drawArrays(primativeType, offset, count);
}

main();











