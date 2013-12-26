function Player(){
    
    var health = 500;
    var maxHealth = health;
    var name = "Not Burrito";
    var pwr = 5;
    var dex = 3;
    var will = 4;
    var items = [];
    var specials = [];
    var activeItem, activeSpecial;
    var dead;
    var model;
    
    Player.prototype.start = function(playerName){
        name = playerName;        
        var potion = new Item();
        potion.setName("Potion");
        this.addItem(potion);
        //this.activeItem = potion;
        var betPotion = new Item();
        betPotion.setName("Better Potion");
        this.addItem(betPotion);
        
        var dAtk = new Special();
        dAtk.setName("Double Attack");
        this.addSpecial(dAtk);
        this.activeSpecial = dAtk;
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
        //console.log(item);
        for(var i=0;i<items.length;i++){
            if(item.getName() === items[i].getName()){
                tempNo = i;
            }
        }
        console.log("item removed  at " + tempNo + " " + items[tempNo].getName());
        console.log(this.activeItem.getName());        
        items.splice(tempNo, 1);
        if(items.length === 0){
            console.log("changing text to items");
            this.activeItem = "";
            battle.writeItemText("Items");
        }else if(tempNo+1 >= items.length){
            this.activeItem = items[0];
            console.log("active item forced to items[0]");
            battle.writeItemText(this.activeItem.getName());
        }else if(tempNo+1 < items.length){
            this.activeItem = items[tempNo];
            console.log("active item set to items["+tempNo+"]");
            battle.writeItemText(this.activeItem.getName());
        }
    };
    
    Player.prototype.nextItem = function(){
        if(this.activeItem === ""){
            
        }else if(!this.activeItem){
            this.activeItem = items[0];
        }else{
            var currentIndex;
            console.log("next item");
            console.log(this.activeItem);
            for(var i=0;i<items.length;i++){
                console.log("active " + this.activeItem.getName() + " array " + items[i].getName());
                if(this.activeItem.getName() === items[i].getName()){
                    console.log("setting current index to  " + i);
                    currentIndex = i;
                }
            }
            currentIndex++;
            console.log("current index = " + currentIndex);
            console.log("items length = " + items.length);
            if(currentIndex >= items.length){
                currentIndex = 0;
                console.log("cycling next item to 0 " + currentIndex);
            }else{
                currentIndex;
                console.log("cycling next item to +1 " + currentIndex);
            }
            console.log("item to be " + items[currentIndex].getName());
            this.activeItem = items[currentIndex];
            console.log(this.activeItem);
            console.log("current index = " + currentIndex);
        }
    };
    
    Player.prototype.getItems = function(){
        return items;
    };
    
    Player.prototype.getActiveItem = function(){
        return this.activeItem;
    };
    
    Player.prototype.addSpecial = function(special){
        specials.push(special);
    };
    
    Player.prototype.removeSpecial = function(special){
        var tempNo;
        for(var i=0;i<specials.length;i++){
            if(special.getName() === specials[i].getName()){
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
            battle.setActionTime(0);
        //}else{
          //  alert(typeof target);
        //}
    };
    
    Player.prototype.useSpecial = function(target){
        if(specials.length > 0){
            //target.decrementHealth(pwr*2);
            console.log("using " + this.activeSpecial.getName());
            this.activeSpecial.effect(target);
            this.removeSpecial(this.activeSpecial);
            battle.setActionTime(0);
        }else{
            console.log("specials empty");
        }
    };
    
    Player.prototype.getPwr = function(){
        return pwr;
    };
    
    Player.prototype.getDex = function(){
        return dex;
    };
    
    Player.prototype.getWill = function(){
        return will;
    };
    
    Player.prototype.useActiveItem = function(){
        if(items.length > 0){
            console.log("using " + this.activeItem.getName());
            this.activeItem.effect(player);
            this.removeItem(this.activeItem);
            battle.setActionTime(0);
        }else{
            console.log("inventory empty");
        }
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