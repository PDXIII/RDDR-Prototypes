// Config
Framer.config.animationPrecision = 30;
// Layer naming an position saving stuff
for (var layerGroupName in PSD) {
	window[layerGroupName] = PSD[layerGroupName];
	PSD[layerGroupName].originalFrame = window[layerGroupName].frame;
}

// variables
var menuVisible = false;
var stackVisible = false;
var clusterInfoVisible = false;
var dragObjArray = [];
var infoGuiSize = [110, 30, 10]; // width, height, margin of a button
var time = 250;
var curve = 'ease-in-out';

function makeDragObjects (_object){
		var currDragObj = new ImageView({
			width: 50,
			height: 50,
			x: 50,
			y: 50,
			image: '../assets/db/images/' + _object.images[0]
		});
		currDragObj.addClass('dragObject');
		var colorLayer = new View({
			opacity: 0,
			width: 50,
			height: 50,
			x: 0,
			y: 0,
		});
		colorLayer.addClass('colorLayer');
		currDragObj.addSubView(colorLayer);

		currDragObj.dragger = new ui.Draggable(currDragObj);
		currDragObj.on(Events.DragStart, function(){
			currDragObj.bringToFront();
			// event.stopPropagation();
			currDragObj.scale = 0.7;
			currDragObj.animate({
				properties: {
					scale: 1.2,
					opacity: 0.8
				},
				curve: 'spring(100, 10, 100)'
			});
		});
		currDragObj.on(Events.DragMove, function(){
			if(currDragObj.x < -25
				|| currDragObj.x > 360
				|| currDragObj.y < -25
				|| currDragObj.y > 455){
				currDragObj._subViews[0].opacity = 0.5;
			}
			else if(currDragObj.x > -25
				&& currDragObj.x < 360
				&& currDragObj.y > -25
				&& currDragObj.y < 455){
				currDragObj._subViews[0].opacity = 0;
			}
			console.log(currDragObj.x + ' / ' + currDragObj.y);
		});
		currDragObj.on(Events.DragEnd, function(){
			if(currDragObj.x < -25
				|| currDragObj.x > 360
				|| currDragObj.y < -25
				|| currDragObj.y > 455){
				currDragObj.animate({
					properties: {
						scale: 2,
						opacity: 0
					},
					curve: 'spring(100, 10, 100)'
				});
				// utils.delay(500, function(){
				// 	currDragObj.destroy();
				// 	});
			}
			else{
				currDragObj.animate({
					properties: {
						scale: 1,
						opacity: 1
					},
					curve: 'spring(100, 10, 100)'
				});
			}
		});

		ObjectSpace.addSubView(currDragObj);
		dragObjArray.push(currDragObj);
}

function openStack(_time, _curve){
	PlusButton.animate({
		properties:{
			rotation: 45
		},
		time: _time,
		curve: _curve
	});
	ObjectSpace.animate({
		properties: {
			y: ObjectSpace.originalFrame.y - 80
		},
		time: _time,
		curve: _curve
	});
	stackVisible = true;
}

function closeStack(_time, _curve){
	PlusButton.animate({
		properties:{
			rotation: 0
		},
		time: _time,
		curve: _curve
	});
	ObjectSpace.animate({
		properties: {
			y: ObjectSpace.originalFrame.y
		},
		time: _time,
		curve: _curve
	});
	stackVisible = false;
}

function openClusterInfo(_time, _curve){
	// SmallInfoButton.animate({
	// 	properties:{
	// 		rotation: 45
	// 	},
	// 	time: _time,
	// 	curve: _curve
	// });
	Scene._subViews[3].animate({
		properties: {
			y: 80
		},
		time: _time,
		curve: _curve
	});
	Scene._subViews[3]._subViews[0]._subViews[2].animate({
		properties: {
			y:20
		},
		curve: 'spring(200,10,10)'
	});
	clusterInfoVisible = true;
}

