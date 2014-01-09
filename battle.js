/*
 * This is the battle class
 * 
 * It starts battles, makes the overworld disappear and a battle screen appear
 * It also controls the battle timers for both the player and the enemy
 */
function Battle(){
    
    var attack, special, item, runAway;
    var attackBG, specialBG, itemBG, runAwayBG;
    var attackText, specialText, itemText, runAwayText;
    var playerName, enemyName;
    var playerNameText, enemyNameText;
    var playerHealth, enemyHealth;
    var playerHealthBar, enemyHealthBar;
    var playerHealthBarBG, enemyHealthBarBG;
    var actionTimer, actionTimerBG, actionTime, maxActionTime, enemyActionTime, maxEnemyActionTime;
    
    var inactiveBtnCol = "rgba(255,255,255,255)";
    var activeBtnCol = "rgba(255,0,0,255)";
    var canStart;
    var started;
    var activeBtn;
    var activeBtnIndex;
    
    var btnStrokeCol = "rgba(0,0,0,255)";
    var btnStrokeTh = 2;
    var btnW = 200;
    var btnH = 20;
    var btnRound = 2;
    var btnSep = btnStrokeTh + 2;
    
    var playerModel;
    var enemyModel;
    
    /*
     * Method to set up all the variables properly
     */
    Battle.prototype.start = function(){
        //set up the text for the different buttons
        attack = "attack";
        special = "special";
        item = "item";
        runAway = "run away";
        
        //set a variable to act as the index of the first button to be the active one
        activeBtnIndex = 0;
        
        //set the active button to be attack
        activeBtn = attack;
        
        //set the action timer variables
        actionTime = 0;
        maxActionTime = 20;
        enemyActionTime = 0;
        maxEnemyActionTime = 20;
        
        //set up the background for the battle action buttons, in their inactive position/color
        attackBG = new createjs.Shape();
        attackBG.graphics.beginFill(inactiveBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        attackBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        attackBG.setTransform(50, scrH-btnH-(btnH+btnSep)*6);
        specialBG = new createjs.Shape();
        specialBG.graphics.beginFill(inactiveBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        specialBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        specialBG.setTransform(50, scrH-btnH-(btnH+btnSep)*5);
        itemBG = new createjs.Shape();
        itemBG.graphics.beginFill(inactiveBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        itemBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        itemBG.setTransform(50, scrH-btnH-(btnH+btnSep)*4);
        runAwayBG = new createjs.Shape();
        runAwayBG.graphics.beginFill(inactiveBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        runAwayBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        runAwayBG.setTransform(50, scrH-btnH-(btnH+btnSep)*3);
        
        //set up the text for the battle action buttons, in their inactive position
        //the text is centered
        attackText.x = attackBG.x - Math.floor(attackText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        attackText.y = attackBG.y - Math.floor(attackText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
        specialText.x = specialBG.x - Math.floor(specialText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        specialText.y = specialBG.y - Math.floor(specialText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
        itemText.x = itemBG.x - Math.floor(itemText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        itemText.y = itemBG.y - Math.floor(itemText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
        runAwayText.x = runAwayBG.x - Math.floor(runAwayText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        runAwayText.y = runAwayBG.y - Math.floor(runAwayText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
        
        //get the player and enemy healths
        playerHealth = player.getHealth();
        enemyHealth = enemy.getHealth();
        
        //set up the parameters for the health bars
        var boxStrokeTh = 2;
        var boxW = 200;
        var boxH = 10;
        var boxRound = 1;
        
        //set up the health bars
        var playerHealthCol = "rgba(255,0,0,255)";
        var playerHealthStrCol = "rgba(0,0,0,255)";
        playerHealthBar = new createjs.Shape();
        playerHealthBar.graphics.beginFill(playerHealthCol).drawRoundRect(0,0,boxW,boxH,boxRound);
        playerHealthBar.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(playerHealthStrCol).drawRoundRect(0,0,boxW,boxH,boxRound);
        playerHealthBar.setTransform(scrW - boxW - 50, scrH - boxH*3);
        var enemyHealthCol = "rgba(0,0,255,255)";
        var enemyHealthStrCol = "rgba(0,0,0,255)";
        enemyHealthBar = new createjs.Shape();
        enemyHealthBar.graphics.beginFill(enemyHealthCol).drawRoundRect(0,0,boxW,boxH,boxRound);
        enemyHealthBar.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(enemyHealthStrCol).drawRoundRect(0,0,boxW,boxH,boxRound);
        enemyHealthBar.setTransform(50, boxH*3);
        var playerHealthBGCol = "rgba(0,0,0,255)";
        var playerHealthBGStrCol = "rgba(0,0,0,255)";
        playerHealthBarBG = new createjs.Shape();
        playerHealthBarBG.graphics.beginFill(playerHealthBGCol).drawRoundRect(0,0,boxW,boxH,boxRound);
        playerHealthBarBG.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(playerHealthBGStrCol).drawRoundRect(0,0,boxW,boxH,boxRound);
        playerHealthBarBG.setTransform(scrW - boxW - 50, scrH - boxH*3);
        var enemyHealthBGCol = "rgba(0,0,0,255)";
        var enemyHealthBGStrCol = "rgba(0,0,0,255)";
        enemyHealthBarBG = new createjs.Shape();
        enemyHealthBarBG.graphics.beginFill(enemyHealthBGCol).drawRoundRect(0,0,boxW,boxH,boxRound);
        enemyHealthBarBG.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(enemyHealthBGStrCol).drawRoundRect(0,0,boxW,boxH,boxRound);
        enemyHealthBarBG.setTransform(50, boxH*3);
        
        //get the names and set them up
        playerName = player.getName();
        playerNameText = new createjs.Text(playerName, "20px Arial", "#000");
        playerNameText.x = playerHealthBar.x ;//- Math.floor(attackText.getMeasuredWidth()) + btnW/2 + btnStrokeTh/2;
        playerNameText.y = playerHealthBar.y - Math.floor(attackText.getMeasuredHeight());// + btnH/2 + btnStrokeTh/2;
        enemyName = enemy.getName();
        enemyNameText = new createjs.Text(enemyName, "20px Arial", "#000");
        enemyNameText.x = enemyHealthBar.x ;//- Math.floor(attackText.getMeasuredWidth()) + btnW/2 + btnStrokeTh/2;
        enemyNameText.y = enemyHealthBar.y - Math.floor(attackText.getMeasuredHeight());// + btnH/2 + btnStrokeTh/2;
        
        //set up the parameters for the player's timer bar
        var actionTmrCol = "rgba(255,255,255,255)";
        var actionTmrBGCol = "rgba(255,0,0,255)";
        var actionTmrStrCol = "rgba(0,0,0,255)";
        var actionTmrStrTh = 2;
        var actionTmrRound = 1;
        var actionTmrW = 150;
        var actionTmrH = 10;

        //set up the player's timer bar
        actionTimer = new createjs.Shape();
        actionTimer.graphics.beginFill(actionTmrCol);
        actionTimer.graphics.setStrokeStyle(0, "round").beginStroke(actionTmrStrCol).drawRoundRect(0,0,actionTmrW,actionTmrH,0);
        actionTimerBG = new createjs.Shape();
        actionTimerBG.graphics.beginFill(actionTmrBGCol).drawRoundRect(0,0,actionTmrW,actionTmrH,actionTmrRound);
        actionTimerBG.graphics.setStrokeStyle(actionTmrStrTh, "round").beginStroke(actionTmrStrCol).drawRoundRect(0,0,actionTmrW,actionTmrH,0);
        actionTimer.setTransform(runAwayBG.x+btnW+btnW/8, runAwayBG.y+btnH*1.5);
        actionTimerBG.setTransform(runAwayBG.x+btnW+btnW/8, runAwayBG.y+btnH*1.5);
        
        //set the bar to its initial state
        var actWidth = (actionTime/maxActionTime);
        actionTimer.setTransform(actionTimer.x,actionTimer.y,actWidth,1);
        
        //get the player's model/image and set it up
        playerModel = player.getModel();
        playerModel.setTransform(playerNameText.x, playerNameText.y-225);
        stage.addChild(playerModel);
        
        //get the enemy's model/image and set it up
        enemyModel = enemy.getModel();
        enemyModel.setTransform(enemyNameText.x, enemyNameText.y + enemyNameText.getMeasuredHeight() + boxH);
        stage.addChild(enemyModel);
        this.refreshHealthBars();
        
        //remove and re-add the direction boxes to put them above everything
        stage.removeChild(upBox);
        stage.removeChild(leftBox);
        stage.removeChild(downBox);
        stage.removeChild(rightBox);
        stage.addChild(upBox);
        stage.addChild(leftBox);
        stage.addChild(downBox);
        stage.addChild(rightBox);
        
        //hide the character sheet if it is visible
        if(typeof charSheet === CharacterSheet){
            if(charSheet.isVisible()){
                console.log("battle started hiding sheet");
                charSheet.hide();
                console.log("character sheet not visible");
            }
        }
        
        //set the battle as started
        started = true;
    };
    
    /*
     * Method to get the started variable
     */    
    Battle.prototype.hasStarted = function(){
        return started;
    };
    
    /*
     * Method to end the game
     */
    Battle.prototype.gameOver = function(){
        //stop the all the game's timers
        createjs.Ticker.removeAllEventListeners();
        //remove all the battle GUI elements
        removePreviousBattle();
        //set the enemy as dead
        enemy.setDead();
        //make the player not in a city
        inCity = false;
        //console.log("battle game over");
        //mute all music
        music.volume = 0;
        battleMusic.volume = 0;
    };
    
    /*
     * Method to set the battle as ended
     */
    Battle.prototype.setEnded = function(){
        //refresh the active button's position/color
        this.refreshActiveBtn();
        //remove the GUI elements of the battle screen
        removePreviousBattle();
        //set the input's status to out of battle, so that the player can move
        input.outOfBattle();
        //set the enemy as dead (this is temporary, makes life easier // player does not get rewarded in this method)
        enemy.setDead();
        //resets the player's special attacks, to be prepared for the next battle
        player.resetSpecials();
        //sets the battle as ended
        started = false;
        //disregards the current tile as a city
        inCity = false;
        //displays the overworld
        world.displayOverworld();
        //console.log("battle ended");
    };
    
    /*
     * Method to specify what happens at each button
     */
    Battle.prototype.useActiveAction = function(){
        //switch statement to check what button is active
        switch(activeBtn){
            case attack:
                //uses the player's stats to attack the enemy
                player.attack(enemy);
                break;
            case special:
                //uses the player's active special attack on the enemy
                player.useSpecial(enemy);
                break;
            case item:
                //uses the player's active item
                player.useActiveItem();
                break;
            case runAway:
                //set the action timer to 0
                this.setActionTime(0);
                //set the battle as ended
                this.setEnded();
                //increment the run away "score"
                timesRunAway++;
                //sets this tile as fought/won so that it is disregarded when walking around
                //this is temporary, makes life easier, the player does not get rewarded
                fought[xPosPlayer][yPosPlayer] = true;
                break;
        }
    };
    
    /*
     * Method to remove the GUI elements of the battle screen
     */
    removePreviousBattle = function(){
        //remove all the elements from the stage
        stage.removeChild(attackBG);
        stage.removeChild(specialBG);
        stage.removeChild(itemBG);
        stage.removeChild(runAwayBG);
        stage.removeChild(attackText);
        stage.removeChild(specialText);
        stage.removeChild(itemText);
        stage.removeChild(runAwayText);
        stage.removeChild(playerNameText);
        stage.removeChild(enemyNameText);
        stage.removeChild(playerHealthBar);
        stage.removeChild(enemyHealthBar);
        stage.removeChild(playerHealthBarBG);
        stage.removeChild(enemyHealthBarBG);
        stage.removeChild(actionTimer);
        stage.removeChild(actionTimerBG);
        stage.removeChild(activeBtn);
        stage.removeChild(playerModel);
        stage.removeChild(enemyModel);
    };
    
    /*
     * Method to check to see if the battle can be started
     * 
     * @return canStart
     */
    Battle.prototype.canStart = function(can){
        if(typeof can === 'boolean'){
            canStart = can;
        }else{
            return canStart;
        }
    };
    
    /*
     * Method for forcing canStart to a certain state
     */
    Battle.prototype.setCanStart = function(can){
        canStart = can;
    };
    
    /*
     * Method for forcing the player's action time to a certain value
     */
    Battle.prototype.setActionTime = function(time){
        actionTime = time;  
        return actionTime;
    };
    
    /*
     * Method for incrementing the player's action time
     * 
     * @return actionTime
     */
    Battle.prototype.incrActionTime = function(){
        return actionTime++;  
    };
    
    /*
     * Method for getting the player's current action time
     * 
     * @return actionTime
     */
    Battle.prototype.getActionTime = function(){
        return actionTime;
    };
    
    /*
     * Method for getting the player's maximum action time
     * 
     * @return maxActionTime
     */
    Battle.prototype.getMaxActionTime = function(){
        return maxActionTime;
    };
    
    /*
     * Method to force the enemy's action time to a certain value
     */
    Battle.prototype.setEnemyActionTime = function(time){
        actionTime = time;  
    };
    
    /*
     * Method to increment the enemy's action time
     */
    Battle.prototype.incrEnemyActionTime = function(){
        enemyActionTime++;  
    };
    
    /*
     * Method to get the enemy's current action time
     * 
     * @return enemyActionTime
     */
    Battle.prototype.getEnemyActionTime = function(){
        return enemyActionTime;
    };
    
    /*
     * Method to get the enemy's maximum action time
     * 
     * @return maxEnemyActionTime
     */
    Battle.prototype.getEnemyMaxActionTime = function(){
        return maxEnemyActionTime;
    };
    
    /*
     * Method to refresh the health bars
     */
    Battle.prototype.refreshHealthBars = function(){
        //checks the ratio of the player's health vs max health
        var pHPWidth = (player.getHealth()/player.getMaxHealth());
        //scales the player's health bar to the ratio calculated above
        playerHealthBar.setTransform(playerHealthBar.x,playerHealthBar.y,pHPWidth,1);
        
        //same as above for the enemy's health bar
        var eHPWidth = (enemy.getHealth()/enemy.getMaxHealth());
        enemyHealthBar.setTransform(enemyHealthBar.x,enemyHealthBar.y,eHPWidth,1);
    };
    
    /*
     * Method to pick the next action button
     */
    Battle.prototype.nextActiveBtn = function(){
        //checks which button is currently active and makes the next button active along with the index
        switch(activeBtn){
            case attack:
                activeBtn = special;
                activeBtnIndex = 1;
                break;
            case special:
                activeBtn = item;
                activeBtnIndex = 2;
                break;
            case item:
                activeBtn = runAway;
                activeBtnIndex = 3;
                break;
            case runAway:
                activeBtn = attack;
                activeBtnIndex = 0;
                break;
        }
    };
    
    /*
     * Method to pick the previous action button
     */
    Battle.prototype.prevActiveBtn = function(){
        //checks which button is currently active and makes the previous button active along with the index
        switch(activeBtn){
            case attack:
                activeBtn = runAway;
                activeBtnIndex = 3;
                break;
            case special:
                activeBtn = attack;
                activeBtnIndex = 0;
                break;
            case item:
                activeBtn = special;
                activeBtnIndex = 1;
                break;
            case runAway:
                activeBtn = item;
                activeBtnIndex = 2;
                break;
        }
    };
    
    /*
     * Method to get the current active button's index
     * 
     * @return activeBtnIndex
     */
    Battle.prototype.getActiveBtnIndex = function(){
        return activeBtnIndex;
    };
    
    /*
     * Method to reset all the buttons to their inactive stat/indent
     */
    resetButtons = function(){
        attackText.x = attackBG.x - Math.floor(attackText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        attackText.y = attackBG.y - Math.floor(attackText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
        attackBG.graphics.clear();
        attackBG.graphics.beginFill(inactiveBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        attackBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        attackBG.setTransform(50, scrH-btnH-(btnH+btnSep)*6);
        specialText.x = specialBG.x - Math.floor(specialText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        specialText.y = specialBG.y - Math.floor(specialText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
        specialBG.graphics.clear();
        specialBG.graphics.beginFill(inactiveBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        specialBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        specialBG.setTransform(50, scrH-btnH-(btnH+btnSep)*5);
        itemText.x = itemBG.x - Math.floor(itemText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        itemText.y = itemBG.y - Math.floor(itemText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
        itemBG.graphics.clear();
        itemBG.graphics.beginFill(inactiveBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        itemBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        itemBG.setTransform(50, scrH-btnH-(btnH+btnSep)*4);
        runAwayText.x = runAwayBG.x - Math.floor(runAwayText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        runAwayText.y = runAwayBG.y - Math.floor(runAwayText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
        runAwayBG.graphics.clear();
        runAwayBG.graphics.beginFill(inactiveBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        runAwayBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        runAwayBG.setTransform(50, scrH-btnH-(btnH+btnSep)*3);
        
        //remove and re-add the direction buttons to put them above everything on the stage
        stage.removeChild(upBox);
        stage.removeChild(leftBox);
        stage.removeChild(downBox);
        stage.removeChild(rightBox);
        stage.removeChild(actionBox);
        stage.addChild(upBox);
        stage.addChild(leftBox);
        stage.addChild(downBox);
        stage.addChild(rightBox);
        stage.addChild(actionBox);
    };
    
    /*
     * Method to refresh the active button, setting its indent and resetting the others
     */
    Battle.prototype.refreshActiveBtn = function(){
        //the amount to indent by
        var activeIncr = 10;
        //checks which button is currently active
        //resets all the buttons, then indents the active one
        switch(activeBtn){
            case attack:
                resetButtons();
                attackBG.graphics.clear();
                attackBG.graphics.beginFill(activeBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
                attackBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
                attackBG.setTransform(50+activeIncr, scrH-btnH-(btnH+btnSep)*6);
                break;
            case special:
                resetButtons();
                specialBG.graphics.clear();
                specialBG.graphics.beginFill(activeBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
                specialBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
                specialBG.setTransform(50+activeIncr, scrH-btnH-(btnH+btnSep)*5);
                break;
            case item:
                resetButtons();
                itemBG.graphics.clear();
                itemBG.graphics.beginFill(activeBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
                itemBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
                itemBG.setTransform(50+activeIncr, scrH-btnH-(btnH+btnSep)*4);
                break;
            case runAway:
                resetButtons();
                runAwayBG.graphics.clear();
                runAwayBG.graphics.beginFill(activeBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
                runAwayBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
                runAwayBG.setTransform(50+activeIncr, scrH-btnH-(btnH+btnSep)*3);
                break;
        }
        
        //console.log("battle started"); 
    };
    
    //variable to allow the player to do things(or not, depending)
    var allowAction = false;
    
    /*
     * Method to get the state of whether the player can act or not
     * 
     * @return allowAction
     */
    Battle.prototype.canAct = function(){
        return allowAction;
    };
    
    /*
     * Method to tick the player's action time and adjust their bar accordingly
     */
    Battle.prototype.tickTimer = function(){
        //checks to see if the current time is smaller than the maximum time
        //allows action if it is
        if(actionTime < maxActionTime){
            allowAction = false;
        }else{
            allowAction = true;
            this.setActionTime(maxActionTime);
        }
        //this refreshes the player's timer bar depending on the current time vs maximum time
        //also increments the player's action time
        this.refreshTimer(this.incrActionTime(), maxActionTime);
    };
    
    //variable to allow the enemy to do things(or not, depending)
    var allowEnemyAction = false;
    
    /*
     * Method to get the state of whether the enemy can act or not
     * 
     * @return allowEnemyAction
     */
    Battle.prototype.canEnemyAct = function(){
        return allowEnemyAction;
    };
    
    /*
     * Method to tick the enemy's action time
     */
    Battle.prototype.tickEnemyTimer = function(){
        //checks to see if the current time is smaller than the maximum time
        //allows action if it is
        if(enemyActionTime < maxEnemyActionTime){
            allowEnemyAction = false;
        }else{
            allowEnemyAction = true;
            //sets the enemy's action time to 0 immedietly, since they do not need time to decide on what to do
            enemyActionTime = 0;
        }
        //ticks the enemy's action time
        this.incrEnemyActionTime();
    };
    
    /*
     * Method to refresh the player's action timer bar
     */
    Battle.prototype.refreshTimer = function(currentTime, maxTime){
        //gets the ratio between the player's current time vs the maximum time
        var actWidth = (currentTime/maxTime);
        //scales the player's action bar according to the ratio calculated from above
        actionTimer.setTransform(actionTimer.x,actionTimer.y,actWidth,1);
    };
    
    //variable to check if the gui was added
    var guiAdded = false;
    
    /*
     * Method to show the battle GUI
     */
    Battle.prototype.showGUI = function(){
        //check to see if it has already been added
        if(!guiAdded){
            //add all the elements
            stage.addChild(playerHealthBarBG);        
            stage.addChild(enemyHealthBarBG);        
            stage.addChild(playerHealthBar);        
            stage.addChild(enemyHealthBar);        

            stage.addChild(attackBG);
            stage.addChild(specialBG);
            stage.addChild(itemBG);
            stage.addChild(runAwayBG);

            stage.addChild(actionTimerBG);
            stage.addChild(actionTimer);

            stage.addChild(playerNameText);
            stage.addChild(enemyNameText);

            stage.addChild(attackText);
            stage.addChild(specialText);
            stage.addChild(itemText);
            stage.addChild(runAwayText);
            //set the GUI as added
            guiAdded = true;
            //console.log("battle gui added");
        }else{
            
        }
    };
    
    /*
     * The following sets all the initial text for the different buttons
     * as well as centering said text within the button
     */
    attackText = new createjs.Text("Attack", "20px Arial", "#000");
    attackText.x = 20;
    attackText.y = 20;
    Battle.prototype.writeAttackText = function(text){
        attackText.text= text;
        attackText.x = attackBG.x - Math.floor(attackText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        attackText.y = attackBG.y - Math.floor(attackText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
    };
    
    specialText = new createjs.Text("Specials", "20px Arial", "#000");
    specialText.x = 20;
    specialText.y = 40;
    Battle.prototype.writeSpecialText = function(text){
        specialText.text= text;
        specialText.x = specialBG.x - Math.floor(specialText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        specialText.y = specialBG.y - Math.floor(specialText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
    };
    
    itemText = new createjs.Text("Items", "20px Arial", "#000");
    itemText.x = 20;
    itemText.y = 60;
    Battle.prototype.writeItemText = function(text){
        itemText.text= text;
        itemText.x = itemBG.x - Math.floor(itemText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        itemText.y = itemBG.y - Math.floor(itemText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
    };
    
    runAwayText = new createjs.Text("Run!", "20px Arial", "#000");
    runAwayText.x = 20;
    runAwayText.y = 80;
    Battle.prototype.writeRunAwayText = function(text){
        runAwayText.text= text;
        runAwayText.x = runAwayBG.x - Math.floor(runAwayText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        runAwayText.y = runAwayBG.y - Math.floor(runAwayText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
    };
    
}