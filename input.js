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
                }else{
                    if(battle){
                        //battle.setEnded();
                        if(!inCity){
                            battle.canStart(true);
                        }else{
                            battle.canStart(false);
                        }
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
                            battle.setActionTime(0);
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
}