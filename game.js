var canvas;
var stage;
var image = new Image();
var scrW, scrH;
var bmpAnim;
var mouseDown;
var upEntered, leftEntered, downEntered, rightEntered;
var charizard;
var upBox, leftBox, downBox, rightBox;
var grid;

//new stage        
stage = new createjs.Stage('gameCanvas');
//get canvas
canvas = document.getElementById('gameCanvas');

//get screen width/height
scrW = canvas.width;
scrH = canvas.height;

stage.addEventListener("mousedown", function(){mouseDown = true;});
stage.addEventListener("pressup", function(){mouseDown = false;});

//enable mouse controls
stage.enableMouseOver(20);

//create shape
charizard = new createjs.Shape();
//posx, posy, width, height, scale
charizard.graphics.beginFill("red").drawCircle(0,0,20);
//position
charizard.x = charizard.y = 50;

var boxRound = 5;
var boxStrokeCol = "rgba(255,255,255,1)";
var boxStrokeTh = 1;
var boxFillCol = "rgba(255,0,0,1)";
var boxW = boxH = gridScale = 50;


upBox = new createjs.Shape();
upBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
upBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
upBox.setTransform(boxW, scrH-boxH-boxH);
//stage.addChild(upBox);
leftBox = new createjs.Shape();
leftBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
leftBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
leftBox.setTransform(0, scrH-boxH);
//stage.addChild(leftBox);
downBox = new createjs.Shape();
downBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
downBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
downBox.setTransform(boxW, scrH-boxH);
//stage.addChild(downBox);
rightBox = new createjs.Shape();
rightBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
rightBox.setTransform(boxW+boxW, scrH-boxH);
rightBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
//stage.addChild(rightBox);


upBox.addEventListener("mouseover", function(){upEntered = true;});
upBox.addEventListener("mouseout", function(){upEntered = false;});
leftBox.addEventListener("mouseover", function(){leftEntered = true;});
leftBox.addEventListener("mouseout", function(){leftEntered = false;});
downBox.addEventListener("mouseover", function(){downEntered = true;});
downBox.addEventListener("mouseout", function(){downEntered = false;});
rightBox.addEventListener("mouseover", function(){rightEntered = true;});
rightBox.addEventListener("mouseout", function(){rightEntered = false;});

document.onkeydown = keyDown;
document.onkeyup = keyUp;

var applesGoByeBye = false;
var debugTime = false;

var player = new Player();

function keyDown(e){
    document.getElementById('gameCanvas').focus();
    mouseDown = true;
    switch(e.keyCode){
        case 38:
            writeText("Up arrow pressed");
            upEntered = true;
            break;
        case 37:
            writeText("Left arrow pressed");
            leftEntered = true;
            break;
        case 40:
            writeText("Down arrow pressed");
            downEntered = true;
            break;
        case 39:
            writeText("Right arrow pressed");
            rightEntered = true;
            break;
        case 69:
            //E
            //player.start(this);
            var playerHealth = player.getHealth();
            writeText(playerHealth);
            //writeText(player.health);
            break;
        case 82:
            //R
            player.decrementHealth();
            //player.start(this);
            var playerHealth = player.getHealth();
            writeText(playerHealth);
            //writeText(player.health);
            break;
        case 90:
            writeText("Z pressed");
            if(!applesGoByeBye){
                stage.removeAllChildren();
                applesGoByeBye = true;
            }else{
                displayOverworld();
                applesGoByeBye = false;
            }
            break;
        case 72:
            writeText("H pressed");
            if(!debugTime){
                debugText.visible = false;
                playerLocText.visible = false;
                walkTickText.visible = false;
                battleStatusText.visible = false;
                for(var i=0;i<posGridText.length;i++)
                {
                    posGridText[i].visible = false;
                }
                
                debugTime = true;
            }else{
                debugText.visible = true;
                playerLocText.visible = true;
                walkTickText.visible = true;
                battleStatusText.visible = true;
                for(var i=0;i<posGridText.length;i++)
                {
                    posGridText[i].visible = true;
                }
                
                debugTime = false;
            }
            break;    
    }
}

function keyUp(e){
    mouseDown = false;
    switch(e.keyCode){
        case 38:
            writeText("Up arrow unpressed");
            upEntered = false;
            break;
        case 37:
            writeText("Left arrow unpressed");
            leftEntered = false;
            break;
        case 40:
            writeText("Down arrow unpressed");
            downEntered = false;
            break;
        case 39:
            writeText("Right arrow unpressed");
            rightEntered = false;
            break;
    }
}

function displayOverworld(){
            for(var i=0; i<grid.length;i++){
                for(var j=0; j<grid.length;j++){
                    stage.addChild(grid[i][j]);
                }
            }
            for(var i=0;i<posGridText.length;i++)
            {
                stage.addChild(posGridText[i]);
            }
            stage.addChild(animation);
            stage.addChild(charizard);
            stage.addChild(debugText);
            stage.addChild(playerLocText);
            stage.addChild(playerPosText);
            stage.addChild(walkTickText);
            stage.addChild(battleStatusText);
            stage.addChild(upBox);
            stage.addChild(leftBox);
            stage.addChild(downBox);
            stage.addChild(rightBox);
            stage.addChild();
}

