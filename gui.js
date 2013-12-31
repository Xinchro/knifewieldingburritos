function GUI(){
    
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
    actionBox = new createjs.Shape();
    actionBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
    actionBox.setTransform(scrW-boxW, scrH-boxH);
    actionBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
    //stage.addChild(rightBox);

    upBox.addEventListener("mouseover", function(){upEntered = true;});
    upBox.addEventListener("mouseout", function(){upEntered = false;});
    leftBox.addEventListener("mouseover", function(){leftEntered = true;});
    leftBox.addEventListener("mouseout", function(){leftEntered = false;});
    downBox.addEventListener("mouseover", function(){downEntered = true;});
    downBox.addEventListener("mouseout", function(){downEntered = false;});
    rightBox.addEventListener("mouseover", function(){rightEntered = true;});
    rightBox.addEventListener("mouseout", function(){rightEntered = false;});
    actionBox.addEventListener("mouseover", function(){actionEntered = true;});
    actionBox.addEventListener("mouseout", function(){actionEntered = false;});
    
    debugText = new createjs.Text("newText", "20px Arial", "#000");
    GUI.prototype.writeText = function(text){
        debugText.text= text;
    };

    walkTickText = new createjs.Text("newText", "20px Arial", "#000");
    walkTickText.y = 20;
    GUI.prototype.writeWalkTick = function(text){

        walkTickText.text= text;

    };

    playerLocText = new createjs.Text("newText", "20px Arial", "#000");
    playerLocText.x = 225;
    GUI.prototype.writePlayerLoc = function(text){
        playerLocText.text = text;
    };

    playerPosText = new createjs.Text("newText", "20px Arial", "#000");
    playerPosText.x = 225;
    playerPosText.y = 20;
    GUI.prototype.writePlayerPos = function(text){
        playerPosText.text = text;
    };

    battleStatusText = new createjs.Text("newText", "20px Arial", "#000");
    battleStatusText.y = 40;
    GUI.prototype.writeBattleStatus = function(text){

        battleStatusText.text= text;

    };
    
    GUI.prototype.displayDebug = function(){
//        stage.addChild(debugText);
//        stage.addChild(playerLocText);
//        stage.addChild(playerPosText);
//        stage.addChild(walkTickText);
//        stage.addChild(battleStatusText);
        debugText.visible = true;
        playerLocText.visible = true;
        playerPosText.visible = true;
        walkTickText.visible = true;
        battleStatusText.visible = true;
        for(var i=0;i<posGridText.length;i++)
        {
            posGridText[i].visible = true;
        }
    };
    
    GUI.prototype.hideDebug = function(){
        debugText.visible = false;
        playerLocText.visible = false;
        playerPosText.visible = false;
        walkTickText.visible = false;
        battleStatusText.visible = false;
        for(var i=0;i<posGridText.length;i++)
        {
            posGridText[i].visible = false;
        }
        //console.log("bai debug");
    };
    
}