// Config/controller.js
app.controller('ConfigCtrl', ['$scope', 'config', function ($scope, config) {

	$scope.companyInfo = {};
	$scope.adminInfo = {};
	$scope.credentialsInfo = {};
	$scope.serverInfo = {};

	$scope.getStates = config.states;

	$scope.addConfiguration = function () {
		config.addCompanyInfo($scope.companyInfo);
		config.addAdminInfo($scope.adminInfo);
		config.addCredentialsInfo($scope.credentialsInfo);
		config.addServerInfo($scope.serverInfo);
		$scope.companyInfo = {};
		$scope.adminInfo = {};
		$scope.credentialsInfo = {};
		$scope.serverInfo = {};
	};


	$scope.configCompanyInfo = config.companyInfo;
	$scope.configAdminInfo = config.adminInfo;
	$scope.configServerInfo = config.serverInfo;

}]);