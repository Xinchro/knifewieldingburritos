function Input(){
    document.onkeydown = keyDown;
    document.onkeyup = keyUp;
    
     function keyDown(e){
        document.getElementById('gameCanvas').focus();
        mouseDown = true;
        switch(e.keyCode){
            case 38:
                writeText("Up arrow pressed");
                upEntered = true;
                break;
            case 37:
                writeText("Left arrow pressed");
                leftEntered = true;
                break;
            case 40:
                writeText("Down arrow pressed");
                downEntered = true;
                break;
            case 39:
                writeText("Right arrow pressed");
                rightEntered = true;
                break;
            case 69:
                //E
                var playerHealth = player.getHealth();
                writeText(playerHealth);
                break;
            case 82:
                //R
                player.decrementHealth();
                var playerHealth = player.getHealth();
                writeText(playerHealth);
                break;
            case 90:
                writeText("Z pressed");
                if(!applesGoByeBye){
                    stage.removeAllChildren();
                    applesGoByeBye = true;
                }else{
                    world.displayOverworld();
                    applesGoByeBye = false;
                }
                break;
            case 72:
                writeText("H pressed");
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
                writeText("Up arrow unpressed");
                upEntered = false;
                break;
            case 37:
                writeText("Left arrow unpressed");
                leftEntered = false;
                break;
            case 40:
                writeText("Down arrow unpressed");
                downEntered = false;
                break;
            case 39:
                writeText("Right arrow unpressed");
                rightEntered = false;
                break;
        }
    }
}