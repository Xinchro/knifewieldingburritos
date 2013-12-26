function Item(){
    var name;
    var potency = 1;
    var type;
    
    Item.prototype.effect = function(target){
        target instanceof Player;   
        switch(this.name.toLowerCase()){
            case "ultra potion":
            potency = 3;
            case "better potion":
            potency = 2;
            case "potion":
                if(target instanceof Enemy){
                    enemy.incrementHealth(10*potency);
                    console.log(target.getHealth());
                }else if(target instanceof Player){
                    player.incrementHealth(10*potency);
                    console.log(target.getHealth());
                }else{
                    console.log(Object.prototype.toString.call(target));
                }
                potionsUsed++;
                break;
        }
    };
    
    Item.prototype.setName = function(name){
        this.name = name;
    };
    
    Item.prototype.getName = function(){
        return this.name;
    };
}
