function Enemy(){
    
    var health = 50;
    var maxHealth = health;
    var name = "Not Taco";
    var dead;
    var noOfPotions = 3;
    var pwr = 50;
    var statPoints = enemyLevel*10;
    //console.log(health);
    var model;
    
    Enemy.prototype.start = function(name){
        this.name = name;
        //this.model = "Assets/Models/Burrito1.png";
    };
    
    ticker = 5;
    Enemy.prototype.ranStats = function(){
        if(ticker === 0){
            maxHealth += statPoints * 10;
            statPoints = 0;
            console.log("Ticker at 0");
        }
        var tempNo;
        tempNo = Math.floor(Math.random()*statPoints);
        maxHealth += Math.floor(tempNo*10);
        health = maxHealth;
        statPoints = statPoints - tempNo;
        
        tempNo = Math.floor(Math.random()*statPoints);
        pwr += Math.floor(tempNo);
        statPoints = statPoints - tempNo;
//        maxHealth = Math.floor(Math.random()*75+1);
//        health = maxHealth;
//        pwr = Math.floor(Math.random()*10+1);
//        console.log("------Enemy stats------");
//        console.log("Level: " + enemyLevel);
//        console.log("Max Health: " + maxHealth);
//        console.log("Power: " + pwr);
//        console.log("Remaining points: " + statPoints);
//        console.log("------End enemy stats------");
        if(statPoints > 0 && ticker>0){
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
    
    Enemy.prototype.getModel= function(){
        model = new createjs.Bitmap("Assets/Models/Burrito1.svg");
        return model;
    };
    
    Enemy.prototype.setHealth = function(inHealth){
        health = inHealth;
    };
    
    Enemy.prototype.getHealth = function(){
        return health;
    };
    
    Enemy.prototype.setMaxHealth = function(inHealth){
        maxHealth = inHealth;
    };
    
    Enemy.prototype.getMaxHealth = function(){
        return maxHealth;
    };
    
    Enemy.prototype.setName = function(enemyName){
        name = enemyName;
    };
    
    Enemy.prototype.getName = function(){
        return name;
    };
    
    Enemy.prototype.isDead = function(){
        return dead;
    };
    
    Enemy.prototype.attack = function(target){
            target.decrementHealth(pwr);
    };
    
    Enemy.prototype.specialAttack = function(target){
            target.decrementHealth(pwr*2);
    };
    
    Enemy.prototype.decrementHealth = function(decrement){
        //console.log("enemy health going from " + health + " because " + decrement);
        if(typeof decrement != 'number'){
            if(health-1<=0){
                health = 0;
                dead = true;
            }else{
                health--;
            }
        }else{
            if(health-decrement<=0){
                health = 0;
                dead = true;
                enemiesKilled++;
                player.giveExp(1);
                //console.log("enemy killed");
                player.printStats();
            }else{
                health = health - decrement;
            }
        }
        //console.log("to " + health);
    };
    
    Enemy.prototype.incrementHealth = function(increment){
        if(typeof increment != 'number'){
            if(health+1>=maxHealth){
                health = maxHealh;
            }else{
                health++;
            }
        }else{
            if(health +increment >= maxHealth){
                health = maxHealth;
            }else{
                health = health + increment;
            }
        }
    };
    
    Enemy.prototype.hasPotion = function(){
        if(noOfPotions > 0){
            noOfPotions--;
            return true;
        }else{
            return false;
        }
    };
    
    var chanceModifier=5;
    
    Enemy.prototype.doAttack = function(){
        var randChance = Math.floor((Math.random()*chanceModifier)+1);
        if(randChance === 1){
            this.specialAttack(player);
            //console.log("enemy uses special attack " + randChance + " " + chanceModifier);
        }else{
            this.attack(player);
            //console.log("enemy uses normal attack " + randChance + " " + chanceModifier);
        }
    };
    
    Enemy.prototype.setDead = function(){
        dead = true;
    };
    
    var chanceIncreased = false;
    
    Enemy.prototype.enemyLoop = function(){
        //console.log("enemy looping");
        if(battle.canEnemyAct()){
            if(health < Math.floor(maxHealth/100*25))
            {
                if(this.hasPotion()){
                    health += maxHealth/100*5;
                    //console.log("healing");
                }else{
                    if(!chanceIncreased){
                        chanceModifier = Math.floor(chanceModifier/2);
                        chanceIncreased = true;
                    }
                    this.doAttack();
                    //console.log("not healing");
                }
            }else{
                //console.log("enemy attacking");
                this.doAttack();
            }
            battle.refreshHealthBars();
        }else{
            //console.log("enemy cannot act");
        }
    };
};