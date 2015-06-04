app.controller('navController', 
function($scope, $rootScope, UserService) {
	
	console.log('Loading controller [navController]');
	
	$scope.logout = function() {
		console.log('Logging out');
		UserService.logout($scope.currentUser);
	};
	
	console.log('Loading controller [navController] DONE');
})