var app = angular.module('checklist-app', ['ngRoute', 'ngAnimate', 'appControllers'])
.constant('FirebaseURL', 'https://angularchecklist.firebaseio.com');

console.log('Loading module [checklist-app]');

var appControllers = angular.module('appControllers', ['firebase']);

app.config(['$routeProvider', function($routeProvider) {
	console.log('Loading config [checklist-app]');
	
	$routeProvider.when('/login', {
		templateUrl: 'views/login.html', 
		controller: 'loginController'
	})
	.when('/register', {
		templateUrl: 'views/register.html', 
		controller: 'loginController'
	})
	.when('/domicile', {
		templateUrl: 'views/domicile.html', 
		controller: 'domicileController'
	})
	.when('/addsong', {
		templateUrl: 'views/addsong.html', 
		controller: 'songlistController'
	})
	.when('/songview/:songID', {
		templateUrl: 'views/songview.html', 
		controller: 'songviewController'
	})
	.otherwise({
		redirectTo: '/login'
	});
	
	console.log('Loading config [checklist-app] DONE');
}]);

console.log('Loading module [checklist-app] DONE');