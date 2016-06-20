// Nav/controller.js

app.controller('NavCtrl', ['$scope', function ($scope) {
	$scope.companyName = 'Delta Electrical';

	$scope.getCompanyName = function () {
		if(!$scope.companyName || $scope.companyName === '') { return 'meanCRM'; }

		return $scope.companyName;
	};
}]);