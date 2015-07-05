app.controller('songlistController', 
	function($scope, $rootScope, $firebase, FirebaseURL) {
		
	var ref = new Firebase(FirebaseURL + '/posts/');
	
	$scope.song = {
		title: '',
		artist: '',
		album: '',
		lyrics: '',
		youtubeURL: ''
	};
	
	$scope.addsong = function(song) {
		console.log(song);
		if (song.youtubeURL) {
			if (song.youtubeURL.indexOf('youtu.be') >= 0) { //https://youtu.be/kyYhElBhNOY
				var start = song.youtubeURL.indexOf('.be/') + 4;
				song.youtubeid = song.youtubeURL.slice(start);
				console.log('a');
			}
			else if (song.youtubeURL.indexOf('watch?v=') >= 0) {
				var start = song.youtubeURL.indexOf('v=') + 2;
				song.youtubeid = song.youtubeURL.slice(start);
				console.log('b');
			}
			else {//<iframe width="560" height="315" src="https://www.youtube.com/embed/kyYhElBhNOY" frameborder="0" allowfullscreen></iframe>
				var start = song.youtubeURL.indexOf('embed/') + 8;
				var end = song.youtubeURL.indexOf('" f');
				song.youtubeid = song.youtubeURL.slice(start, end);
				console.log('c');
			}
			console.log('Youtube: ' + song.youtubeURL + ' -> ' + song.youtubeid);
		}
		
		console.log('current user');
		console.log($rootScope.currentUser.$id);
		
		//Push song to Firebase
		ref.push({
			title: $scope.song.title, 
			artist: $scope.song.artist, 
			album: $scope.song.album, 
			lyrics: $scope.song.lyrics, 
			youtubeid: $scope.song.youtubeid, 
			user: $rootScope.currentUser.$id, 
			date: Firebase.ServerValue.TIMESTAMP
		}, function(error) {
			if (error) {
				$rootScope.message = {
					title: 'Save Error',
					body: error.message
				};
			}
			else {
				$rootScope.message = {
					title: 'Song Saved!', 
					body: 'Your song has been saved.'
				};
				$scope.song = {
					title: '',
					artist: '',
					album: '',
					lyrics: '',
					youtubeURL: ''
				};
			}
		});
	};
	
});


//<iframe width="560" height="315" src="https://www.youtube.com/embed/' + song.youtubeid + '" frameborder="0" allowfullscreen></iframe>