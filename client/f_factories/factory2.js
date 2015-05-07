groupSketch.factory('canvasFactory', function(){
	var socket = io.connect();
	var factory = {};
	var el = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var radius = 0.004;
	var color = '#000';
	var hue = 'rgba(0,0,0,0)';
	var isDrawing, lastPoint;
	ctx.lineJoin = ctx.lineCap = 'round';

	// var line =
	// {
	// 	distanceBetween: function(point1, point2)   {
	// 													return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	// 												},

	// 	angleBetween: function(point1, point2)  {
	// 												return Math.atan2( point2.x - point1.x, point2.y - point1.y );
	// 											},
	// 	x: 100,
	// 	y: 100,
	// 	color: '#000',
	// 	hue: 'rgba(0,0,0,0)',
	// 	radius: 0.004,
	// };

//--------------CHANGES THE MOUSE POINTER------------------------------------->

factory.changeMouse = function(callback)
{
 el.addEventListener("mouseenter", mouseEnter);
}

function mouseEnter()
{
	document.body.style.cursor="url("
}

///------------CREATES THE DISTANCE AND ANGLES OF LINE------------------------>

	function distanceBetween(point1, point2) {
	  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	}
	function angleBetween(point1, point2) {
	  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
	}

////----------CHANGE SIZE OF PEN-------------------------------------------->
	factory.changeSize_sma = function(callback){
		radius = 0.004;
	}

	factory.changeSize_med = function(callback){
		radius = 0.45;
	}

	factory.changeSize_lar = function(callback){
		radius = 1;
	}	

///----------CHANGE COLOR OF PEN------------------------------------------->

	factory.changeColor_red = function(callback){
		color = "#FF0000"
		hue = 'rgba(255,0,0,0)'
	}

	factory.changeColor_blue = function(callback){
		color = "#0000FF"
		hue = 'rgba(0,0,255,0)'
	}

	factory.changeColor_green = function(callback){
		color = "#009933"
		hue = 'rgba(0,153,51,0)'
	}

	factory.changeColor_black = function(callback){
		color = "#000"
		hue = 'rgba(0,0,0,0)'
	}

	factory.erase = function(callback){
		color = "#FFFFFF"
		hue = 'rgba(255,255,255,0)'
	}

	factory.erase_all = function(callback){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		socket.emit("clear_all", "hi");
	}

	factory.clear_others = function(callback){
		socket.on("server_clear", function(data){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		})
	}

///OTHERS LISTENING FOR DRAWING---------------------------------------------------------->

	factory.drew = function(callback)
	{
		socket.on("start_drawing", function(output)
		{

			isDrawing = true;
			 lastPoint = output
			console.log('here',lastPoint);
		})

		socket.on("drawn", function(data, data2)
		{
			if (!isDrawing) return;
			
			console.log('in here', lastPoint);
			var currentPoint = data;
			console.log(data);
			var dist = distanceBetween(lastPoint, currentPoint);
			var angle = angleBetween(lastPoint, currentPoint);
			
			for(var i = 0; i < dist; i+=5) 
			{
			  x = lastPoint.x + (Math.sin(angle) * i);
			  y = lastPoint.y + (Math.cos(angle) * i);
			  
			  var radgrad = ctx.createRadialGradient(x,y,10,x,y,20);
			  
			  radgrad.addColorStop(0, data2.paint);

			  radgrad.addColorStop(data2.dia, data2.shade);
			  
			  ctx.fillStyle = radgrad;

			  ctx.fillRect(x-20, y-20, 40, 40);
			}
			
			lastPoint = currentPoint;
		})
		
		
	}
///-----------------------------DRAW FUNCTION-------------------------------------------->
	factory.encompass = function(callback)
	{
		
		var isDrawing, lastPoint;

		el.onmousedown = function(e) {
		  isDrawing = true;
		  lastPoint = { x: e.clientX, y: e.clientY };
		  // console.log(lastPoint);
		  socket.emit("start_point", lastPoint);
		};

		el.onmousemove = function(e)
		{
		  if (!isDrawing) return;
		  
		  var currentPoint = { x: e.clientX, y: e.clientY };
		  var dist = distanceBetween(lastPoint, currentPoint);
		  var angle = angleBetween(lastPoint, currentPoint);
		  
		  for(var i = 0; i < dist; i+=5) 
		  {
		    x = lastPoint.x + (Math.sin(angle) * i);
		    y = lastPoint.y + (Math.cos(angle) * i);
		    
		    var radgrad = ctx.createRadialGradient(x,y,10,x,y,20);
		    
		    radgrad.addColorStop(0, color);
		    // radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
		    radgrad.addColorStop(radius, hue);
		    
		    ctx.fillStyle = radgrad;

		    ctx.fillRect(x-20, y-20, 40, 40);

		    socket.emit('drawingRequest', {x: e.clientX, y: e.clientY}, {paint: color, dia: radius, shade:hue });
		  }
		  
		  lastPoint = currentPoint;


		  el.onmouseup = function() {
		    isDrawing = false;
		  };

		};

	}

	return factory;
})