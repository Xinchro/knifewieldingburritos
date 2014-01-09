/*
 * This is the charactersheet class
 * 
 * It sets up and controls the character sheet
 * This is to show the player their stats, such as level, power and unlocked skills
 */
function CharacterSheet(){
    
    var borderCol = "rgba(255,0,0,1)";
    var borderTh = 2;
    var vertSep = 5;
    var horiSep = 5;
    var visible = false;
    
    //the following metric ton of code simply starts all of the elements of the character sheet
    //this includes things like the outlines, the positions and the padding
    var sheetCanvas = new createjs.Shape();
    sheetCanvas.graphics.beginFill("rgba(255,255,255,1)").drawRoundRect(scrW*1/10,scrH*1/10,scrW*8/10,scrH*8/10,0);
    sheetCanvas.setBounds(scrW*1/10,scrH*1/10,scrW*8/10,scrH*8/10,0);
    sheetCanvas.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(scrW*1/10,scrH*1/10,scrW*8/10,scrH*8/10,0);
    var charSquare = new createjs.Shape();
    charSquare.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(scrW*1/10+horiSep,scrH*1/10+vertSep,100,100,0);
    charSquare.setBounds(scrW*1/10+horiSep,scrH*1/10+vertSep,100,100);
    var levelBlock = new createjs.Shape();
    levelBlock.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            charSquare.getBounds().x + charSquare.getBounds().width + horiSep, 
            charSquare.getBounds().y + vertSep*0,
            sheetCanvas.getBounds().width-(3*horiSep)-charSquare.getBounds().width,
            (charSquare.getBounds().height-2*vertSep)/3,
            0);
    levelBlock.setBounds(
            charSquare.getBounds().x + charSquare.getBounds().width + horiSep, 
            charSquare.getBounds().y + vertSep*0,
            sheetCanvas.getBounds().width-(3*horiSep)-charSquare.getBounds().width,
            (charSquare.getBounds().height-2*vertSep)/3,
            0);
    var expBlock = new createjs.Shape();
    expBlock.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            levelBlock.getBounds().x, 
            levelBlock.getBounds().y + levelBlock.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width-(3*horiSep)-charSquare.getBounds().width,
            (charSquare.getBounds().height-2*vertSep)/3,
            0);
    expBlock.setBounds(
            levelBlock.getBounds().x, 
            levelBlock.getBounds().y + levelBlock.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width-(3*horiSep)-charSquare.getBounds().width,
            (charSquare.getBounds().height-2*vertSep)/3,
            0);
    var nextLevelBlock = new createjs.Shape();
    nextLevelBlock.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            expBlock.getBounds().x, 
            expBlock.getBounds().y + expBlock.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width-(3*horiSep)-charSquare.getBounds().width,
            (charSquare.getBounds().height-2*vertSep)/3,
            0);
    nextLevelBlock.setBounds(
            expBlock.getBounds().x, 
            expBlock.getBounds().y + expBlock.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width-(3*horiSep)-charSquare.getBounds().width,
            (charSquare.getBounds().height-2*vertSep)/3,
            0);
    var powBlock = new createjs.Shape();
    powBlock.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            charSquare.getBounds().x, 
            charSquare.getBounds().y + charSquare.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width/2-(1.5*horiSep),
            (charSquare.getBounds().height-2*vertSep)/3,
            0);
    powBlock.setBounds(
            charSquare.getBounds().x, 
            charSquare.getBounds().y + charSquare.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width/2-(1.5*horiSep),
            (charSquare.getBounds().height-2*vertSep)/3,
            0);
    var dexBlock = new createjs.Shape();
    dexBlock.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            powBlock.getBounds().x, 
            powBlock.getBounds().y + powBlock.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width/2-(1.5*horiSep),
            powBlock.getBounds().height,
            0);
    dexBlock.setBounds(
            powBlock.getBounds().x, 
            powBlock.getBounds().y + powBlock.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width/2-(1.5*horiSep),
            powBlock.getBounds().height,
            0);
    var wisBlock = new createjs.Shape();
    wisBlock.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            dexBlock.getBounds().x, 
            dexBlock.getBounds().y + dexBlock.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width/2-(1.5*horiSep),
            dexBlock.getBounds().height,
            0);
    wisBlock.setBounds(
            dexBlock.getBounds().x, 
            dexBlock.getBounds().y + dexBlock.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width/2-(1.5*horiSep),
            dexBlock.getBounds().height,
            0);
    var healthBlock = new createjs.Shape();
    healthBlock.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            wisBlock.getBounds().x, 
            wisBlock.getBounds().y + wisBlock.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width/2-(1.5*horiSep),
            wisBlock.getBounds().height,
            0);
    healthBlock.setBounds(
            wisBlock.getBounds().x, 
            wisBlock.getBounds().y + wisBlock.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width/2-(1.5*horiSep),
            wisBlock.getBounds().height,
            0);
    var nextSkillBlock = new createjs.Shape();
    nextSkillBlock.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            charSquare.getBounds().x + sheetCanvas.getBounds().width/2-(0.5*horiSep), 
            charSquare.getBounds().y + charSquare.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width/2-(1.5*horiSep),
            wisBlock.getBounds().height,
            0);
    nextSkillBlock.setBounds(
            charSquare.getBounds().x + sheetCanvas.getBounds().width/2-(0.5*horiSep), 
            charSquare.getBounds().y + charSquare.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width/2-(1.5*horiSep),
            wisBlock.getBounds().height,
            0);
    var skillsBlock = new createjs.Shape();
    skillsBlock.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            nextSkillBlock.getBounds().x, 
            nextSkillBlock.getBounds().y + nextSkillBlock.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width/2-(1.5*horiSep),
            nextSkillBlock.getBounds().height,
            0);
    skillsBlock.setBounds(
            nextSkillBlock.getBounds().x, 
            nextSkillBlock.getBounds().y + nextSkillBlock.getBounds().height + vertSep*1,
            sheetCanvas.getBounds().width/2-(1.5*horiSep),
            nextSkillBlock.getBounds().height,
            0);
    var skill1Block = new createjs.Shape();
    skill1Block.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            skillsBlock.getBounds().x + skillsBlock.getBounds().width/10, 
            skillsBlock.getBounds().y + skillsBlock.getBounds().height + vertSep*1,
            skillsBlock.getBounds().width/10*9,
            skillsBlock.getBounds().height,
            0);
    skill1Block.setBounds(
            skillsBlock.getBounds().x + skillsBlock.getBounds().width/10, 
            skillsBlock.getBounds().y + skillsBlock.getBounds().height + vertSep*1,
            skillsBlock.getBounds().width/10*9,
            skillsBlock.getBounds().height,
            0);
    var skill2Block = new createjs.Shape();
    skill2Block.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            skill1Block.getBounds().x, 
            skill1Block.getBounds().y + skill1Block.getBounds().height + vertSep*1,
            skill1Block.getBounds().width,
            skill1Block.getBounds().height,
            0);
    skill2Block.setBounds(
            skill1Block.getBounds().x, 
            skill1Block.getBounds().y + skill1Block.getBounds().height + vertSep*1,
            skill1Block.getBounds().width,
            skill1Block.getBounds().height,
            0);
    var skill3Block = new createjs.Shape();
    skill3Block.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            skill2Block.getBounds().x, 
            skill2Block.getBounds().y + skill2Block.getBounds().height + vertSep*1,
            skill2Block.getBounds().width,
            skill2Block.getBounds().height,
            0);
    skill3Block.setBounds(
            skill2Block.getBounds().x, 
            skill2Block.getBounds().y + skill2Block.getBounds().height + vertSep*1,
            skill2Block.getBounds().width,
            skill2Block.getBounds().height,
            0);
    var skill4Block = new createjs.Shape();
    skill4Block.graphics.setStrokeStyle(borderTh, "round").beginStroke(borderCol).drawRoundRect(
            skill3Block.getBounds().x, 
            skill3Block.getBounds().y + skill3Block.getBounds().height + vertSep*1,
            skill3Block.getBounds().width,
            skill3Block.getBounds().height,
            0);
    skill4Block.setBounds(
            skill3Block.getBounds().x, 
            skill3Block.getBounds().y + skill3Block.getBounds().height + vertSep*1,
            skill3Block.getBounds().width,
            skill3Block.getBounds().height,
            0);
    
    //the following is to fill in the above with text
    //things like the player's health, experience and picture
    var charImage = new createjs.Bitmap("Assets/Models/Taco1.svg");
    charImage.setBounds(charImage.x, charImage.y, charImage.x-gridScale, charImage.y-gridScale);
    charImage.setTransform(charSquare.getBounds().x,charSquare.getBounds().y, .4, .4);
    var levelText = new createjs.Text("", "20px Arial", "#000");
    levelText.text = "Level: " + player.getLevel();
    levelText.x = levelBlock.getBounds().x - levelText.getMeasuredWidth()/2 + levelBlock.getBounds().width/2;
    levelText.y = levelBlock.getBounds().y - levelText.getMeasuredHeight()/2 + levelBlock.getBounds().height/2;
    var expText = new createjs.Text("", "20px Arial", "#000");
    expText.text = "Experience: " + player.getExp();
    expText.x = expBlock.getBounds().x - expText.getMeasuredWidth()/2 + expBlock.getBounds().width/2;
    expText.y = expBlock.getBounds().y - expText.getMeasuredHeight()/2 + expBlock.getBounds().height/2;
    var nextLevelText = new createjs.Text("", "20px Arial", "#000");
    nextLevelText.text = "Experience to next level: " + player.getExpToNextLevel();
    nextLevelText.x = nextLevelBlock.getBounds().x - nextLevelText.getMeasuredWidth()/2 + nextLevelBlock.getBounds().width/2;
    nextLevelText.y = nextLevelBlock.getBounds().y - nextLevelText.getMeasuredHeight()/2 + nextLevelBlock.getBounds().height/2;
    var powText = new createjs.Text("", "20px Arial", "#000");
    powText.text = "Power: " + player.getPow();
    powText.x = powBlock.getBounds().x - powText.getMeasuredWidth()/2 + powBlock.getBounds().width/2;
    powText.y = powBlock.getBounds().y - powText.getMeasuredHeight()/2 + powBlock.getBounds().height/2;
    var dexText = new createjs.Text("", "20px Arial", "#000");
    dexText.text = "Dexterity: " + player.getDex();
    dexText.x = dexBlock.getBounds().x - dexText.getMeasuredWidth()/2 + dexBlock.getBounds().width/2;
    dexText.y = dexBlock.getBounds().y - dexText.getMeasuredHeight()/2 + dexBlock.getBounds().height/2;
    var wisText = new createjs.Text("", "20px Arial", "#000");
    wisText.text = "Wisdom: " + player.getWis();
    wisText.x = wisBlock.getBounds().x - wisText.getMeasuredWidth()/2 + wisBlock.getBounds().width/2;
    wisText.y = wisBlock.getBounds().y - wisText.getMeasuredHeight()/2 + wisBlock.getBounds().height/2;
    var healthText = new createjs.Text("", "20px Arial", "#000");
    healthText.text = "Health: " + player.getHealth();
    healthText.x = healthBlock.getBounds().x - healthText.getMeasuredWidth()/2 + healthBlock.getBounds().width/2;
    healthText.y = healthBlock.getBounds().y - healthText.getMeasuredHeight()/2 + healthBlock.getBounds().height/2;
    var nextSkillText = new createjs.Text("", "20px Arial", "#000");
    nextSkillText.text = "Next skill: " + player.getNextSpecialName();
    nextSkillText.x = nextSkillBlock.getBounds().x - nextSkillText.getMeasuredWidth()/2 + nextSkillBlock.getBounds().width/2;
    nextSkillText.y = nextSkillBlock.getBounds().y - nextSkillText.getMeasuredHeight()/2 + nextSkillBlock.getBounds().height/2;
    var skillsText = new createjs.Text("", "20px Arial", "#000");
    skillsText.text = "Skills:" + player.getSpecials().length;
    skillsText.x = skillsBlock.getBounds().x - skillsText.getMeasuredWidth()/2 + skillsBlock.getBounds().width/2;
    skillsText.y = skillsBlock.getBounds().y - skillsText.getMeasuredHeight()/2 + skillsBlock.getBounds().height/2;
    var skill1Text = new createjs.Text("", "20px Arial", "#000");
    skill1Text.text = "Nothing";
    skill1Text.x = skill1Block.getBounds().x - skill1Text.getMeasuredWidth()/2 + skill1Block.getBounds().width/2;
    skill1Text.y = skill1Block.getBounds().y - skill1Text.getMeasuredHeight()/2 + skill1Block.getBounds().height/2;
    var skill2Text = new createjs.Text("", "20px Arial", "#000");
    skill2Text.text = "Nothing";
    skill2Text.x = skill2Block.getBounds().x - skill2Text.getMeasuredWidth()/2 + skill2Block.getBounds().width/2;
    skill2Text.y = skill2Block.getBounds().y - skill2Text.getMeasuredHeight()/2 + skill2Block.getBounds().height/2;
    var skill3Text = new createjs.Text("", "20px Arial", "#000");
    skill3Text.text = "Nothing";
    skill3Text.x = skill3Block.getBounds().x - skill3Text.getMeasuredWidth()/2 + skill3Block.getBounds().width/2;
    skill3Text.y = skill3Block.getBounds().y - skill3Text.getMeasuredHeight()/2 + skill3Block.getBounds().height/2;
    var skill4Text = new createjs.Text("", "20px Arial", "#000");
    skill4Text.text = "Nothing";
    skill4Text.x = skill4Block.getBounds().x - skill4Text.getMeasuredWidth()/2 + skill4Block.getBounds().width/2;
    skill4Text.y = skill4Block.getBounds().y - skill4Text.getMeasuredHeight()/2 + skill4Block.getBounds().height/2;
    
    /*
     * Method to refresh the stats shown on the chracter sheet
     * Basically: gets the stats from the player and sets the text fields to the new values, also re-centers the text
     */
    function refreshSheet(){
        levelText.text = "Level: " + player.getLevel();
        levelText.x = levelBlock.getBounds().x - levelText.getMeasuredWidth()/2 + levelBlock.getBounds().width/2;
        levelText.y = levelBlock.getBounds().y - levelText.getMeasuredHeight()/2 + levelBlock.getBounds().height/2;
        
        expText.text = "Experience: " + player.getExp();
        expText.x = expBlock.getBounds().x - expText.getMeasuredWidth()/2 + expBlock.getBounds().width/2;
        expText.y = expBlock.getBounds().y - expText.getMeasuredHeight()/2 + expBlock.getBounds().height/2;
        
        nextLevelText.text = "Experience to next level: " + player.getExpToNextLevel();
        nextLevelText.x = nextLevelBlock.getBounds().x - nextLevelText.getMeasuredWidth()/2 + nextLevelBlock.getBounds().width/2;
        nextLevelText.y = nextLevelBlock.getBounds().y - nextLevelText.getMeasuredHeight()/2 + nextLevelBlock.getBounds().height/2;
        
        powText.text = "Power: " + player.getPow();
        powText.x = powBlock.getBounds().x - powText.getMeasuredWidth()/2 + powBlock.getBounds().width/2;
        powText.y = powBlock.getBounds().y - powText.getMeasuredHeight()/2 + powBlock.getBounds().height/2;
        
        dexText.text = "Dexterity: " + player.getDex();
        dexText.x = dexBlock.getBounds().x - dexText.getMeasuredWidth()/2 + dexBlock.getBounds().width/2;
        dexText.y = dexBlock.getBounds().y - dexText.getMeasuredHeight()/2 + dexBlock.getBounds().height/2;
        
        wisText.text = "Wisdom: " + player.getWis();
        wisText.x = wisBlock.getBounds().x - wisText.getMeasuredWidth()/2 + wisBlock.getBounds().width/2;
        wisText.y = wisBlock.getBounds().y - wisText.getMeasuredHeight()/2 + wisBlock.getBounds().height/2;
        
        healthText.text = "Health: " + player.getHealth();
        healthText.x = healthBlock.getBounds().x - healthText.getMeasuredWidth()/2 + healthBlock.getBounds().width/2;
        healthText.y = healthBlock.getBounds().y - healthText.getMeasuredHeight()/2 + healthBlock.getBounds().height/2;
        
        nextSkillText.text = "Next skill: " + player.getNextSpecialName();
        nextSkillText.x = nextSkillBlock.getBounds().x - nextSkillText.getMeasuredWidth()/2 + nextSkillBlock.getBounds().width/2;
        nextSkillText.y = nextSkillBlock.getBounds().y - nextSkillText.getMeasuredHeight()/2 + nextSkillBlock.getBounds().height/2;
        
        skillsText.text = "Skills:" + player.getSpecials().length;
        skillsText.x = skillsBlock.getBounds().x - skillsText.getMeasuredWidth()/2 + skillsBlock.getBounds().width/2;
        skillsText.y = skillsBlock.getBounds().y - skillsText.getMeasuredHeight()/2 + skillsBlock.getBounds().height/2;
        
        
        skill1Text.text = "Nothing";
        skill2Text.text = "Nothing";
        skill3Text.text = "Nothing";
        skill4Text.text = "Nothing";
        //this is special because it has to get the player's unlocked skills
        //and it would crash if I called on element 4 of an array with 2 things in it
        //hence the switch
        switch(player.getSpecials().length){
            case 4:
                skill4Text.text = player.getSpecials()[3].getName();
            case 3:
                skill3Text.text = player.getSpecials()[2].getName();
            case 2:
                skill2Text.text = player.getSpecials()[1].getName();
            case 1:
                skill1Text.text = player.getSpecials()[0].getName();
                break;
        }
        
        skill1Text.x = skill1Block.getBounds().x - skill1Text.getMeasuredWidth()/2 + skill1Block.getBounds().width/2;
        skill1Text.y = skill1Block.getBounds().y - skill1Text.getMeasuredHeight()/2 + skill1Block.getBounds().height/2;
        
        skill2Text.x = skill2Block.getBounds().x - skill2Text.getMeasuredWidth()/2 + skill2Block.getBounds().width/2;
        skill2Text.y = skill2Block.getBounds().y - skill2Text.getMeasuredHeight()/2 + skill2Block.getBounds().height/2;
        
        skill3Text.x = skill3Block.getBounds().x - skill3Text.getMeasuredWidth()/2 + skill3Block.getBounds().width/2;
        skill3Text.y = skill3Block.getBounds().y - skill3Text.getMeasuredHeight()/2 + skill3Block.getBounds().height/2;
        
        skill4Text.x = skill4Block.getBounds().x - skill4Text.getMeasuredWidth()/2 + skill4Block.getBounds().width/2;
        skill4Text.y = skill4Block.getBounds().y - skill4Text.getMeasuredHeight()/2 + skill4Block.getBounds().height/2;
    };
    
    /*
     * Method to display the character sheet, simply refreshes and adds everything to the stage
     */
    CharacterSheet.prototype.display = function(){
        //refresh everything
        refreshSheet();
        //add everything to the stage
        stage.addChild(sheetCanvas);
        stage.addChild(charSquare);
        stage.addChild(levelBlock);
        stage.addChild(expBlock);
        stage.addChild(nextLevelBlock);
        stage.addChild(powBlock);
        stage.addChild(dexBlock);
        stage.addChild(wisBlock);
        stage.addChild(healthBlock);
        stage.addChild(nextSkillBlock);
        stage.addChild(skillsBlock);
        stage.addChild(skill1Block);
        stage.addChild(skill2Block);
        stage.addChild(skill3Block);
        stage.addChild(skill4Block);
        stage.addChild(charImage);
    
        stage.addChild(levelText);
        stage.addChild(expText);
        stage.addChild(nextLevelText);
        stage.addChild(powText);
        stage.addChild(dexText);
        stage.addChild(wisText);
        stage.addChild(healthText);
        stage.addChild(nextSkillText);
        stage.addChild(skillsText);
        stage.addChild(skill1Text);
        stage.addChild(skill2Text);
        stage.addChild(skill3Text);
        stage.addChild(skill4Text);
        //set it as visible
        visible = true;
    };
  
    /*
     * Method to hide the character sheet
     */
    CharacterSheet.prototype.hide = function(){
        //removes everything from the stage
        stage.removeChild(sheetCanvas);
        stage.removeChild(charSquare);
        stage.removeChild(levelBlock);
        stage.removeChild(expBlock);
        stage.removeChild(nextLevelBlock);
        stage.removeChild(powBlock);
        stage.removeChild(dexBlock);
        stage.removeChild(wisBlock);
        stage.removeChild(healthBlock);
        stage.removeChild(nextSkillBlock);
        stage.removeChild(skillsBlock);
        stage.removeChild(skill1Block);
        stage.removeChild(skill2Block);
        stage.removeChild(skill3Block);
        stage.removeChild(skill4Block);
        stage.removeChild(charImage);
    
        stage.removeChild(levelText);
        stage.removeChild(expText);
        stage.removeChild(nextLevelText);
        stage.removeChild(powText);
        stage.removeChild(dexText);
        stage.removeChild(wisText);
        stage.removeChild(healthText);
        stage.removeChild(nextSkillText);
        stage.removeChild(skillsText);
        stage.removeChild(skill1Text);
        stage.removeChild(skill2Text);
        stage.removeChild(skill3Text);
        stage.removeChild(skill4Text);
        
        //console.log("char sheet char sheet hidden");
        //sets visible to false
        visible = false;
    };
    
    /*
     * Method to see if the character sheet is visible
     * 
     * @return visible
     */
    CharacterSheet.prototype.isVisible = function(){
        return visible;
    };
};