var debugText = new createjs.Text("newText", "20px Arial", "#000");

var playerLocText = new createjs.Text("newText", "20px Arial", "#000");
playerLocText.x = 225;

var playerPosText = new createjs.Text("newText", "20px Arial", "#000");
playerPosText.x = 225;
playerPosText.y = 20;

var walkTickText = new createjs.Text("newText", "20px Arial", "#000");
walkTickText.y = 20;

var battleStatusText = new createjs.Text("newText", "20px Arial", "#000");
battleStatusText.y = 40;


function writeText(text){
    
    debugText.text= text;
    
}

function writeWalkTick(text){
    
    walkTickText.text= text;
    
}

function writePlayerLoc(text){
    playerLocText.text = text;
}

function writePlayerPos(text){
    playerPosText.text = text;
}

function writeBattleStatus(text){
    
    battleStatusText.text= text;
    
}

var colorArr = [];
colorArr[0] = "purple";
colorArr[1] = "yellow";
colorArr[2] = "red";
colorArr[3] = "pink";
colorArr[4] = "green";
colorArr[5] = "blue";

function create2DArr(rows){
    var array = [];
    
    for(var i=0;i<rows;i++){
        array[i] = [];
    }
    
    return array;
}

function decToHex(num){
    var finalNum;
    
    finalNum = num.toString(16);
    
    return finalNum;
}


var data = { 
        images: ["Sprites/poketrainerspin.png"],
        frames: {width:428/12, height:36},
        animations: {run:[0,2], jump:[5,20,"run"]}
};

var spriteSheet = new createjs.SpriteSheet(data);
var animation = new createjs.Sprite(spriteSheet, "run");
animation.setTransform(2*gridScale,2*gridScale,1.4,1.4);
animation.setBounds(animation.x, animation.y, animation.x-gridScale, animation.y-gridScale);
//HALP PLZ
//HOW2CENTURTRACKCHARACTUR

animation.setTransform(((scrW/2)-((animation.getBounds().width)/2)),((scrH/2)-((animation.getBounds().height)/2)),1.4,1.4);


var gridSize = 20;
grid = create2DArr(gridSize);
var posGridText = [];

var xOff = xPosPlayer = 4*gridScale;
var yOff = yPosPlayer = 6*gridScale;
// x5 because science
xPosPlayer = xPosPlayer/20;
yPosPlayer = yPosPlayer/30;

function genGrid(){
    var tempRect;
    for(var x=0;x<gridSize;x++){
        for(var y=-1;y<gridSize;y++){
            tempRect = new createjs.Shape();
            //var tempCol = decToHex(Math.floor((Math.random()*255)));
            var tempCol = Math.floor((Math.random()*255)+150);
            var xPos, yPos;
            xPos = x*gridScale+((animation.x)%gridScale)-xOff;
            yPos = y*gridScale+((animation.y)%gridScale)-yOff;
            battleStatusText.text = xPos/50 + " " + yPos/50;
            //tempRect.graphics.beginFill(colorArr[tempCol]).drawRoundRect(x*50,y*50,50,50,0);
            tempRect.graphics.beginFill("rgba(0," + tempCol + ",0" + ",1)").drawRoundRect(xPos,yPos,gridScale,gridScale,5);
            grid[x][y] = tempRect;
            stage.addChild(grid[x][y]);
            
            var posText = new createjs.Text(x + "," + y, "20px Arial", "#FFF");
            posText.x = xPos;
            posText.y = yPos;
            posGridText.push(posText);
            stage.addChild(posGridText[posGridText.length-1]);
        }
    }
    
    writeText("Grid added");
    //writeText(parseInt(tempCol, 16));
}
genGrid();

var cityArr = [];


function genCities(){
    var tempRect;
    //var randLocX, randLocY;
    var checkCity;
    //higher values make cities rarer
    var cityRarity = 5;
    
    for(var x=0;x<gridSize;x++){
        for(var y=0;y<gridSize;y++){
            checkCity = Math.floor((Math.random()*cityRarity)+1);
            if(checkCity == 1){    
                tempRect = new createjs.Shape();
                //var tempCol = decToHex(Math.floor((Math.random()*255)+250));
                var tempCol = Math.floor((Math.random()*255)+150);
                var xPos, yPos;
                xPos = x*gridScale+((animation.x)%gridScale)-xOff;
                yPos = y*gridScale+((animation.y)%gridScale)-yOff;
                //tempRect.graphics.beginFill(colorArr[tempCol]).drawRoundRect(x*50,y*50,50,50,0);
                tempRect.graphics.beginFill("rgba(0," + "0," + tempCol + ",1)").drawRoundRect(xPos,yPos,gridScale,gridScale,5);
                stage.removeChild(grid[x][y]);
                grid[x][y] = tempRect;
                cityArr.push([x,y]);
                
                stage.addChild(grid[x][y]);
                //stage.update();
                
                var posText = new createjs.Text(x + "," + y, "20px Arial", "#FFF");
                posText.x = xPos;
                posText.y = yPos;
                posGridText.push(posText);
                stage.addChild(posGridText[posGridText.length-1]);
            }
        }
    }   
    
    writeText("Cities added");
}
genCities();

