//var money;
//var HP;
//var color;

function Enemy(){
    
    var health = 50;
    var maxHealth = 50;
    var name = "Not Taco";
    var dead;
    //console.log(health);
    
    Enemy.prototype.start = function(playerName){
        name = playerName;
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
    
    Enemy.prototype.setName = function(playerName){
        name = playerName;
    };
    
    Enemy.prototype.getName = function(){
        return name;
    };
    
    Enemy.prototype.isDead = function(){
        return dead;
    }
    
    Enemy.prototype.decrementHealth = function(decrement){
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
            }else{
                health = health - decrement;
            }
        }
    };
    
    Enemy.prototype.incrementHealth = function(increment){
        if(typeof increment != 'number'){
            health++;
        }else{
            health = health + increment;
        }
    };
};
    //money = 1;
    //HP = 1;
    //color = "red";
//}

//function setMoney(i){
    //money = i;    
//}