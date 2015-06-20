var timer;

function updateViewHeight() {
	var outputText = document.getElementById('outputText');
	var scrollHeight = outputText.scrollHeight;
	var scrollTop = outputText.scrollTop;
	var offsetHeight = outputText.offsetHeight;


	// if customer move the window more than 1/10 offsetHeight , the auto update view will disabled .
	var isUpdate = scrollTop + offsetHeight / 10 > scrollHeight - offsetHeight ;

	// set time to delay the window move .
	if(isUpdate) {
		if(timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function () {
			outputText.scrollTop = outputText.scrollHeight;
		},350);
	}
}
