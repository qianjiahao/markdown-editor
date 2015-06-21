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

function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
        );
    obj.dispatchEvent(ev);
}

function export_raw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;

    var export_blob = new Blob([data]);

    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fake_click(save_link);
}

function toText() {
	export_raw('download.txt', document.getElementById('inputText').value);
};

function toHTML() {
	export_raw('download.html',document.getElementById('outputText').innerHTML);
}



