function drawNormalObject(gl,normalProgram,tMVP,lightMVP,cubeColor,fakeColor,obj,pickingFBO){
	// Set up uniforms & attributes
        gl.uniformMatrix4fv(normalProgram.MVPmatrix,false,tMVP.MVP);
		gl.uniformMatrix4fv(normalProgram.MVPLightMatrix,false,lightMVP.MVP);
		gl.uniformMatrix4fv(normalProgram.view_matrix,false,tMVP.view);
		gl.uniformMatrix4fv(normalProgram.proj_matrix,false,tMVP.projection);
		gl.uniformMatrix4fv(normalProgram.model_matrix,false,tMVP.model);
		gl.uniform3fv(normalProgram.cubecolor_vec,cubeColor);
		gl.uniform3fv(normalProgram.fakecolor_vec,fakeColor);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
        gl.vertexAttribPointer(normalProgram.PositionAttribute, obj.vertexBuffer.itemSize,
            gl.FLOAT, false, 0, 0);
			
		gl.bindBuffer(gl.ARRAY_BUFFER, obj.normalBuffer);
        gl.vertexAttribPointer(normalProgram.NormalAttribute, obj.normalBuffer.itemSize,
            gl.FLOAT, false, 0, 0);
			
			
		//off-screen rendering
		gl.bindFramebuffer(gl.FRAMEBUFFER, pickingFBO);
		gl.uniform1i(normalProgram.bool_test, true);//uOffscreen = uniform boolean in shader
		gl.drawArrays(gl.TRIANGLES, 0, obj.vertexBuffer.numItems);
		
		//on-screen rendering
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.uniform1i(normalProgram.bool_test, false);
		//gl.drawArrays(gl.TRIANGLES, 0, vertices.length/3);	
		gl.drawArrays(gl.TRIANGLES, 0, obj.vertexBuffer.numItems);
	
}