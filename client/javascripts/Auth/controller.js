//Auth/controller.js
app.controller('AuthCtrl', ['$scope', '$state', 'auth', function ($scope, $state, auth) {

	$scope.logIn = function () {
		auth.logIn($scope.user)
			.error(function (error) {
				$scope.error = error;
			}).then(function () {
				$state.go('home');
			});
		};

}]);