/*
 * This is the world class
 * 
 * It controls things like generating the grid, generating the cities and the tile culling
 */

//city rarity, the high the rvalue, the rarer, settnig to 1 will make everthing a city
var cityRarity = 10;
//will make a square world based on the following number
var worldSize = 50;
var overworldHidden;

function World(){
    
    /*
     * Method to see if the overworld is hidden
     * 
     * @return overworldHidden
     */
    World.prototype.isOverworldHidden = function(){
        return overworldHidden;
    };
    
    /*
     * Method ot display the overworld
     */
    World.prototype.displayOverworld = function(){
        //console.log("displaying overworld");
        //cycles through all the tiles
        for(var i=0; i<grid.length;i++){
            for(var j=0; j<grid.length;j++){
                if(i<xPosPlayer+8 && i>xPosPlayer-8 && j<yPosPlayer+6 && j>yPosPlayer-6){
                    //adds the current tile to the stage
                    stage.addChild(grid[i][j]);
                }
            }
        }
        //debugging stuff
        for(var i=0;i<posGridText.length;i++)
        {
            stage.addChild(posGridText[i]);
        }
        //add everythng needed in the overworld to the stage
        stage.addChild(playerOverworldModel);
        stage.addChild(charizard);
        stage.addChild(upBox);
        stage.addChild(leftBox);
        stage.addChild(downBox);
        stage.addChild(rightBox);
        stage.addChild(actionBox);
        //set the overworld as visible
        overworldHidden = false;
    };
    
    /*
     * Method to hide the overworld
     */
    World.prototype.hideOverworld = function(){
        //cycle through all the tiles
        for(var i=0; i<grid.length;i++){
            for(var j=0; j<grid.length;j++){
                //remove the tile from the stage
                stage.removeChild(grid[i][j]);
            }
        }
        //debugging stuff
        for(var i=0;i<posGridText.length;i++)
        {
            stage.removeChild(posGridText[i]);
        }
        //remove all the overworld elements from the stage
        stage.removeChild(playerOverworldModel);
        stage.removeChild(charizard);
        stage.removeChild(upBox);
        stage.removeChild(leftBox);
        stage.removeChild(downBox);
        stage.removeChild(rightBox);
        stage.removeChild(actionBox);
        //set the overworld as hidden
        overworldHidden = true;
    };
    
    /*
     * Method to generate and fill the world
     */
    World.prototype.genGrid = function(){
        //temp variable
        var tempRect;
        //loop around for the size for the size of the grid(2 loops for a 2D square)
        for(var x=0;x<gridSize;x++){
            for(var y=-1;y<gridSize;y++){
                //make a new createjs shape
                tempRect = new createjs.Shape();
                //get a random number for a color(green here), in the range of 150 to 255)
                var tempCol = Math.floor((Math.random()*255)+150);
                var xPos, yPos;
                
                //subtract x*gridScale and y*gridScale to offset player's position (4, 6) puts the player at (10,10)
                xPos = x*gridScale+((playerOverworldModel.x)%gridScale) -(xPosPlayer-6)*gridScale;
                yPos = y*gridScale+((playerOverworldModel.y)%gridScale) -(yPosPlayer-4)*gridScale;
                battleStatusText.text = xPos/50 + " " + yPos/50;
                //fill in the createjs shape with the color we want and make it a square
                tempRect.graphics.beginFill("rgba(0," + tempCol + ",0" + ",1)").drawRoundRect(xPos,yPos,gridScale,gridScale,5);
                //set the current 2 indices(x,y) to the shape
                grid[x][y] = tempRect;

                //debugging stuff
                var posText = new createjs.Text(x + "," + y, "20px Arial", "#FFF");
                posText.x = xPos;
                posText.y = yPos;
                posGridText.push(posText);
            }
        }

        gui.writeText("Grid added");
        //gui.writeText(parseInt(tempCol, 16));
    };
    
    /*
     * Method to generate the cities
     */
    World.prototype.genCities = function(){
        //this is essentially the same as the method to generate the grid
        //I will only be commenting the difference
        
        var tempRect;
        var checkCity;
        //higher values make cities rarer

        for(var x=0;x<gridSize;x++){
            for(var y=0;y<gridSize;y++){
                //get a random number from the range of 1 to the valie of cityRarity
                checkCity = Math.floor((Math.random()*cityRarity)+1);
                //check to see if we need to make this tile a city(1 in X chance)
                if(checkCity == 1){    
                    tempRect = new createjs.Shape();
                    //color is blue this time
                    var tempCol = Math.floor((Math.random()*255)+150);
                    var xPos, yPos;
                    
                    //subtract x*gridScale and y*gridScale to offset player's position (10,10) is 4x and 6y
                    xPos = x*gridScale+((playerOverworldModel.x)%gridScale) -(xPosPlayer-6)*gridScale;//-xOff;
                    yPos = y*gridScale+((playerOverworldModel.y)%gridScale) -(yPosPlayer-4)*gridScale;//-yOff;

                    tempRect.graphics.beginFill("rgba(0," + "0," + tempCol + ",1)").drawRoundRect(xPos,yPos,gridScale,gridScale,5);
                    //remove the current tile at this co-ordinate
                    stage.removeChild(grid[x][y]);
                    //set the co-ordinate to be the new tile
                    grid[x][y] = tempRect;
                    //add the co-ordinates to the city array
                    cityArr.push([x,y]);

                    //debugging stuff
                    var posText = new createjs.Text(x + "," + y, "20px Arial", "#FFF");
                    posText.x = xPos;
                    posText.y = yPos;
                    posGridText.push(posText);
                }
            }
        }   

        gui.writeText("Cities added");
    };
    
    //
    //The following methods are used to cut down on rendering costs
    //they cull tiles just beyond the edges of the screen
    //
    //I will only be commenting the first, as they are all relatively the same
    //only changing the direction they are culling 
    //
    
    /*
     * Method to remove a layer from the bottom
     */
    //1//remove bottom layer of world
    World.prototype.removeLayerFromBottom = function(){
        //hard coded value for getting a ROW of tiles(since we are dealing with vertical culling)
        var sideNum = -8;
        //looping through twice the size of the above (to getboth sides of the player)
        for(var a=0;a<16;a++){
            //checking if the player plus the distance to the edge of the viewport (hard coded 5 in this case) is smaller than the grid size 
            if(yPosPlayer+5 < grid.length){
                //increment the tile row number
                sideNum++;
                //checking if the player is at the edge of the grid/map(because of array indices causing null pointers and breaking everything)
                if(xPosPlayer+sideNum>-1 && xPosPlayer+sideNum<grid.length){
                    //removing the tiles judged to be in need of culling
                    //in this case a tile 6 tiles bellow and the sideNum left/right of the player
                    stage.removeChild(grid[xPosPlayer+sideNum][yPosPlayer+6]);
                    //console.log("removing bottom layer");
                }
            }
        }
    };
    
    /*
     * Method to add a layer to the bottom
     */
    //2//add bottom layer of world
    World.prototype.addLayerToBottom = function(){
        var sideNum = -8;
        for(var a=0;a<16;a++){
            if(yPosPlayer+5 < grid.length){
                sideNum++;
                if(xPosPlayer+sideNum>-1 && xPosPlayer+sideNum<grid.length){
                    stage.addChildAt(grid[xPosPlayer+sideNum][yPosPlayer+5], 0);
                    //console.log("adding bottom layer");
                }
            }
        }
    };
    
    /*
     * Method to remove a layer from the top
     */
    //3//remove top layer of world
    World.prototype.removeLayerFromTop = function(){
        var sideNum = -8;
        for(var a=0;a<16;a++){
            if(yPosPlayer-5 > -1){
                sideNum++;
                if(xPosPlayer+sideNum>-1 && xPosPlayer+sideNum<grid.length){
                    stage.removeChild(grid[xPosPlayer+sideNum][yPosPlayer-6], 0);
                    //console.log("removing top layer");
                }
            }
        }
    };
    
    /*
     * Method to add a layer to the top 
     */
    //4//add top layer of world
    World.prototype.addLayerToTop = function(){
        var sideNum = -8;
        for(var a=0;a<16;a++){
            if(yPosPlayer-5 > -1){
                sideNum++;
                if(xPosPlayer+sideNum>-1 && xPosPlayer+sideNum<grid.length){
                    stage.addChildAt(grid[xPosPlayer+sideNum][yPosPlayer-5], 0);
                    //console.log("adding top layer");
                }
            }
        }
    };
    
    /*
     * Method to remove a layer from the right
     */
    //5//remove right layer of world 
    World.prototype.removeLayerFromRight = function(){        
        var sideNum = -6;
        for(var a=0;a<12;a++){
            if(xPosPlayer+8 < grid.length){
                sideNum++;
                if(yPosPlayer+sideNum>-1 && yPosPlayer+sideNum<grid.length){
                    stage.removeChild(grid[xPosPlayer+8][yPosPlayer+sideNum]);
                    //console.log("removing right layer");
                }
            }
        }
    };
    
    /*
     * Method to add a layer to the right
     */
    //6//add right layer of world
    World.prototype.addLayerToRight = function(){
        var sideNum = -6;
        for(var a=0;a<12;a++){
            if(xPosPlayer+7 < grid.length){
                sideNum++;
                if(yPosPlayer+sideNum>-1 && yPosPlayer+sideNum<grid.length){
                    stage.addChildAt(grid[xPosPlayer+7][yPosPlayer+sideNum], 0);
                    //console.log("adding right layer");
                }
            }
        }
    };
    
    /*
     * Method to remove a layer from the left
     */
    //7//remove left layer of world
    World.prototype.removeLayerFromLeft = function(){
        var sideNum = -6;
        for(var a=0;a<12;a++){
            if(xPosPlayer-8 > -1){
                sideNum++;
                if(yPosPlayer+sideNum>-1 && yPosPlayer+sideNum<grid.length){
                    stage.removeChild(grid[xPosPlayer-8][yPosPlayer+sideNum]);
                    //console.log("removing left layer");
                }
            }
        }
    };
    
    /*
     * Method to add a layer to the left
     */
    //8//add left layer of world
    World.prototype.addLayerToLeft = function(){
        var sideNum = -6;
        for(var a=0;a<12;a++){
            if(xPosPlayer-7 > -1){
                sideNum++;
                if(yPosPlayer+sideNum>-1 && yPosPlayer+sideNum<grid.length){
                    stage.addChildAt(grid[xPosPlayer-7][yPosPlayer+sideNum], 0);
                    //console.log("adding left layer");
                }
            }
        }
    };
}