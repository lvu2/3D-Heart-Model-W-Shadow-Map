function FBO_prep (gl,pickingFBO) {
		// Clear screen, prepare for rendering
		gl.bindFramebuffer(gl.FRAMEBUFFER, pickingFBO);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
}