function init(){
	canvas = document.getElementById('mycanvas');
	W=H=canvas.width=canvas.height=500;
	pen=canvas.getContext('2d');
    cs=40;
    game_over=false;
    score=5;
    //Create imagwe object for food
    food_img=new Image();
    food_img.src ="/home/pinak/Desktop/Codes/Project/food.jpg";
    food=getRandomFood();
	snake={
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",

		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){
			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle=this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
		},
		updateSnake:function(){
			//console.log("updating snake according to the direction");
			//Check if snake is eating then food then update the length of snake
			//Generate new food object and random location
			var headx=this.cells[0].x;
			var heady=this.cells[0].y;
			if(headx==food.x&&heady==food.y){
				console.log("Food Eaten by snake");
				food=getRandomFood();
				score++;
			}
			else
			{
				this.cells.pop();
			}
			var nextX,nextY;
			if(this.direction=="right"){
				nextX=headx+1;
				nextY=heady;
			}
			else if(this.direction=="left"){
				nextX=headx-1;
				nextY=heady;
			}
			else if(this.direction=="down"){
				nextX=headx;
				nextY=heady+1;
			}
			else if(this.direction=="up"){
				nextX=headx;
				nextY=heady-1;
			}
			this.cells.unshift({x:nextX,y:nextY});
			var last_x= Math.round(W/cs);
			var last_y=Math.round(H/cs);
			if(this.cells[0].y<0||this.cells[0].x<0||this.cells[0].x>last_x||this.cells[0].y>last_y){
				game_over=true;
			}
		}
	};
	snake.createSnake();
	//Add Event Listener on document object
	function keyPressed(e){
		if(e.key=="ArrowRight"){
			snake.direction="right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction="left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction="down";
		}
		else if(e.key=="ArrowUp"){
			snake.direction="up" ;
		}
		console.log(snake.direction);
	}

	document.addEventListener('keydown',keyPressed);
}
function draw(){
	
	//erase the old frame
	pen.clearRect(0,0,W,H);

	snake.drawSnake();
	pen.fillStyle=food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
	pen.fillStyle="red";
	pen.font = "20px Roboto";
	pen.fillText(score,50,50);

	//sconsole.log("In Draw");
	// pen.clearRect(0,0,W,H);
	// pen.fillRect(rect.x,rect.y,rect.w,rect.h);
	// pen.fillStyle="red";	
} 
function update(){
	snake.updateSnake();

	//console.log("In Update");
	// rect.x=rect.x+rect.speed;
	// if(rect.x>W-rect.w||rect.x<0){
	// 	rect.speed*=-1;
	// }
}
function getRandomFood(){
	var foodX=Math.round(Math.random()*(W-cs)/cs);
	var foodY=Math.round(Math.random()*(H-cs)/cs);
	var food={
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food;
}
function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("'Game Over");
	}
	draw();
	update();

	// console.log("In Gameloop");
	// if(game_over==true){
	// 	clearInterval(f);
	// }
	// draw();
	// update();
}
 init();
 var f=setInterval(gameloop,200);
