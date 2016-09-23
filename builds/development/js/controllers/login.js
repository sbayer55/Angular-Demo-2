app.controller('loginController', 
	function($scope, $location, $rootScope, $firebase, $firebaseAuth, UserService, FirebaseURL) {
		
	console.log('Loading controller [loginController]');
	
	var ref = new Firebase(FirebaseURL);
	var auth = $firebaseAuth(ref);
	
	// Check currenty user:
	if ($rootScope.currentUser) {
		console.log('Current user found.');
		$location.path('/domicile');
	}
	else {
		console.log('Failed to find currentUser.');
		$rootScope.redirect = 'domicile';
	}
	
	$scope.login = function() {
		console.log('Attempting to log in ' + $scope.user.email);
		UserService.login($scope.user)
		.then(function() { //We logged in!!
			$location.path('/domicile');
			$rootScope.message = {
				title: 'Logged in', 
				body: 'You are logged in as ' + $scope.user.email
			};
		})
		.catch(function(error) { //We cannot login :-(
		console.log('Login failed');
			$rootScope.message = {
				title: 'Error', 
				body: 'You cannot log in because ' + $scope.user.email
			};
		}); //UserService.login
	}; //login
	
	$scope.register = function() {
		UserService.register($scope.user)
		.then(function(user) { //User made
			
			UserService.login($scope.user)
			.then(function() { //We logged in!!
				$location.path('/domicile');
				$rootScope.message = {
					title: 'Logged in', 
					body: 'You are logged in as ' + $scope.user.email
				};
			})
			.catch(function(error) { //We cannot login :-(
				$rootScope.message = {
					title: 'Error', 
					body: 'You cannot log in because ' + $scope.user.email
				};
			}); //UserService.login
			
		})
		.catch(function(error) { //Error making user
			$rootScope.message = {
				title: 'User Register Error', 
				body: error.message
			};
		});
	};
	
	$scope.makeMessage = function() {
		var message = {
			title: "Logged in",
			body: "You successfully logged in as sbayer55@gmail.com"
		};
		
		$rootScope.message = message;
		$timeout(function() { 
			$rootScope.message = '';
		}, 10000);
	};
	
	console.log('Loading controller [loginController] DONE');
});