// Config
Framer.config.animationPrecision = 30;
// Layer naming and position saving stuff
for (var layerGroupName in PSD) {
	window[layerGroupName] = PSD[layerGroupName];
	PSD[layerGroupName].originalFrame = window[layerGroupName].frame;
};

// variables
var holdCounter = 0;
var menuVisible = false;

function openMenu(_time, _curve){
	Scene.animate({
		properties: {
			x: Scene.originalFrame.x + 300
		},
		time: _time,
		curve: _curve
	});
	menuVisible = true;
};

function closeMenu(_time, _curve){

	Scene.animate({
		properties: {
			x: Scene.originalFrame.x
		},
		time: _time,
		curve: _curve
	});
	menuVisible = false;
};

MenuButton.on('click', function () {
	var time = 250;
	var curve = 'ease-in-out';
	if(!menuVisible){
		openMenu(time, curve);
	}
	else{
		closeMenu(time, curve);
	}
});

// adding dragable to objects

Attribut_left01.html = 'komplex';
Attribut_right01.html = 'einfach';

Attribut_left01.addClass('attribute_left');
Attribut_right01.addClass('attribute_right');


Object01.dragger = new ui.Draggable(Object01);

Object01.on(Events.DragMove, function () {
	// limit to one axis
	var maxDistance = 150;
	var direction = getDirection(Object01);
	var distance;

	if(direction[0] === 'x'){
		Object01.y = 0;
		distance = Math.abs(Object01.originalFrame.x - Object01.x);
		if(direction[1] === 'left'){
			Attribut_left01.style ={
				fontSize: mapDistance(distance)
			};
			if(distance >= maxDistance ){
				Object01.x = -maxDistance;
			}
		}
		else if(direction[1] === 'right'){
			Attribut_right01.style ={
				fontSize: mapDistance(distance)
			};
			if(distance >= maxDistance ){
				Object01.x = maxDistance ;
			}
		}
	}
	else if(direction[0] === 'y'){
		Object01.x = 0;
		distance = Math.abs(Object01.originalFrame.y - Object01.y);
		if(distance >= maxDistance ){
			console.log('distance bigger Max Distance');
			if(direction[1] === 'up'){
				Object01.y = maxDistance;
			}
			else if(direction[1] === 'down'){
				Object01.y = maxDistance * (-1);
			}
		}
	}
	console.log(distance);
});

Object01.dragger.on(Events.DragEnd, function () {
	console.log('Drag End! ' + Object01.originalFrame.x + ' / ' + Object01.originalFrame.y);
	Object01.animate({
			properties:{
				x: Object01.originalFrame.x,
				y: Object01.originalFrame.y
			},
			time: 100,
			curve: 'spring(200,10,500)'
		});

	holdCounter = 0;
});


function getDirection(_currObj) {
	var direction = [];
	// horizontal
	if( Math.abs(_currObj.originalFrame.x - _currObj.frame.x) > Math.abs(_currObj.originalFrame.y - _currObj.frame.y)){
		direction.push('x');
		// left
		if (_currObj.originalFrame.x > _currObj.frame.x) {
			direction.push('left');
		}
		// right
		else{
			direction.push('right');
		}
	}
	// vertikal
	else{
		direction.push('y');
		// up
		if (_currObj.originalFrame.y > _currObj.frame.y) {
			direction.push('up');
		}
		// down
		else{
			direction.push('down');
		}
	}
	console.log(direction);
	return direction;
};

var mapDistance = function(_distance){
	var scaleFactor = _distance;
	if(scaleFactor < 1){ scaleFactor = 1};
	scaleFactor = scaleFactor + 'px';
	console.log(scaleFactor);
	return scaleFactor;
}