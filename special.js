function Special(){
    var name;
    var dmg = 5;
    
    Special.prototype.effect = function(target){
        if(target instanceof Enemy){
            switch(this.name.toLowerCase()){
                case "double attack":
                    console.log("DOUBLE ATTACK! " + player.getPwr());
                    target.decrementHealth(player.getPwr()*2);
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