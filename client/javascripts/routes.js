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
			});
	}
]);