app.controller('domicileController', 
	function($scope, $firebase, $firebaseObject, $firebaseAuth, UserService, FirebaseURL) {
		
	console.log('Loading controller [domicileController]');
	
	var ref = new Firebase(FirebaseURL + '/posts/');
	var refObj = $firebaseObject(ref);
	
	refObj.$loaded().then(function (data) {
		$scope.songs = data;
		console.log('Song:');
		console.log($scope.songs);
	});
	
	console.log('Loading controller [domicileController] DONE');
		
});