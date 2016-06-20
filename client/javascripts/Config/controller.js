// Config/controller.js
app.controller('ConfigCtrl', ['$scope', 'config', '$state', function ($scope, config, $state) {


	$scope.companyInfo = {};
	$scope.adminInfo = {};
	$scope.credentialsInfo = {};
	$scope.serverInfo = {};

	$scope.getStates = config.states;

	$scope.addConfiguration = function () {

		if ($scope.credentialsInfo.password !== $scope.credentialsInfo.passwordConfirmation || $scope.serverInfo.smtpPassword !== $scope.serverInfo.smtpPasswordConfirmation) {
			return;
		}

		$scope.credentialsInfo.role = 'admin';
		$scope.credentialsInfo.first = $scope.adminInfo.first;
		$scope.credentialsInfo.last = $scope.adminInfo.last;
		$scope.credentialsInfo.phone = $scope.companyInfo.phone;
		$scope.credentialsInfo.phoneExt = $scope.adminInfo.phoneExt;
		$scope.credentialsInfo.email = $scope.adminInfo.email;
		$scope.credentialsInfo.title = $scope.adminInfo.title;
		$scope.credentialsInfo.isSiteAdmin = true;

		config.addCompanyInfo($scope.companyInfo);
		config.addCredentialsInfo($scope.credentialsInfo);
		config.addServerInfo($scope.serverInfo);
		$scope.companyInfo = {};
		$scope.adminInfo = {};
		$scope.credentialsInfo = {};
		$scope.serverInfo = {};

		$state.go('home', {reload: true});
	};



}]);