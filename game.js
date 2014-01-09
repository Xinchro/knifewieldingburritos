/*
 * This is the main, "god" class
 * 
 * It controls and starts everything in the game
 */
var canvas;
var stage;
var image = new Image();
var scrW, scrH;
var bmpAnim;
var mouseDown;
var upEntered, leftEntered, downEntered, rightEntered, actionEntered;
var charizard;
var upBox, leftBox, downBox, rightBox, actionBox;
var grid;

//new stage        
stage = new createjs.Stage('gameCanvas');
//get canvas
canvas = document.getElementById('gameCanvas');
//get screen width/height
scrW = canvas.width;
scrH = canvas.height;

//add listeners for the mouse
stage.addEventListener("mousedown", function(){mouseDown = true;});
stage.addEventListener("click", function(){mouseDown = false;});

//enable mouse controls
stage.enableMouseOver(20, true, false);
//enable touch
createjs.Touch.enable(stage, true, false);

var boxRound = 5;
var boxStrokeCol = "rgba(255,255,255,0.5)";
var boxStrokeTh = 1;
var boxFillCol = "rgba(255,0,0,0.5)";
var boxW = boxH = gridScale = 50;

var gui = new GUI();

var input = new Input();

var applesGoByeBye = false;
var debugTime = false;

var player = new Player();
player.start("Not Burrito");

var enemy;
var enemyLevel = 1;

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

/*
 * Method to create a 2D array with X number of rows
 * 
 * @return array
 */
function create2DArr(rows){
    //start an array
    var array = [];
    
    //loop through the array
    for(var i=0;i<rows;i++){
        //put an array in that index
        array[i] = [];
    }
    
    return array;
}

/*
 * Method to chance a decimal number to a hexidecimal number
 * 
 * @return finalNum(String)
 */
function decToHex(num){
    var finalNum;
    
    //change the input to a hexidecimal number
    finalNum = num.toString(16);
    
    return finalNum;
}

//This is the setup for a sprite sheet, keeping for reference
//
//var data = { 
//        images: ["Assets/poketrainerspin.png"],
//        frames: {width:428/12, height:36},
//        animations: {run:[0,2], jump:[5,20,"run"]}
//};
//var spriteSheet = new createjs.SpriteSheet(data);
//var animation = new createjs.Sprite(spriteSheet, "run");

//sets up the player's overworld model/image
//centers it on the screen
var playerOverworldModel = new createjs.Bitmap("Assets/Models/Taco1Overworld.svg");
playerOverworldModel.setBounds(playerOverworldModel.x, playerOverworldModel.y, playerOverworldModel.x+gridScale, playerOverworldModel.y+gridScale);
playerOverworldModel.setTransform(((scrW/2)-((playerOverworldModel.getBounds().width)/2)),((scrH/2)-((playerOverworldModel.getBounds().height)/2)));

//set the grid size to the world size and make an array based on that
var gridSize = worldSize;
grid = create2DArr(gridSize);
//make another array to fill in when battles have been fought/won/run away from
var fought = create2DArr(gridSize);
var posGridText = [];

/*
 * Method to generate the fought grid, sets all position to false to start with
 */
function genFoughtGrid(){
    for(var i=0;i<fought.length;i++){
        for(var j=0;j<fought.length;j++){
            fought[i][j] = false;
        }
    }
}

//generate the fought grid
genFoughtGrid();

//centers the player in the world
xPosPlayer = Math.floor(worldSize/2);
yPosPlayer = Math.floor(worldSize/2);

//generates the ground
world.genGrid();

var cityArr = [];

//generates the cities
world.genCities();

//displays the overworld
world.displayOverworld();

//heart-beat ticker
createjs.Ticker.addEventListener("tick", ticker);

/*
 * Method to tick through the game's activities
 */
function ticker(){
    //do all the game functions
    doThings();
    //update the stage
    stage.update();
};

var walk = false;
var slowDownWalk = 1;
var walkSpeed = 5/slowDownWalk;
var canWalkTick = 0;

var inCity = false;
var battle = new Battle();

//gets and sets all the music to mute
var music = document.getElementById('music');
music.volume = 0;
var battleMusic = document.getElementById('battleMusic');
//pause the battle music since we won't start in one
battleMusic.pause();
battleMusic.volume = 0;

/*
 * method to reset all music
 */
function resetMusic(){
    console.log("music reset");
    //set mute to false
    mute = false;
    //set music volumes to 1
    music.volume = 1;
    battleMusic.volume = 1;
    //set music times to 0(start)
    music.currentTime = 0;
    battleMusic.currentTime = 0;
}

var touchTicker = 0;

/*
 * Method which is the game's main loop
 */