function closeClusterInfo(_time, _curve){
	Scene._subViews[3].animate({
		properties: {
			y: 722
		},
		time: _time,
		curve: _curve
	});
	clusterInfoVisible = false;
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

function showKeyBoard() {
	Writing.animate({
		properties: {
			y: 355
		},
		curve: 'ease-in-out',
		time: 100
	});
}

function hideKeyBoard() {
	Writing.animate({
		properties: {
			y: Writing.originalFrame.y
		},
		curve: 'ease-in-out',
		time: 100
	});
}

function makeEditButtons (argument) {
	Merkmal.on('click', function(){
		showKeyBoard();
		$('.scrollField').animate({scrollTop: 300 });
	});
	Konzept.on('click', function(){
		showKeyBoard();
		$('.scrollField').animate({scrollTop: 433 });
	});
	Kritik.on('click', function(){
		showKeyBoard();
		$('.scrollField').animate({scrollTop: 620 });
	});

	FertigBtn.on('click', function(){
		hideKeyBoard();
	})
}

function makePlusBtn() {
	PlusButton.on('click', function() {

		if(!stackVisible){
			openStack(time, curve);
		}
		else{
			closeStack(time, curve);
		}
	});
	PlusButton.addClass('btn');
}

function makeSmallInfoBtn() {
	SmallInfoButton.on('click', function() {
		var time = 250;
		var curve = 'ease-in-out';
		if(!clusterInfoVisible){
			openClusterInfo(time, curve);
		}
		else{
			closeClusterInfo(time, curve);
		}
	});
	SmallInfoButton.addClass('btn');
}

function makeMenuBtn() {
	MenuButton.on('click', function() {
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

function placeObjects () {

}

function makeClusterInfo (_objIndex) {
	var clusterFrame = new View({
		width: 384,
		height: 1000,
		x: 0,
		y: 722
	});
	clusterFrame.addClass('clusterFrame');

	var currCluster = new View({
		width: 384,
		height: 1000,
		x: 0,
		y: 0
	});

	var backAction = new View({
		width: 384,
		height: 50,
		x: 0,
		y: 20,
		html: 'zurück'
	});
	backAction.addClass('action');
	currCluster.addSubView(backAction);

		var infoButtonsRow = new View({
		width: 384,
		height: infoGuiSize[1],
		x: 0,
		y: 214
	});
	infoButtonsRow.addClass('infoButtonsRow');
	currCluster.addSubView(infoButtonsRow);

	var infoButton = new View({
		width: infoGuiSize[0],
		height: infoGuiSize[1],
		x: 18,
		y: 0,
		html: 'Info'
	});

	infoButton.on('click',function() {
		infoButton.opacity = 1;
		textButton.opacity = 0.5;
		dnaButton.opacity = 0.5;
		currCluster.animate({
			properties: {
				y: 0
			},
			curve: curve,
			time: time
		});
		$('.scrollField').animate({scrollTop: 0 });
	});
	infoButton.addClass('infoButton infoGui');
	infoButtonsRow.addSubView(infoButton);

	var textButton = new View({
		width: infoGuiSize[0],
		height: infoGuiSize[1],
		x: 18 + 10 + 110,
		y: 0,
		html: 'Beschreibung',
		opacity: 0.5
	});

	textButton.on('click',function() {
		textButton.opacity = 1;
		infoButton.opacity = 0.5;
		dnaButton.opacity = 0.5;
		currCluster.animate({
			properties: {
				y: -200
			},
			curve: curve,
			time: time
		});
		$('.scrollField').animate({scrollTop: 310 });
	});
	textButton.addClass('textButton infoGui');
	infoButtonsRow.addSubView(textButton);

	var dnaButton = new View({
		width: infoGuiSize[0],
		height: infoGuiSize[1],
		x: 18 + 2 * (10 + 110),
		y: 0,
		html: 'DNA',
		opacity: 0.5
	});

	dnaButton.on('click',function() {
		dnaButton.opacity = 1;
		infoButton.opacity = 0.5;
		textButton.opacity = 0.5;
		// console.log('scroll');
		currCluster.animate({
			properties: {
				y: -200
			},
			curve: curve,
			time: time
		});
		$('.scrollField').animate({scrollTop: 855 });
	});
	dnaButton.addClass('dnaButton infoGui');
	infoButtonsRow.addSubView(dnaButton);


	var infoImage = new ImageView({
		width: 174,
		height: 174,
		x: 102,
		y: 60,
		image: '../assets/db/images/ClusterInfoImage.jpg'
	});
	infoImage.addClass('clusterInfoImage');
	currCluster.addSubView(infoImage);

	var colorLayer = new View({
		width: 174,
		height: 174,
		x: 0,
		y: 0,
		opacity: 0
	});
	colorLayer.addClass('clusterColorLayer');
	infoImage.addSubView(colorLayer);

	infoImage.originalFrame = infoImage.frame;
	infoImage.originalFrame.y = 20;
	// infoImage.on('click', function() {
	// 	console.log('click the object');
	// });

	infoImage.dragger = new ui.Draggable(infoImage);
	
	infoImage.on(Events.DragMove, function() {
		// limit to one axis
		// console.log(infoImage.x + ' / ' + infoImage.y);
		infoImage.x = 102;
		if(infoImage.y <= 20){
			infoImage.y = 20;
		}else if( infoImage.y >= 60){
			infoImage._subViews[0].opacity = 0.5;
			infoImage.y = 60;
		}else{
			infoImage._subViews[0].opacity = 0;
		}
		// console.log(getYDistance(infoImage));
	});
	
	infoImage.dragger.on(Events.DragEnd, function() {
		if(infoImage.y >= 60){
			closeClusterInfo(time, curve);
		}
		else{
			infoImage.animate({
				properties: {
					y: 20
				},
				curve: 'spring(200,10,10)'
			});
		}
		infoImage._subViews[0].opacity = 0;
	});

	var scrollShadow = new View({
		width: 386,
		height: 5,
		x:0,
		y:250
	});
	scrollShadow.addClass('scrollShadow');
	var scrollField = new ScrollView({
		width: 386,
		height: 400,
		x: 0,
		y: 254,
	});

	ClusterInfo.properties = {
		// opacity: 0,
		x: 0,
		y: 0,
		width: 384,
		height: 1440
	};
	ClusterInfo.addClass('clusterInfo');
	scrollField.addSubView(ClusterInfo);
	scrollField.addClass('scrollField');
	currCluster.addSubView(scrollField);
	currCluster.addSubView(scrollShadow);

	// // scrollField.addSubView(addKeyValueView(_objIndex, 'name', 'Name', 0));
	// scrollField.addSubView(addKeyValueView(_objIndex, 'designer', 'Gestalter', 0));
	// scrollField.addSubView(addKeyValueView(_objIndex, 'genus', 'Gattung', 1));
	// scrollField.addSubView(addKeyValueView(_objIndex, 'format', 'Format', 2));
	// scrollField.addSubView(addKeyValueView(_objIndex, 'year', 'Jahre', 3));
	// scrollField.addSubView(addKeyValueView(_objIndex, 'country', 'Länder', 4));

	// var descriptionView = new View({
	// 	width: 348,
	// 	height: 400,
	// 	x: 18,
	// 	y: 200
	// });
	// descriptionView.addClass('descriptionView');
	// scrollField.addSubView(descriptionView);

	// descriptionView.addSubView(addInfoHeadline('Beschreibung'));
	// var descriptionText = new View({
	// 	width: 348,
	// 	height: 400,
	// 	x: 0,
	// 	y: 30,
	// 	html: db.clusters[_objIndex].description
	// });
	// descriptionText.addClass('descriptionText');
	// descriptionView.addSubView(descriptionText);
	// scrollField.addSubView(descriptionView);

	// var dnaView = new View({
	// 	width: 348,
	// 	height: 800,
	// 	x: 18,
	// 	y: 700
	// });

	// dnaView.addSubView(makeDNA(_objIndex, 0, 'Physikalische Erscheinung'));
	// dnaView.addSubView(makeDNA(_objIndex, 1, 'Assoziative Wirkung'));
	// dnaView.addClass('dnaView');
	// scrollField.addSubView(dnaView);

	currCluster.addClass('infoView');
	clusterFrame.addSubView(currCluster);
	return clusterFrame;
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

	var valInPercent = returnPercent(db.clusters[_objIndex].dna[_dnaIndex].pairs[index]);
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
		html: db.clusters[_objIndex][_key]
	});
	valueView.addClass('valueView');
	_currView.addSubView(valueView);
	return _currView;
}

$(document).ready(function() {
	makeMenuBtn();
	makePlusBtn();
	makeSmallInfoBtn();
	makeEditButtons();
	Scene.addSubView(makeClusterInfo(0));
	db.objects.map(makeDragObjects);
	// dragObjArray(placeObjects);
});