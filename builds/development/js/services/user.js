/*
	UserService is a wrapper for firebaseAuth
	By Steven Bayer
*/

app.factory('UserService', 
	function($firebaseAuth, $rootScope) {
		
	console.log('Loading service [UserService]');
	
	var ref = new Firebase('https://angularchecklist.firebaseio.com');
	var auth = $firebaseAuth(ref);
	
	$rootScope.currentUser = '';
	
	var factoryObject = {
		login: function(user) {
			//return Firebase $authWithPassword result:
			return auth.$authWithPassword({
				email: user.email,
				password: user.password
			});
		},  //login
		
		logout: function(user) {
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
			.then(function(error, userData) {
				console.log(error);
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