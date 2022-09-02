
// THIS IS CODE THAT GETS RUN ON INITIZLATIZION NOT ON RENDERING

var canvas = document.querySelector("#c");

var gl = canvas.getContext("webgl");

var vertexShaderSource = document.querySelector('#vertex-shader-2d').textContent;
var fragmentShaderSource = document.querySelector('#fragment-shader-2d').text;

var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

var program = createProgram(gl, vertexShader, fragmentShader);

var positionAttributeLocation = gl.getAttributeLovation(program, "a_position");

var positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// three 2d points
var positions = [
  0, 0, 
  0 ,0.5, 
  0.7, 0
]
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);






if(!gl) {
  console.log("no webgl");
}

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
  var program = gl.CreateProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.ProgramParameter(program,gl.LINK_STATUS);
  if(success) {
    return program;

  }

}

///////////////////// 

// THIS IS CODE THAT GETS RUN ON RENDERING 