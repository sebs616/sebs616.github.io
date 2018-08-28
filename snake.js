	//Initialization variables
	var c = document.getElementById('miCanvas');
	var ctx = c.getContext('2d');
	document.addEventListener("keypress", move);

	//Canvas size variebles
	var x = ctx.canvas.width;
	var y = ctx.canvas.height;
	row = x/20;
	column = y/20;

	//Player variables
	moveX=0;
	moveY=0;
	var initialPlayerPos = [  //initial player position
		[10, 10],
		[10, 10],
		[10, 10]
		];
	var player = initialPlayerPos;
	var initialPos= [10, 10];
	var nextPos= initialPos;
	var apple = [Math.floor(Math.random()*19), Math.floor(Math.random()*19)];


	setInterval(game, 1000/15);

		
//////////////////////////////////////  Key input  //////////////////////////////////////////////////
	function move(key){
			switch(key.keyCode){
				case 37:
					if (moveX==1){break;}
					moveX=-1;
					moveY=0;
					document.removeEventListener("keydown", move);
					break;
				case 38:
					if (moveY==1){break;}
					moveX=0;
					moveY=-1;
					document.removeEventListener("keydown", move);
					break;
				case 39:
					if (moveX==-1){break;}
					moveX=1;
					moveY=0;
					document.removeEventListener("keydown", move);
					break;
				case 40:
					if (moveY==-1){break;}
					moveX=0;
					moveY=1;
					document.removeEventListener("keydown", move);
					break;
			}
		}

	function game(){
///////////////////////////////////////  MOVEMENT  ///////////////////////////////////////////////////
		
		//next direction
		nextPos = [
			player[0][0], 
			player[0][1] 
			];
		nextPos[0]+=moveX;
		nextPos[1]+=moveY;
		if (nextPos[0] > 19){
			nextPos[0] = 0;
		}else if(nextPos[0] < 0){
			nextPos[0] = 19;
		}else if (nextPos[1] > 19){
			nextPos[1] = 0;
		}else if(nextPos[1] < 0){
			nextPos[1] = 19;
		}

		//apple collition detection
		if (nextPos[0]==apple[0] && nextPos[1]==apple[1]){
			nextApplePos();
		}else{
			player.pop();
		}



		//self-colition detection
		var moving = moveY!=0 || moveX!=0;
		if (moving && playerColition(nextPos)) {
			player = [[10, 10],[10, 10];
			nextPos=initialPos;
			moveY=moveX=0;
			player.pop();
		};

		player.unshift(nextPos);



		document.addEventListener("keydown", move);


		//console.log(player.length);
		


////////////////////////////////////////  DRAW GAME  ////////////////////////////////////////////////////

		//background
		ctx.fillStyle = "#694A3B"
		ctx.fillRect(0, 0, x, y); 
		//player
		ctx.fillStyle = "white";
		for(i=0; i<player.length; i++){	
			ctx.fillRect( player[i][0]*row+1, player[i][1]*column+1, row-2, column-2 );	
		}							

		ctx.fillStyle = "red";
		ctx.fillRect(apple[0]*row, apple[1]*column, row, column);


	}

////////////////////////////////////////  Change apple   /////////////////////////////////////////////////
	function nextApplePos(){
		apple = [Math.floor(Math.random()*19), Math.floor(Math.random()*19)]
		if (playerColition(apple)){
			nextApplePos();
		} 
	
	}

////////////////////////////////  Check colition with player  ///////////////////////////////////////////////
	function playerColition(arr){
		for (var i=0; i < player.length; i++) {		
			if(arr[0]==player[i][0] && arr[1]==player[i][1]){
				return true;
			}
		}
		return false;
	}	
