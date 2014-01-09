/*
 * This is the special class
 * 
 * It controls the parameters and effects of any specials created(itself)
 */
function Special(){
    var name;
    var dmg = 5;
    var potency = 1;
    
    /*
     * Method to apply the effect of the special, based on its name, to a target
     */
    Special.prototype.effect = function(target){
        //check if the target is an enemy
        if(target instanceof Enemy){
            //switch to check which special to do
            //these are in a simple form, 
            //they basically set a potency and multiply the player's power by it 
            //and decrement the target's health by that
            switch(this.name.toLowerCase()){
                case "triple attack":
                    potency = 3;
                    console.log("TRIPLE ATTACK!");
                    target.decrementHealth(player.getPow()*potency);
                    break;
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
    
    /*
     * Method to set the name
     */
    Special.prototype.setName = function(newName){
        this.name = newName;
    };
    
    /*
     * Method to get the name
     * 
     * @return name
     */
    Special.prototype.getName = function(){
        return this.name;
    };
    
    /*
     * Method to set the damage (not used)
     */
    Special.prototype.setDmg = function(newDmg){
        this.dmg = newDmg;
    };
    
    /*
     * Method to get the damage (not used)
     * 
     * @return dmg
     */
    Special.prototype.getDmg = function(){
        return this.dmg;
    };
}