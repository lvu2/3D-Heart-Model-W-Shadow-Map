/*************SHADOW PROGRAM SETUP**************/
function shadowSetup(gl){
	//Read shader source
	var vertexSource = document.getElementById("vs_shadow").text;
    var fragmentSource = document.getElementById("fs_shadow").text;
	var shadowProgram = shadersSetup(gl,vertexSource,fragmentSource);
	// with the vertex shader, we need to pass it positions
    // as an attribute - so set up that communication
    shadowProgram.PositionAttribute = gl.getAttribLocation(shadowProgram, "aPos");
    gl.enableVertexAttribArray(shadowProgram.PositionAttribute);
	
	// this gives us access to the matrix uniform
    shadowProgram.MVPmatrix = gl.getUniformLocation(shadowProgram,"uMVP");
	return shadowProgram;
}