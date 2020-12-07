var score = 0
var obstacle;
var gameState = 2
var highscore = 0
function preload(){
  backgroundimg = loadImage("image/back.png")
  playerimg = loadImage("image/player.png")
  obstacleimg = loadImage("image/obstacle.png")
  coinimg = loadImage("image/coin.png")
  bulletimg = loadImage("image/bullet.png")
  restartimg = loadImage("image/restart.png")
  playimg = loadImage("image/play.png")

}

function setup(){
  createCanvas(1200,380)
  Background = createSprite(600,190,1200,400)
  Background.addImage(backgroundimg)
  player = createSprite(150,250,20,20)
  player.addImage(playerimg)
  
player.scale= 0.09
player.setCollider("rectangle",0,0,500,1000)
ground = createSprite(600,310,1200,20)
ground.visible = false
Background.scale= 2.25
obstaclegroup = new Group()
coingroup = new Group()
bulletgroup = new Group()
restart = createSprite(600,200,20,20)
restart.addImage(restartimg)
restart.scale = 0.1
play = createSprite(600,200,10,10)
play.addImage(playimg)
play.scale = 0.2

}

function draw(){
  
    background("black")
    if(gameState === 2){
      play.visible = true
      restart.visible = false
      
      if(mousePressedOver(play)){
        gameState=1
      }
    }
    if(gameState === 1){
    player.collide(obstaclegroup)
    restart.visible = false
    play.visible = false
player.velocityX = 0
    if(keyDown("space")){
      player.velocityY = -15
    }
    Background.velocityX = -4
    player.velocityY = player.velocityY + 0.8
    if(keyDown("left")){
      player.velocityX = -5
    }
    if(keyDown("right")){
      player.velocityX = 5
    }
    if(Background.x<0){
      Background.x = Background.width/2
    }
    for(var i = 0; i<coingroup.length; i++){
      if(player.isTouching(coingroup)){
        coingroup.get(i).destroy()
        score++
      }
    }
    console.log(player.y)
    spawnOb()
    coins()
    bullets()
    coingroup.setDepthEach(5) 
    obstaclegroup.setDepthEach(4) 
    if(player.isTouching(bulletgroup)||player.y>410||player.y<-100||player.x>1200||player.x<-15){
      gameState=0
  
    }
  
  }else if(gameState === 0){
    player.velocityY=0
    player.velocityX=0
    play.visible = false
    Background.velocityX=0
    coingroup.setVelocityXEach(0)
    obstaclegroup.setVelocityXEach(0)
    bulletgroup.setVelocityXEach(0)
    restart.visible = true
    restart.depth = 7
    bulletgroup.setDepthEach(1)
    obstaclegroup.setDepthEach(1)
    coingroup.setDepthEach(1)

if(mousePressedOver(restart)){
  gameState=1
  coingroup.destroyEach()
    obstaclegroup.destroyEach()
    bulletgroup.destroyEach()
    if(highscore<score){
      highscore=score
    }
    score = 0
    player.x = 150
    player.y = 250

}
  }
  drawSprites()
  textFont("Anton")
  fill("green")
  textSize(30)
  text("Score: "+score,1000,40)
  text("High Score: "+highscore,100,40)

}

function spawnOb()
{
  if(frameCount%60 === 0){
    obstacle = createSprite(1300,random(20,360),20,20)
    obstacle.velocityX = -3
    obstacle.addImage(obstacleimg)
    obstacle.scale = 0.5
    obstaclegroup.add(obstacle)
    
  }
}
function coins(){
  if(frameCount%100===0){
    coin = createSprite(1300,random(20,360),20,20)
    coin.velocityX = -2
    coin.addImage(coinimg)
    coin.scale = 0.1
    coingroup.add(coin)
    
  }
}
function bullets(){
  if(frameCount%70===0){
    bullet = createSprite(1300,random(20,360),20,20)
    bullet.velocityX = -5
    bullet.addImage(bulletimg)
    bullet.scale = 0.07
    bullet.setCollider("rectangle",0,0,1400,900)
    bulletgroup.add(bullet)
    
  }
}