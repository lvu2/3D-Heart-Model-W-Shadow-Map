function getBox (gl) {
	
    var vertices = [];
    var indices = [];

	vertices = new Float32Array([
		1,0,1,		-1,0,1,		-1,0,-1,
		-1,0,-1,	1,0,-1,		1,0,1,
		1,0,-1,		-1,0,-1,	-1,2,-1,
		-1,2,-1,	1,2,-1,		1,0,-1,
		-1,0,1,		-1,0,-1,	-1,2,1,
		-1,0,-1,		-1,2,1,		-1,2,-1
	]);
	var vertexNormals = new Float32Array([
		0,1,0,	0,1,0,	0,1,0,
		0,1,0,	0,1,0,	0,1,0,
		0,0,1,	0,0,1,	0,0,1,
		0,0,1,	0,0,1,	0,0,1,
		1,0,0,	1,0,0,	1,0,0,
		1,0,0,	1,0,0,	1,0,0
	]);
	// we need to put the vertices into a buffer so we can
    // block transfer them to the graphics hardware
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    vertexBuffer.itemSize = 3;
    vertexBuffer.numItems = vertices.length/3;
	
	// create buffer for vertex normals
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals, gl.STATIC_DRAW);
    normalBuffer.itemSize = 3;
    normalBuffer.numItems = vertexNormals.length/3;
	return {
		vertexBuffer: vertexBuffer,
        normalBuffer:	normalBuffer
    };
}