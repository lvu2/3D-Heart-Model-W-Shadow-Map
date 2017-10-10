function myMVP (m4, eyeVec,translateVec,scaleVec,degree,rotate) {
	var eye = eyeVec;
    var target = [0,0,0];
    var up = [0,1,0];
    var tCamera = m4.inverse(m4.lookAt(eye,target,up));
    var tProjection = m4.perspective(Math.PI/3,1,1,100);
	if(!rotate)
		degree=0;
		
    // Move and size left atrium
    var tModel = m4.multiply(m4.scaling(scaleVec),//1+parseInt(slider1.value),1+parseInt(slider1.value),1+parseInt(slider1.value)]),
	m4.axisRotation([0, 1, 0], degree*(Math.PI/180)));//Auto Rotate around y axis
	tModel = m4.translate(tModel, translateVec);
    var tMVP=m4.multiply(m4.multiply(tModel,tCamera),tProjection);
	return {
		MVP: tMVP,
		model: tModel,
		view: tCamera,
		projection: tProjection
	};
}