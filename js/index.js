/* global PIXI */
'use strict';

/////////////////////
////General Setup////
/////////////////////

//aliases.... we'll add more as we import more classes
var Container = PIXI.Container,
    Graphics = PIXI.Graphics,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader;  //might need this one later    

//                              width, height
var renderer = autoDetectRenderer(650, 700); //we'll play with this later, in original height > width as oppose to most games...
document.body.appendChild(renderer.view);
var stage = new Container();

var thirdOfWidth = (renderer.view.width / 3) - 10; //A little less than 3rd of width


/////////////////////
/////Canvas Setup////
/////////////////////

//Initial game appearence  wit
var paddle = new Graphics();
paddle.beginFill(0xFFFFFF); //white 
paddle.drawRect(0, 0, (renderer.view.width/3)-10, 20); //width a bit less than screen size, height of 20px
paddle.endFill();
paddle.x = 10;
paddle.y = renderer.view.height - 25; //25px from bottom, regardless of canvas size
stage.addChild(paddle);


/////////////////////
////// Paddle ///////
/////////////////////

var paddle2 = {
	pos: 1,  //default at first of 3 options

	moveRight: function(){
		this.pos += 1
		return this.pos;
	},

	moveLeft: function(){
		this.pos -= 1
		return this.pos;
	},

	drawPaddle: function(){
		var num; // ignore this
	    paddle.beginFill(0xFFFFFF); //white 
		paddle.drawRect(0, 0, thirdOfWidth, 20); //width a bit less than screen size, height of 20px
		paddle.endFill();
		if (this.pos == 1) {
			num = 10;
		} else if (this.pos == 2) {
			num = thirdOfWidth + 10;
		} else {
			num = thirdOfWidth * 2 + 20;
		}

		//for some reason if I did paddle.x = thirdOfCanvas etc. in the if-else block it'd only render once, so I used num instead.
		paddle.x = num;
		paddle.y = renderer.view.height - 25; //25px from bottom, regardless of canvas size
		stage.addChild(paddle);
		renderer.render(stage);		
	}
};


/////////////////////
////Event Handling///
/////////////////////

//Function to listen to keyboard keys pressed
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}


var left = keyboard(37), //left - ascii value oof 37
    right = keyboard(39); //right - ascii value of 39

left.press = function() {
	//
	if (paddle2["pos"] != 1) {  // if not equal one, that way pos is never less than 1
		paddle2.moveLeft();  //  paddle.pos -= 1
	}
};	

left.release = function() {
  	//key object released
  	paddle2.drawPaddle();  //draw left move
};

right.press = function() {
  	if (paddle2["pos"] != 3) {  // if not equal 3, that way pos never goes over 3
		paddle2.moveRight()  // paddle.pos += 1
	}
};	

right.release = function() {
	//key object released
	paddle2.drawPaddle();  //draw right move
};


/////////////////////
//////Rendering//////
/////////////////////
renderer.view.style.border = "10px solid gray";
renderer.render(stage);