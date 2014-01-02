function Special(){
    var name;
    var dmg = 5;
    var potency = 1;
    
    Special.prototype.effect = function(target){
        if(target instanceof Enemy){
            switch(this.name.toLowerCase()){
                case "triple attack":
                    potency = 3;
                    console.log("TRIPLE ATTACK!");
                case "double attack":
                    potency = 2;
                    console.log("DOUBLE ATTACK!");
                    target.decrementHealth(player.getPow()*potency);
                    break;
                case "lettuce slap":
                    potency = 3;
                    console.log("LETTUCE SLAP!");
                    target.decrementHealth(player.getPow()*potency);
                    break;
                case "mince meat special":
                    potency = 5;
                    console.log("MINCE MEAT SPECIAL!");
                    target.decrementHealth(player.getPow()*potency);
                    break;
            }
        }
    };
    
    Special.prototype.setName = function(newName){
        this.name = newName;
    };
    
    Special.prototype.getName = function(){
        return this.name;
    };
    
    Special.prototype.setDmg = function(newDmg){
        this.dmg = newDmg;
    };
    
    Special.prototype.getDmg = function(){
        return this.dmg;
    };
}