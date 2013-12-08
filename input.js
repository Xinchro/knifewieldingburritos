function Input(){
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    
    var inBattle;
    
    Input.prototype.intoBattle = function(){
        inBattle = true;
    };
    Input.prototype.outOfBattle = function(){
        inBattle = false;
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
                }else{
                    if(battle){
                        battle.setEnded();
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
                }else{
                    if(battle){
                        battle.setEnded();
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
                }else{
                    if(battle){
                        battle.setEnded();
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
                }else{
                    if(battle){
                        battle.setEnded();
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
                    applesGoByeBye = false;
                }
                break;
            case 70:
                //F
                gui.writeText("F pressed");
                if(battle){
                    if(battle.hasStarted()){
                        enemy.decrementHealth(1);
                        battle.writeItemText(enemy.getHealth());
                        battle.refreshHealthBars();
                    }
                }
                break;
            case 72:
                //H
                gui.writeText("H pressed");
                if(!debugTime){
                    debugText.visible = false;
                    playerLocText.visible = false;
                    walkTickText.visible = false;
                    battleStatusText.visible = false;
                    for(var i=0;i<posGridText.length;i++)
                    {
                        posGridText[i].visible = false;
                    }

                    debugTime = true;
                }else{
                    debugText.visible = true;
                    playerLocText.visible = true;
                    walkTickText.visible = true;
                    battleStatusText.visible = true;
                    for(var i=0;i<posGridText.length;i++)
                    {
                        posGridText[i].visible = true;
                    }

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
}