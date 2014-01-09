/*
 * This is the endscreen class
 * 
 * It sets up and displays the end screen
 */
function EndScreen(){
    
    var endTextTop;
    var finalScore = 0;
    var endTextMid;
    var endTextBot;
    
    //display "game over"
    endTextTop = new createjs.Text("Game over.", "20px Arial", "#000");
    endTextTop.x = 225;
    endTextTop.y = 20;
    EndScreen.prototype.writeendTextTop = function(text){
        endTextTop.text = text;
    };
    
    //display various final stats, multiple lines allowed
    endTextMid = new createjs.Text
    ("Enemies killed: " + enemiesKilled + "." + "\n" 
    + "Final level: " + player.getLevel() + "." + "\n" 
    + "Potions used: " + potionsUsed + "." + "\n" 
    + "Times run away: " + timesRunAway + "." + "\n"
    , "20px Arial", "#000");
    endTextMid.x = 225;
    endTextMid.y = 40;
    EndScreen.prototype.writeendTextMid = function(text){
        endTextMid.text = text;
    };
    
    //display final message, always below the stats
    endTextBot = new createjs.Text("The burritos always win.", "20px Arial", "#000");
    endTextBot.x = 225;
    endTextBot.y = endTextMid.getMeasuredHeight() + 20;
    EndScreen.prototype.writeendTextBot = function(text){
        endTextBot.text = text;
    };
    
    /*
     * Method to show the end screen
     */
    EndScreen.prototype.showEndScreen = function(){
        //add the elements to the stage
        stage.addChild(endTextTop);
        stage.addChild(endTextMid);
        stage.addChild(endTextBot);
        stage.addChild(restartBox);
        stage.addChild(restartText);
    };
    
    //button to refresh the page
    var restartText = new createjs.Text("Click here to refresh page", "20px Arial", "#000");
    restartText.align = "center";
    restartText.x = 220;
    restartText.y = endTextMid.getMeasuredHeight() + 60;
    var restartBox = new createjs.Shape();
    restartBox.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,230,50,5);
    restartBox.setTransform(220, endTextMid.getMeasuredHeight() + 50);
    restartBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke("rgba(255,0,0,1)").drawRoundRect(0,0,230,50,5);
    
    //refreshes the page when clicked
    restartBox.addEventListener("click", function(){location.reload();});
    
}
