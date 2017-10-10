// draw heart using WebGL
//
// written by Louis Vu on October 1, 2017
var array = [];
function start() { "use strict";
	var OFFSCREEN_WIDTH = 2048;
	var OFFSCREEN_HEIGHT = 2048;
    var canvas = document.getElementById("mycanvas");
	var width = canvas.width;
	var height = canvas.height;
	var gl = canvas.getContext("webgl");
    var m4 = twgl.m4;
	var slider1 = document.getElementById('slider1');
	slider1.value = 0;
	var slider2 = document.getElementById('slider2');
	slider2.value = 0;
	var degree = 0;
	var readout = new Uint8Array(1*1*4);//read one pixel
	var normalProgram = normalSetup(gl);
	var shadowProgram = shadowSetup(gl);
	
	/*************PICKING TEXTURE SETUP*************/
	var pickingFBO = initFramebufferObject(gl,canvas.width,canvas.height);
	
	/*************SHADOW TEXTURE SETUP**************/
	var fbo = initFramebufferObject(gl,OFFSCREEN_WIDTH,OFFSCREEN_HEIGHT);
	gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, fbo.texture);

    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);
	/***********************************************/

    // we need to put the vertices into a buffer so we can
    // block transfer them to the graphics hardware
	var vertices = vertCalc(LoadedOBJFiles["Human_heart.obj"].groups['Ventriculos_Cube.001' ]);
	var normalArr = normCalc(LoadedOBJFiles["Human_heart.obj"].groups['Ventriculos_Cube.001' ]);
    var ventricleModel = createModel(gl,vertices,normalArr);
	var pickObj= createDrawObject("Ventricle",ventricleModel,[.868,.278,.161],[1,0,0],[0,7,9],[0,7,2],true,[0,0,0],[.3,.3,.3]);
	array.push(pickObj);
	
	vertices = vertCalc(LoadedOBJFiles["Human_heart.obj"].groups['Aorta_Cube.003' ]);
	normalArr = normCalc(LoadedOBJFiles["Human_heart.obj"].groups['Aorta_Cube.003' ]);
	var aortaModel = createModel(gl,vertices,normalArr);
	var pickObj= createDrawObject("Aorta",aortaModel,[.831,0,0],[0,1,0],[0,7,9],[0,7,2],true,[0,0,0],[.3,.3,.3]);
	array.push(pickObj);
	
	vertices = vertCalc(LoadedOBJFiles["Human_heart.obj"].groups['Auricula_der_Cube.002' ]);
	normalArr = normCalc(LoadedOBJFiles["Human_heart.obj"].groups['Auricula_der_Cube.002' ]);
	var leftAtriumModel = createModel(gl,vertices,normalArr);
	var pickObj= createDrawObject("Left Atrium",leftAtriumModel,[1,.913,.525],[0,0,1],[0,7,9],[0,7,2],true,[0,0,0],[.3,.3,.3]);
	array.push(pickObj);
	
	vertices = vertCalc(LoadedOBJFiles["Human_heart.obj"].groups['Auricula_izq_Cube.004' ]);
	normalArr = normCalc(LoadedOBJFiles["Human_heart.obj"].groups['Auricula_izq_Cube.004' ]);
	var rightAtriumModel = createModel(gl,vertices,normalArr);
	var pickObj= createDrawObject("Right Atrium",rightAtriumModel,[.64,.74,.84],[1,1,0],[0,7,9],[0,7,2],true,[0,0,0],[.3,.3,.3]);;
	array.push(pickObj);
	
	vertices = vertCalc(LoadedOBJFiles["Human_heart.obj"].groups['Arteritas_Cube.005' ]);
	normalArr = normCalc(LoadedOBJFiles["Human_heart.obj"].groups['Arteritas_Cube.005' ]);
	var arteryModel = createModel(gl,vertices,normalArr);
	var pickObj= createDrawObject("Artery",arteryModel,[1,0,0],[0,1,1],[0,7,9],[0,7,2],true,[0,0,0],[.3,.3,.3]);
	array.push(pickObj);
	
	vertices = vertCalc(LoadedOBJFiles["Human_heart.obj"].groups['Venitas_Cube.006' ]);
	normalArr = normCalc(LoadedOBJFiles["Human_heart.obj"].groups['Venitas_Cube.006' ]);
	var veinModel = createModel(gl,vertices,normalArr);
	var pickObj= createDrawObject("Vein",veinModel,[0,0,1],[1,0,1],[0,7,9],[0,7,2],true,[0,0,0],[.3,.3,.3]);
	array.push(pickObj);
	
	var box = getBox(gl);
	var pickObj= createDrawObject("Box",box,[1,1,0],[1,1,1],[0,7,9],[0,7,2],false,[0,-2,0],[4,4,4]);
	array.push(pickObj);
	
    // Scene (re-)draw routine
    setInterval(function draw() {
		/*********************************SHADOW BUFFER*******************************/
		gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.viewport(0, 0, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(shadowProgram);

		for (var i = 0; i < array.length; i++) {
			var tmp = array[i];
			if(!tmp.draw)
				continue;
			var tMVP=myMVP(m4,tmp.lightPos,tmp.translation,tmp.scale,degree,tmp.spin);
			drawShadowObject(gl,tMVP,shadowProgram,tmp.model);
		}
		
		// Clear screen, prepare for rendering
		FBO_prep(gl,pickingFBO);

        gl.viewport(0, 0, canvas.width, canvas.height);

        gl.useProgram(normalProgram);
        gl.uniform1i(normalProgram.u_ShadowMap, 0);
		
		for (var i = 0; i < array.length; i++) {
			var tmp = array[i];
			if(!tmp.draw)
				continue;
			tmp.eyePos[0] = parseInt(slider1.value);
			var tMVP=myMVP(m4,tmp.eyePos,tmp.translation,tmp.scale,degree,tmp.spin);
			var lightMVP=myMVP(m4,tmp.lightPos,tmp.translation,tmp.scale,degree,tmp.spin);
			drawNormalObject(gl,normalProgram,tMVP,lightMVP,tmp.cubeColor,tmp.fakeColor,tmp.model,pickingFBO);
		}
		degree+=.5;
    },100);
	/******Clicking on the canvas******/
	canvas.addEventListener('mousedown', handleMouseDown, false);
	var x = 0;
	var y = 0;
	function handleMouseDown(event) {
		//var x, y, 
		var top = 0;
		var obj = canvas;
		var left = 0;
		while (obj && obj.tagName !== 'BODY') {
			top += obj.offsetTop;
			left += obj.offsetLeft;
			obj = obj.offsetParent;
		}
		left += window.pageXOffset;//For browser scrolling?
		top -= window.pageYOffset;//For browser scrolling?
		x = event.clientX-left;
		y = canvas.height - (event.clientY-top);
		
		/******Reading pixels from the offscreen framebuffer******/
		gl.bindFramebuffer(gl.FRAMEBUFFER, pickingFBO);
		gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,readout);
		gl.bindFramebuffer(gl.FRAMEBUFFER,null);//clear
		if ((255==readout[0] && 255==readout[1] && 255==readout[2]) ||
			(0==readout[0] && 0==readout[1] && 0==readout[2])) {
				for (var i = 0; i < array.length; i++) {
					if (array[i] != tmp && array[i].name != "Box") {
						array[i].draw = true;
					}
				}
				return;
		}
		for(var i = 0;i < array.length;i++){
			var tmp = array[i];
			if (tmp.fakeColor[0]*255==readout[0] && tmp.fakeColor[1]*255==readout[1] && tmp.fakeColor[2]*255==readout[2]) {
				for (var j = 0; j < array.length; j++) {
					if (array[j] != tmp && array[j].name != "Box") {
						array[j].draw = false;
					}
				}
				break;
			}
		}
	}
	/*********************************/
}
