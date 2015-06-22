var app = angular.module('app',['ngSanitize']);

	marked.setOptions({
		renderer: new marked.Renderer(),
		gfm: true,
		tables: true,
		breaks: false,
		pedantic: false,
		sanitize: false,
		smartLists: true,
		smartypants: false,
		highlight: function (code) {
			return hljs.highlightAuto(code).value;
		}
	});


	app
		.controller('MarkdownController', ['$scope', function ($scope) {
			$scope.inputText = '';

			$scope.$watch('inputText', function(current) {
				$scope.outputText = marked(current);
			});

			$scope.clean = function () {
				$scope.inputText = '';
			}
		}])
		.directive('tab', function () {
		    return {
		    	restrict: 'A',
			    link: function (scope, element, attrs) {
			        element.on('keydown', function (event) {
			        	var keyCode = event.keyCode || event.which;
			            if (keyCode === 9) {
			                event.preventDefault();
			                var start = this.selectionStart;
			                var end = this.selectionEnd;
			                element.val(element.val().substring(0, start) 
			                    + '\t' + element.val().substring(end));
			                this.selectionStart = this.selectionEnd = start + 1;
			                element.triggerHandler('change');
			            }
			        });
			    }
		    }
		})
		// .directive('autoGrow', function() {
		// 	return {
		// 		restrict: 'A',
		// 		link: function (scope, element, attrs) {
		// 			function update() {
		// 				element.css('height','auto');
		// 				element.css('height',element[0].scrollHeight + 'px');
		// 			}
		// 			scope.$watch(attrs.ngModel, function(current) {
		// 				update();
		// 			});
		// 			attrs.$set('ngTrim','false');
		// 		}
		// 	}
		// })













