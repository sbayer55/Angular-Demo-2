app.directive('deNotification', function() {
	return {
		restrict: 'E', 
		transclude: true, 
		templateUrl: 'views/de-message.html'
	};
});