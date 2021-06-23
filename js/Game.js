class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

    }
    car1 = createSprite(100,200);
    car1.addImage(car1Img);
    car2 = createSprite(300,200);
    car2.addImage(car2Img);
    car3 = createSprite(500,200);
    car3.addImage(car3Img);
    car4 = createSprite(700,200);
    car4.addImage(car4Img);

    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    //checking if all the players have logged in or not
    if(allPlayers !== undefined){
      //var display_position = 130;
      background("grey");
      image(trackImg,0,-displayHeight * 3.3,displayWidth,displayHeight * 4.5);
      //image(track1Img,0,-4000,displayWidth - 1000,displayHeight - 1000);
      var x = 250;
      var y;
      var cIndex = 0;
     
      for(var plr in allPlayers){
        /*if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      */
        x = x + 300;
        y = displayHeight - allPlayers[plr].distance + 100;
        cars[cIndex].x = x;
        cars[cIndex].y = y;

        cIndex++;
        
        if(cIndex === player.index){
          cars[cIndex-1].shapeColor = 'Yellow';
          camera.position.x = displayWidth/2;
          camera.position.y = cars[cIndex-1].y - 250; 
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
      console.log(player.distance);
    }

    if(player.distance > 4500){
      gameState = 2;
    }


    drawSprites();
  }
  end(){
    console.log("gameEnd")

  }
}
