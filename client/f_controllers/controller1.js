groupSketch.controller('drawingsController', function($scope, canvasFactory)
{
	console.log('hi');
	$scope.color = "red";
	$scope.word = '';
	$scope.result = '';
	$scope.score = 0;



	// $scope.name = prompt("Your name: ");
	// socket.emit('adduser', $scope.name);
	// socket.on('got_a_new_user', function(data){

	// })

// function chatObj(){
// 	this.render = function(){
// 	    var chatbox = document.getElementById('chatbox');
// 		chatbox.style.right = "0px";
// 	    chatbox.style.bottom = "10px";
// 	    chatbox.style.display = "block";
// 		// put dynamic stuff in the box here using innerHTML property if needed
// 		// Usually an Ajax request to get the specific chat brough into the window
// 	}
// 	this.ok = function(){
// 		document.getElementById('chatbox').style.display = "none";
// 		document.getElementById('chatbox').style.display = "none";
// 	}
// } 
// $scope.chat = new chatObj();


//--------------------CANVAS FACTORY-------------------------------->

canvasFactory.encompass(function(data){
})

canvasFactory.drew(function(data){

})

canvasFactory.clear_others(function(data){

})


canvasFactory.changeMouse(function(data){
	
})

////------------------CHANGE SIZE OF PEN--------------------------->

$scope.changeSize_sma = function()
{
	canvasFactory.changeSize_sma(function(data){
	})
}

$scope.changeSize_med = function()
{
	canvasFactory.changeSize_med(function(data){
	})
}

$scope.changeSize_lar = function()
{
	canvasFactory.changeSize_lar(function(data){
	})
}

///----------------CHANGE COLOR OF PEN--------------------------->

	$scope.changeColor_red = function()
	{
		canvasFactory.changeColor_red(function(data){
		})
	}

	$scope.changeColor_green = function()
	{
		canvasFactory.changeColor_green(function(data){
		})
	}


	$scope.changeColor_blue = function()
	{
		canvasFactory.changeColor_blue(function(data){
		})
	}

	$scope.changeColor_black = function()
	{
		canvasFactory.changeColor_black(function(data){
		})
	}


	$scope.erase = function()
	{
		canvasFactory.erase(function(data){
		})
	}

	$scope.erase_all = function()
	{
		canvasFactory.erase_all(function(data){
		})
	}

	$scope.getWord = function(){
		$scope.chosen = '';

		canvasFactory.getWord(function(data){
		})
	}


	canvasFactory.gotWord(function(data){
		$scope.word = data;
		$scope.$digest();
	})

	canvasFactory.getResult(function(string, point){
		$scope.result = string;
		$scope.score = point;
		$scope.$digest();
	})

	canvasFactory.wordPicked(function(data){
		$scope.word = '';
		$scope.chosen = data;
		$scope.$digest();
	})

	$scope.guess_word = function(){
		canvasFactory.guess_word($scope.guess, function(output, data){

		})
	}




//---------------SCOPE FACTORY------------------------------------->

// 	$scope.getWord = function(){
// 		scopeFactory.getWord(function(data){
// 		})
// 	}

// 	scopeFactory.gotWord(function(data){
// 		$scope.word = data;
// 		$scope.$digest();
// 	})

// 	scopeFactory.getResult(function(string, point){
// 		$scope.result = string;
// 		$scope.score = point;
// 		$scope.$digest();
// 	})

// 	scopeFactory.get_erase_all(function(data){

// 	})

// 	scopeFactory.drew(function(data){

// 	})

// 	$scope.guess_word = function(){
// 		scopeFactory.guess_word($scope.guess, function(output, data){

// 		})
// 	}


// //--------Changes marker color-------------------------

// 	$scope.changeColor_red = function()
// 	{
// 		scopeFactory.changeColor_red(function(data){
// 		})
// 	}

// 	$scope.changeColor_green = function()
// 	{
// 		scopeFactory.changeColor_green(function(data){
// 		})
// 	}

// 	$scope.changeColor_blue = function()
// 	{
// 		scopeFactory.changeColor_blue(function(data){
// 		})
// 	}

// //---------Changes marker size----------------------------

// 	$scope.changeSize_sma = function()
// 	{
// 		scopeFactory.changeSize_sma(function(data){
// 		})
// 	}

// 	$scope.changeSize_med = function()
// 	{
// 		scopeFactory.changeSize_med(function(data){
// 		})
// 	}

// 	$scope.changeSize_lar = function()
// 	{
// 		scopeFactory.changeSize_lar(function(data){
// 		})
// 	}


// //----Runs the white board-----------------------------------
// 		scopeFactory.encompass(function(data){
// 		})


// //----Clears Canvas ----------------------------------------------------------------
// 	$scope.erase_all = function()
// 	{
// 		scopeFactory.erase_all(function(data){
// 		})
// 	}

// 	$scope.erase = function()
// 	{
// 		scopeFactory.erase(function(data){
// 		})
// 	}

})

