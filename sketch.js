
var mouse , mouse_running;
var cheese ,cheeseImage;
var  tom, tomimg1, tomimg2, tomimg3, tomimg4, tomimg5, tomimg6;

var cheeseGroup, tomGroup;
var score;
var survivalTime=0;
var gamestate="PLAY";
var restart, restartimg;
function preload()
{
  
  
  mouse_running = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","8.png","9.png","10.png","11.png","12.png");
  tomimg1=loadImage("tom1.png");
  tomimg2=loadImage("tom2.png");
  tomimg3=loadImage("tom3.png");
  tomimg4=loadImage("Tom4.png");
  tomimg5=loadImage("tom5.png");
  tomimg6=loadImage("tom6.png");
  cheeseImage=loadImage("cheese.png");
  restartimg=loadImage("restart.jpg");

}



function setup() 
{
   createCanvas(1200, 400);
  


  survivalTime=0;
  
  //creating mouse
   mouse=createSprite(80,315,20,20);
   mouse.addAnimation("moving", mouse_running);
//  mouse.debug=true;
  mouse.setCollider("circle",0,0,40);

  
  ground = createSprite(600,350,1200,10);
  ground.velocityX=-4;
  ground.visible=false;

 

  cheeseGroup = new Group();
  tomGroup = new Group();

  score = 0;

  restart=createSprite(600,300,10,10);
  restart.addImage("restart",restartimg);
  restart.scale=0.3;
  
 
  
}


function draw() 
{
  
  background(0);

  if(gamestate==="PLAY")
  {
    restart.visible=false;
      if(ground.x<0) 
      {
        ground.x=ground.width/2;
      }
      if(keyDown("space")  && mouse.y >=100) 
      {
        mouse.velocityY = -10;
      }
      
      mouse.velocityY = mouse.velocityY + 0.8;
    
      mouse.collide(ground);   

      spawnCheese();
      spawnTom();

      if(cheeseGroup.isTouching(mouse))
      {
           
        
            score=score+1;
            cheeseGroup.destroyEach();
        
      }

      if(tomGroup.isTouching(mouse))
      {
           
        
            gamestate="END";
        
      }


  }
    
  if(gamestate==="END")
  {
    ground.velocityX = 0;
    mouse.velocityY = 0;
    cheeseGroup.setVelocityXEach(0);
    tomGroup.setVelocityXEach(0);
    cheeseGroup.setLifetimeEach(-1);
    tomGroup.setLifetimeEach(-1);
    textSize(50);
    fill("red");
    text("GAME OVER!!", 500,200);        
    restart.visible=true;
    if(mousePressedOver(restart))
    {
      console.log("hi")
      reset();
    }
  
  }
 
 
 
 
  drawSprites();

 
 
 
 
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
 
  
  stroke("black");
  textSize(20);
  fill("white");
  survivalTime=Math.ceil(frameCount/frameRate())
  
  text("Survival Time: "+ survivalTime, 100,50);
}

function reset()
{
  gamestate="PLAY";
  score=0;
  survivalTime=0;

  tomGroup.destroyEach();
  cheeseGroup.destroyEach();
}

function spawnCheese() 
{
  //write code here to spawn the Food
  if (frameCount % 220 === 0) 
  {
    cheese = createSprite(1200,250,40,10);
    cheese.y = random(120,200);    
    cheese.velocityX = -(5+score/100);
    
     //assign lifetime to the variable
    cheese.lifetime = 300;
    mouse.depth = cheese.depth + 1;
    
    //add image of banana
     cheese.addImage(cheeseImage);
     cheese.scale=0.1;
    
    //add each banana to the group
    cheeseGroup.add(cheese);
  }
}

function spawnTom()
{
  if(frameCount % 300 === 0) 
  {
    tom = createSprite(1200,320,10,40);
    tom.scale=0.5;
    tom.velocityX = -(6+score/100);
    
    //add image to the obstacle 
    var rand=Math.round(random(1,6));
    switch(rand)
    {
      case 1:   tom.addImage(tomimg1);
                break;
      case 2:   tom.addImage(tomimg2);
                break;          
      case 3:   tom.addImage(tomimg3);
                break;
      case 4:   tom.addImage(tomimg4);
                break;     
      case 5:   tom.addImage(tomimg5);
                break;      
      case 6:   tom.addImage(tomimg6);
                break;             
      default: break;

    }
  
  
    
    //lifetime to the obstacle     
    tom.lifetime = 300;
    
    //add each obstacle to the group
    tomGroup.add(tom);
  }
}
