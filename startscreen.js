/*
 * This is the startscreen class
 * 
 * It starts and controls the startscreen GUI elements, such as the start button
 */
//variable to check if the game has started
var gameStarted = false;
function StartScreen(){
    //the following adds flourish to the start screen
    //it basically adds a taco and a burrito at angles at the edges
    var taco = new createjs.Bitmap("Assets/Models/Taco1.svg");
    taco.setTransform(scrW-150, scrH-150,1,1,-45);
    var burrito = new createjs.Bitmap("Assets/Models/Burrito1.svg");
    burrito.setTransform(0, 0,1,1,45);
    
    //makes a big white rectangle, stretching from corner to corner
    var startScreen = new createjs.Shape();
    startScreen.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,scrW,scrH,0);
    
    //starts and displays the title text, centering it
    var titleText = new createjs.Text("Knife Wielding Burritos", "50px ModernEdge_0", "#000");
    titleText.align = "center";
    titleText.x = scrW/2-titleText.getMeasuredWidth()/2;
    titleText.y = scrH/2-titleText.getMeasuredHeight()/2;
    
    //the start button, to be pressed to start the game
    var startBox = new createjs.Shape();
    startBox.setBounds(scrW/2-100, scrH-50*3, 200, 50);
    startBox.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(startBox.getBounds().x,startBox.getBounds().y,200,50,5);
    startBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke("rgba(255,0,0,1)").drawRoundRect(startBox.getBounds().x,startBox.getBounds().y,200,50,5);
    var startText = new createjs.Text("Start", "30px Arial", "#000");
    startText.align = "center";
    startText.x = startBox.getBounds().x + startBox.getBounds().width/2 - startText.getMeasuredWidth()/2;
    startText.y = startBox.getBounds().y + startBox.getBounds().height/2 - startText.getMeasuredHeight()/2;
    
    //adding the lisntener
    startBox.addEventListener("click", function(){console.log("Game start hidden"); start.hide(); resetMusic();});
    
    /*
     * Methoed to display the start screen
     */
    StartScreen.prototype.show = function(){
        //adds everything to the stage
        stage.addChild(startScreen);
        stage.addChild(titleText);
        stage.addChild(taco);
        stage.addChild(burrito);
        stage.addChild(startBox);
        stage.addChild(startText);
    };
    
    /*
     * Method to hide the start screen
     */
    StartScreen.prototype.hide = function(){
        //removes everything from the start screen
        stage.removeChild(startScreen);
        stage.removeChild(titleText);
        stage.removeChild(taco);
        stage.removeChild(burrito);
        stage.removeChild(startBox);
        stage.removeChild(startText);
        //set the game as started
        gameStarted = true;
    };
    
}
