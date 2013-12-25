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
    
    var btnStrokeCol = "rgba(0,0,0,255)";
    var btnStrokeTh = 2;
    var btnW = 200;
    var btnH = 20;
    var btnRound = 2;
    var btnSep = btnStrokeTh + 2;
    
    var playerModel;
    var enemyModel;
    
    
    Battle.prototype.start = function(){
        attack = "attack";
        special = "special";
        item = "item";
        runAway = "run away";
        
        activeBtn = attack;
        
        actionTime = 0;
        maxActionTime = 20;
        enemyActionTime = 0;
        maxEnemyActionTime = 20;
        
//        var btnStrokeCol = "rgba(0,0,0,255)";
//        var btnStrokeTh = 2;
//        var btnW = 200;
//        var btnH = 20;
//        var btnRound = 2;
//        var btnSep = btnStrokeTh + 2;
        
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
        
        attackText.x = attackBG.x - Math.floor(attackText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        attackText.y = attackBG.y - Math.floor(attackText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
        specialText.x = specialBG.x - Math.floor(specialText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        specialText.y = specialBG.y - Math.floor(specialText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
        itemText.x = itemBG.x - Math.floor(itemText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        itemText.y = itemBG.y - Math.floor(itemText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
        runAwayText.x = runAwayBG.x - Math.floor(runAwayText.getMeasuredWidth()/2) + btnW/2 + btnStrokeTh/2;
        runAwayText.y = runAwayBG.y - Math.floor(runAwayText.getMeasuredHeight()/2) + btnH/2 + btnStrokeTh/2;
        
        
        playerName = "Not Burrito";
        enemyName = "Not Taco";
        
        playerHealth = player.getHealth();
        enemyHealth = enemy.getHealth();
        
        var boxStrokeTh = 2;
        var boxW = 200;
        var boxH = 10;
        var boxRound = 1;
        
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
        
        playerName = player.getName();
        playerNameText = new createjs.Text(playerName, "20px Arial", "#000");
        playerNameText.x = playerHealthBar.x ;//- Math.floor(attackText.getMeasuredWidth()) + btnW/2 + btnStrokeTh/2;
        playerNameText.y = playerHealthBar.y - Math.floor(attackText.getMeasuredHeight());// + btnH/2 + btnStrokeTh/2;
        enemyName = enemy.getName();
        enemyNameText = new createjs.Text(enemyName, "20px Arial", "#000");
        enemyNameText.x = enemyHealthBar.x ;//- Math.floor(attackText.getMeasuredWidth()) + btnW/2 + btnStrokeTh/2;
        enemyNameText.y = enemyHealthBar.y - Math.floor(attackText.getMeasuredHeight());// + btnH/2 + btnStrokeTh/2;
        
        var actionTmrCol = "rgba(255,255,255,255)";
        var actionTmrBGCol = "rgba(255,0,0,255)";
        var actionTmrStrCol = "rgba(0,0,0,255)";
        var actionTmrStrTh = 2;
        var actionTmrRound = 1;
        var actionTmrW = 150;
        var actionTmrH = 10;
        
        actionTimer = new createjs.Shape();
        actionTimer.graphics.beginFill(actionTmrCol);//.drawRoundRect(0,0,actionTmrW,actionTmrH,0);
        //actionTimer.graphics.setStrokeStyle(0, "round").beginStroke(actionTmrStrCol).drawRoundRect(0,0,btnW,btnH,0);
        actionTimer.graphics.setStrokeStyle(0, "round").beginStroke(actionTmrStrCol).drawRoundRect(0,0,actionTmrW,actionTmrH,0);
        //actionTimer.setTransform(50, 50);
        actionTimerBG = new createjs.Shape();
        actionTimerBG.graphics.beginFill(actionTmrBGCol).drawRoundRect(0,0,actionTmrW,actionTmrH,actionTmrRound);
        actionTimerBG.graphics.setStrokeStyle(actionTmrStrTh, "round").beginStroke(actionTmrStrCol).drawRoundRect(0,0,actionTmrW,actionTmrH,0);
        //actionTimerBG.setTransform(50, 50);
        actionTimer.setTransform(runAwayBG.x+btnW+btnW/8, runAwayBG.y+btnH*1.5);
        actionTimerBG.setTransform(runAwayBG.x+btnW+btnW/8, runAwayBG.y+btnH*1.5);
        
        var actWidth = (actionTime/maxActionTime);
        
        //actionTimer.graphics.setStrokeStyle(0, "round").beginStroke(actionTmrStrCol).drawRoundRect(0,0,actWidth,actionTmrH,0);
        actionTimer.setTransform(actionTimer.x,actionTimer.y,actWidth,1);
        //attackText.text = actionTmrW;
        //specialText.text = actWidth;
        
        //var playerModel = new createjs.Shape();
        playerModel = player.getModel();
        //playerModel.graphics.beginBitmapFill(player.getModel());
        playerModel.setTransform(playerNameText.x, playerNameText.y-225);
        stage.addChild(playerModel);
        
        enemyModel = enemy.getModel();
        
        enemyModel.setTransform(enemyNameText.x, enemyNameText.y + enemyNameText.getMeasuredHeight() + boxH);
        stage.addChild(enemyModel);
        this.refreshHealthBars();
        
        
        started = true;
    };
    
    Battle.prototype.hasStarted = function(){
        return started;
    };
    
    Battle.prototype.gameOver = function(){
        createjs.Ticker.removeAllEventListeners();
        removePreviousBattle();
        enemy.setDead();
        inCity = false;
        console.log("battle game over");
    };
    
    Battle.prototype.setEnded = function(){
        //activeBtn = attack;
        this.refreshActiveBtn();
        removePreviousBattle();
        input.outOfBattle();
        //enemy.decrementHealth(10000);
        enemy.setDead();
        started = false;
        inCity = false;
        //world.displayOverworld();
        world.displayOverworld();
        console.log("battle ended");
    };
    
    Battle.prototype.useActiveAction = function(){
        switch(activeBtn){
            case attack:
                player.attack(enemy);
                break;
            case special:
                //player.useSpecial(enemy);
                break;
            case item:
                //use active item
                player.useActiveItem();
                break;
            case runAway:
                this.setEnded();
                timesRunAway++;
                fought[xPosPlayer][yPosPlayer] = true;
                break;
        }
    };
    
    removePreviousBattle = function(){
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
    
    Battle.prototype.canStart = function(can){
        if(typeof can === 'boolean'){
            canStart = can;
        }else{
            return canStart;
        }
    };
    
    Battle.prototype.setCanStart = function(can){
        canStart = can;
    };
    
    Battle.prototype.setActionTime = function(time){
        actionTime = time;  
        return actionTime;
    };
    
    Battle.prototype.incrActionTime = function(){
        return actionTime++;  
    };
    
    Battle.prototype.getActionTime = function(){
        return actionTime;
    };
    
    Battle.prototype.getMaxActionTime = function(){
        return maxActionTime;
    };
    
    Battle.prototype.setEnemyActionTime = function(time){
        actionTime = time;  
        return actionTime;
    };
    
    Battle.prototype.incrEnemyActionTime = function(){
        return enemyActionTime++;  
    };
    
    Battle.prototype.getEnemyActionTime = function(){
        return enemyActionTime;
    };
    
    Battle.prototype.getEnemyMaxActionTime = function(){
        return maxEnemyActionTime;
    };
    
    Battle.prototype.refreshHealthBars = function(){
        var pHPWidth = (player.getHealth()/player.getMaxHealth());
        playerHealthBar.setTransform(playerHealthBar.x,playerHealthBar.y,pHPWidth,1);
        
        var eHPWidth = (enemy.getHealth()/enemy.getMaxHealth());
        enemyHealthBar.setTransform(enemyHealthBar.x,enemyHealthBar.y,eHPWidth,1);
    };
    
    Battle.prototype.nextActiveBtn = function(){
        switch(activeBtn){
            case attack:
                activeBtn = special;
                break;
            case special:
                activeBtn = item;
                break;
            case item:
                activeBtn = runAway;
                break;
            case runAway:
                activeBtn = attack;
                break;
        }
    };
    
    Battle.prototype.prevActiveBtn = function(){
        switch(activeBtn){
            case attack:
                activeBtn = runAway;
                break;
            case special:
                activeBtn = attack;
                break;
            case item:
                activeBtn = special;
                break;
            case runAway:
                activeBtn = item;
                break;
        }
    };
    
    resetButtons = function(){
        attackBG.graphics.clear();
        attackBG.graphics.beginFill(inactiveBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        attackBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        attackBG.setTransform(50, scrH-btnH-(btnH+btnSep)*6);
        specialBG.graphics.clear();
        specialBG.graphics.beginFill(inactiveBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        specialBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        specialBG.setTransform(50, scrH-btnH-(btnH+btnSep)*5);
        itemBG.graphics.clear();
        itemBG.graphics.beginFill(inactiveBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        itemBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        itemBG.setTransform(50, scrH-btnH-(btnH+btnSep)*4);
        runAwayBG.graphics.clear();
        runAwayBG.graphics.beginFill(inactiveBtnCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        runAwayBG.graphics.setStrokeStyle(btnStrokeTh, "round").beginStroke(btnStrokeCol).drawRoundRect(0,0,btnW,btnH,btnRound);
        runAwayBG.setTransform(50, scrH-btnH-(btnH+btnSep)*3);
    };
    
    Battle.prototype.refreshActiveBtn = function(){
        var activeIncr = 10;
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
    
    var allowAction = false;
    
    Battle.prototype.canAct = function(){
        return allowAction;
    };
    
    Battle.prototype.tickTimer = function(){
        if(actionTime < maxActionTime){
            allowAction = false;
        }else{
            allowAction = true;
            this.setActionTime(maxActionTime);
        }
        this.refreshTimer(this.incrActionTime(), maxActionTime);
    };
    
    var allowEnemyAction = false;
    
    Battle.prototype.canEnemyAct = function(){
        return allowEnemyAction;
    };
    
    Battle.prototype.tickEnemyTimer = function(){
        if(enemyActionTime < maxEnemyActionTime){
            allowEnemyAction = false;
            //console.log(enemyActionTime + " " + maxEnemyActionTime);
        }else{
            allowEnemyAction = true;
            //this.setEnemyActionTime(maxEnemyActionTime);
            //console.log("enemy ticked");
            enemyActionTime = 0;
        }
        this.incrEnemyActionTime();
    };
    
    Battle.prototype.refreshTimer = function(currentTime, maxTime){
        var actWidth = (currentTime/maxTime);
        //attackText.text = actWidth;
        //specialText.text = actionTime;
        //itemText.text = maxActionTime;
        //var actWidth = (actionTime/maxActionTime);
        actionTimer.setTransform(actionTimer.x,actionTimer.y,actWidth,1);
    };
    
    Battle.prototype.options = function(){
        
    };
    
    var guiAdded = false;
    Battle.prototype.showGUI = function(){
        if(!guiAdded){
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
            guiAdded = true;
            console.log("battle gui added");
        }else{
            
        }
    };
    
    attackText = new createjs.Text("Attack", "20px Arial", "#000");
    attackText.x = 20;
    attackText.y = 20;
    Battle.prototype.writeAttackText = function(text){
        attackText.text= text;
    };
    
    specialText = new createjs.Text("Specials", "20px Arial", "#000");
    specialText.x = 20;
    specialText.y = 40;
    Battle.prototype.writeSpecialText = function(text){
        specialText.text= text;
    };
    
    itemText = new createjs.Text("Items", "20px Arial", "#000");
    itemText.x = 20;
    itemText.y = 60;
    Battle.prototype.writeItemText = function(text){
        itemText.text= text;
    };
    
    runAwayText = new createjs.Text("Run!", "20px Arial", "#000");
    runAwayText.x = 20;
    runAwayText.y = 80;
    Battle.prototype.writeRunAwayText = function(text){
        runAwayText.text= text;
    };
    
}