//heart-beat ticker
createjs.Ticker.addEventListener("tick", ticker);

var delay = 10;
var tick = 0;

//text, moves charizard every second
function ticker(){
    tick++;
    
    if(tick >= delay){
        charizard.x += 10;
        if(charizard.x > stage.canvas.width){
            charizard.x = 0;
        }

        charizard.y += 10;
        if(charizard.y > stage.canvas.height){
            charizard.y = 0;
        }
        tick = 0;
    }
    checkMove();
    stage.update();
};

var walk;
var slowDownWalk = 5;
var walkSpeed = 5/slowDownWalk;
var canWalkTick = 0;

var inCity = false;

function checkMove(){
    var tempPoint = [];
    tempPoint = [animation.x/gridScale, animation.y/gridScale];
    writePlayerLoc("Player loc: " + tempPoint);
    writePlayerPos("Player pos: " + xPosPlayer + "," + yPosPlayer);
    
    for(var i=0;i<cityArr.length;i++){
        
        if(xPosPlayer=== cityArr[i][0] && yPosPlayer=== cityArr[i][1])
        {
            inCity = true;
            //writeBattleStatus("In city");
            break;
        }else{
            inCity = false;
            //writeBattleStatus("Not in city");
            //break;
        }   
    }
    if(inCity){
        writeBattleStatus("In city");
        stage.removeAllChildren();
    }else{
        writeBattleStatus("Not in city");
        displayOverworld();
    }
    
    if(canWalkTick >= walkSpeed){
        walk = true;
    }else{
        walk = false;
        canWalkTick++;
    }
    writeWalkTick("Walk tick: " + canWalkTick);

   if(mouseDown){
        if(upEntered){
            if(walk){
                //animation.y -= gridScale;
                
                yPosPlayer--;
                for(var i=0; i<grid.length;i++){
                    for(var j=0; j<grid.length;j++){
                        grid[i][j].y += gridScale;
                    }
                }
                for(var i=0;i<posGridText.length;i++)
                {
                    posGridText[i].y += gridScale;;
                }
                
                
                animation.play();
                canWalkTick = 0;
                upBox.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,boxW,boxH,boxRound);
            }
            writeText("Move up");
        }else{
            //animation.stop();
        }
        if(leftEntered){
            if(walk){
                //animation.x -= gridScale;
                
                xPosPlayer--;
                for(var i=0; i<grid.length;i++){
                    for(var j=0; j<grid.length;j++){
                        grid[i][j].x += gridScale;
                    }
                }
                for(var i=0;i<posGridText.length;i++)
                {
                    posGridText[i].x += gridScale;;
                }
                
                
                animation.play();
                canWalkTick = 0;
                leftBox.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,boxW,boxH,boxRound);
            }
            writeText("Move left");
        }else{
            //animation.stop();
        }
        if(downEntered){
            if(walk){
                //animation.y += gridScale;
                
                yPosPlayer++;
                for(var i=0; i<grid.length;i++){
                    for(var j=0; j<grid.length;j++){
                        grid[i][j].y -= gridScale;
                    }
                }
                for(var i=0;i<posGridText.length;i++)
                {
                    posGridText[i].y -= gridScale;;
                }
                
                
                animation.play();
                canWalkTick = 0;
                downBox.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,boxW,boxH,boxRound);
            }
            writeText("Move down");
        }else{
            //animation.stop();
        }
        if(rightEntered){
            if(walk)
            {
                //animation.x += gridScale;
                
                xPosPlayer++;
                for(var i=0; i<grid.length;i++){
                    for(var j=0; j<grid.length;j++){
                        grid[i][j].x -= gridScale;
                    }
                }
                for(var i=0;i<posGridText.length;i++)
                {
                    posGridText[i].x -= gridScale;;
                }
                
                
                animation.play();
                canWalkTick = 0;
                rightBox.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,boxW,boxH,boxRound);
            }
            writeText("Move right");
        }else{
            //animation.stop();
        }
   }else{
       upBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       leftBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       downBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       rightBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       animation.stop();
       return;
   }
}



//add charizard as a child to the stage
stage.addChild(charizard);
stage.addChild(animation);


stage.addChild(upBox);
stage.addChild(leftBox);
stage.addChild(downBox);
stage.addChild(rightBox);


//charizard.gotoAndPlay(animation);

//text last thing on display list
stage.addChild(debugText);
stage.addChild(walkTickText);
stage.addChild(battleStatusText);
stage.addChild(playerLocText);
stage.addChild(playerPosText);
//update the graphics
stage.update();
