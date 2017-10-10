function createModel(gl,vertices,normalArr) {
	var vertexPos = new Float32Array(vertices);
	// vertex normals array
    var vertexNormals = new Float32Array(normalArr);
	
	var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = vertexPos.length/3;
	
	// create buffer for vertex normals
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals, gl.STATIC_DRAW);
    normalBuffer.itemSize = 3;
    normalBuffer.numItems = vertexNormals.length/3;
	
	return {
		vertexBuffer: trianglePosBuffer,
		normalBuffer: normalBuffer
	};
}