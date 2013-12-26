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

////create shape
//charizard = new createjs.Shape();
////posx, posy, width, height, scale
//charizard.graphics.beginFill("red").drawCircle(0,0,20);
////position
//charizard.x = charizard.y = 50;

var boxRound = 5;
var boxStrokeCol = "rgba(255,255,255,1)";
var boxStrokeTh = 1;
var boxFillCol = "rgba(255,0,0,1)";
var boxW = boxH = gridScale = 50;

var gui = new GUI();

var input = new Input();

var applesGoByeBye = false;
var debugTime = false;

var player = new Player();
player.start("Not Burrito");
var enemy;

var enemiesKilled = 0;
var timesRunAway = 0;
var potionsUsed = 0;

var world = new World();

var debugText;

var playerLocText;

var playerPosText;

var walkTickText;

var battleStatusText;

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

//var data = { 
//        images: ["Assets/poketrainerspin.png"],
//        frames: {width:428/12, height:36},
//        animations: {run:[0,2], jump:[5,20,"run"]}
//};

//var spriteSheet = new createjs.SpriteSheet(data);
//var animation = new createjs.Sprite(spriteSheet, "run");
var animation = new createjs.Bitmap("Assets/Models/Taco1Overworld.png");
animation.setTransform(2*gridScale,2*gridScale,1.4,1.4);
animation.setBounds(animation.x, animation.y, animation.x-gridScale, animation.y-gridScale);
animation.setTransform(((scrW/2)-((animation.getBounds().width)/2)),((scrH/2)-((animation.getBounds().height)/2)));

    var bitmap = new createjs.Bitmap("Assets/Models/Taco1Overworld.png");
    
    var bmp2 = bitmap.clone();
    bmp2.regY = 50;
    bmp2.rotation = 180;
    bmp2.y = 50 + 2;
    bmp2.scaleX = -1;
    
    var maskShape = new createjs.Shape();
    var g = maskShape.graphics;
    g.beginLinearGradientFill(["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"], [0, 1], 0, 0, 0, 50);
    g.drawRect(0, 0, 50, 50);
    g.endFill();
    
    maskShape.cache(0, 0, 50, 50);
    
    var amf = new createjs.AlphaMaskFilter(maskShape.cacheCanvas);
    bmp2.filters = [amf];
    bmp2.cache(0, 0, 50, 50);
    

    stage.update();


var gridSize = worldSize;
grid = create2DArr(gridSize);
var fought = create2DArr(gridSize);
var posGridText = [];

function genFoughtGrid(){
    for(var i=0;i<fought.length;i++){
        for(var j=0;j<fought.length;j++){
            fought[i][j] = false;
        }
    }
}

genFoughtGrid();

var xOff = xPosPlayer = 4*gridScale;
var yOff = yPosPlayer = 6*gridScale;

xPosPlayer = xPosPlayer/20;
yPosPlayer = yPosPlayer/30;

world.genGrid();

var cityArr = [];

world.genCities();

world.displayOverworld();

//heart-beat ticker
createjs.Ticker.addEventListener("tick", ticker);

var delay = 10;
var tick = 0;

//ticks
function ticker(){
    tick++;
    
    if(tick >= delay){
//        charizard.x += 10;
//        if(charizard.x > stage.canvas.width){
//            charizard.x = 0;
//        }
//
//        charizard.y += 10;
//        if(charizard.y > stage.canvas.height){
//            charizard.y = 0;
//        }
        tick = 0;
    }
    checkMove();
    stage.update();
};

var walk = false;
var slowDownWalk = 1;
var walkSpeed = 5/slowDownWalk;
var canWalkTick = 0;

var inCity = false;
var battle;

var music = document.getElementById('music');
music.volume=0;
var battleMusic = document.getElementById('battleMusic');
battleMusic.pause();
battleMusic.volume=0;

var tempPoint = [];

