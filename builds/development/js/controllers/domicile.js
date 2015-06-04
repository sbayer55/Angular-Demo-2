app.controller('domicileController', 
	function($scope, $firebase, $firebaseObject, $firebaseAuth, UserService, FirebaseURL) {
		
	console.log('Loading controller [domicileController]');
	
	var ref = new Firebase(FirebaseURL + '/users/');
	var refObj = $firebaseObject(ref);
	
	refObj.$loaded().then(function (data) {
		$scope.people = data;
	});
	
	console.log('Loading controller [domicileController] DONE');
		
});