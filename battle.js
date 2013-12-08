function Battle(){
    
    var attack, special, item, runAway;
    var attackBG, specialBG, itemBG, runAwayBG;
    var attackText, specialText, itemText, runAwayText;
    var playerName, enemyName;
    var playerHealth, enemyHealth;
    var playerHealthBar, enemyHealthBar;
    var actionTimer;
    
    var inactiveBtnCol = "rgba(255,255,255,255)";
    var activeBtnCol = "rgba(255,0,0,255)";
    
    Battle.prototype.start = function(){
        attack = "attack";
        special = "special";
        item = "item";
        runAway = "run away";
        
        var btnStrokeCol = "rgba(0,0,0,255)";
        var btnStrokeTh = 2;
        var btnW = 200;
        var btnH = 20;
        var btnRound = 2;
        var btnSep = btnStrokeTh + 2;
        
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
        
        playerHealth = 100;
        enemyHealth = 100;
        
        var boxStrokeTh = 2;
        var boxW = 100;
        var boxH = 10;
        var boxRound = 1;
        
        var playerHealthCol = "rgba(255,0,0,255)";
        var playerHealthStrCol = "rgba(0,0,0,255)";
        playerHealthBar = new createjs.Shape();
        playerHealthBar.graphics.beginFill(playerHealthCol).drawRoundRect(0,0,boxW,boxH,boxRound);
        playerHealthBar.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(playerHealthStrCol).drawRoundRect(0,0,boxW,boxH,boxRound);
        playerHealthBar.setTransform(boxW, scrH-boxH-boxH);
        var enemyHealthCol = "rgba(0,0,255,255)";
        var enemyHealthStrCol = "rgba(0,0,0,255)";
        enemyHealthBar = new createjs.Shape();
        enemyHealthBar.graphics.beginFill(enemyHealthCol).drawRoundRect(0,0,boxW,boxH,boxRound);
        enemyHealthBar.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(enemyHealthStrCol).drawRoundRect(0,0,boxW,boxH,boxRound);
        enemyHealthBar.setTransform(boxW, scrH-boxH-boxH-boxH);
        
        actionTimer = 100;
    };
    
    Battle.prototype.options = function(){
        
    };
    
    Battle.prototype.showGUI = function(){
        stage.addChild(playerHealthBar);        
        stage.addChild(enemyHealthBar);        
        
        stage.addChild(attackBG);
        stage.addChild(specialBG);
        stage.addChild(itemBG);
        stage.addChild(runAwayBG);
        
        stage.addChild(attackText);
        stage.addChild(specialText);
        stage.addChild(itemText);
        stage.addChild(runAwayText);
    };
    
    attackText = new createjs.Text("defaultAttack", "20px Arial", "#000");
    attackText.x = 20;
    attackText.y = 20;
    Battle.prototype.writeAttackText = function(text){
        attackText.text= text;
    };
    
    specialText = new createjs.Text("defaultSpecial", "20px Arial", "#000");
    specialText.x = 20;
    specialText.y = 40;
    Battle.prototype.writeSpecialText = function(text){
        specialText.text= text;
    };
    
    itemText = new createjs.Text("defaultItem", "20px Arial", "#000");
    itemText.x = 20;
    itemText.y = 60;
    Battle.prototype.writeItemText = function(text){
        itemText.text= text;
    };
    
    runAwayText = new createjs.Text("defaultRunAway", "20px Arial", "#000");
    runAwayText.x = 20;
    runAwayText.y = 80;
    Battle.prototype.writeRunAwayText = function(text){
        runAwayText.text= text;
    };
    
}