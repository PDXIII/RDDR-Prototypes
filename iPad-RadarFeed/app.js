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
var triggerOffset = 10;
var globalAnimationTime = 100;
var globalAnimationCurve = 'spring(400,10,500)';
var globalDirection, globalDistance;
var directionSet = false;

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

Attribut_left01.animate({
	properties:{
		scale: .5
	},
	time:0,
	origin: '100% 50%'
});

Attribut_right01.animate({
	properties:{
		scale: .5,
	},
	time:0,
	origin: '0% 50%'
});

MoreInfo.animate({
	properties:{
		scale: 0,
	},
	time:0,
	origin: '50% 50%'
});

Skip.animate({
	properties:{
		scale: 0,
	},
	time:0,
	origin: '50% 50%'
});

// Result.animate({
// 	properties: {
// 		scale: 0,
// 	},
// 	time: 0,
// 	origin: '50% 50%'
// });


var makeItInvisible = function ( subView, index){
	subView.opacity = 0;
}

var makeItVisible = function ( subView, index){
	utils.delay(250 * index, function(){
		subView.scale = .1;
		subView.animate({
				properties: {
					scale: 1,
					opacity: 1
				},
				curve: globalAnimationCurve
			});	
	})
};

Result._subViews.forEach(makeItInvisible);

Object01.addSubView(ColorLayer);
ColorLayer.addClass('colorLayer');

Object01.dragger = new ui.Draggable(Object01);
// console.log(Object01.x + ' / ' + Object01.y);

Object01.on(Events.DragMove, function () {
	// limit to one axis
		globalDirection = getDirection(Object01);
		animateWords(Object01, globalDirection);
});


Object01.dragger.on(Events.DragEnd, function () {
	if (globalDistance >= maxDistance - triggerOffset ){
		dragObjDisappears(Object01);
	}
	else{
		dragObjReset(Object01);
	}
});

function animateWords(_dragObj, _direction){
	var direction = _direction;
	var distance;

	if(direction[0] === 'x'){
		_dragObj.y = 0;
		distance = getXDistance(_dragObj);
		if(direction[1] === 'left'){
			_dragObj.superView._subViews[4]._subViews[1].scale = getScaleFactor(distance, .5);
			if(distance >= maxDistance ){
				_dragObj.x = -maxDistance;
			}
		}
		else if(direction[1] ==='right'){

			_dragObj.superView._subViews[4]._subViews[2].scale = getScaleFactor(distance, .5);
			if(distance >= maxDistance ){
				_dragObj.x = maxDistance;
			}
		}
	}
	else{
		_dragObj.x = 30;
		distance = getYDistance(_dragObj);
		if(direction[1] === 'up'){
			_dragObj.superView._subViews[2].scale = getScaleFactor(distance, 0);
			if(distance >= maxDistance ){
				_dragObj.y = -maxDistance;
			}
		}
		else if (direction[1] === 'down'){
			_dragObj.superView._subViews[3].scale = getScaleFactor(distance, 0);
			if(distance >= maxDistance ){
				_dragObj.y = maxDistance;
			}
		}
	}
	// tint and untint the _dragObj
	if (distance >= maxDistance - triggerOffset) {
		_dragObj._subViews[0].opacity = .5;
	}
	else{
		_dragObj._subViews[0].opacity = 0;
	}
	globalDistance = distance;
}

function getDirection(_dragObj) {
	var direction = [];
	// horizontal
	if( getXDistance(_dragObj) > getYDistance(_dragObj)){
		direction.push('x');
		// left
		if (_dragObj.originalFrame.x > _dragObj.frame.x) {
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
		if (_dragObj.originalFrame.y > _dragObj.frame.y) {
			direction.push('up');
		}
		// down
		else{
			direction.push('down');
		}
	}
	directionSet = true;
	// console.log(directionSet);
	// console.log(direction);
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

// deprecated
var getFontsize = function(_distance){
	var attrFontSize = _distance/3;
	if(attrFontSize < 24){ attrFontSize = 24};
	attrFontSize = attrFontSize + 'px';
	console.log(attrFontSize);
	return attrFontSize;
}

var getScaleFactor = function(_distance, _low2){
	var value = _distance;
	var low1 = 0;
	var high1 = maxDistance;
	// var low2 = .5;
	var low2 = _low2;
	var high2 = 1;

	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

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

function dragObjDisappears (_dragObj) {
	switch (globalDirection[1]){
		case 'left':
			_dragObj.animate({
				properties: {
					x: -400
				},
				curve: globalAnimationCurve
			});
			// Result.scale = 1;
			utils.delay(250, function (){
				animateResult(_dragObj);
			});
			break;
		case 'right':
			_dragObj.animate({
				properties: {
					x: 400
				},
				curve: globalAnimationCurve
			});
							// Result.scale = 1;
			utils.delay(250, function (){
				animateResult(_dragObj);
			});
			break;
		case 'up':
			_dragObj.animate({
				properties: {
					y: -400
				},
				curve: globalAnimationCurve
			});

			// window.location.reload()
			break;

		case 'down':
			_dragObj.animate({
				properties: {
					y: 400
				},
				curve: globalAnimationCurve
			});
			window.location.reload();
			break;
	}
};

function dragObjReset (_dragObj) {
	_dragObj.animate({
		properties:{
			x: _dragObj.originalFrame.x,
			y: _dragObj.originalFrame.y
		},
		curve: globalAnimationCurve
	});

	switch(globalDirection[1]){
		case 'left':
			animateToSmallType(_dragObj.superView._subViews[4]._subViews[1]);
			break;
		case 'right':
			animateToSmallType(_dragObj.superView._subViews[4]._subViews[2]);
			break;
		case 'up':
			animateToSmallType(_dragObj.superView._subViews[2]);
			break;
		case 'down':
			animateToSmallType(_dragObj.superView._subViews[3]);
			break;
		}
}

function animateToSmallType (_currView){
	// console.log(_currView.name);
	_currView.animate({
		properties:{
			scale: .5
		},
		curve: globalAnimationCurve
	});
}

function animateResult(_dragObj){
	switch(globalDirection[1]){
		case 'left':
			_dragObj.superView._subViews[0]._subViews.forEach(makeItVisible);
			break;
		case 'right':
			_dragObj.superView._subViews[0]._subViews.reverse().forEach(makeItVisible);
			break;
	};
}
