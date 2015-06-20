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
		highlight: function (code, lang) {
			if(lang) {
				return hljs.highlight(lang,code).value;
			}else{
				return hljs.highlightAuto(code).value;
			}
		}
	});


	app
		.controller('MarkdownController', ['$scope', '$document', function ($scope, $document) {
			$scope.inputText = '';

			$scope.$watch('inputText', function(current) {
				$scope.outputText = marked(current);
			});
		}])
		.directive('marked', function () {
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
		.directive('auto', function ($window) {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					function update() {
						element.scrollTop = element.scrollHeight;
					}
					scope.$watch(attrs.ngModel, function() {
						update();
					});
					attrs.$set('ngTrim','false');
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













