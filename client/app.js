var groupSketch = angular.module('groupSketch', ['ngRoute'])

groupSketch.config(function($routeProvider){
	$routeProvider
	.when('/sketch', {
		templateUrl: 'partials/view2.html',
		controller: 'usersController'
	})
	.when('/', {
		templateUrl: 'partials/view1.html',
		controller: 'drawingsController'
	})
	.otherwise({
		redirectTo: '/'
	})
})