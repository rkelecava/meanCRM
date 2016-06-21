//Auth/service.js
app.factory('auth', [
	'$http',
	'$window',
	function ($http, $window) {
		var auth = {
			roles: []
		};

		auth.saveToken = function (token) {
			$window.localStorage['meanCRM-token'] = token;
		};

		auth.getToken = function () {
			return $window.localStorage['meanCRM-token'];
		};

		auth.isLoggedIn = function () {
			var token = auth.getToken();

			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};

		auth.currentUser = function () {
			if (auth.isLoggedIn()) {
				var token = auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.username;
			}
		};

	/*	auth.register = function (user) {
			return $http.post('/users/register', user)
				.success(function (data) {
					auth.saveToken(data.token);
				});
		}; */

		auth.logIn = function (user) {
			return $http.post('/users/login', user)
				.success(function (data) {
					auth.saveToken(data.token);
				});
		};

		auth.logOut = function () {
			$window.localStorage.removeItem('meanCRM-token');
			auth.getRoles();
		};

		auth.getRoles = function () {
			if (auth.isLoggedIn()) {
				var token = auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return $http.get('/users/' + payload._id + '/roles')
					.success(function (data) {
						angular.copy(data, auth.roles);
					});
			} else {
				angular.copy([], auth.roles);
			}

		};

		auth.hasRole = function (role) {
			for (var i=0; i<auth.roles.length; i++) {
				if (auth.roles[i] == role) {
					return true;
				}
			}

			return false;
		};

		auth.isAdmin = function () {
			if (auth.hasRole('admin')) {
				return true;
			} else {
				return false;
			}
		};


		return auth;
	}]);