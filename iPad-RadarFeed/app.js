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
var maxDistance = 155;
var triggerOffset = 20;
var globalDirection, globalDistance;

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


Attribut_left01.html = 'komplex';
Attribut_right01.html = 'einfach';

Attribut_left01.addClass('attribute_left');
Attribut_right01.addClass('attribute_right');

// ColorLayer.opacity = 0;

var ColorLayer = new View({
  width: 235,
  height: 235,
  x: 2,
  y: 1,
  style:{
  	opacity: 0,
    backgroundColor: '#ff00c1'
  },
});

Object01.addSubView(ColorLayer);
ColorLayer.addClass('colorLayer');

Object01.dragger = new ui.Draggable(Object01);

Object01.on(Events.DragMove, function () {
	// limit to one axis

	var direction = getDirection(Object01);
	var distance;

	switch(direction[1]){
		case 'left':
			distance = getXDistance(Object01);
			Object01.y = 0;
			Attribut_left01.style ={
				fontSize: getFontsize(distance)
			}
			if(distance >= maxDistance ){
				Object01.x = -maxDistance;
			}
			break;
		case 'right':
			distance = getXDistance(Object01);
			Object01.y = 0;
			Attribut_right01.style ={
				fontSize: getFontsize(distance)
			}
			if(distance >= maxDistance ){
				Object01.x = maxDistance;
			}
			break;
		case 'up':
			distance = getYDistance(Object01);
			Object01.x = 0;
			if(distance >= maxDistance ){
				Object01.y = -maxDistance;
				}
			break;
		case 'down':
			distance = getYDistance(Object01);
			Object01.x = 0;
			if(distance >= maxDistance ){
				Object01.y = maxDistance;
				}
			break;
	}

	if (distance >= maxDistance - triggerOffset) {
		ColorLayer.opacity = .5;
	}
	else{
		ColorLayer.opacity = 0;
	}
	console.log(distance);
	globalDistance = distance;
	globalDirection  = direction;
});

Object01.dragger.on(Events.DragEnd, function () {
	// console.log('Drag End! ' + Object01.originalFrame.x + ' / ' + Object01.originalFrame.y);
	console.log('Drag End! ' + globalDistance + ' / ' + globalDirection[1]);
	if (globalDistance >= maxDistance - triggerOffset ){
		// ColorLayer.opacity = 1;
		switch (globalDirection[1]){
			case 'left':
				Object01.animate({
					properties: {
						x: -400
					},
					time: 300,
					curve: 'spring(200,10,500)'
				});
				break;
			case 'right':
				Object01.animate({
					properties: {
						x: 400
					},
					time: 300,
					curve: 'spring(200,10,500)'
				});
				break;
			case 'up':
				Object01.animate({
					properties: {
						y: -400
					},
					time: 300,
					curve: 'spring(200,10,500)'
				});
				break;
			case 'down':
				Object01.animate({
					properties: {
						y: 400
					},
					time: 300,
					curve: 'spring(200,10,500)'
				});
				break;
		}
	}
	else{
		Object01.animate({
			properties:{
				x: Object01.originalFrame.x,
				y: Object01.originalFrame.y
			},
			time: 100,
			curve: 'spring(200,10,500)'
		});

		Attribut_left01.style.fontSize = '24px';
		Attribut_right01.style.fontSize = '24px';
	}
	
});

function getDirection(_currObj) {
	var direction = [];
	// horizontal
	if( getXDistance(_currObj) > getYDistance(_currObj)){
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

function getXDistance(_dragObj){
	var xDistance = Math.abs(_dragObj.originalFrame.x - _dragObj.x)
	return xDistance;
}

function getYDistance(_dragObj){
	var yDistance = Math.abs(_dragObj.originalFrame.y - _dragObj.y)
	return yDistance;
}

var getFontsize = function(_distance){
	var attrFontSize = _distance/3;
	if(attrFontSize < 24){ attrFontSize = 24};
	attrFontSize = attrFontSize + 'px';
	console.log(attrFontSize);
	return attrFontSize;
}