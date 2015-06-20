var timer;

function updateViewHeight() {
	var scrollHeight = document.getElementById('outputText').scrollHeight;
	var scrollTop = document.getElementById('outputText').scrollTop;
	var offsetHeight = document.getElementById('outputText').offsetHeight;

	var isUpdate = scrollTop + offsetHeight / 10 > scrollHeight - offsetHeight ;

	if(isUpdate) {
		if(timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function () {
			outputText.scrollTop = outputText.scrollHeight;
		},350);
	}
}
