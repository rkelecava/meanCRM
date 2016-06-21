app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('home');

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/partials/_home.html',
				controller: 'HomeCtrl',
				resolve: {
					configPromise: ['config', function (config) {
						return config.getCompanyInfo();
					}],
					rolePromise: ['auth', function (auth) {
						auth.getRoles().then(function () {
							//console.log(auth.hasRole('admin'));
						});
					}]
				},
				onEnter: [
					'$state',
					'config',
					function ($state, config) {
        				config.adminUserExists().then(function(result){
							if (!result) {
								$state.go('config');
							}
        				});
					}]
			})
			.state('config', {
				url: '/config',
				templateUrl: '/partials/_config.html',
				controller: 'ConfigCtrl',
				onEnter: [
					'$state',
					'config',
					function ($state, config) {
        				config.adminUserExists().then(function(result){
							if (result) {
								$state.go('home');
							}
        				});
					}]
			})
			.state('signin', {
				url: '/signin',
				templateUrl: '/partials/_signin.html',
				controller: 'AuthCtrl'
			});
	}
]);