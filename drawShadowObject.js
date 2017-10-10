function drawShadowObject(gl,tMVP,shadowProgram,obj){
	// Set up uniforms & attributes
        gl.uniformMatrix4fv(shadowProgram.MVPmatrix,false,tMVP.MVP);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
        gl.vertexAttribPointer(shadowProgram.PositionAttribute, obj.vertexBuffer.itemSize,
            gl.FLOAT, false, 0, 0);
		gl.drawArrays(gl.TRIANGLES, 0, obj.vertexBuffer.numItems);
		/***********************************************/
}