function checkMove(){
    
    tempPoint = [animation.x/gridScale, animation.y/gridScale];
    //gui.writePlayerLoc("Player loc: " + tempPoint);
    gui.writePlayerLoc("Fought: " + fought[xPosPlayer][yPosPlayer]);
    gui.writePlayerPos("Player pos: " + xPosPlayer + "," + yPosPlayer);
    
    for(var i=0;i<cityArr.length;i++){
        if(xPosPlayer=== cityArr[i][0] && yPosPlayer === cityArr[i][1])
        {
            inCity = true;
            //gui.writeBattleStatus("In city");
            break;
        }else{
            inCity = false;
            //gui.writeBattleStatus("Not in city");
            //break;
        }   
    }
//    if(player){
//        for(var i=0;i<player.getItems().length;i++){
//            var tempItem = player.getItems()[i];
//            //console.log(tempItem.name);
//        }
//    }
    if(inCity){
        gui.writeBattleStatus("In city");
        //stage.removeAllChildren();
        //world.hideOverworld();
        gui.hideDebug();
        if(battle){
            if(!battle.hasStarted()){
                if(battle.canStart()){
                    if(fought[xPosPlayer][yPosPlayer]){
                
                    }else{
                        enemy = new Enemy();
                        battle = new Battle();
                        world.hideOverworld();
                        input.intoBattle();
                        battle.start();
                        music.pause();
                        music.currentTime = 0;
                        battleMusic.play();
                    }
                }
            }
        }else{
            if(fought[xPosPlayer][yPosPlayer]){
                
            }else{
                enemy = new Enemy();
                battle = new Battle();
                world.hideOverworld();
                input.intoBattle();
                battle.start();
                music.pause();
                music.currentTime = 0;
                battleMusic.play();
            }
        }
        if(battle){
            if(enemy.isDead()){
                fought[xPosPlayer][yPosPlayer] = true;
                if(battle.hasStarted()){
                    battle.setEnded();
                    input.outOfBattle();
                }
                //gui.displayDebug();
                music.play();
                battleMusic.pause();
                battleMusic.currentTime = 0;
                //var end = new EndScreen();
                //end.showEndScreen();
            }else{
                battle.showGUI();
                battle.refreshActiveBtn();
                battle.tickTimer();
                battle.tickEnemyTimer();
                enemy.enemyLoop();
            }
        }
    }else{
        if(battle){
            //if(battle.hasStarted()){
                //battle.setEnded();
            //}
            if(world.isOverworldHidden()){
                //world.displayOverworld();
            }
        }
        //input.outOfBattle();
        //stage.removeAllChildren();
        gui.writeBattleStatus("Not in city");
        //world.displayOverworld();
        //gui.displayDebug();
    }
    
    if(canWalkTick >= walkSpeed){
        walk = true;
        //console.log("can walk now");
    }else{
        walk = false;
        canWalkTick++;
    }
    gui.writeWalkTick("Walk tick: " + canWalkTick);

    if(mouseDown){
        if(battle){
            if(!battle.hasStarted()){
                //walk = true;
            }else{
                //walk = false;
            }
        }else{
            //walk = true;
        }
        input.doKeyActions();

   }else{
       upBox.graphics.clear();
       leftBox.graphics.clear();
       downBox.graphics.clear();
       rightBox.graphics.clear();
       upBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       upBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       leftBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       leftBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       downBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       downBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       rightBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       rightBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       //animation.stop();
       return;
   }
}

function showEndScreen(){
    var end = new EndScreen();
    battle.gameOver();
    end.showEndScreen();
};

//add charizard as a child to the stage
//stage.addChild(charizard);
stage.addChild(animation);

stage.addChild(bmp2);
stage.addChild(bitmap);

stage.addChild(upBox);
stage.addChild(leftBox);
stage.addChild(downBox);
stage.addChild(rightBox);

//text last thing on display list
stage.addChild(debugText);
stage.addChild(walkTickText);
stage.addChild(battleStatusText);
stage.addChild(playerLocText);
stage.addChild(playerPosText);
gui.hideDebug();
debugTime = false;
//update the graphics
stage.update();
