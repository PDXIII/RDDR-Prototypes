// Config
Framer.config.animationPrecision = 60;
// Layer naming an position saving stuff
for (var layerGroupName in PSD) {
	window[layerGroupName] = PSD[layerGroupName];
	PSD[layerGroupName].originalFrame = window[layerGroupName].frame;
};

// variables

var pink = '#172d4d';
var darkBlue = '#ff00c1';
var resultDotSize = 90;
var menuVisible = false;
var globalDirection, globalDistance;
var globalAnimationCurve = 'spring(400,10,500)';
var minAttrSize = 24;
var maxAttrSize = 36;
var minActionSize = 0;
var maxActionSize = 36;
var startCurve = 'ease-in-out';
var startTime = 150;
var startSpring = 'spring(200,15,600)';
var infoGuiSize = [110, 30, 10]; // width, height, margin

var maxDistance = 155;
var triggerOffset = 5;

function addResultBG (_superView, _resultVote, _resultPercent) {
	var newView01 = new View ({
		width: resultDotSize,
		height: resultDotSize,
		x: 0,
		y: 0,
		style:{
			// backgroundColor: pink,
			opacity: returnOpacity(_resultPercent)
		}
	});
	newView01.sendToBack();
	newView01.addClass('colorLayer');
	_superView.addSubView(newView01);

		var newView02 = new View ({
		width: resultDotSize,
		height: resultDotSize,
		x: 0,
		y: 30,
		html: _resultVote
	});
	newView02.sendToBack();
	newView02.addClass('resultlabel');
	_superView.addSubView(newView02);
}

function addGenom (_objIndex, _dnaIndex, index){
	var genom = new View({
		width: 348,
		height: 30,
		x: 0,
		y: 30*index +30,
	});
	var leftPair = new View({
		width: 140,
		height: 30,
		x: 0,
		y: 0,
		html: db.questions[_dnaIndex].pairs[index][0]
	});
	leftPair.addClass('pair left');
	genom.addSubView(leftPair);

	var valInPercent = returnPercent(db.objects[_objIndex].dna[_dnaIndex].pairs[index]);
	for (var i = 0; i < valInPercent.length; i++){
		var miniResult = new View({
			width: 15,
			height: 15,
			x: i*19 + 148,
			y: 7,
			opacity: returnOpacity(valInPercent[i])
		});
		miniResult.addClass('miniResult');
		genom.addSubView(miniResult);
	}
	var rightPair = new View({
		width: 140,
		height: 30,
		x: 208,
		y: 0,
		html: db.questions[_dnaIndex].pairs[index][1]
	});
	rightPair.addClass('pair right');
	genom.addSubView(rightPair);

	return genom;
}

function addKeyValueView(_objIndex, _key, _keyText, _viewIndex){
	var _currView = new View({
		width: 384,
		height: 30,
		x: 0,
		y: _viewIndex * 30 + 5
	});

	var keyView = new View({
		width: 128,
		height: 30,
		x: 0,
		y: 0,
		html: _keyText
	});
	keyView.addClass('keyView');
	_currView.addSubView(keyView);

	var valueView = new View({
		width: 200,
		height: 30,
		x: 140,
		y: 0,
		html: db.objects[_objIndex][_key]
	});
	valueView.addClass('valueView');
	_currView.addSubView(valueView);
	return _currView;
}

function addInfoHeadline (_headline) {
	var _currView = new View({
		width: 348,
		height: 30,
		x: 0,
		y: 0,
		html: _headline
	});
	_currView.addClass('infoHeadline');
	return _currView;
	// body...
}

