/*
 * This is the player class
 * 
 * It controls things like the spawning of the player, special attack and inventory management
 */
function Player(){
    
    var health = 10;
    var maxHealth = health;
    var name = "Not Burrito";
    var pow = 5;
    var dex = 3;
    var wis = 4;
    var items = [];
    var specials = [];
    var activeItem, activeSpecial;
    var stockSpecials = [];
    var availableSpecials = [];
    var dead;
    var model;
    var level = 1;
    var experience = 0;
    var levelCap = 2;
    var statPoints = 10;
    
    /*
     * Method to set up any variables properly, sets up name from input right now
     */
    Player.prototype.start = function(playerName){
        name = playerName;        
        fillAvailSpec();
        this.ranStats();
    };
    
    //Safeguard to prevent endless loops
    var ticker = 5;
    /*
     * Method to give random stats
     */
    Player.prototype.ranStats = function(){
        //check if the ticker has reached 0 and give any remaining points to health
        if(ticker === 0){
            maxHealth += statPoints * 10;
            statPoints = 0;
            console.log("Ticker at 0");
        }
        //a temporary variable to deal with the fact that health has to be higher than 1 per point
        var tempNo;
        tempNo = Math.floor(Math.random()*statPoints);
        maxHealth += Math.floor(tempNo*10);
        health = maxHealth;
        statPoints = statPoints - tempNo;
        
        //following the same convention as above
        tempNo = Math.floor(Math.random()*statPoints);
        pow += Math.floor(tempNo);
        statPoints = statPoints - tempNo;
        
        //this is for variables that are not being used currently
        //
        //tempNo = Math.floor(Math.random()*statPoints);
        //dex += Math.floor(tempNo);
        //statPoints = statPoints - tempNo;
        //tempNo = Math.floor(Math.random()*statPoints);
        //wis += Math.floor(tempNo);
        //statPoints = statPoints - tempNo;
        //maxHealth = Math.floor(Math.random()*75+1);
        //health = maxHealth;
        
        //checks to see if the ticker and stat points have not run out
        if(statPoints > 0 && ticker>0){
            //decrement the ticker
            ticker--;
            //do this again
            this.ranStats();
        }else{
            //print final stats
            console.log("------Player Final Stats------");
            console.log("Level: " + level);
            console.log("Max Health: " + maxHealth);
            console.log("Power: " + pow);
            console.log("Dexterity: " + dex);
            console.log("Wisdom: " + wis);
            console.log("Max points: " + level*10);
            console.log("Remaining points: " + statPoints);
            console.log("------End Player Stats------");
        }
    };
    
    /*
     * Method to get the model
     * 
     * @return model
     */
    Player.prototype.getModel = function(){
        //console.log("getting player model");
        model = new createjs.Bitmap("Assets/Models/Taco1.svg");
        return model;
    };
    
    /*
     * Method to force the exp to a certain value
     */
    Player.prototype.setExp = function(newExp){
        experience = newExp;
        //check for a level up
        checkLevelUp();
    };
        
    /*
     * Method to get the current exp
     * 
     * @return experience
     */
    Player.prototype.getExp = function(){
        return experience;
    };
    
    /*
     * Method to get the exp required for the next level up
     * 
     * @return gap
     */
    Player.prototype.getExpToNextLevel = function(){
        var gap = levelCap - experience;
        return gap;
    };
    
    /*
     * Method to give an amount of experience
     */
    Player.prototype.giveExp = function(addExp){
        //add the exprience to the current experience
        experience += addExp;
        //check for a level up
        checkLevelUp();
    };
    
    /*
     * Method to check for a level up
     */
    function checkLevelUp(){
        //console.log("Checking levelCap/exp: " + levelCap + " " + experience);
        //
        //while the experience is above the cap loop through this
        while(experience >= levelCap){
            console.log("----LEVEL UP----");
            //increment the  level
            level += 1;
            //level up the stats
            levelUpStats();
            //unlock the next skill, if applicable
            unlockNextSkill();
            //remove the current level cap from the experience pool
            experience -= levelCap;
            //ramp up the level cap
            levelCap += Math.ceil(levelCap*0.5);
            //increment the enemy level, to keep up a challenge
            enemyLevel += 1;
            //print the player's stats
            player.printStats();
        }
    };
    
    /*
     * Method for checking and unlocking skills
     */
    function unlockNextSkill(){
        //console.log("Unlocking special");
        //switch to unlock based on level
        switch(level){
            case 2:
                //at level 2 add double attack
                var spec = new Special();
                spec.setName("Double Attack");
                player.addSpecial(spec);
                break;
            case 3:
                //at level 3 add tripel attack
                var spec = new Special();
                spec.setName("Triple Attack");
                player.addSpecial(spec);
                break;
            case 5:
                //at level 5 add lettuce slap
                var spec = new Special();
                spec.setName("Lettuce Slap");
                player.addSpecial(spec);
                break;
            case 10:
                //at level 10 add mince meat special
                var spec = new Special();
                spec.setName("Mince Meat Special");
                player.addSpecial(spec);
                break;
        }
    };
    
    /*
     * Method to level up the stats
     */
    function levelUpStats(){
        //increment maximum health by 10% of current maximum health
        maxHealth += Math.floor(maxHealth*0.1);
        //give full health
        health = maxHealth;
        //increment power by 20% of current power
        pow += Math.floor(pow*0.2);
        //increment dexterity by 20% of current dexterity
        dex += Math.floor(dex*0.2);
        //increment wisdom by 20% of current wisdom
        wis += Math.floor(wis*0.2);
    };
    
    /*
     * Method to get the player's level
     * 
     * @return level
     */
    Player.prototype.getLevel = function(){
        return level;
    };
    
    /*
     * Method to add a specific item
     */
    Player.prototype.addItem = function(item){
        //adds the items to the items array(or inventory)
        items.push(item);
    };
    
    /*
     * Method to add a random item
     */
    Player.prototype.giveRandomItem = function(){
        console.log("giving random item");
        //get a random number, based on how many item variations there are(3 now)
        var rand = Math.floor(Math.random()*2);
        console.log("Rand: " + rand);
        var randItem;
        
        //switch to check the random number and to check what what item to add
        switch(rand){
            case 0:
                //add a normal potion
                randItem = new Item();
                randItem.setName("Potion");
                
                console.log("Adding potion");
                break;
            case 1:
                //add a better potion
                randItem = new Item();
                randItem.setName("Better Potion");
                
                console.log("Adding better potion");
                break;
            case 2:
                //add an ultra potion
                randItem = new Item();
                randItem.setName("Ultra Potion");
                
                console.log("Adding ultra potion");
                break;
        }
        //add that item
        this.addItem(randItem);
    };
    
    /*
     * Method to remove an item from the array(or inventory)
     */
    Player.prototype.removeItem = function(item){
        //temp variable to act as the item's index
        var tempNo;
        //cycle through items
        for(var i=0;i<items.length;i++){
            //check if the input item's ID is the same as the current cycle item's ID
            if(item.getID() === items[i].getID()){
                //set the temp varaible to the current index
                tempNo = i;
            }
        }
        //remove that index from items(or inventory)
        items.splice(tempNo, 1);
        //set the text of the "items" field in the battle screen
        //also set the active item
        if(items.length === 0){
            //if no more items, set it back "Items" and "nullify" the active item
            this.activeItem = "";
            battle.writeItemText("Items");
        }else if(tempNo+1 >= items.length){
            //if only 1 item left, set it to the first index(or 0)
            this.activeItem = items[0];
            battle.writeItemText(this.activeItem.getName());
        }else if(tempNo+1 < items.length){
            //if more than 1 item left, then set it to the next item
            this.activeItem = items[tempNo];
            battle.writeItemText(this.activeItem.getName());
        }
    };
    
    /*
     * Method to pick the next item
     */
    Player.prototype.nextItem = function(){
        //check if the active item is null
        if(!this.activeItem){
            //set the active item to the item at the first index
            this.activeItem = items[0];
        }else{
            var currentIndex;
            //cycle through the items
            for(var i=0;i<items.length;i++){
                //check if the active item and cycled item IDs match
                if(this.activeItem.getID() === items[i].getID()){
                    //set the variable to the current index
                    currentIndex = i;
                }
            }
            //increment the current index
            currentIndex++;
            
            if(currentIndex >= items.length){
                //if it goes over the items length set it to 0
                currentIndex = 0;
            }else{
                currentIndex;
            }
            console.log("Current index: "  + currentIndex);
            //set the active item to the index we set
            this.activeItem = items[currentIndex];
        }
    };
    
    /*
     * Method to pick the previous items
     */
    Player.prototype.prevItem = function(){
        //this is the same as for the next item, but in reverse
        if(!this.activeItem){
            this.activeItem = items[items.length-1];
        }else{
            var currentIndex;
            for(var i=0;i<items.length;i++){
                if(this.activeItem.getID() === items[i].getID()){
                    currentIndex = i;
                }
            }
            currentIndex--;
            if(currentIndex < 0){
                currentIndex = items.length-1;
            }else{
                currentIndex;
            }
            console.log("Current index: "  + currentIndex);
            this.activeItem = items[currentIndex];
        }
    };
    
    /*
     * Method to get the array of items
     * 
     * @return items
     */
    Player.prototype.getItems = function(){
        return items;
    };
    
    /*
     * Method to get the current active item
     * 
     * @return activeItem
     */
    Player.prototype.getActiveItem = function(){
        return this.activeItem;
    };
    
    /*
     * Method to add a special attack
     */
    Player.prototype.addSpecial = function(special){
        //add the special to both the 
        //normal array(used in battles)
        //and to the stock array(used to reset the specials between battles)
        specials.push(special);
        stockSpecials.push(special);
    };
    
    /*
     * Method to remove a special attack
     */
    Player.prototype.removeSpecial = function(special){
        //temp variable
        var tempNo;
        //cycle through specials
        for(var i=0;i<specials.length;i++){
            //check if the names (there will never be more than one with the same name)
            if(special.getName() === specials[i].getName()){
                //set our temp variable
                tempNo = i;
            }
        }
        //console.log("special removed  at " + tempNo + " " + specials[tempNo].getName());
        
        //remove the special at the temp variable as an index
        specials.splice(tempNo, 1);
        //set the text of the "specials" field in the battle screen
        //also set the active special
        if(specials.length === 0){
            //if no more specials "nullify" the active special
            //write "Specials" on the battle screens button
            //console.log("changing text to specials");
            this.activeSpecial = null;
            battle.writeSpecialText("Specials");
        }else if(tempNo+1 >= specials.length){
            //if only one special left set the active special to the one at the first index
            this.activeSpecial = specials[0];
            //console.log("active special forced to items[0]");
            battle.writeSpecialText(this.activeSpecial.getName());
        }else if(tempNo+1 < specials.length){
            //if more than 1 special left, pick the next special
            this.activeSpecial = specials[tempNo];
            //console.log("active special set to specials["+tempNo+"]");
            battle.writeSpecialText(this.activeSpecial.getName());
        }
    };
    
    /*
     * Method for picking the next special
     */
    Player.prototype.nextSpecial = function(){
        //this is essentially a duplicate of the nextItem method, but for specials instead
        if(!this.activeSpecial){
            this.activeSpecial = specials[0];
        }else{
            var currentIndex;
            for(var i=0;i<specials.length;i++){
                if(this.activeSpecial.getName() === specials[i].getName()){
                    currentIndex = i;
                }
            }
            currentIndex++;
            if(currentIndex >= specials.length){
                currentIndex = 0;
            }else{
                currentIndex;
            }
            this.activeSpecial = specials[currentIndex];
        }
    };
    
    /*
     * Method for picking the previous special
     */
    Player.prototype.prevSpecial = function(){
        //this is essentially a duplicate of the prevItem method, but for specials instead
        if(!this.activeSpecial){
            this.activeSpecial = specials[specials.length-1];
        }else{
            var currentIndex;
            for(var i=0;i<specials.length;i++){
                if(this.activeSpecial.getName() === specials[i].getName()){
                    currentIndex = i;
                }
            }
            currentIndex--;
            if(currentIndex < 0){
                currentIndex = specials.length-1;
            }else{
                currentIndex;
            }
            this.activeSpecial = specials[currentIndex];
        }
    };
    
    /*
     * Method for re-filling the specials
     */
    function fillAvailSpec(){
        //this fills an array with ALL the specials that can be made available
        var spec = new Special();
        spec.setName("Double Attack");
        availableSpecials.push(spec);
        
        spec = new Special();
        spec.setName("Triple Attack");
        availableSpecials.push(spec);
        
        spec = new Special();
        spec.setName("Lettuce Slap");
        availableSpecials.push(spec);
        
        spec = new Special();
        spec.setName("Mince Meat Special");
        availableSpecials.push(spec);
        
        //console.log("Available skills: " + availableSpecials.length);
    };
    
    /*
     * Method for getting the active special
     * 
     * @return activeSpecial
     */
    Player.prototype.getActiveSpecial = function(){
        return this.activeSpecial;
    };
    
    /*
     * Method for getting the specials array
     * 
     * @return specials
     */
    Player.prototype.getSpecials = function(){
        return stockSpecials;
    };
    
    /*
     * method for getting the name of the next special to be unlocked
     */
    Player.prototype.getNextSpecialName = function(){
        var nextSpecial = "";
        
        //check if the stock array is smaller than the available array
        if(stockSpecials.length < availableSpecials.length){
            //the next special will be the one that is 1 over the current unlocked skills array size
            nextSpecial = availableSpecials[stockSpecials.length].getName();
        }else{
            //nothing to unlock
            nextSpecial = "Nothing to unlock";
        }
        
        return nextSpecial;
    };
    
    /*
     * Method to reset the usable specials to all the unlock specials
     */
    Player.prototype.resetSpecials = function(){
        //variable to check if it is necassary to add any specials
        var okayToAdd = false;
        //cycle through the stock(unlocked) specials
        for(var i=0;i<stockSpecials.length;i++){
            //cycle through the specials that can currently be used
            for(var j=0;j<specials.length;j++){
                //console.log("Stock specials " + stockSpecials[i].getName() + " Specials " + specials[j].getName());
                //check if the names match
                if(stockSpecials[i].getName() === specials[j].getName()){
                    //if they match, just go to the next special
                    okayToAdd = false;
                    //console.log("Specials match, setting false");
                    break;
                }else{
                    //if they don't match, we need to add a special
                    okayToAdd = true;
                    //console.log("Specials do not match, setting true");
                }
            }
            //if we need to add or if the specials array is 0
            if(okayToAdd || specials.length === 0){
                //add the unlocked special at the current index
                specials.push(stockSpecials[i]);
                //console.log("Adding special " + stockSpecials[i].getName());
            }else{
                //console.log("Special already available " + stockSpecials[i].getName());
            }
        }
        //console.log(specials.length);
    };
    
    /*
     * Method to set the health to a specified value
     */
    Player.prototype.setHealth = function(inHealth){
        health = inHealth;
    };
    
    /*
     * Method to get the current health
     * 
     * @return health
     */
    Player.prototype.getHealth = function(){
        return health;
    };
    
    /*
     * Method to set the maximum health to a certain value
     */
    Player.prototype.setMaxHealth = function(inHealth){
        maxHealth = inHealth;
    };
    
    /*
     * Method to get the maximum health
     */
    Player.prototype.getMaxHealth = function(){
        return maxHealth;
    };
    
    /*
     * Method to set the name
     */
    Player.prototype.setName = function(playerName){
        name = playerName;
    };
    
    /*
     * Method to get the name
     * 
     * @return name
     */
    Player.prototype.getName = function(){
        return name;
    };
    
    /*
     * Method to decrement the health
     */
    Player.prototype.decrementHealth = function(decrement){
        //if the input is not a number (null if not there, so fires too)
        if(typeof decrement != 'number'){
            //if health is about to drop to 0 or below
            if(health-1<=0){
                //set health to 0
                health = 0;
                //set dead
                dead = true;
            }else{
                //decrement health by 1
                health--;
            }
        }else{
            //if health is about to drop to 0 or below
            if(health-decrement<=0){
                //set health to 0
                health = 0;
                //set dead
                dead = true;
                //show the end screen
                showEndScreen();
            }else{
                //decrement health by the input
                health = health - decrement;
            }
        }
    };
    
    /*
     * Method to attack a target
     */
    Player.prototype.attack = function(target){
        //if(typeof target === Enemy){
        //
        //decrement the target's health by the power
        target.decrementHealth(pow);
        //set the player's action time to 0
        battle.setActionTime(0);
        //}else{
          //  alert(typeof target);
        //}
    };
    
    /*
     * Method to attack a target with a special attack
     */
    Player.prototype.useSpecial = function(target){
        //check if the specials array size is bigger than 0
        if(specials.length > 0){
            //target.decrementHealth(pwr*2);
            //console.log("using " + this.activeSpecial.getName());
            //us the active special's effect on the target
            this.activeSpecial.effect(target);
            //remove this special from the usable specials array
            this.removeSpecial(this.activeSpecial);
            //set the player's battle timer to 0
            battle.setActionTime(0);
        }else{
            //no specials to use
            console.log("specials empty");
        }
    };
    
    /*
     * Method to get the power
     * 
     * @return pow
     */
    Player.prototype.getPow = function(){
        return pow;
    };
    
    /*
     * Method to get the dexterity
     * 
     * @return dex
     */
    Player.prototype.getDex = function(){
        return dex;
    };
    
    /*
     * Method to get the wisdom
     * 
     * @return wis
     */
    Player.prototype.getWis = function(){
        return wis;
    };
    
    /*
     * Method to use the active item
     */
    Player.prototype.useActiveItem = function(){
        //check if the items array(or inventory) size is bigger than 0
        if(items.length > 0){
            //console.log("using " + this.activeItem.getName());
            //use the item's effect on the player(though can be the enemy)
            this.activeItem.effect(player);
            //remove the item from the item array(or inventory)
            this.removeItem(this.activeItem);
            //set the player's battle timer to 0
            battle.setActionTime(0);
        }else{
            //no more items
            console.log("inventory empty");
        }
    };
    
    /*
     * Increment the health by an amount
     */
    Player.prototype.incrementHealth = function(increment){
        //if the input is not a number (null if not there, so fires too)
        if(typeof increment != 'number'){
            //if the input is not a number (null if not there, so fires too)
            if(health+1>=maxHealth){
                //current health becomes maximum health
                health = maxHealh;
            }else{
                //increment health by 1
                health++;
            }
        }else{
            //if the health is about to hit, or go above, the maximum health
            if(health +increment >= maxHealth){
                //current health becomes maximum health
                health = maxHealth;
            }else{
                //increment gets added to health
                health = health + increment;
            }
        }
    };
    
    /*
     * Methoed to print the player's stats to console
     */
    Player.prototype.printStats = function(){
        console.log("------Player Stats------");
        console.log("Level: " + level);
        console.log("Exp: " + experience);
        console.log("Level Cap: " + levelCap);
        console.log("Max Health: " + maxHealth);
        console.log("Health: " + health);
        console.log("Power: " + pow);
        console.log("Dex: " + dex);
        console.log("Will: " + wis);
        console.log("# Specials: " + specials.length);
        console.log("# Stock Specials: " + stockSpecials.length);
        console.log("# Items: " + items.length);
        console.log("------End Player Stats------");
    };
};