function normalSetup(gl){
	/*************NORMAL PROGRAM SETUP**************/
	//Read shader source
    var vertexSource = document.getElementById("vs").text;
    var fragmentSource = document.getElementById("fs").text;
    var normalProgram = shadersSetup(gl,vertexSource,fragmentSource);
	// with the vertex shader, we need to pass it positions
    // as an attribute - so set up that communication
    normalProgram.PositionAttribute = gl.getAttribLocation(normalProgram, "aPos");
    gl.enableVertexAttribArray(normalProgram.PositionAttribute);
	
	normalProgram.NormalAttribute = gl.getAttribLocation(normalProgram, "vnormal");
    gl.enableVertexAttribArray(normalProgram.NormalAttribute);
	
	// this gives us access to the matrix uniform
    normalProgram.MVPmatrix = gl.getUniformLocation(normalProgram,"uMVP");
	normalProgram.MVPLightMatrix = gl.getUniformLocation(normalProgram,"u_MvpMatrixFromLight");
	normalProgram.u_ShadowMap = gl.getUniformLocation(normalProgram, 'u_ShadowMap');
	normalProgram.cubecolor_vec = gl.getUniformLocation(normalProgram,"cubecolor");
	normalProgram.view_matrix = gl.getUniformLocation(normalProgram,"view");
	normalProgram.proj_matrix = gl.getUniformLocation(normalProgram,"proj");
	normalProgram.model_matrix = gl.getUniformLocation(normalProgram,"model");
	normalProgram.fakecolor_vec = gl.getUniformLocation(normalProgram,"fakecolor");
	normalProgram.bool_test = gl.getUniformLocation(normalProgram,"uOffscreen");
	/***********************************************/
	return normalProgram;
}