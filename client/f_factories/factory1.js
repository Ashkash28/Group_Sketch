groupSketch.factory('scopeFactory', function(){
	var socket = io.connect();
	var factory = {};
	var color = 'red';
	var radius = 10;
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var score = 0;

	var ball = 
	{
	  x: 100,
	  y: 100,
	  vx: 5,
	  vy: 1,
	  radius: 10,
	  color: 'red',
	  draw: function() {
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    ctx.closePath();
	    ctx.fillStyle = this.color;
	    ctx.fill();
	  },
	};



	console.log('socket: factory says ping(1)')
	socket.emit('ping', {some: 'data'});

	socket.on('pong', function(data){
		console.log('socket: factory receives pong(4)', data);
	});

	factory.getResult = function(callback){
		socket.on('user_guess_c', function(data){
			callback(data);
		})
		socket.on('you_guess_c', function(data){
			console.log('before');
			console.log(score);

			score = score + 1;
			console.log('This is the score');
			console.log(score);
			callback(data, score);
		})
		socket.on('user_guess_w', function(data){
			callback(data);
		})
		socket.on('you_guess_w', function(data){

			callback(data);
		})
	}


//--------ASKING SERVER FOR A RANDOM WORD-------------------------------------

	factory.getWord = function(callback){
		socket.emit('need_word', {some: 'data'});
	}

//-------------SENDING WORD TO THE SCOPE--------------------------------------

	factory.gotWord = function(callback){
		socket.on('sending_word', function(data){
			callback(data);
		})
	}

//--------------GUESSING THE WORD----------------------------------------------

	factory.guess_word = function(data, callback){
			socket.emit('guess_c', data);
	}

	factory.changeColor_red = function(callback){
		color = 'red';
	}

	factory.changeColor_green = function(callback){
		color = 'green';
	}

	factory.changeColor_blue = function(callback){
		color = 'blue';
	}

	factory.changeSize_sma = function(callback){
		radius = 5;
	}

	factory.changeSize_med = function(callback){
		radius = 10;
	}

	factory.changeSize_lar = function(callback){
		radius = 20;
	}

	factory.erase = function(callback){
		color = 'white';
	}



	factory.encompass = function(callback)
	{

			var raf;
			var running = false;

			function clear() {
			  ctx.fillStyle = 'rgba(255,255,255,0.3)';
			  ctx.fillRect(1000,1000,canvas.width,canvas.height);
			}

	//----------Allows the ball to be drawn----------------------------------
			function draw()
		    {
			  clear();
			  ball.draw();
			  ball.color = 'red';
			  ball.x += ball.vx;
			  ball.y += ball.vy;

			  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
			    ball.vy = -ball.vy;
			  }
			  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
			    ball.vx = -ball.vx;
			  }

			  // raf = window.requestAnimationFrame(draw);
			}


	//-------------Allows you to actually draw on the canvas------------
			canvas.addEventListener("mousedown",function(e)
			{
				running = false;
				canvas.addEventListener("mousemove", function(e)
				{
					if (!running)
				    {
					    // clear();
					    ball.x = e.clientX;
					    ball.y = e.clientY;
					    ball.color = color;
					    ball.radius = radius;
					    ball.draw(); 

					    socket.emit('drawRequest', ball);

					    canvas.addEventListener("click", function(e){
					    	running = true;
					    })
					} 	
				});
			});

	//------------Stops the drawing once mouse has left canvas-----------
			canvas.addEventListener("mouseout", function(e){
				running = true;
			})
	}

	factory.drew = function(callback){
		socket.on('drew', function(data){
			ball.x = data.x;
			ball.y = data.y;
			// ball.vx = data.vx;
			// ball.vy = data.vy;
			ball.color = data.color;
			ball.radius = data.radius;
			ball.draw(); 
		})
	}

	factory.erase_all = function(callback){
		socket.emit('try_clear', {some: 'data'})
	}

	factory.get_erase_all = function(callback){
		socket.on('cleared', function(data){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		})
	}

	return factory;
})