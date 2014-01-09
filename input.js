/*
 * This is the input class
 * 
 * It controls player's input into the game, be it keyboard, mouse or touch
 * Also defines what to do with that input
 */
var mute = true;
var charSheet;
function Input(){
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    
    var inBattle;
    /*
     * Method to set the input actions as in battle, not in overworld
     */
    Input.prototype.intoBattle = function(){
        inBattle = true;
        //console.log("input.intobattle in battle " + inBattle);
    };
    
    /*
     * Method to set the input actions as out of battle, in overworld
     */
    Input.prototype.outOfBattle = function(){
        inBattle = false;
        //console.log("input.outofbattle in battle " + inBattle);
    };
    
    /*
     * Method that defines what happens when a keyboard key goes down
     */
    function keyDown(e){
        document.getElementById('gameCanvas').focus();
        mouseDown = true;
        //this code is all mostly self-explanatory
        switch(e.keyCode){
            case 38:
                //Up arrow
                e.preventDefault();
                upEntered = true;
                gui.writeText("Up arrow pressed");
                break;
            case 37:
                //Left arrow
                e.preventDefault();
                leftEntered = true;
                gui.writeText("Left arrow pressed");
                break;
            case 40:
                //Down arrow
                e.preventDefault();
                downEntered = true;
                gui.writeText("Down arrow pressed");
                break;
            case 39:
                //Right arrow
                e.preventDefault();
                rightEntered = true;
                gui.writeText("Right arrow pressed");
                break;
            case 69:
                //E
                //for testing:
                var playerHealth = player.getHealth();
                gui.writeText(playerHealth);
                break;
            case 67:
                //C
                //for testing:
                player.giveRandomItem();
                for(var a=0;a<player.getItems().length;a++){
                    console.log("Player item " + a + " " + player.getItems()[a].getName() + " ID " + player.getItems()[a].getID());
                }
                break;
            case 77:
                //M
                //this mutes the music
                if(mute){
                    mute = false;
                    music.volume = 1;
                    battleMusic.volume = 1;
                }else{
                    mute = true;
                    music.volume = 0;
                    battleMusic.volume = 0;
                }
                console.log(mute);
                break;
            case 82:
                //R
                //for testing:
                player.decrementHealth();
                var playerHealth = player.getHealth();
                gui.writeText(playerHealth);
                break;
            case 90:
                //Z
                //for testing:
                gui.writeText("Z pressed");
                player.giveExp(10);
//                if(!applesGoByeBye){
//                    stage.removeAllChildren();
//                    applesGoByeBye = true;
//                }else{
//                    world.displayOverworld();
//                    gui.displayDebug();
//                    applesGoByeBye = false;
//                }
                break;
            case 70:
                //F
                gui.writeText("F pressed");
                actionEntered = true;
                break;
            case 72:
                //H
                //for testing:
                gui.writeText("H pressed");
                console.log("H pressed");
                if(!debugTime){
                    gui.displayDebug();

                    debugTime = true;
                }else{
                    gui.hideDebug();
                    
                    debugTime = false;
                }
                break;    
        }
    }

    /*
     * Method that defines what happens when a keyboard key goes up
     */
    function keyUp(e){
        mouseDown = false;
        //this code is all mostly self-explanatory
        switch(e.keyCode){
            case 38:
                //Up arrow
                gui.writeText("Up arrow unpressed");
                upEntered = false;
                break;
            case 37:
                //Left arrow
                gui.writeText("Left arrow unpressed");
                leftEntered = false;
                break;
            case 40:
                //Down arrow
                gui.writeText("Down arrow unpressed");
                downEntered = false;
                break;
            case 39:
                //Right arrow
                gui.writeText("Right arrow unpressed");
                rightEntered = false;
                break;
            case 70:
                //F
                gui.writeText("Action unpressed");
                actionEntered = false;
                break;
        }
    }
    
    /*
     * Method to decide what to do with the input
     */
    Input.prototype.doKeyActions = function(){
        //this code is somewhat lengthy, but easy enoguht to understand
        //I will comment on the "harder" parts to understand 
        //and will be omitting similar lines of code, checking which box is currently being pressed
        
        //check if the game has started and the up box is the target
        if(upEntered && gameStarted){
            //check if the player can walk and is not in battle
            if(walk && !inBattle){
                //move the player up until they reach the edge of the map
                //at which point they warp to the bottom most tile in that column
                if(yPosPlayer < 1){
                    yPosPlayer = grid.length - 1;
                    for(var i=0; i<grid.length;i++){
                        for(var j=0; j<grid.length;j++){
                            grid[i][j].y -= gridScale*(grid.length-1);
                        }
                    }
                    for(var i=0;i<posGridText.length;i++)
                    {
                        posGridText[i].y -= gridScale*(grid.length-1);
                    }
                    world.hideOverworld();
                    world.displayOverworld();
                }else{
                    yPosPlayer--;
                    for(var i=0; i<grid.length;i++){
                        for(var j=0; j<grid.length;j++){
                            grid[i][j].y += gridScale;
                        }
                    }
                    for(var i=0;i<posGridText.length;i++)
                    {
                        posGridText[i].y += gridScale;;
                    }
                }
                //animation.play();
                canWalkTick = 0;
                //make the up directional box white, to differentiate it from the others
                upBox.graphics.clear();
                upBox.graphics.beginFill("rgba(255,255,255,0.5)").drawRoundRect(0,0,boxW,boxH,boxRound);
                upBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
                //these 2 lines help with performance
                //remove a layer just under the player's view
                world.removeLayerFromBottom();
                //add a layer just within the view to the top
                world.addLayerToTop();
            }else{
                //this is when the payer is in a battle
                //if in battle and above the touch ticker delay
                if(inBattle && touchTicker > 5){
                    //set the ticker to 0
                    touchTicker = 0;
                    //go to the previous button
                    battle.prevActiveBtn();
                    //battle.writeAttackText("Up pressed");
                }else{
                    //if the battle variable is not null
                    if(battle){
                        //say a battle can start
                        battle.canStart(true);
                    }
                    upEntered = true;
                }
            }
            gui.writeText("Move up");
        }else{
            //animation.stop();
        }
        if(leftEntered && gameStarted){
            if(walk && !inBattle){
                //move the player left and warp them to the right most tile if they go over the edge
                if(xPosPlayer < 1){
                    xPosPlayer = grid.length - 1;
                    for(var i=0; i<grid.length;i++){
                        for(var j=0; j<grid.length;j++){
                            grid[i][j].x -= gridScale*(grid.length-1);
                        }
                    }
                    for(var i=0;i<posGridText.length;i++)
                    {
                        posGridText[i].x -= gridScale*(grid.length-1);
                    }
                    world.hideOverworld();
                    world.displayOverworld();
                }else{
                    xPosPlayer--;
                    for(var i=0; i<grid.length;i++){
                        for(var j=0; j<grid.length;j++){
                            grid[i][j].x += gridScale;
                        }
                    }
                    for(var i=0;i<posGridText.length;i++)
                    {
                        posGridText[i].x += gridScale;;
                    }
                }
                //animation.play();
                canWalkTick = 0;
                leftBox.graphics.clear();
                leftBox.graphics.beginFill("rgba(255,255,255,0.5)").drawRoundRect(0,0,boxW,boxH,boxRound);
                leftBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
                //following lines help with performance
                world.addLayerToLeft();
                world.removeLayerFromRight();
            }else{
                if(inBattle && touchTicker > 5){
                    touchTicker = 0;
                    //this checks for the specials/items
                    //it checks to see what buttons the player is on and changes to the next/previous
                    //if applicable, if not, nothing happens and it prints to console
                    if(battle.getActiveBtnIndex() === 1){
                        //specials
                        player.prevSpecial();
                        if(player.getActiveSpecial()){
                            battle.writeSpecialText(player.getActiveSpecial().getName());
                        }
                    }else if(battle.getActiveBtnIndex() === 2){
                        //items
                        player.prevItem();
                        if(player.getActiveItem()){
                            battle.writeItemText(player.getActiveItem().getName());
                        }
                    }else{
                        console.log("not item or special");
                    }
                }else{
                    if(battle){
                        //battle.setEnded();
                        battle.canStart(true);
                    }
                    leftEntered = true;
                }
            }
            gui.writeText("Move left");
        }else{
            //animation.stop();
        }
        //same as pressing up, but opposite, since we're going down
        if(downEntered && gameStarted){
            if(walk && !inBattle){
                if(yPosPlayer > grid.length-2){
                    yPosPlayer = 0;
                    for(var i=0; i<grid.length;i++){
                        for(var j=0; j<grid.length;j++){
                            grid[i][j].y += gridScale*(grid.length-1);
                        }
                    }
                    for(var i=0;i<posGridText.length;i++)
                    {
                        posGridText[i].y += gridScale*(grid.length-1);
                    }
                    world.hideOverworld();
                    world.displayOverworld();
                }else{
                    yPosPlayer++;
                    for(var i=0; i<grid.length;i++){
                        for(var j=0; j<grid.length;j++){
                            grid[i][j].y -= gridScale;
                        }
                    }
                    for(var i=0;i<posGridText.length;i++)
                    {
                        posGridText[i].y -= gridScale;;
                    }
                }
                //animation.play();
                canWalkTick = 0;
                downBox.graphics.clear();
                downBox.graphics.beginFill("rgba(255,255,255,0.5)").drawRoundRect(0,0,boxW,boxH,boxRound);
                downBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
                world.addLayerToBottom();
                world.removeLayerFromTop();
            }else{
                if(inBattle && touchTicker > 5){
                    touchTicker = 0;
                    battle.nextActiveBtn();
                    //battle.writeAttackText("Down pressed");
                }else{
                    if(battle){
                        //battle.setEnded();
                        battle.canStart(true);
                    }
                    downEntered = true;
                }
            }
            gui.writeText("Move down");
        }else{
            //animation.stop();
        }
        //same as pressing left, but opposite, since we're going right
        if(rightEntered && gameStarted){
            if(walk && !inBattle)
            {
                if(xPosPlayer > grid.length-2){
                    xPosPlayer = 0;
                    for(var i=0; i<grid.length;i++){
                        for(var j=0; j<grid.length;j++){
                            grid[i][j].x += gridScale*(grid.length-1);
                        }
                    }
                    for(var i=0;i<posGridText.length;i++)
                    {
                        posGridText[i].x += gridScale*(grid.length-1);
                    }
                    world.hideOverworld();
                    world.displayOverworld();
                }else{
                    xPosPlayer++;
                    for(var i=0; i<grid.length;i++){
                        for(var j=0; j<grid.length;j++){
                            grid[i][j].x -= gridScale;
                        }
                    }
                    for(var i=0;i<posGridText.length;i++)
                    {
                        posGridText[i].x -= gridScale;;
                    }
                }
                                
                //animation.play();
                canWalkTick = 0;
                rightBox.graphics.clear();
                rightBox.graphics.beginFill("rgba(255,255,255,0.5)").drawRoundRect(0,0,boxW,boxH,boxRound);
                rightBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
                world.addLayerToRight();
                world.removeLayerFromLeft();
            }else{
                if(inBattle && touchTicker > 5){
                    touchTicker = 0;
                    if(battle.getActiveBtnIndex() === 1){
                        //specials
                        player.nextSpecial();
                        if(player.getActiveSpecial()){
                            battle.writeSpecialText(player.getActiveSpecial().getName());
                        }
                    }else if(battle.getActiveBtnIndex() === 2){
                        //items
                        player.nextItem();
                        if(player.getActiveItem()){
                            battle.writeItemText(player.getActiveItem().getName());
                        }
                    }else{
                        console.log("not item or special");
                    }
                }else{
                    if(battle){
                        //battle.setEnded();
                        battle.canStart(true);
                    }
                    rightEntered = true;
                }
            }
            gui.writeText("Move right");
        
        }else{
            //animation.stop();
        }
        //check if the action button is being targeted
        if(actionEntered){
            //check if the game has started
            if(gameStarted){
                //check if we can walk and are not in battle
                if(walk && !inBattle)
                {
                    //check if the charSheet variable
                    if(!charSheet){
                        //start a new character sheet
                        charSheet = new CharacterSheet();
                        //display the character sheet
                        charSheet.display();
                        console.log("character sheet visible");
                    }else{
                        //check if the character sheet is visible
                        if(charSheet.isVisible()){
                            //hide the character sheet
                            charSheet.hide();
                            console.log("character sheet not visible");
                        }else{
                            //display the character sheet
                            charSheet.display();
                            console.log("character sheet visible");
                        }
                    }
                    //animation.play();
                    canWalkTick = 0;
                    actionBox.graphics.clear();
                    actionBox.graphics.beginFill("rgba(255,255,255,0.5)").drawRoundRect(0,0,boxW,boxH,boxRound);
                    actionBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
                }else{
                    //check if in battle and above the touch ticker delay
                    if(inBattle && touchTicker > 5){
                        touchTicker = 0;
                        //if a battle has started
                        if(battle.hasStarted()){
                            //if the player can do an action
                            if(battle.canAct()){
                                //use the active button
                                battle.useActiveAction();
                            }
                            //refresh the player and enemy health abrs
                            battle.refreshHealthBars();
                        }
                    }
                }
                gui.writeText("Do Action");
            }else{
                start.hide();
            }
        }else{
            //animation.stop();
        }
    };
}