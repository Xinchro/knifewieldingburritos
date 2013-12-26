function Input(){
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    
    var mute = true;
    
    var inBattle;
    
    Input.prototype.intoBattle = function(){
        inBattle = true;
        //console.log("input.intobattle in battle " + inBattle);
    };
    Input.prototype.outOfBattle = function(){
        inBattle = false;
        //console.log("input.outofbattle in battle " + inBattle);
    };
    
     function keyDown(e){
        document.getElementById('gameCanvas').focus();
        mouseDown = true;
        switch(e.keyCode){
            case 38:
                //Up
                e.preventDefault();
                gui.writeText("Up arrow pressed");
                if(inBattle){
                    battle.prevActiveBtn();
                    //battle.writeAttackText("Up pressed");
                }else{
                    if(battle){
                        //battle.setEnded();
                        battle.canStart(true);
                    }
                    upEntered = true;
                }
                break;
            case 37:
                //Left
                e.preventDefault();
                gui.writeText("Left arrow pressed");
                if(inBattle){
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
                break;
            case 40:
                //Down
                e.preventDefault();
                gui.writeText("Down arrow pressed");
                if(inBattle){
                    battle.nextActiveBtn();
                    //battle.writeAttackText("Down pressed");
                }else{
                    if(battle){
                        //battle.setEnded();
                        battle.canStart(true);
                    }
                    downEntered = true;
                }
                break;
            case 39:
                //Right
                e.preventDefault();
                gui.writeText("Right arrow pressed");
                if(inBattle){
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
                break;
            case 69:
                //E
                var playerHealth = player.getHealth();
                gui.writeText(playerHealth);
                break;
            case 77:
                //M
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
                player.decrementHealth();
                var playerHealth = player.getHealth();
                gui.writeText(playerHealth);
                break;
            case 90:
                //Z
                gui.writeText("Z pressed");
                if(!applesGoByeBye){
                    stage.removeAllChildren();
                    applesGoByeBye = true;
                }else{
                    world.displayOverworld();
                    gui.displayDebug();
                    applesGoByeBye = false;
                }
                break;
            case 70:
                //F
                gui.writeText("F pressed");
                if(battle){
                    if(battle.hasStarted()){
                        //enemy.decrementHealth();
                        if(battle.canAct()){
                            battle.useActiveAction();
                        }
                        battle.refreshHealthBars();
                    }
                }
                break;
            case 72:
                //H
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

    function keyUp(e){
        mouseDown = false;
        switch(e.keyCode){
            case 38:
                gui.writeText("Up arrow unpressed");
                upEntered = false;
                break;
            case 37:
                gui.writeText("Left arrow unpressed");
                leftEntered = false;
                break;
            case 40:
                gui.writeText("Down arrow unpressed");
                downEntered = false;
                break;
            case 39:
                gui.writeText("Right arrow unpressed");
                rightEntered = false;
                break;
        }
    }
    
    Input.prototype.doKeyActions = function(){
        
        if(upEntered){
            if(walk){
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
                upBox.graphics.clear();
                upBox.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,boxW,boxH,boxRound);
                upBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
                world.removeLayerFromBottom();
                world.addLayerToTop();
            }
            gui.writeText("Move up");
        }else{
            //animation.stop();
        }
        if(leftEntered){
            if(walk){
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
                leftBox.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,boxW,boxH,boxRound);
                leftBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
                world.addLayerToLeft();
                world.removeLayerFromRight();
            }
            gui.writeText("Move left");
        }else{
            //animation.stop();
        }
        if(downEntered){
            if(walk){
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
                downBox.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,boxW,boxH,boxRound);
                downBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
                world.addLayerToBottom();
                world.removeLayerFromTop();
            }
            gui.writeText("Move down");
        }else{
            //animation.stop();
        }
        if(rightEntered){
            if(walk)
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
                rightBox.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,boxW,boxH,boxRound);
                rightBox.graphics.setStrokeStyle(boxStrokeTh, "round").beginStroke(boxStrokeCol).drawRoundRect(0,0,boxW,boxH,boxRound);
                world.addLayerToRight();
                world.removeLayerFromLeft();
            }
            gui.writeText("Move right");
        
        }else{
            //animation.stop();
        }
    };
}