// receivs an array of values and returns it in percent
function returnPercent (_resultValues) {
	var valSum = 0;
	var values = [];
	for (var i = 0; i < _resultValues.length; i++) {
		valSum += _resultValues[i];
	}

	for (var i = 0; i < _resultValues.length; i++) {
		values.push(100 / valSum * _resultValues[i])
	}
	// console.log(_resultValues);
	// console.log(values);
	return values
}

function returnOpacity (_percentVal) {
	// console.log( _percentVal / 100)
	return _percentVal / 100;
}

function map_range (value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}