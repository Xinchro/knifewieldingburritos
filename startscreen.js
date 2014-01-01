function StartScreen(){
        
    StartScreen.prototype.start = function(){
        
    };
    
    var taco = new createjs.Bitmap("Assets/Models/Taco1.svg");
    taco.setTransform(scrW-150, scrH-150,1,1,-45);
    var burrito = new createjs.Bitmap("Assets/Models/Burrito1.svg");
    burrito.setTransform(0, 0,1,1,45);
    
    var startScreen = new createjs.Shape();
    startScreen.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,scrW,scrH,0);
    
    
    var titleText = new createjs.Text("Knife Wielding Burritos", "50px ModernEdge_0", "#000");
    titleText.align = "center";
    titleText.x = scrW/2-titleText.getMeasuredWidth()/2;
    titleText.y = scrH/2-titleText.getMeasuredHeight()/2;
    
    var startBox = new createjs.Shape();
    startBox.setBounds(scrW/2-100, scrH-50*3, 200, 50);
    startBox.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(startBox.getBounds().x,startBox.getBounds().y,200,50,5);
    //startBox.setTransform(scrW/2, scrH-50);
    startBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke("rgba(255,0,0,1)").drawRoundRect(startBox.getBounds().x,startBox.getBounds().y,200,50,5);

    var startText = new createjs.Text("Start", "30px Arial", "#000");
    startText.align = "center";
    startText.x = startBox.getBounds().x + startBox.getBounds().width/2 - startText.getMeasuredWidth()/2;
    startText.y = startBox.getBounds().y + startBox.getBounds().height/2 - startText.getMeasuredHeight()/2;
    
    startBox.addEventListener("click", function(){console.log("Game start hidden"); start.hide(); resetMusic();});
    
    StartScreen.prototype.show = function(){
        stage.addChild(startScreen);
        stage.addChild(titleText);
        stage.addChild(taco);
        stage.addChild(burrito);
        stage.addChild(startBox);
        stage.addChild(startText);
    };
    
    StartScreen.prototype.hide = function(){
        stage.removeChild(startScreen);
        stage.removeChild(titleText);
        stage.removeChild(taco);
        stage.removeChild(burrito);
        stage.removeChild(startBox);
        stage.removeChild(startText);
    };
    
}
