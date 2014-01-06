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
    
    Player.prototype.start = function(playerName){
        name = playerName;        
//        var potion = new Item();
//        potion.setName("Potion");
//        this.addItem(potion);
//        //this.activeItem = potion;
//        var betPotion = new Item();
//        betPotion.setName("Better Potion");
//        this.addItem(betPotion);
//        var ulPotion = new Item();
//        ulPotion.setName("Ultra Potion");
//        this.addItem(ulPotion);
        fillAvailSpec();
        this.ranStats();
        //this.activeSpecial = dAtk;
    };
    
    var ticker = 5;
    Player.prototype.ranStats = function(){
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
        pow += Math.floor(tempNo);
        statPoints = statPoints - tempNo;
//        tempNo = Math.floor(Math.random()*statPoints);
//        dex += Math.floor(tempNo);
//        statPoints = statPoints - tempNo;
//        tempNo = Math.floor(Math.random()*statPoints);
//        wis += Math.floor(tempNo);
//        statPoints = statPoints - tempNo;
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
    
    Player.prototype.getModel = function(){
        //console.log("getting player model");
        model = new createjs.Bitmap("Assets/Models/Taco1.svg");
        return model;
    };
    
    Player.prototype.setExp = function(newExp){
        experience = newExp;
        checkLevelUp();
    };
        
    Player.prototype.getExp = function(){
        return experience;
    };
    
    Player.prototype.getExpToNextLevel = function(){
        var gap = levelCap - experience;
        return gap;
    };
    
    Player.prototype.giveExp = function(addExp){
        experience += addExp;
        checkLevelUp();
    };
    
    function checkLevelUp(){
        //console.log("Checking levelCap/exp: " + levelCap + " " + experience);
        while(experience >= levelCap){
            console.log("----LEVEL UP----");
            level += 1;
            levelUpStats();
            unlockNextSkill();
            experience -= levelCap;
            levelCap += Math.ceil(levelCap*0.5);
            enemyLevel += 1;
            player.printStats();
        }
    };
    
    function unlockNextSkill(){
//        console.log("Unlocking special");
        switch(level){
            case 2:
                var spec = new Special();
                spec.setName("Double Attack");
                player.addSpecial(spec);
                break;
            case 3:
                var spec = new Special();
                spec.setName("Triple Attack");
                player.addSpecial(spec);
                break;
            case 5:
                var spec = new Special();
                spec.setName("Lettuce Slap");
                player.addSpecial(spec);
                break;
            case 10:
                var spec = new Special();
                spec.setName("Mince Meat Special");
                player.addSpecial(spec);
                break;
        }
    };
    
    function levelUpStats(){
        maxHealth += Math.floor(maxHealth*0.1);
        health = maxHealth;
        pow += Math.floor(pow*0.2);
        dex += Math.floor(dex*0.2);
        wis += Math.floor(wis*0.2);
    };
    
    Player.prototype.getLevel = function(){
        return level;
    };
    
    Player.prototype.addItem = function(item){
        items.push(item);
    };
    
    Player.prototype.giveRandomItem = function(){
        console.log("giving random item");
        var rand = Math.floor(Math.random()*3);
        console.log("Rand: " + rand);
        var randItem;
        
        switch(rand){
            case 0:
                randItem = new Item();
                randItem.setName("Potion");
                
                console.log("Adding potion");
                break;
            case 1:
                randItem = new Item();
                randItem.setName("Better Potion");
                
                console.log("Adding better potion");
                break;
            case 2:
                randItem = new Item();
                randItem.setName("Ultra Potion");
                
                console.log("Adding ultra potion");
                break;
        }
        this.addItem(randItem);
        //items.push(randItem);
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
                if(this.activeItem.getID() === items[i].getID()){
                    currentIndex = i;
                }
            }
            currentIndex++;
            if(currentIndex >= items.length){
                currentIndex = 0;
            }else{
                currentIndex;
            }
            console.log("Current index: "  + currentIndex);
            this.activeItem = items[currentIndex];
        }
    };
    
    Player.prototype.prevItem = function(){
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
    
    function fillAvailSpec(){
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
    
    Player.prototype.getActiveSpecial = function(){
        return this.activeSpecial;
    };
    
    Player.prototype.getSpecials = function(){
        return stockSpecials;
    };
    
    Player.prototype.getNextSpecialName = function(){
        var nextSpecial = "";
        
        if(stockSpecials.length < availableSpecials.length){
            nextSpecial = availableSpecials[stockSpecials.length].getName();
        }else{
            nextSpecial = "Nothing to unlock";
        }
        
        return nextSpecial;
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
                //console.log("Adding special " + stockSpecials[i].getName());
            }else{
                //console.log("Special already available " + stockSpecials[i].getName());
            }
        }
        //console.log(specials.length);
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
            target.decrementHealth(pow);
            battle.setActionTime(0);
        //}else{
          //  alert(typeof target);
        //}
    };
    
    Player.prototype.useSpecial = function(target){
        if(specials.length > 0){
            //target.decrementHealth(pwr*2);
            //console.log("using " + this.activeSpecial.getName());
            this.activeSpecial.effect(target);
            this.removeSpecial(this.activeSpecial);
            battle.setActionTime(0);
        }else{
            console.log("specials empty");
        }
    };
    
    Player.prototype.getPow = function(){
        return pow;
    };
    
    Player.prototype.getDex = function(){
        return dex;
    };
    
    Player.prototype.getWis = function(){
        return wis;
    };
    
    Player.prototype.useActiveItem = function(){
        if(items.length > 0){
            //console.log("using " + this.activeItem.getName());
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