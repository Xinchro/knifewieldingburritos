/*
 * This is the enemy class
 * 
 * It controls the spawning of the enemy and its AI
 */
function Enemy(){
    
    var health = 10;
    var maxHealth = health;
    var name = "Not Taco";
    var dead;
    var noOfPotions = 2;
    var pwr = 1;
    var statPoints = enemyLevel*10;
    var model;
    
    /*
     * Method to set up any variables properly, sets up name from input right now
     */
    Enemy.prototype.start = function(name){
        this.name = name;
    };
    
    //a safeguard to prevent infinite looping
    var ticker = 5;
    /*
     * Method to give the enemy random stats, at spawn, based on a point system
     */
    Enemy.prototype.ranStats = function(){
        //if the ticker has reached 0, just give the remaining points to health
        if(ticker === 0){
            maxHealth += statPoints * 2;
            statPoints = 0;
            console.log("Ticker at 0");
        }
        //randomize number of health potions based on level, minimum of 1
        noOfPotions = Math.floor(Math.random()*enemyLevel)+1;
        
        //a temporary variable to deal with the fact that health has to be higher than 1 per point
        var tempNo;
        tempNo = Math.floor(Math.random()*statPoints);
        maxHealth += Math.floor(tempNo*2);
        health = maxHealth;
        statPoints = statPoints - tempNo;
        
        //following the same convention as above
        tempNo = Math.floor(Math.random()*statPoints);
        pwr += Math.floor(tempNo);
        statPoints = statPoints - tempNo;
        
        //if it can carry on: decrement and run this all again
        //else print the stats
        if(statPoints > 0 && ticker > 0){
            ticker--;
            this.ranStats();
        }else{
            console.log("------Enemy Final Stats------");
            console.log("Level: " + enemyLevel);
            console.log("Max Health: " + maxHealth);
            console.log("Power: " + pwr);
            console.log("Max points: " + enemyLevel*10);
            console.log("Remaining points: " + statPoints);
            console.log("------End Enemy Stats------");
        }
    };
    
    /*
     * Method to get the model/image
     * 
     * @return model
     */
    Enemy.prototype.getModel= function(){
        model = new createjs.Bitmap("Assets/Models/Burrito1.svg");
        return model;
    };
    
    /*
     * Method to force the health to a certain value
     */
    Enemy.prototype.setHealth = function(inHealth){
        health = inHealth;
    };
    
    /*
     * Method to get the current health
     * 
     * @return health
     */
    Enemy.prototype.getHealth = function(){
        return health;
    };
    
    /*
     * Method to force the maximum health to a certain value
     */
    Enemy.prototype.setMaxHealth = function(inHealth){
        maxHealth = inHealth;
    };
    
    /*
     * Method to get the maximum health
     * 
     * @return maxHealth
     */
    Enemy.prototype.getMaxHealth = function(){
        return maxHealth;
    };
    
    /*
     * Method to force the name into a different one
     */
    Enemy.prototype.setName = function(enemyName){
        name = enemyName;
    };
    
    /*
     * Method to get the name
     * 
     * @return name
     */
    Enemy.prototype.getName = function(){
        return name;
    };
    
    /*
     * Method to check if the enemy is dead
     * 
     * @return dead
     */
    Enemy.prototype.isDead = function(){
        return dead;
    };
    
    /*
     * Method to attack a target with the current power
     */
    Enemy.prototype.attack = function(target){
        //decrement the target's health by the power
        target.decrementHealth(pwr);
    };
    
    /*
     * Method to attack with a special attack
     * Only attacks for double the power for now
     */
    Enemy.prototype.specialAttack = function(target){
        //attack the target with double the power
        target.decrementHealth(pwr*2);
    };
    
    /*
     * Method to decremenet the health by a certain value, or just one if value is ommited
     */
    Enemy.prototype.decrementHealth = function(decrement){
        //console.log("enemy health going from " + health + " because " + decrement);
        //if the input is not a number (null if not there, so fires too)
        if(typeof decrement !== 'number'){
            //if health is about to drop to 0 or below
            if(health-1<=0){
                //set health to 0
                health = 0;
                //set dead
                dead = true;
                //increment enemies killed score
                enemiesKilled++;
                //give the player experience
                player.giveExp(1);
                //give the player a random item
                player.giveRandomItem();
                //print the player's stats to console
                player.printStats();
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
                //increment enemies killed score
                enemiesKilled++;
                //give the player experience
                player.giveExp(1);
                //give the player a random item
                player.giveRandomItem();
                //print the player's stats to console
                player.printStats();
            }else{
                //decrement health by the input
                health = health - decrement;
            }
        }
        //console.log("to " + health);
    };
    
    /*
     * Method to increment the health
     */
    Enemy.prototype.incrementHealth = function(increment){
        //if the input is not a number (null if not there, so fires too)
        if(typeof increment != 'number'){
            //if the health is about to hit, or go above, the maximum health
            if(health + 1 >= maxHealth){
                //current health becomes maximum health
                health = maxHealh;
            }else{
                //increment health by 1
                health++;
            }
        }else{
            //if the health is about to hit, or go above, the maximum health
            if(health + increment >= maxHealth){
                //current health becomes maximum health
                health = maxHealth;
            }else{
                //increment gets added to health
                health += increment;
            }
        }
    };
    
    /*
     * Method to check if the enemy has any potions 
     * 
     * @return boolean
     */
    Enemy.prototype.hasPotion = function(){
        if(noOfPotions > 0){
            noOfPotions--;
            return true;
        }else{
            return false;
        }
    };
    
    //variable to decide on special attack rarity, the higher the value the more rare
    var chanceModifier=5;
    
    /*
     * Method to attack the player
     */
    Enemy.prototype.doAttack = function(){
        //get a random number, minimum once, maximum the chanceModifier
        var randChance = Math.floor((Math.random()*chanceModifier)+1);
        //if it is equal to once (1 in a X chance)
        if(randChance === 1){
            //special attack on the player
            this.specialAttack(player);
            //console.log("enemy uses special attack " + randChance + " " + chanceModifier);
        }else{
            //normal attack on the player
            this.attack(player);
            //console.log("enemy uses normal attack " + randChance + " " + chanceModifier);
        }
    };
    
    /*
     * Method to the set the enemy to dead
     */
    Enemy.prototype.setDead = function(){
        dead = true;
    };
    
    //variable to check if the chance has been increased for a special attack
    var chanceIncreased = false;
    
    /*
     * Method to loop through the enemy's activities
     */
    Enemy.prototype.enemyLoop = function(){
        //console.log("enemy looping");
        //has to be in a battle for the enemy to act
        if(battle.canEnemyAct()){
            //check if health is above 25%, heal if it is
            //if there are no more potions, the enemy's special attack chance is doubled
            if(health < Math.floor(maxHealth/100*25))
            {
                //check if enemy has potions
                if(this.hasPotion()){
                    //increment health by 50 points
                    this.incrementHealth(50);
                    //console.log("healing");
                }else{
                    //check if the chance has already been increased
                    if(!chanceIncreased){
                        //increase the chance to do a special attack, double in this case
                        chanceModifier = Math.floor(chanceModifier/2);
                        //set the chance as increased
                        chanceIncreased = true;
                    }
                    //attack
                    this.doAttack();
                    //console.log("not healing");
                }
            }else{
                //console.log("enemy attacking");
                //attack
                this.doAttack();
            }
            //refresh the playe and enemy health bars
            battle.refreshHealthBars();
        }else{
            //console.log("enemy cannot act");
        }
    };
};