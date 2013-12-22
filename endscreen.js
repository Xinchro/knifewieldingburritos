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
    
    endTextMid = new createjs.Text("Your score: " + finalScore + ".", "20px Arial", "#000");
    endTextMid.x = 225;
    endTextMid.y = 20;
    GUI.prototype.writeendTextMid = function(text){
        endTextMid.text = text;
    };
    
    endTextBot = new createjs.Text("The burritos always win.", "20px Arial", "#000");
    endTextBot.x = 225;
    endTextBot.y = 20;
    GUI.prototype.writeendTextBot = function(text){
        endTextBot.text = text;
    };
    
    EndScreen.prototype.showEndScreen = function(){
        stage.addChild(endTextTop);
        stage.addChild(endTextMid);
        stage.addChild(endTextBot);
    };
    
}
