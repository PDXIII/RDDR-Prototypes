// Config
Framer.config.animationPrecision = 30;
// Layer naming an position saving stuff
for (var layerGroupName in PSD) {
	window[layerGroupName] = PSD[layerGroupName];
	PSD[layerGroupName].originalFrame = window[layerGroupName].frame;
};

// variables

var stackVisible = false;

var dragObjArray = [
	Object01_draggable,
	Object02_draggable,
	Object03_draggable,
	Object04_draggable,
	Object05_draggable,
	Object06_draggable,
	Object07_draggable,
	Object08_draggable,
	Object09_draggable,
	Object10_draggable
];

// animation functions
function objectDragStart(view){
	if (view instanceof View){
		view.on('dragstart', function (event) {
			view.bringToFront();
			event.stopPropagation();
			view.scale = 0.7;
			view.animate({
				properties: {
					scale: 1.2,
					opacity: 0.8
				},
				curve: 'spring(100, 10, 100)'
			})
		});
	}
};

function objectDragEnd(view){
	if (view instanceof View){
		view.on('dragend', function (event) {
			event.stopPropagation();
			// view.scale = 0.7;
			view.animate({
				properties: {
					scale: 1,
					opacity: 1
				},
				curve: 'spring(100, 10, 100)'
			});
		});
	}
};

function destroyDragObj(view){
	if (view instanceof View){
		view.on('dblclick', function (event) {
			event.stopPropagation();
			view.animate({
				properties: {
					scale: 2,
					opacity: 0
				},
				curve: 'spring(100, 10, 100)'
			});
			utils.delay(500, function(){
					view.destroy();
			});
		});
	}
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
};

// binding functions to views
for(var currDragObj in dragObjArray){
	objectDragStart(dragObjArray[currDragObj]);
	objectDragEnd(dragObjArray[currDragObj]);
	destroyDragObj(dragObjArray[currDragObj]);
};


PlusButton.on('click', function () {
	var time = 250;
	var curve = 'ease-in-out';
	if(!stackVisible){
		openStack(time, curve);
	}
	else{
		closeStack(time, curve);
	}
});