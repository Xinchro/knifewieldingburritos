//var money;
//var HP;
//var color;

function Player(){
    
    var health = 50;
    var maxHealth = 50;
    var name = "Not Burrito";
    var pwr = 5;
    var dex = 3;
    var will = 4;
    var items = [];
    var specials = [];
    var activeItem;
    var dead;
    var model;
    //console.log(health);
    
    Player.prototype.start = function(playerName){
        name = playerName;        
        potion = new Item();
        potion.setName("potion");
        this.addItem(potion);
        this.activeItem = potion;
//        this.model = new createjs.Bitmap("Assets/Models/Taco1.svg");
    };
    
    Player.prototype.getModel = function(){
        console.log("getting player model");
        model = new createjs.Bitmap("Assets/Models/Taco1.svg");
        return model;
    };
    
    Player.prototype.addItem = function(item){
        items.push(item);
    };
    
    Player.prototype.removeItem = function(item){
        var tempNo;
        for(var i=0;i<items.length;i++){
            if(item.getName() === items[i].getName()){
                tempNo = i;
            }
        }
        items.splice(tempNo, 1);
    };
    
    Player.prototype.getItems = function(){
        return items;
    };
    
    Player.prototype.addSpecial = function(special){
        specials.push(item);
    };
    
    Player.prototype.removeSpecial = function(special){
        var tempNo;
        for(var i=0;i<items.length;i++){
            if(item.getName() === items[i].getName()){
                tempNo = i;
            }
        }
        specials.splice(tempNo, 1);
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
                showEndScreen();
            }else{
                health = health - decrement;
            }
        }
    };
    
    Player.prototype.attack = function(target){
        //if(typeof target === Enemy){
            target.decrementHealth(pwr);
        //}else{
          //  alert(typeof target);
        //}
    };
    
    Player.prototype.useActiveItem = function(){
        this.activeItem.effect(player);
    };
    
    Player.prototype.incrementHealth = function(increment){
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
};
    //money = 1;
    //HP = 1;
    //color = "red";
//}

//function setMoney(i){
    //money = i;    
//}