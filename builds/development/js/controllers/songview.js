app.controller('songviewController', 
	function($rootScope, $scope, $sce, $routeParams, $firebase, $firebaseObject, $firebaseArray, FirebaseURL) {
		
	console.log('Loading controller [songviewController]');
	
	var ref = new Firebase(FirebaseURL + '/posts/' + $routeParams.songID);
	var song = $firebaseObject(ref); //Check if this is loaded
	var comments = $firebaseArray(ref.child('comments'));
	
	song.$loaded(function() {
		$scope.song = song;
		
	  $scope.movie = {
			src:"http://www.youtube.com/embed/" + $scope.song.youtubeid,
			title: $scope.song.title
		};
	}); // $loaded
	
	comments.$loaded(function() {
		$scope.comments = comments;
	});
	
	$scope.addcomment = function() {
		console.log('Current User:');
		console.log($rootScope.currentUser);
		var commentRef = new Firebase(FirebaseURL + '/posts/' + $routeParams.songID + '/comments');
		commentRef.push({
			text: $scope.comment,
			date: Firebase.ServerValue.TIMESTAMP, 
			author: {
				displayname: $rootScope.currentUser.displayname,
				email: $rootScope.currentUser.email,
				firstname: $rootScope.currentUser.firstname,
				lastname: $rootScope.currentUser.lastname
			}
		}); // Push
		$scope.comment = "";
		$scope.currentRecord = {};
	}; // addcomment
	
	$scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };
	
	$scope.onEnter = function() {
		console.log('Enter Pressed!');
	}

	
	console.log('Loading controller [songviewController] DONE');
});