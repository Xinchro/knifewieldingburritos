/*
 * This is the item class
 * 
 * It controls the parameters and effects of any items created(itself)
 */
var itemID = 0;
function Item(){
    var name;
    var potency = 1;
    var type;
    var id;
    //set this item's id to the current global item tick
    this.id = itemID;
    //increment the global item tick
    itemID++;
    
    /*
     * Method to apply the effect of the item, based on its name, to a target
     */
    Item.prototype.effect = function(target){
        //force the target to be a player, for now
        target instanceof Player;   
        //switch to check the name and apply the effect based on that
        switch(this.name.toLowerCase()){
            case "ultra potion":
                //set the item potency to 3
                potency = 3;
                potion(target);
                break;
            case "better potion":
                //set the item potency to 2
                potency = 2;
                potion(target);
                break;
            case "potion":
                //set the item potency to 1 (just in case)
                potency = 1;
                potion(target);
                break;
        }
    };
    
    /*
     * Method to make the item behave like a potion
     */
    function potion(target){
        //if the target is an enemy, heal it
                if(target instanceof Enemy){
                    enemy.incrementHealth(10*potency);
                    console.log(target.getHealth());
                }else 
                //if the target is the player , heal them
                if(target instanceof Player){
                    player.incrementHealth(10*potency);
                    console.log(target.getHealth());
                }else{
                    //print what the target is to console if none of the above
                    console.log(Object.prototype.toString.call(target));
                }
                //increment the potions used "score"
                potionsUsed++;
    };
    
    /*
     * Method to set the name of the item
     */
    Item.prototype.setName = function(name){
        this.name = name;
    };
    
    /*
     * Method to get the name of the item
     * 
     * @return name
     */
    Item.prototype.getName = function(){
        return this.name;
    };
    
    /*
     * Method to get the ID of the item
     */
    Item.prototype.getID = function(){
        return this.id;
    };
}
