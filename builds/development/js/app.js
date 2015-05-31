var app = angular.module('checklist-app', ['ng-Route']);

var appControllers = angular.module('appControllers', []);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'views/login.html'
	})
	.otherwise({
		redirectTo: '/login'
	});
}]);