function doThings(){
    //gui.writePlayerLoc("Player loc: " + tempPoint);
    gui.writePlayerLoc("Fought: " + fought[xPosPlayer][yPosPlayer]);
    gui.writePlayerPos("Player pos: " + xPosPlayer + "," + yPosPlayer);
    
    //a touch ticker, acts as a delay, so that events aren't constantly being fired
    touchTicker++;
    
    //loops through the city array to check if the player is in a city
    for(var i=0;i<cityArr.length;i++){
        if(xPosPlayer=== cityArr[i][0] && yPosPlayer === cityArr[i][1])
        {
            inCity = true;
            //break since we're in a city and need to fight, no use checking the rest
            break;
        }else{
            inCity = false;
        }   
    }

    //check if the player is in a city
    if(inCity){
        gui.writeBattleStatus("In city");
        gui.hideDebug();
        //check if the battle variable is null(has never been started)
        if(battle){
            //check if there is already a battle underway
            if(!battle.hasStarted()){
                //check if a battle can start
                if(battle.canStart()){
                    //check if the player has already fought here
                    if(fought[xPosPlayer][yPosPlayer]){
                
                    }else{
                        //make a new enemy
                        enemy = new Enemy();
                        //give the enemy random stats
                        enemy.ranStats();
                        //make a new battle
                        battle = new Battle();
                        //hide the overworld
                        world.hideOverworld();
                        //set the input as in a battle, so that the player does not move around in the overworld
                        input.intoBattle();
                        //start the battle
                        battle.start();
                        //pause the main music
                        music.pause();
                        //set the main music to 0(start)
                        music.currentTime = 0;
                        //play the battle music
                        battleMusic.play();
                    }
                }
            }
        }else{
            //check if the player has fought on the current tile
            if(fought[xPosPlayer][yPosPlayer]){
                
            }else{
                //make a new enemy
                enemy = new Enemy();
                //give the enemy random stats
                enemy.ranStats();
                //make a new battle
                battle = new Battle();
                //hide the overworld
                world.hideOverworld();
                //set the input as in a battle, so that the player does not move around in the overworld
                input.intoBattle();
                //start the battle
                battle.start();
                //pause the main music
                music.pause();
                //set the main music to 0(start)
                music.currentTime = 0;
                //play the battle music
                battleMusic.play();
            }
        }
        //check if the battle variable null
        if(battle){
            //check if the enemy is not undefined
            if(typeof enemy !== 'undefined'){
                //check if the enemy is dead
                if(enemy.isDead()){
                    //set the current tile as fought
                    fought[xPosPlayer][yPosPlayer] = true;
                    //if a battle has been started
                    if(battle.hasStarted()){
                        //set the battle as ended
                        battle.setEnded();
                        //set the input as out of battle, to let the player move around
                        input.outOfBattle();
                        //set the main musi's time to 0(start)
                        music.currentTime = 0;
                    }
                    //play the main music
                    music.play();
                    //pause the battle music
                    battleMusic.pause();
                    //set the battle music's time to 0
                    battleMusic.currentTime = 0;
                    //
                }else{
                    //show the battle GUI
                    battle.showGUI();
                    //refresh the battle GUI's active button
                    battle.refreshActiveBtn();
                    //tick the player's action timer
                    battle.tickTimer();
                    //tick the enemy's action timer
                    battle.tickEnemyTimer();
                    //cycle through the enemies AI loop
                    enemy.enemyLoop();
                }
            }
        }
    }else{
    }

    //check if the tick  is higher than or equal to defined walk speed
    if(canWalkTick >= walkSpeed){
        //set walk to true
        walk = true;
        //console.log("can walk now");
    }else{
        //set walk to false and increment the tick
        walk = false;
        canWalkTick++;
    }
    gui.writeWalkTick("Walk tick: " + canWalkTick);

//check if the mouse if down
    if(mouseDown){
        //do whatever the actions are
        input.doKeyActions();
   }else{
       //reset the direction boxes
       upBox.graphics.clear();
       leftBox.graphics.clear();
       downBox.graphics.clear();
       rightBox.graphics.clear();
       actionBox.graphics.clear();
       upBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       upBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       leftBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       leftBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       downBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       downBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       rightBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       rightBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       actionBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       actionBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
       //part of the reference for sprite sheets
       //would stop the sprite animtion
       //animation.stop();
       return;
   }
}

/*
 * Method to show the end screen
 */
function showEndScreen(){
    //make a new end screen
    var end = new EndScreen();
    //set the game as over
    battle.gameOver();
    //show the end screen
    end.showEndScreen();
};

//add everything in this class/file to the stage
stage.addChild(playerOverworldModel);

stage.addChild(upBox);
stage.addChild(leftBox);
stage.addChild(downBox);
stage.addChild(rightBox);

//debug text last thing on display list
stage.addChild(debugText);
stage.addChild(walkTickText);
stage.addChild(battleStatusText);
stage.addChild(playerLocText);
stage.addChild(playerPosText);
//hide the debug
gui.hideDebug();
debugTime = false;
//make and show the start screen
//it is an overlay, so it is kind of a cheat, but good for now
var start = new StartScreen();
start.show();
//update the graphics
stage.update();
