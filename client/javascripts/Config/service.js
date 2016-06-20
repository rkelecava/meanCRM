// Config/service.js
app.factory('config', [
	'$http',
	function ($http) {
		var o = {
			t:'',
			companyInfo: {},
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

		o.addCredentialsInfo = function (credentialsInfo) {
			return $http.post('/users', credentialsInfo)
				.success(function (data) {
					angular.copy(data, o.credentialsInfo);
				});
		};

		o.addServerInfo = function (serverInfo) {
			return $http.post('/configuration/serverInfo', serverInfo)
				.success(function (data) {
					angular.copy(data, o.serverInfo);
				});
		};

		o.adminUserExists = function () {
			return $http.get('/users/adminUserExists')
				.then(function (res) {
					return res.data;
				});
		};

		return o;

	}
]);