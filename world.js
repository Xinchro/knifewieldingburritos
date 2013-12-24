var cityRarity = 10;
var worldSize = 20;
var overWorldHidden;

function World(){
    
    World.prototype.isOverworldHidden = function(){
        return overWorldHidden;
    };
    
     World.prototype.displayOverworld = function(){
         console.log("displaying overworld");
        for(var i=0; i<grid.length;i++){
            for(var j=0; j<grid.length;j++){
                if(i<xPosPlayer+8 && i>xPosPlayer-8 && j<yPosPlayer+6 && j>yPosPlayer-6){
                    stage.addChild(grid[i][j]);
                }
            }
        }
        for(var i=0;i<posGridText.length;i++)
        {
            stage.addChild(posGridText[i]);
        }
        stage.addChild(animation);
        stage.addChild(charizard);
        stage.addChild(upBox);
        stage.addChild(leftBox);
        stage.addChild(downBox);
        stage.addChild(rightBox);
        stage.addChild();
        overWorldHidden = false;
    };
    
    World.prototype.hideOverworld = function(){
        for(var i=0; i<grid.length;i++){
            for(var j=0; j<grid.length;j++){
                stage.removeChild(grid[i][j]);
            }
        }
        for(var i=0;i<posGridText.length;i++)
        {
            stage.removeChild(posGridText[i]);
        }
        stage.removeChild(animation);
        stage.removeChild(charizard);
        stage.removeChild(upBox);
        stage.removeChild(leftBox);
        stage.removeChild(downBox);
        stage.removeChild(rightBox);
        //stage.removeChild();
        overWorldHidden = true;
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
                //stage.addChild(grid[x][y]);

                var posText = new createjs.Text(x + "," + y, "20px Arial", "#FFF");
                posText.x = xPos;
                posText.y = yPos;
                posGridText.push(posText);
                //stage.addChild(posGridText[posGridText.length-1]);
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

                    //stage.addChild(grid[x][y]);
                    //stage.update();

                    var posText = new createjs.Text(x + "," + y, "20px Arial", "#FFF");
                    posText.x = xPos;
                    posText.y = yPos;
                    posGridText.push(posText);
                    //stage.addChild(posGridText[posGridText.length-1]);
                }
            }
        }   

        gui.writeText("Cities added");
    };
    //1//remove bottom layer of world
    World.prototype.removeLayerFromBottom = function(){
        yPosPlayer;
        var sideNum = -8;
        for(var a=0;a<16;a++){
            if(yPosPlayer+6 < grid.length){
                sideNum++;
                if(xPosPlayer+sideNum>-1 && xPosPlayer+sideNum<grid.length){
                    stage.removeChild(grid[xPosPlayer+sideNum][yPosPlayer+6]);
                    console.log("removing bottom layer");
                }
            }
        }
    };
    //2//add bottom layer of world
    World.prototype.addLayerToBottom = function(){
        yPosPlayer;
        var sideNum = -8;
        for(var a=0;a<16;a++){
            if(yPosPlayer+6 < grid.length){
                sideNum++;
                if(xPosPlayer+sideNum>-1 && xPosPlayer+sideNum<grid.length){
                    stage.addChildAt(grid[xPosPlayer+sideNum][yPosPlayer+5], 0);
                    console.log("adding bottom layer");
                }
            }
        }
    };
    //3//remove top layer of world
    World.prototype.removeLayerFromTop = function(){
        yPosPlayer;
        var sideNum = -8;
        for(var a=0;a<16;a++){
            if(yPosPlayer-6 > -1){
                sideNum++;
                if(xPosPlayer+sideNum>-1 && xPosPlayer+sideNum<grid.length){
                    stage.removeChild(grid[xPosPlayer+sideNum][yPosPlayer-6], 0);
                    console.log("removing top layer");
                }
            }
        }
    };
    //4//add top layer of world
    World.prototype.addLayerToTop = function(){
        yPosPlayer;
        var sideNum = -8;
        for(var a=0;a<16;a++){
            if(yPosPlayer-6 > -1){
                sideNum++;
                if(xPosPlayer+sideNum>-1 && xPosPlayer+sideNum<grid.length){
                    stage.addChildAt(grid[xPosPlayer+sideNum][yPosPlayer-5], 0);
                    console.log("adding top layer");
                }
            }
        }
    };
    //5//remove right layer of world 
    World.prototype.removeLayerFromRight = function(){
        xPosPlayer;
        var sideNum = -6;
        for(var a=0;a<12;a++){
            if(xPosPlayer+8 > -1){
                sideNum++;
                if(yPosPlayer+sideNum>-1 && yPosPlayer+sideNum<grid.length){
                    stage.removeChild(grid[xPosPlayer+8][yPosPlayer+sideNum]);
                    console.log("removing right layer");
                }
            }
        }
    };
    //6//add right layer of world
    World.prototype.addLayerToRight = function(){
        xPosPlayer;
        var sideNum = -6;
        for(var a=0;a<12;a++){
            if(xPosPlayer+8 < grid.length){
                sideNum++;
                if(yPosPlayer+sideNum>-1 && yPosPlayer+sideNum<grid.length){
                    stage.addChildAt(grid[xPosPlayer+7][yPosPlayer+sideNum], 0);
                    console.log("adding right layer");
                }
            }
        }
    };
    //7//remove left layer of world
    World.prototype.removeLayerFromLeft = function(){
        xPosPlayer;
        var sideNum = -6;
        for(var a=0;a<12;a++){
            if(xPosPlayer-8 < grid.length){
                sideNum++;
                if(yPosPlayer+sideNum>-1 && yPosPlayer+sideNum<grid.length){
                    stage.removeChild(grid[xPosPlayer-8][yPosPlayer+sideNum]);
                    console.log("removing left layer");
                }
            }
        }
    };
    //8//add left layer of world
    World.prototype.addLayerToLeft = function(){
        xPosPlayer;
        var sideNum = -6;
        for(var a=0;a<12;a++){
            if(xPosPlayer-8 > -1){
                sideNum++;
                if(yPosPlayer+sideNum>-1 && yPosPlayer+sideNum<grid.length){
                    stage.addChildAt(grid[xPosPlayer-7][yPosPlayer+sideNum], 0);
                    console.log("adding left layer");
                }
            }
        }
    };
}