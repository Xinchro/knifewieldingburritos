function EndScreen(){
    var endTextTop;
    var finalScore;
    var endTextMid;
    var endTextBot;
    
    EndScreen.prototype.start = function(){
        finalScore = 0;
    };
    
    endTextTop = new createjs.Text("Game over.", "20px Arial", "#000");
    endTextTop.x = 225;
    endTextTop.y = 20;
    GUI.prototype.writeendTextTop = function(text){
        endTextTop.text = text;
    };
    
    endTextMid = new createjs.Text
    ("Enemies killed: " + enemiesKilled + "." + "\n" 
    + "Final level: " + player.getLevel() + "." + "\n" 
    + "Potions used: " + potionsUsed + "." + "\n" 
    + "Times run away: " + timesRunAway + "." + "\n"
    , "20px Arial", "#000");
    endTextMid.x = 225;
    endTextMid.y = 40;
    GUI.prototype.writeendTextMid = function(text){
        endTextMid.text = text;
    };
    
    endTextBot = new createjs.Text("The burritos always win.", "20px Arial", "#000");
    endTextBot.x = 225;
    endTextBot.y = endTextMid.getMeasuredHeight() + 20;
    GUI.prototype.writeendTextBot = function(text){
        endTextBot.text = text;
    };
    
    EndScreen.prototype.showEndScreen = function(){
        stage.addChild(endTextTop);
        stage.addChild(endTextMid);
        stage.addChild(endTextBot);
        stage.addChild(restartBox);
        stage.addChild(restartText);
    };
    
    var restartText = new createjs.Text("Click here to refresh page", "20px Arial", "#000");
    restartText.align = "center";
    restartText.x = 220;
    restartText.y = endTextMid.getMeasuredHeight() + 60;
    
    var restartBox = new createjs.Shape();
    restartBox.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,230,50,5);
    restartBox.setTransform(220, endTextMid.getMeasuredHeight() + 50);
    restartBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke("rgba(255,0,0,1)").drawRoundRect(0,0,230,50,5);
    
    restartBox.addEventListener("click", function(){console.log("hullo"); location.reload();});
    
}
