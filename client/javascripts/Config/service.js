// Config/service.js
app.factory('config', [
	'$http',
	function ($http) {
		var o = {
			companyInfo: {},
			adminInfo: {},
			credentialsInfo: {},
			serverInfo: {},
			states: ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida',
					'Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas',
					'Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
					'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
					'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma',
					'Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee',
					'Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
		};


		o.addCompanyInfo = function (companyInfo) {
			return $http.post('/configuration/companyInfo', companyInfo)
				.success(function (data) {
					angular.copy(data, o.companyInfo);
				});
		};

		o.addAdminInfo = function (adminInfo) {
			return $http.post('/configuration/adminInfo', adminInfo)
				.success(function (data) {
					angular.copy(data, o.adminInfo);
				});
		};

		o.addCredentialsInfo = function (credentialsInfo) {
			angular.copy(credentialsInfo, o.credentialsInfo);
		};

		o.addServerInfo = function (serverInfo) {
			return $http.post('/configuration/serverInfo', serverInfo)
				.success(function (data) {
					angular.copy(data, o.serverInfo);
				});
		};

		return o;

	}
]);