function animateWords (_dragObj, _direction) {
	var direction = _direction;
	var distance;

	if(direction[0] === 'x') {
		_dragObj.y = _dragObj.originalFrame.y;
		distance = getXDistance(_dragObj);

		if(direction[1] === 'left') {
			_dragObj.superView._subViews[1]._subViews[0].style.fontSize = getFontSize(distance, minAttrSize, maxAttrSize);
			if(distance >= maxDistance ) {
				_dragObj.x = _dragObj.originalFrame.x - maxDistance;
			}
		}
		else if(direction[1] ==='right') {
			_dragObj.superView._subViews[1]._subViews[2].style.fontSize = getFontSize(distance, minAttrSize, maxAttrSize);
			if(distance >= maxDistance ) {
				_dragObj.x = _dragObj.originalFrame.x + maxDistance;
			}
		}
	}
	else{
		_dragObj.x = _dragObj.originalFrame.x;
		distance = getYDistance(_dragObj);
		if(direction[1] === 'up') {
			_dragObj.superView._subViews[2]._subViews[1].style.fontSize = getFontSize(distance, minActionSize, maxActionSize);
			if(distance >= maxDistance ) {
				_dragObj.y = _dragObj.originalFrame.y - maxDistance;
			}
		}
		else if (direction[1] === 'down') {
			_dragObj.superView._subViews[2]._subViews[0].style.fontSize = getFontSize(distance, minActionSize, maxActionSize);
			if(distance >= maxDistance ) {
				_dragObj.y = _dragObj.originalFrame.y + maxDistance;
			}
		}
	}
	// tint and untint the _dragObj colorLayer
	if (distance >= maxDistance - triggerOffset) {
		_dragObj._subViews[1].opacity = .5;
	}
	 else{
		_dragObj._subViews[1].opacity = 0;
	}
	// console.log(_dragObj.x + ' / ' + _dragObj.y + ' / ' + distance);
	globalDistance = distance;
}

// is called by function dragObjReset()
function animateToSmallType (_currView, _minFontSize) {
	console.log(_currView);
	$(_currView._element).animate({fontSize: _minFontSize}, 1200,'easeOutElastic');
}

// is called by function dragObjDisappears()
function animateResult (_results) {
	switch(globalDirection[1]) {
		case 'left':
			_results._subViews.forEach(makeResultVisible);
			break;
		case 'right':
			_results._subViews.reverse().forEach(makeResultVisible);
			break;
	};
	utils.delay(3000, function () {
		_results._subViews.reverse().forEach(makeResultInVisible);
		utils.delay(400, function () {
			nextObj();
		});
	})
}

// is called by function dragObjDisappears()
function bigAnswer (_answers) {
	_answers.animate({
		properties:{
			opacity: 0,
			scale: 1.5
		},
		time: 200,
		curve: 'ease-in-out'
	});
	utils.delay(200, function () {
		switch (globalDirection[1]) {
			case 'left':
				_answers.html = _answers._subViews[0].html;
				break;
			case 'right':
				_answers.html = _answers._subViews[2].html;
				break;
		}
		_answers._subViews.forEach(makeItInvisible);
		utils.delay(20, function () {
			_answers.animate({
				properties: {
					opacity: 1,
					scale: 1
				},
				curve: startSpring
			});
		});
	});
}

// is called by function dragObjDisappears()
function changeMainQuestion (_mainQuestion) {
	_mainQuestion.animate({
		properties:{
			opacity: 0,
			scale: 1.5
		},
		time: 200,
		curve: 'ease-in-out'
	});
	// console.log(_mainQuestion);
	utils.delay(200, function () {
		_mainQuestion.html = 'Deine Antwort:'
		utils.delay(20, function () {
			_mainQuestion.animate({
				properties: {
					opacity: 1,
					scale: 1
				},
				curve: startSpring
			});
		});
	});
}

function closeMenu (_time, _curve) {
	Scene.animate({
		properties: {
			x: Scene.originalFrame.x
		},
		time: _time,
		curve: _curve
	});
	menuVisible = false;
}

function dragObjDisappears (_dragObj) {
	switch (globalDirection[1]) {
		case 'left':
			_dragObj.animate({
				properties: {
					x: _dragObj.originalFrame.x - 700
				},
				curve: globalAnimationCurve
			});
			// Result.scale = 1;
			changeMainQuestion(_dragObj.superView._subViews[0]);
			bigAnswer(_dragObj.superView._subViews[1]);
			utils.delay(250, function () {
				animateResult(_dragObj.superView._subViews[3]);
			});
			break;
		case 'right':
			_dragObj.animate({
				properties: {
					x: _dragObj.originalFrame.x + 700
				},
				curve: globalAnimationCurve
			});
			// Result.scale = 1;
			changeMainQuestion(_dragObj.superView._subViews[0]);
			bigAnswer(_dragObj.superView._subViews[1]);
			utils.delay(250, function () {
				animateResult(_dragObj.superView._subViews[3]);
			});
			break;
		case 'up':
			_dragObj.animate({
				properties: {
					y: _dragObj.originalFrame.y - 700
				},
				curve: globalAnimationCurve
			});

			// window.location.reload()
			break;

		case 'down':
			_dragObj.animate({
				properties: {
					y: _dragObj.originalFrame.y + 700
				},
				curve: globalAnimationCurve
			});
			utils.delay(100, function () {
				nextObj();
			});
			// window.location.reload();
			break;
	}
}

