/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//var money;
//var HP;
//var color;

function Player(){
    
    var health = 50;
    //console.log(health);
    
    Player.prototype.start = function(){
        
    };
    
    Player.prototype.setHealth = function(inHealth){
        health = inHealth;
    }
    
    Player.prototype.getHealth = function(){
        return health;
    }
    
    Player.prototype.decrementHealth = function(){
        health--;
    }
};
    //money = 1;
    //HP = 1;
    //color = "red";
//}

//function setMoney(i){
    //money = i;    
//}