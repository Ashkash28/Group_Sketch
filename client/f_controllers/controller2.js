groupSketch.controller('usersController', function($scope, scopeFactory){
	var socket = io.connect();
	$scope.name = prompt("Your name: ");
	console.log("2324");
	$scope.ball = '';

	scopeFactory.encompass(function(data){
	})

})