function dragObjReset (_dragObj) {
	_dragObj.animate({
		properties:{
			x: _dragObj.originalFrame.x,
			y: _dragObj.originalFrame.y
		},
		curve: globalAnimationCurve
	});

	switch(globalDirection[1]) {
		case 'left':
			animateToSmallType(_dragObj.superView._subViews[1]._subViews[0], '24px');
			break;
		case 'right':
			animateToSmallType(_dragObj.superView._subViews[1]._subViews[2]), '24px';
			break;
		case 'up':
			animateToSmallType(_dragObj.superView._subViews[2]._subViews[1], '0px');
			break;
		case 'down':
			animateToSmallType(_dragObj.superView._subViews[2]._subViews[0], '0px');
			break;
		}
}

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDirection (_dragObj) {
	var direction = [];
	// horizontal
	if( getXDistance(_dragObj) > getYDistance(_dragObj)) {
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
	// console.log(direction);
	return direction;
}

var getFontSize = function (_distance, _minFontSize, _maxFontSize) {
	var attrFontSize = map_range(_distance,0 , 155, _minFontSize, _maxFontSize);
	attrFontSize = attrFontSize + 'px';
	// console.log(attrFontSize);
	return attrFontSize;
}

var getScaleFactor = function (_distance, _low2) {
	var value = _distance;
	var low1 = 0;
	var high1 = maxDistance;
	// var low2 = .5;
	var low2 = _low2;
	var high2 = 1;

	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// is called by function getDirection()
function getXDistance (_dragObj) {
	var xDistance = Math.abs(_dragObj.originalFrame.x - _dragObj.x)
	return xDistance;
}

// is called by function getDirection()
function getYDistance (_dragObj) {
	var yDistance = Math.abs(_dragObj.originalFrame.y - _dragObj.y)
	return yDistance;
}

// called by function makeObj()
function makeActions () {
	var actions = new View({
		width: 384,
		height: 200,
		x: 0,
		y: 160
	});
	actions.addClass('actions');

	var skip = new View({
		origin: '50% 50%',
		width: 384,
		height: 52,
		x: 0,
		y: 0,
		html: 'überspringen',
		style:{
			fontSize: minActionSize +'px'
		}
	});
	skip.addClass('action skip');
	actions.addSubView(skip);

	var info = new View({
		origin: '50% 50%',
		width: 384,
		height: 52,
		x: 0,
		y: 144,
		html: 'informieren',
		style:{
			fontSize: minActionSize +'px'
		}
	});
	info.addClass('action moreInfo');
	actions.addSubView(info);

	var toCluster = new View({
		origin: '50% 50%',
		width: 384,
		height: 52,
		x: 0,
		y: 72,
		html: 'clustern',
		style:{
			fontSize: minActionSize +'px'
		}
	});
	toCluster.addClass('action toCluster');
	actions.addSubView(toCluster);
	return actions;
}

// called by function makeObj()
function makeAnswers (_questionIndex, _pairIndex) {
	var answers = new View({
		width: 384,
		height: 120,
		x: 0,
		y: 70
	});
	answers.addClass('answers');

	var leftAttr = new View({
		origin: '100% 50%',
		width: 162,
		height: 100,
		x: -162,
		y: 0,
		html: db.questions[_questionIndex].pairs[_pairIndex][0]
	});
	leftAttr.addClass('left attribute');
	answers.addSubView(leftAttr);

	var oder = new View({
		width: 60,
		height: 100,
		x: 162,
		y: 2,
		html: 'oder',
		style:{
			// scale: .1,
			opacity: 0
		}
	});
	oder.scale = 0;
	oder.addClass('label inactive');
	answers.addSubView(oder);

	var rightAttr = new View({
		origin: '0% 50%',
		width: 162,
		height: 100,
		x: 384,
		y: 0,
		html: db.questions[_questionIndex].pairs[_pairIndex][1]
	});
	rightAttr.addClass('right attribute');
	answers.addSubView(rightAttr);

	return answers;
}

function makeDNA (_objIndex, _dnaIndex, _headline){
	var dna = new View({
		width: 348,
		height: 180,
		x: 0,
		y: _dnaIndex*190
	});
	dna.addSubView(addInfoHeadline(_headline));
	for( var i = 0; i < 5; i++){
		dna.addSubView(addGenom(_objIndex, _dnaIndex, i));
	}
	return dna;
}

// called by function makeObj()
function makeDragObj (_objIndex) {
	var dragObject = new View({
		// origin: '50% 50',
		width: 236,
		height: 236,
		x: 74,
		y: 512
	});

	var objImage = new ImageView({
		width: 236,
		height: 236,
		x: 0,
		y: 0,
		image: '../assets/db/images/' + db.objects[_objIndex].images[0]
	});
	objImage.addClass('objImage');
	dragObject.addSubView(objImage);

	var colorLayer = new View({
		width: 236,
		height: 236,
		x: 0,
		y: 0,
		style:{
			opacity: 0.1
		}
	});
	colorLayer.addClass('colorLayer');
	dragObject.addSubView(colorLayer);

	dragObject.originalFrame = dragObject.frame;
	dragObject.originalFrame.y = 140;
	dragObject.addClass('dragObject');

	// dragObject.on('click', function () {
	// 	console.log('click the object');
	// });

	dragObject.dragger = new ui.Draggable(dragObject);
	
	dragObject.on(Events.DragMove, function () {
		// limit to one axis
		// console.log(dragObject.x + ' / ' + dragObject.y);
			globalDirection = getDirection(dragObject);
			animateWords(dragObject, globalDirection);
	});
	
	dragObject.dragger.on(Events.DragEnd, function () {
		if (globalDistance >= maxDistance - triggerOffset ) {
			dragObjDisappears(dragObject);
		}
		else{
			dragObjReset(dragObject);
		}
	});

	return dragObject;
}

// called by function makeObj()
function makeInfo (_objIndex) {
	var currInfo = new View({
		width: 384,
		height: 1000,
		x: 0,
		y: 0
	});

	var infoImage = new ImageView({
		width: 174,
		height: 174,
		x: 102,
		y: 20,
		image: '../assets/db/images/' + db.objects[_objIndex].images[0]
	});
	infoImage.addClass('infoImage');
	currInfo.addSubView(infoImage);

	var infoButtonsRow = new View({
		width: 384,
		height: infoGuiSize[1],
		x: 0,
		y: 214
	});
	infoButtonsRow.addClass('infoButtonsRow');
	currInfo.addSubView(infoButtonsRow);

	var infoButton = new View({
		width: infoGuiSize[0],
		height: infoGuiSize[1],
		x: 18,
		y: 0,
		html: 'Info'
	});

	infoButton.on('click',function () {
		infoButton.opacity = 1;
		textButton.opacity = 0.5;
		dnaButton.opacity = 0.5;
	});
	infoButton.addClass('infoButton infoGui');
	infoButtonsRow.addSubView(infoButton);

	var textButton = new View({
		width: infoGuiSize[0],
		height: infoGuiSize[1],
		x: 18 + 10 + 110,
		y: 0,
		html: 'Beschreibung'
	});

	textButton.on('click',function () {
		textButton.opacity = 1;
		infoButton.opacity = 0.5;
		dnaButton.opacity = 0.5;
	});
	textButton.addClass('textButton infoGui');
	infoButtonsRow.addSubView(textButton);

	var dnaButton = new View({
		width: infoGuiSize[0],
		height: infoGuiSize[1],
		x: 18 + 2 * (10 + 110),
		y: 0,
		html: 'DNA'
	});

	dnaButton.on('click',function () {
		dnaButton.opacity = 1;
		infoButton.opacity = 0.5;
		textButton.opacity = 0.5;
		console.log('scroll');
		$('#63').animatescroll({scrollSpeed:2000,easing:'easeInOutCubic'});

		// $('#63').animatescroll({element:'.scrollField',padding:20});
	});
	dnaButton.addClass('dnaButton infoGui');
	infoButtonsRow.addSubView(dnaButton);

	var scrollField = new ScrollView({
		width: 386,
		height: 600,
		x: 0,
		y: 254
	});
	scrollField.addClass('scrollField');
	currInfo.addSubView(scrollField);

	scrollField.addSubView(addKeyValueView(_objIndex, 'name', 'Name', 0));
	scrollField.addSubView(addKeyValueView(_objIndex, 'designer', 'Designer', 1));
	scrollField.addSubView(addKeyValueView(_objIndex, 'genus', 'Gattung', 2));
	scrollField.addSubView(addKeyValueView(_objIndex, 'format', 'Format', 3));
	scrollField.addSubView(addKeyValueView(_objIndex, 'year', 'Jahr', 4));
	scrollField.addSubView(addKeyValueView(_objIndex, 'country', 'Land', 5));

	var descriptionView = new View({
		width: 348,
		height: 200,
		x: 18,
		y: 200
	});
	descriptionView.addClass('descriptionView');
	scrollField.addSubView(descriptionView);

	descriptionView.addSubView(addInfoHeadline('Beschreibung'));
	var descriptionText = new View({
		width: 348,
		height: 170,
		x: 18,
		y: 30,
		html: db.objects[_objIndex]['description']
	});
	descriptionText.addClass('descriptionText');
	descriptionView.addSubView(descriptionText);
	scrollField.addSubView(descriptionView);

	var dnaView = new View({
		width: 348,
		height: 500,
		x: 18,
		y: 385
	});

	dnaView.addSubView(makeDNA(_objIndex, 0, 'Physikalische Erscheinung'));
	dnaView.addSubView(makeDNA(_objIndex, 1, 'Assoziative Wirkung'));
	dnaView.addClass('dnaView');
	scrollField.addSubView(dnaView);

	currInfo.addClass('infoView');
	return currInfo;
}

// is called by function animateResult()
var makeItInvisible = function ( subView, index) {
	subView.opacity = 0;
}

// called by function makeObj()
function makeMainQuestion (_questionIndex) {
	var mainQuestion = new View({
		width: 384,
		height: 60,
		x: 0,
		y: -100,
		html: db.questions[_questionIndex].main
	});
	mainQuestion.addClass('mainQuestion');
	return mainQuestion;
}

function makeMenuBtn () {
	MenuButton.on('click', function () {
		var time = 250;
		var curve = 'ease-in-out';
		if(!menuVisible) {
			openMenu(time, curve);
		}
		else{
			closeMenu(time, curve);
		}
	});
	MenuButton.addClass('btn');
}

function makeObj () {
	var questionIndex = getRandomInt(0,1);
	var pairIndex = getRandomInt(0,4);
	var objIndex = getRandomInt(0,20);

	var currObj = new View({
		width: 384,
		height: 512,
		x: 0,
		y: 181
	});
	Scene.addSubView(currObj);
	currObj.bringToFront();
	// buid app
	currObj.addSubView(makeMainQuestion(questionIndex));
	currObj.addSubView(makeAnswers(questionIndex, pairIndex));
	currObj.addSubView(makeActions());
	currObj.addSubView(makeResults(objIndex, questionIndex, pairIndex));
	currObj.addSubView(makeDragObj(objIndex));

	currObj.addSubView(makeInfo(objIndex));
	// animate

	utils.delay(250, function () {
		// mainQuestion
		currObj._subViews[0].animate({
			properties:{
				y: 20
			},
			curve: startCurve,
			time: startTime
		});
		utils.delay(200, function () {
			// oder label
			currObj._subViews[1]._subViews[1].animate({
				properties:{
					opacity: .5,
					scale: 1
				},
				curve: startCurve,
				time: startTime
			});
			// left answer
			utils.delay(100, function () {
				currObj._subViews[1]._subViews[0].animate({
					properties:{
						x: 0
					},
					curve: startCurve,
					time: startTime
				});
				// right answer
				utils.delay(100, function () {
					currObj._subViews[1]._subViews[2].animate({
						properties:{
							x: 222
						},
						curve: startCurve,
						time: startTime
					});
					// dragObj
					utils.delay(150, function () {
						currObj._subViews[4].animate({
							properties: {
								y: currObj._subViews[4].originalFrame.y
							},
							curve: startSpring
						});
					});
				});
			});
		});
	});
	return currObj;
};

// called by function makeObj()
function makeResults (_objIndex, _questionIndex, _pairIndex) {
	var resultVotes = db.objects[_objIndex].dna[_questionIndex].pairs[_pairIndex]
	var resultPercent = returnPercent(resultVotes);
	var results = new View({
		width: 384,
		height: 3*resultDotSize,
		x: 0,
		y: 150
	});
	results.addClass('results');

	var resultLeft = new View({
		width: resultDotSize,
		height: resultDotSize,
		x: 47 + 0,
		y: resultDotSize,
		origin: '50% 50%',
		scale: 0,
		opacity: 0
	});
	addResultBG(resultLeft, resultVotes[0], resultPercent[0])
	resultLeft.addClass('result big');
	results.addSubView(resultLeft);

	var resultMid = new View({
		width: resultDotSize,
		height: resultDotSize,
		x: 47 + resultDotSize + 10,
		y: resultDotSize,
		origin: '50% 50%',
		scale: 0,
		opacity: 0
	});
	addResultBG(resultMid, resultVotes[1], resultPercent[1]);
	resultMid.addClass('result small');
	results.addSubView(resultMid);

	var resultRight = new View({
		width: resultDotSize,
		height: resultDotSize,
		x: 47 + 2*(resultDotSize + 10),
		y: resultDotSize,
		origin: '50% 50%',
		scale: 0,
		opacity: 0
	});
	addResultBG(resultRight, resultVotes[2], resultPercent[2])
	resultRight.addClass('result big');
	results.addSubView(resultRight);

	return results
}

// is called by function animateResult()
var makeResultVisible = function ( _subView, index) {
	var _tempScale = 1
	if(index === 0) {
		_subView.addClass('activeResult');
	}
	if(index === 1) {
		_tempScale = .75;
	}
	utils.delay(100 * index, function () {
		_subView.scale = .1;
		_subView.animate({
				properties: {
					scale: _tempScale,
					opacity: 1
				},
				curve: globalAnimationCurve
			});
	})
};

// is called by function animateResult()
var makeResultInVisible = function ( _subView, index) {
	utils.delay(100 * index, function () {
		// _subView.scale = 1;
		_subView.animate({
				properties: {
					scale: 0,
					opacity: 0
				},
				curve: globalAnimationCurve
			});
	})
};

function map_range (value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function nextObj () {
	Scene._subViews[1]._subViews[0].animate({
			properties:{
				y: -100,
				opacity: 0
			},
			time: 200,
			curve: 'ease-in-out'
		});
	Scene._subViews[1]._subViews[1].animate({
			properties:{
				y: 150,
				opacity: 0
			},
			time: 200,
			curve: 'ease-in-out'
		});
	Scene._subViews[1]._subViews[2].animate({
			properties:{
				scale: 0,
				opacity: 0
			},
			time: 200,
			curve: 'ease-in-out'
		});
	utils.delay(210, function () {
		Scene._subViews.pop().destroy();
		utils.delay(100, function () {
			makeObj();
		});
	});
}

function openMenu (_time, _curve) {
	Scene.animate({
		properties: {
			x: Scene.originalFrame.x + 300
		},
		time: _time,
		curve: _curve
	});
	menuVisible = true;
}

// receivs an array of values and returns it in percent
function returnPercent (_resultValues) {
	var valSum = 0;
	var values = [];
	for (var i = 0; i < _resultValues.length; i++) {
		valSum += _resultValues[i];
	};

	for (var i = 0; i < _resultValues.length; i++) {
		values.push(100 / valSum * _resultValues[i])
	};
	// console.log(_resultValues);
	// console.log(values);
	return values
}

function returnOpacity (_percentVal) {
	// console.log( _percentVal / 100)
	return _percentVal / 100;
}

$(document).ready(function () {
	makeMenuBtn();
	var designObject = makeObj();
});