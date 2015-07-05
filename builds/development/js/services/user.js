/*
	UserService is a wrapper for firebaseAuth
	By Steven Bayer
*/

app.factory('UserService', 
	function($firebase, $firebaseObject, $firebaseAuth, $location, $rootScope, FirebaseURL) {
		
	console.log('Loading service [UserService]');
	
	var ref = new Firebase(FirebaseURL);
	var auth = $firebaseAuth(ref);
	
	$rootScope.currentUser = '';
	
	auth.$onAuth(function(authenticatedUser) {
		if (authenticatedUser) {
			var userRef = new Firebase(FirebaseURL + '/users/' + authenticatedUser.uid);
			var user = $firebaseObject(userRef);
			$rootScope.currentUser = user;
			console.log('Auto-login Success');
			
			/*
			if ($location.path().indexOf('login') >= 0) {
				console.log('push to domicile.');
				$location.path('#/domicile');
			}
			else {
				console.log('path:');
				console.log($location.path());
			}
			*/
		}
		else { //No user data returned
			console.log('Auto-login Failed');
		}
	});
	
	var factoryObject = {
		login: function(user) {
			//return Firebase $authWithPassword result:
			return auth.$authWithPassword({
				email: user.email,
				password: user.password
			});
		},  //login
		
		logout: function(user) {
			console.log('User is being logged out');
			$rootScope.currentUser = '';
			return auth.$unauth();
		}, //logout
		
		requierUser: function(user) {
			return auth.requireAuth();
		}, //requierUser
		
		register: function(user) {
			return auth.$createUser({
				email: user.email, 
				password: user.password
			})
			.then(function(userData) {
				console.log(userData);
				ref.child('users').child(userData.uid).set({
					firstname: user.firstname, 
					lastname: user.lastname, 
					email: user.email, 
					date: Firebase.ServerValue.TIMESTAMP
				});
			}); //createUser - return;
		}
	};
		
	console.log('Loading service [UserService] DONE');
	
	return factoryObject;
}); //app.factory