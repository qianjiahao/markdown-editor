

var inputText = document.getElementById('inputText');
var outputText = document.getElementById('outputText');
var timer;

function updateViewHeight() {

	var stopUpdate = outputText.scrollTop + outputText.offsetHeight / 2;
	var startUpdate = outputText.scrollHeight - outputText.offsetHeight;
	
	if(stopUpdate > startUpdate) {

		if(timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function () {
			outputText.scrollTop = outputText.scrollHeight;
			console.log('change');
		},350);

	}

}
