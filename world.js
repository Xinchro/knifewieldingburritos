var cityRarity = 1;
var worldSize = 11;

function World(){
    
     World.prototype.displayOverworld = function(){
        for(var i=0; i<grid.length;i++){
            for(var j=0; j<grid.length;j++){
                stage.addChild(grid[i][j]);
            }
        }
        for(var i=0;i<posGridText.length;i++)
        {
            stage.addChild(posGridText[i]);
        }
        stage.addChild(animation);
        stage.addChild(charizard);
        stage.addChild(debugText);
        stage.addChild(playerLocText);
        stage.addChild(playerPosText);
        stage.addChild(walkTickText);
        stage.addChild(battleStatusText);
        stage.addChild(upBox);
        stage.addChild(leftBox);
        stage.addChild(downBox);
        stage.addChild(rightBox);
        stage.addChild();
    };
    
    World.prototype.genGrid = function(){
        var tempRect;
        for(var x=0;x<gridSize;x++){
            for(var y=-1;y<gridSize;y++){
                tempRect = new createjs.Shape();
                //var tempCol = decToHex(Math.floor((Math.random()*255)));
                var tempCol = Math.floor((Math.random()*255)+150);
                var xPos, yPos;
                xPos = x*gridScale+((animation.x)%gridScale)-xOff;
                yPos = y*gridScale+((animation.y)%gridScale)-yOff;
                battleStatusText.text = xPos/50 + " " + yPos/50;
                //tempRect.graphics.beginFill(colorArr[tempCol]).drawRoundRect(x*50,y*50,50,50,0);
                tempRect.graphics.beginFill("rgba(0," + tempCol + ",0" + ",1)").drawRoundRect(xPos,yPos,gridScale,gridScale,5);
                grid[x][y] = tempRect;
                stage.addChild(grid[x][y]);

                var posText = new createjs.Text(x + "," + y, "20px Arial", "#FFF");
                posText.x = xPos;
                posText.y = yPos;
                posGridText.push(posText);
                stage.addChild(posGridText[posGridText.length-1]);
            }
        }

        gui.writeText("Grid added");
        //gui.writeText(parseInt(tempCol, 16));
    };
    
    World.prototype.genCities = function(){
        var tempRect;
        //var randLocX, randLocY;
        var checkCity;
        //higher values make cities rarer

        for(var x=0;x<gridSize;x++){
            for(var y=0;y<gridSize;y++){
                checkCity = Math.floor((Math.random()*cityRarity)+1);
                if(checkCity == 1){    
                    tempRect = new createjs.Shape();
                    //var tempCol = decToHex(Math.floor((Math.random()*255)+250));
                    var tempCol = Math.floor((Math.random()*255)+150);
                    var xPos, yPos;
                    xPos = x*gridScale+((animation.x)%gridScale)-xOff;
                    yPos = y*gridScale+((animation.y)%gridScale)-yOff;
                    //tempRect.graphics.beginFill(colorArr[tempCol]).drawRoundRect(x*50,y*50,50,50,0);
                    tempRect.graphics.beginFill("rgba(0," + "0," + tempCol + ",1)").drawRoundRect(xPos,yPos,gridScale,gridScale,5);
                    stage.removeChild(grid[x][y]);
                    grid[x][y] = tempRect;
                    cityArr.push([x,y]);

                    stage.addChild(grid[x][y]);
                    //stage.update();

                    var posText = new createjs.Text(x + "," + y, "20px Arial", "#FFF");
                    posText.x = xPos;
                    posText.y = yPos;
                    posGridText.push(posText);
                    stage.addChild(posGridText[posGridText.length-1]);
                }
            }
        }   

        gui.writeText("Cities added");
    };
}