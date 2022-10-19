




  let height = 2160;
  let width = 3840;

  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {

      let new_x = (x-width/2) / (height/2) - 0.55
      let new_y = (y-height/2) / (height/2)




      let iterations = mandlebrot(new_x,new_y, width, height);

      console.log(x, y, iterations * 8);
    }
  }


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