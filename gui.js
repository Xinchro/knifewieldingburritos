/*
 * This is the gui class
 * 
 * It starts and controls the main GUI elements, such as the direction boxes
 */
function GUI(){
    //start all the direction boxes, with parameters defined in the god class
    upBox = new createjs.Shape();
    upBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
    upBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
    upBox.setTransform(boxW, scrH-boxH-boxH);
    leftBox = new createjs.Shape();
    leftBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
    leftBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
    leftBox.setTransform(0, scrH-boxH);
    downBox = new createjs.Shape();
    downBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
    downBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
    downBox.setTransform(boxW, scrH-boxH);
    rightBox = new createjs.Shape();
    rightBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
    rightBox.setTransform(boxW+boxW, scrH-boxH);
    rightBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
    actionBox = new createjs.Shape();
    actionBox.graphics.beginFill(boxFillCol).drawRoundRect(0,0,boxW,boxH,boxRound);
    actionBox.setTransform(scrW-boxW, scrH-boxH);
    actionBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);

    //add listeners to all the boxes
    //bad for optimization, but good for now
    upBox.addEventListener("mouseover", function(){upEntered = true;});
    upBox.addEventListener("mousedown", function(){upEntered = true;});
    upBox.addEventListener("mouseout", function(){upEntered = false;});
    upBox.addEventListener("click", function(){upEntered = false;});
    leftBox.addEventListener("mouseover", function(){leftEntered = true;});
    leftBox.addEventListener("mousedown", function(){leftEntered = true;});
    leftBox.addEventListener("mouseout", function(){leftEntered = false;});
    leftBox.addEventListener("click", function(){leftEntered = false;});
    downBox.addEventListener("mouseover", function(){downEntered = true;});
    downBox.addEventListener("mousedown", function(){downEntered = true;});
    downBox.addEventListener("mouseout", function(){downEntered = false;});
    downBox.addEventListener("click", function(){downEntered = false;});
    rightBox.addEventListener("mouseover", function(){rightEntered = true;});
    rightBox.addEventListener("mousedown", function(){rightEntered = true;});
    rightBox.addEventListener("mouseout", function(){rightEntered = false;});
    rightBox.addEventListener("click", function(){rightEntered = false;});
    actionBox.addEventListener("mouseover", function(){actionEntered = true;});
    actionBox.addEventListener("mousedown", function(){actionEntered = true;});
    actionBox.addEventListener("mouseout", function(){actionEntered = false;});
    actionBox.addEventListener("click", function(){actionEntered = false;});
    
    //create and place all the debug texts
    debugText = new createjs.Text("newText", "20px Arial", "#000");
    /*
     * Method to write to the main text
     */
    GUI.prototype.writeText = function(text){
        debugText.text= text;
    };

    walkTickText = new createjs.Text("newText", "20px Arial", "#000");
    walkTickText.y = 20;
    /*
     * Method to write to walk tick text
     */
    GUI.prototype.writeWalkTick = function(text){

        walkTickText.text= text;

    };

    playerLocText = new createjs.Text("newText", "20px Arial", "#000");
    playerLocText.x = 225;
    /*
     * Method to write to player loc text
     */
    GUI.prototype.writePlayerLoc = function(text){
        playerLocText.text = text;
    };

    playerPosText = new createjs.Text("newText", "20px Arial", "#000");
    playerPosText.x = 225;
    playerPosText.y = 20;
    /*
     * Method to write to player pos text
     */
    GUI.prototype.writePlayerPos = function(text){
        playerPosText.text = text;
    };

    battleStatusText = new createjs.Text("newText", "20px Arial", "#000");
    battleStatusText.y = 40;
    /*
     * Method to write to battle status text
     */
    GUI.prototype.writeBattleStatus = function(text){

        battleStatusText.text= text;

    };
    
    /*
     * Method to display the debug elements
     */
    GUI.prototype.displayDebug = function(){
        for(var i=0;i<posGridText.length;i++)
        {
            stage.addChild(posGridText[i]);
        }
        stage.addChild(debugText);
        stage.addChild(playerLocText);
        stage.addChild(playerPosText);
        stage.addChild(walkTickText);
        stage.addChild(battleStatusText);
    };
    
    /*
     * Method to hide the debug elements
     */
    GUI.prototype.hideDebug = function(){
        for(var i=0;i<posGridText.length;i++)
        {
            stage.removeChild(posGridText[i]);
        }
        stage.removeChild(debugText);
        stage.removeChild(playerLocText);
        stage.removeChild(playerPosText);
        stage.removeChild(walkTickText);
        stage.removeChild(battleStatusText);
    };
    
}