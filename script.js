var canvas = document.getElementById('container'),
	clone = document.getElementById('blurCanvasBottom');
var ctx = canvas.getContext('2d'),
	cloneCtx = clone.getContext('2d');

// 设置canvas宽高为全屏
var ww = document.body.clientWidth,
	wh = document.body.clientHeight;
canvas.width = ww;
canvas.height = wh;

// 定义颗粒计数与数组
var partCount = 100, particles = [];

function randomInt (min, max) {  //输出一个[min,max+1)的随机整数
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function particle() {
	// 设定颗粒位置为屏幕范围内的随机位置
	this.x = randomInt(0, ww);
	this.y = randomInt(0, wh);

	// 颗粒白色、透明度随机
	this.color = 'rgba(255, 255, 255,' + Math.random() + ')';

	// 颗粒运动方向 [-1,1]
	this.direction = {
	    "x": Math.random() * 2 - 1,
	    "y": Math.random() * 2 - 1
  	};

  	// 颗粒运动速度
  	this.vx = 0.3 * Math.random();
 	this.vy = 0.3 * Math.random();

 	// 颗粒半径为2或3
 	this.radius = randomInt(2,3);

 	// 颗粒位置变化
 	this.float = function() {
 		this.x += this.vx * this.direction.x;
 		this.y += this.vy * this.direction.y;
 	};

 	// 颗粒漂浮方向变化
 	this.changeDirection = function (axis) {
 		this.direction[axis] *= -1;
 	};
 	this.boundaryCheck = function() {
 		// 颗粒到达边界后反向漂浮
 		if(this.x >= ww) {
 			this.x = ww;
 			this.changeDirection('x');
 		} else if (this.x <= 0) {
 			this.x = 0;
 			this.changeDirection('x');
 		} else if (this.y >= wh) {
 			this.y = wh;
 			this.changeDirection('y');
 		} else if (this.y <= 0) {
 			this.y = 0;
 			this.changeDirection('y');
 		}
 	};

 	// 绘制颗粒
 	this.draw = function() {
 		ctx.beginPath();
 		ctx.fillStyle = this.color;
 		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
 		ctx.fill();
 	};
} 
function clearCanvas() {  //颗粒物清除
	cloneCtx.clearRect(0, 0, ww, wh);
	ctx.clearRect(0, 0, ww, wh);
}
function createParticles() {  //生成颗粒
	for (var i = 0; i < partCount; i++) {
		var p = new particle();
		particles.push(p);
	}
}
function drawParticles() {  //绘制出颗粒物
	for (var i = 0; i < particles.length; i++) {
		p = particles[i];
		p.draw();
	}
}
function updataParticles() { //更新颗粒物
	for (var i = particles.length - 1; i >= 0; i--) {
		p = particles[i];
        p.float();
        p.boundaryCheck();
	}
}

createParticles();
drawParticles();

function animateParticles() { //颗粒物漂浮运动
    clearCanvas();
    drawParticles();
    updataParticles();
    cloneCtx.drawImage(canvas, 0, 0);
    requestAnimationFrame(animateParticles);
}
requestAnimationFrame(animateParticles);
cloneCtx.drawImage(canvas, 0, 0);

window.onresize = function() {  //浏览器窗口变化时重新绘制
	ww = document.body.clientWidth;
	wh = document.body.clientHeight;
	canvas.width = ww;
	canvas.height= wh;
	clearCanvas();
	particles = [];
	createParticles();
	drawParticles();
}

