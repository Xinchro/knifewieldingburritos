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
    var stockSpecials = [];
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
        var ulPotion = new Item();
        ulPotion.setName("Ultra Potion");
        this.addItem(ulPotion);
        
        var dAtk = new Special();
        dAtk.setName("Double Attack");
        this.addSpecial(dAtk);
        var tAtk = new Special();
        tAtk.setName("Triple Attack");
        this.addSpecial(tAtk);
        //this.activeSpecial = dAtk;
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
        if(items.length === 0){
            this.activeItem = "";
            battle.writeItemText("Items");
        }else if(tempNo+1 >= items.length){
            this.activeItem = items[0];
            battle.writeItemText(this.activeItem.getName());
        }else if(tempNo+1 < items.length){
            this.activeItem = items[tempNo];
            battle.writeItemText(this.activeItem.getName());
        }
    };
    
    Player.prototype.nextItem = function(){
        if(!this.activeItem){
            this.activeItem = items[0];
        }else{
            var currentIndex;
            for(var i=0;i<items.length;i++){
                if(this.activeItem.getName() === items[i].getName()){
                    currentIndex = i;
                }
            }
            currentIndex++;
            if(currentIndex >= items.length){
                currentIndex = 0;
            }else{
                currentIndex;
            }
            this.activeItem = items[currentIndex];
        }
    };
    
    Player.prototype.prevItem = function(){
        if(!this.activeItem){
            this.activeItem = items[items.length-1];
        }else{
            var currentIndex;
            for(var i=0;i<items.length;i++){
                if(this.activeItem.getName() === items[i].getName()){
                    currentIndex = i;
                }
            }
            currentIndex--;
            if(currentIndex < 0){
                currentIndex = items.length-1;
            }else{
                currentIndex;
            }
            this.activeItem = items[currentIndex];
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
        stockSpecials.push(special);
    };
    
    Player.prototype.removeSpecial = function(special){
        var tempNo;
        for(var i=0;i<specials.length;i++){
            if(special.getName() === specials[i].getName()){
                tempNo = i;
            }
        }
        //console.log("special removed  at " + tempNo + " " + specials[tempNo].getName());
        //console.log(this.activeSpecial.getName());        
        specials.splice(tempNo, 1);
        if(specials.length === 0){
            //console.log("changing text to specials");
            this.activeSpecial = null;
            battle.writeSpecialText("Specials");
        }else if(tempNo+1 >= specials.length){
            this.activeSpecial = specials[0];
            //console.log("active special forced to items[0]");
            battle.writeSpecialText(this.activeSpecial.getName());
        }else if(tempNo+1 < specials.length){
            this.activeSpecial = specials[tempNo];
            //console.log("active special set to specials["+tempNo+"]");
            battle.writeSpecialText(this.activeSpecial.getName());
        }
    };
    
    Player.prototype.nextSpecial = function(){
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
    
    Player.prototype.prevSpecial = function(){
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
    
    Player.prototype.getActiveSpecial = function(){
        return this.activeSpecial;
    };
    
    Player.prototype.resetSpecials = function(){
        var okayToAdd = false;
        for(var i=0;i<stockSpecials.length;i++){
            for(var j=0;j<specials.length;j++){
                //console.log("Stock specials " + stockSpecials[i].getName() + " Specials " + specials[j].getName());
                if(stockSpecials[i].getName() === specials[j].getName()){
                    okayToAdd = false;
                    //console.log("Specials match, setting false");
                    break;
                }else{
                    okayToAdd = true;
                    //console.log("Specials do not match, setting true");
                }
            }
            if(okayToAdd || specials.length === 0){
                specials.push(stockSpecials[i]);
                console.log("Adding special " + stockSpecials[i].getName());
            }else{
                console.log("Special already available " + stockSpecials[i].getName());
            }
        }
        console.log(specials.length);
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