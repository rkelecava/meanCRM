app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('home');

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/partials/_home.html',
				controller: 'HomeCtrl'
			})
			.state('config', {
				url: '/config',
				templateUrl: '/partials/_config.html',
				controller: 'ConfigCtrl'
			});
	}
]);