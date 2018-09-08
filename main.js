let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let random = (min,max) => Math.floor(Math.random()*(max-min))+min

class Block {
	constructor(x,y,changDu){
	    this.changDu = 25
	    this.x = random(25,width-25)
	    this.y = random(25,height-25)
	}
	
	draw(){
		ctx.beginPath()
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.changDu,this.changDu)
		ctx.stroke()
	}
}

class RandomBlock extends Block{
	constructor(){
		super();
	    this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')'
	}
	
}

class Snake extends Block{
	constructor(x,y,color = 'rgb(0,0,0)'){
		super(x,y)
		this.velX = 10
		this.velY =	10
		this.direction ='d'
		this.color = color
		this.health = 1
		this.snakes = []
	}
	
	draw(){
		ctx.beginPath()
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.changDu,this.changDu)
		ctx.stroke()
		
		ctx.fillStyle = '#7FFFD4';
		if(this.health == 1){
			if(this.snakes[0].direction === 'd'){this.snakes[0].x = this.x - 25;this.snakes[0].y = this.y }
			else if(this.snakes[0].direction === 'w'){this.snakes[0].x = this.x;this.snakes[0].y = this.y - 25 }
			else if(this.snakes[0].direction === 's'){this.snakes[0].x = this.x;this.snakes[0].y = this.y + 25 }
			else if(this.snakes[0].direction === 'a'){this.snakes[0].x = this.x + 25;this.snakes[0].y = this.y }
			ctx.fillRect(this.snakes[0].x,this.snakes[0].y,this.changDu,this.changDu)
		}else{
			for(let i = 0; i < this.snakes.length; i++){
				console.log(this.snakes.length,i)
				ctx.fillRect(this.snakes[i].x,this.snakes[i].y,this.changDu,this.changDu)
			}
		}
			
		
	}
	
	//蛇运动
	snakeRun(){
		let _this = this
		window.onkeydown = (e) => {

			/* 
				2018-04-14
				添加ES6设计模式-策略模式的实现
			*/
			const snakeDir = {
				A() {
					_this.x -= _this.velX
					_this.direction = 'a'
				},
				D() {
					_this.x += _this.velX
					_this.direction = 'd'
				},
				S() {
					_this.y -= _this.velY
					_this.direction = 's'
				},
				W() {
					_this.y += _this.velY
					_this.direction = 'w'
				}
			}

			const onDir = dir =>  snakeDir[dir]();

			switch (e.keyCode){
				case 65: onDir('A');
					break;
				case 68: onDir('D');
					break;
				case 87: onDir('S');
					break;
				case 83: onDir('W');
					break;
				default:
					break;
			}
		}
		if(_this.direction === 'd'){_this.x += _this.velX;_this.y = _this.y}
		else if(_this.direction === 'a'){_this.x -= _this.velX;_this.y = _this.y}
		else if(_this.direction === 'w'){_this.x = _this.x;_this.y += _this.velY}
		else if(_this.direction === 's'){_this.x = _this.x;_this.y -= _this.velY}
		else{_this.x += _this.velX;}
		if(_this.x > width){
			_this.x = 0
		}
		if(_this.y > height){
			_this.y = 0
		}
		if(_this.y < 0){
			_this.y = height
		}
		if(_this.x < 0){
			_this.x = width
		}
	}
	
	//碰撞检测
	collisionDetect(){
		if(this.x < block.x + block.changDu &&
		this.x + this.changDu > block.x &&
   		this.y < block.y + block.changDu &&
   		this.changDu + this.y > block.y){
   			this.health ++
	   		block = null
	   		block = new RandomBlock()
	   	}
	}
}

let forte = 25
let block = new RandomBlock()
let snake = new Snake(
		random(forte,width-forte),
		random(forte,height-forte))
let loop = () => {
	ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
	ctx.fillRect(0, 0, width, height)
	block.draw()
	snake.snakeRun()
	while(snake.snakes.length < snake.health){
		console.log('wo 飞')
		snake.snakes.push({
		x:snake.x,
		y:snake.y,
		direction:snake.direction
		});
	}
	snake.draw()
	snake.snakes.shift()
	snake.collisionDetect()
	requestAnimationFrame(loop)
}
loop()


