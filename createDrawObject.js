function createDrawObject(name,model,cubeColor,fakeColor,eyePos,lightPos,spin,translation,scale) {
	var pickObj= new Object();
	pickObj.name = name;
	pickObj.model = model;
	pickObj.cubeColor = cubeColor;
	pickObj.fakeColor = fakeColor;
	pickObj.eyePos = eyePos;
	pickObj.lightPos = lightPos;
	pickObj.spin = spin;
	pickObj.translation = translation;
	pickObj.scale = scale;
	pickObj.draw = true;
	return pickObj;
	
}