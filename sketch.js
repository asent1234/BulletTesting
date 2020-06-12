var gameState, bullet, bulletweight, bulletspeed, bulletdamage, wall, wallthickness, manualbutton, randombutton, bulletweightran, speedran, thicknessran, bullethitstate,manualsimb
let input, button,iw, is;
function setup() {
  createCanvas(800,400);
  //createSprite(400, 200, 50, 50);
  
  bulletweight = 0;
  bulletspeed = 0;
  bulletdamage = 0;
  bullethitstate = "..."
  wall = createSprite( 750, 200, 10, 200);
  bullet = createSprite(100,200,40,20)
  gameState = "choose";
  randombutton = createSprite(200, 300, 300, 50);
  manualbutton = createSprite(600, 300, 300, 50);
  manualsimb = createSprite(500, 200, 300, 50);
  wallthickness = 0;

  //input = createInput();
  //input.position(20, 65);
  iw = createInput();
  iw.position(50, 105);
  //is = createInput();
  //is.position(50, 105);
  button = createButton('submit');
  button.position(iw.x + iw.width, 65);
  button.mousePressed(chooser);
}

function draw() {
  background("black");
  createEdgeSprites();
  if(gameState === "choose"){
    wallthickness = 0
    //stroke("white"); 
    iw.position(550, 420);
    button.position(iw.x + iw.width, 430);
    wall.visible = false 
    bullet.visible = false
    manualbutton.visible = false
    randombutton.visible = false
    manualsimb.visible = false
    iw.hide();
    button.hide();
    fill("white");
    text("Welcome to the bullet crash simulator. Please choose wether you want"+ 
    " random values or manual values by clicking on the buttons below. \n Please Ignore, the bar and submit button as they are to be used within the Manual section only.", 50, 100);
    textSize(50);
    drawSprites();
    text("RANDOM",80,320);
    if(mousePressedOver(randombutton)){
      gameState = "randomvalues";
      bulletweight = random(400,1500)
      bulletspeed = random(55,90)
      wallthickness = random(22,83)
    }
    text("MANUAL",480,320);
    if(mousePressedOver(manualbutton)){
      gameState = "manualweight";

    }
    
  }  
  if(gameState === "manualweight"){
    background("black");
    iw.position(50, 105);
    button.position(iw.x + iw.width, 95);
    text("What is your desired bullet weight?",40, 87);
    button.show();
    iw.show();
    textSize(20);
    
    fill("white");
    text("Write in the input box to change the weight. It must be an integer. Our recommendation \n is any value between a range of 40 - 52.Enter your value in the bar, then click submit \n to change the weight.After, Press Space to start choice of Speed.", 10, 20);
    text(('Bullet Weight: ' + bulletweight), 70,150 );
    text(('Bullet Speed: ' + bulletspeed), 70,250 );
    text(('Wall Thickness: ' + wallthickness), 70,350 );
    // get the text entered
    //if(bulletweight > 0){ 
    if(keyDown("space")){
    gameState = "manualspeed";
    //}
  }
  }
  if(gameState === "manualspeed"){
    background("black");
    text("What is your speed?",45, 95)
    iw.position(50, 105);
    button.position(iw.x + iw.width, 105);
    textSize(20);
    fill("white");
    text("Write in the input box to change the speed. It must be an integer. Our recommendation \n is any value between a range of 223-321 Enter your value in the bar, then click submit to \n change the speed.After, Press Space + c to start choice of wall thickness", 10, 20);
    text(('Bullet Weight: ' + bulletweight), 70,150 );
    text(('Bullet Speed: ' + bulletspeed), 70,250 );
    text(('Wall Thickness: ' + wallthickness), 70,350 );
    if(keyDown("space") && keyDown("c")){
      gameState = "manualthickness";
    }
  }
  if(gameState === "manualthickness"){
    background("black");
    text("What is your wall thickness?",45, 95)
    iw.position(50, 105);
    button.position(iw.x + iw.width, 105);
    textSize(20);
    
    manualsimb.visible = true;
    fill("white");
    text("Write in the input box to change the thickness. It must be an integer. Our recommendation \n is any value between a range of 22-83 Enter your value in the bar, then click submit to \n change the speed.After, click the Continue button to start the simulation", 10, 20);
    
    text(('Bullet Weight: ' + bulletweight), 70,150 );
    text(('Bullet Speed: ' + bulletspeed), 70,250 );
    text(('Wall Thickness: ' + wallthickness), 70,350 );

    drawSprites();
    // get the text entered 
    textSize(50);
    text("CONTINUE",370,220);
    if(mousePressedOver(manualsimb)){
      gameState = "manualsim";
      if(bulletspeed <= 223){
        bullet.velocityX = 6;
      }
      
      if((bulletspeed > 223)&& (bulletspeed < 321)){
        bullet.velocityX = 8;
      }
      
     if(bulletspeed >= 321){
       bullet.velocityX = 10 ;
      }
      
      wall.visible = true;
      bullet.visible = true;
      manualsimb.visible = false;
      bulletdamage = ((0.5*(bulletweight*(bulletspeed*bulletspeed)/(wallthickness*wallthickness*wallthickness))));
    }
  }
  if(gameState === "manualsim"){
    background("black");
    iw.position(550, 420);
    button.position(iw.x + iw.width, 430);
    iw.hide();
    button.hide();
    drawSprites();
    textSize(20);
    
    if(bullet.overlap(wall)){
      console.log(bullet.velocityX)
      bullet.velocityX = 0 ;
      if(bulletdamage<=3.68){
        wall.shapeColor = "green";
        bullethitstate = "effective against the bullet";
      }
      if((bulletdamage< 10)&& (bulletdamage > 3.68)){
        wall.shapeColor = "yellow";
        bullethitstate = "averagely effective against the bullet";
      }
      
      if(bulletdamage>= 10){
       wall.shapeColor = "red";
       bullethitstate = "not effective against the bullet" ;
      }
    }
    bullet.collide(wall);

    textSize(13);
    text(('Bullet Weight: ' + Math.round(bulletweight)), 470,350 );
    text(('Bullet Speed: ' + Math.round(bulletspeed)), 270,350 );
    text(('Wall Thickness: ' + Math.round(wallthickness)), 70,350 );
    text(('Wall Damage: ' + Math.round(bulletdamage)), 670,350 );
    text("The wall is " + bullethitstate, 300, 200 );
    text("Press Space to Start a New Simulation", 30, 300);
    if(keyDown("space")){
      gameState = "choose"
      bullethitstate = "..."
      bullet.x = 100
      bullet.y = 200
      bullet.wall = "gray"
      bulletspeed = 0
      bulletweight = 0
    }
  }
  if(gameState === "randomvalues"){
    manualsimb.visible = true
    textSize(20);
    fill("white");
    text("Your random values for this simulation are:",80, 100)
    text(('Bullet Weight: ' + Math.round(bulletweight)), 70,150 );
    text(('Bullet Speed: ' + Math.round(bulletspeed)), 70,250 );
    text(('Wall Thickness: ' + Math.round(wallthickness)), 70,350 );
    //text("Press Space to Start Simulation", 80, 330)
    text("CONTINUE",370,220);
    drawSprites();
    // get the text entered 
    textSize(50);

    text("CONTINUE",370,220);
    if(mousePressedOver(manualsimb)){
      gameState = "manualsim";
      if(bulletspeed <= 223){
        bullet.velocityX = 6;
      }
      
      if((bulletspeed > 223)&& (bulletspeed < 321)){
        bullet.velocityX = 8;
      }
      
     if(bulletspeed >= 321){
       bullet.velocityX = 10 ;
      }
      
      wall.visible = true;
      bullet.visible = true;
      manualsimb.visible = false;
      bulletdamage = ((0.5*(bulletweight*(bulletspeed*bulletspeed)/(wallthickness*wallthickness*wallthickness))));
    }
  }
  if(gameState === "randomsim"){
    background("black");
    iw.position(550, 420);
    button.position(iw.x + iw.width, 430);
    iw.hide();
    button.hide();
    drawSprites();
    textSize(20);
    
    if(bullet.overlap(wall)){
      console.log(bullet.velocityX)
      bullet.velocityX = 0 ;
      if(bulletdamage<=3.68){
        wall.shapeColor = "green";
        bullethitstate = "effective against the bullet";
      }
      if((bulletdamage< 10)&& (bulletdamage > 3.68)){
        wall.shapeColor = "yellow";
        bullethitstate = "averagely effective against the bullet";
      }
      
      if(bulletdamage>= 10){
       wall.shapeColor = "red";
       bullethitstate = "not effective against the bullet" ;
      }
    }
    bullet.collide(wall);

    textSize(13);
    text(('Bullet Weight: ' + Math.round(bulletweight)), 470,350 );
    text(('Bullet Speed: ' + Math.round(bulletspeed)), 270,350 );
    text(('Wall Thickness: ' + Math.round(wallthickness)), 70,350 );
    text(('Wall Damage: ' + Math.round(bulletdamage)), 670,350 );
    text("The wall is " + bullethitstate, 300, 200 );
    text("Press Space to Start a New Simulation", 30, 300);
    if(keyDown("space")){
      gameState = "choose"
      bullethitstate = "..."
      bullet.x = 100
      bullet.y = 200
      bullet.wall = "gray"
      bulletspeed = 0
      bulletweight = 0
      wallthickness = 0
    }
  }
}
function chooser() {
  const weightinput = iw.value();
  if(gameState === "manualweight"){
  bulletweight = iw.value();
  }
  if(gameState === "manualspeed"){
    bulletspeed = iw.value();
  }
  if(gameState === "manualthickness"){
    wallthickness = iw.value();
  }
  //text(('hello ' + weightinput), 100,100 );
  iw.value('');
}
