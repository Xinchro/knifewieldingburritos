//var money;
//var HP;
//var color;

function Player(){
    
    var health = 50;
    var maxHealth = 50;
    var name = "Not Burrito";
    var pwr = 49;
    var dex = 3;
    var will = 4;
    //console.log(health);
    
    Player.prototype.start = function(playerName){
        name = playerName;
    };
    
    Player.prototype.setHealth = function(inHealth){
        health = inHealth;
    };
    
    Player.prototype.getHealth = function(){
        return health;
    };
    
    Player.prototype.setMaxHealth = function(inHealth){
        maxHealth = inHealth;
    };
    
    Player.prototype.getMaxHealth = function(){
        return maxHealth;
    };
    
    Player.prototype.setName = function(playerName){
        name = playerName;
    };
    
    Player.prototype.getName = function(){
        return name;
    };
    
    Player.prototype.decrementHealth = function(decrement){
        if(typeof decrement != 'number'){
            health--;
        }else{
            health = health - decrement;
        }
    };
    
    Player.prototype.attack = function(target){
        //if(typeof target === Enemy){
            target.decrementHealth(pwr);
        //}else{
          //  alert(typeof target);
        //}
    };
    
    Player.prototype.incrementHealth = function(increment){
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