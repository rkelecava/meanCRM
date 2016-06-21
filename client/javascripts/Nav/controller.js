// Nav/controller.js

app.controller('NavCtrl', ['$scope', 'auth', 'config', function ($scope, auth, config) {

	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.isAdmin = auth.isAdmin;
	$scope.currentUser = auth.currentUser;
	$scope.logOut = auth.logOut;

	$scope.companyInfo = config.companyInfo;

	$scope.hasRole = auth.hasRole;


}]);