var buttonWidth = 200;
var buttonHeight = 50;
var buttonX, buttonY;
var startButton, instructions;
var backgroundInicial, backgroundJogo;
var gameStarted = false, backgroundDrawn = false;
var lineBottomY, lineMoveSpeed = 5;
var upArrowPressed = false, downArrowPressed = false, spaceKeyPressed = false;
var peixes = [];

function preload() {
  backgroundInicial = loadImage("./assets/Tela de inicio.png");
  backgroundJogo = loadImage("./assets/Tela de fundo.jpeg");
  Atum = loadImage("./assets/Atum.png");
  Baiacu = loadImage("./assets/Baiacu.png");
  Baleia = loadImage("./assets/Baleia.png");
  Camarão = loadImage("./assets/Camarão.png");
  Golfinho = loadImage("./assets/Golfinho.png");
  Lula = loadImage("./assets/Lula.png");
  Peixe_Palhaço_de_Clark = loadImage("./assets/Peixe Palhaço de Clark.png");
  Peixe_Palhaço = loadImage("./assets/Peixe Palhaço.png");
  Polvo = loadImage("./assets/Polvo.png");
  Sardinha = loadImage("./assets/Sardinha.png");
  Tilapia = loadImage("./assets/Tilapia.png");
  Tubarão = loadImage("./assets/Tubarão.png");
}

function setup() {
  createCanvas(500, 800);

  buttonX = width / 2 - buttonWidth / 2;
  buttonY = height / 2 + 50;

  startButton = createButton("Começar");
  startButton.position(buttonX, buttonY);
  startButton.size(buttonWidth, buttonHeight);
  startButton.mousePressed(startGame);

  textAlign(CENTER);
  textSize(50);
}

function draw() {
  if (gameStarted) {
    if (!backgroundDrawn) {
      background(backgroundJogo);
      backgroundDrawn = true;
    }

    background(backgroundJogo);

    strokeWeight(5);
    stroke(255);

    line(width / 2, 0, width / 2, lineBottomY);

    if (upArrowPressed && !downArrowPressed) {
      if (lineBottomY - lineMoveSpeed >= 0) {
        lineBottomY -= lineMoveSpeed;
      }
    } else if (downArrowPressed && !upArrowPressed) {
      if (lineBottomY + lineMoveSpeed <= height) {
        lineBottomY += lineMoveSpeed;
      }
    }

    for (var i = 0; i < peixes.length; i++) {
      var peixe = peixes[i];
      peixe.move();
      peixe.display();

      if (spaceKeyPressed && peixe.checkCollision(lineBottomY)) {
        peixe.catch();
      }
    }

  } else {
    background(backgroundInicial);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    upArrowPressed = true;
  } else if (keyCode === DOWN_ARROW) {
    downArrowPressed = true;
  } else if (keyCode === 32) {
    spaceKeyPressed = true;
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    upArrowPressed = false;
  } else if (keyCode === DOWN_ARROW) {
    downArrowPressed = false;
  } else if (keyCode === 32) {
    spaceKeyPressed = false;
  }
}

function startGame() {
  gameStarted = true;
  startButton.remove();
  lineBottomY = height;

  peixes.push(new Peixe(Atum, -Atum.width * 0.1, random(height), "direita"));
  peixes.push(new Peixe(Baleia, -Baleia.width * 0.1, random(height), "direita"));
  peixes.push(new Peixe(Polvo, -Polvo.width * 0.1, random(height), "direita"));
  peixes.push(new Peixe(Tubarão, -Tubarão.width * 0.1, random(height), "direita"));
  peixes.push(new Peixe(Camarão, width, random(height), "esquerda"));
  peixes.push(new Peixe(Peixe_Palhaço_de_Clark, width, random(height), "esquerda"));
  peixes.push(new Peixe(Peixe_Palhaço, width, random(height), "esquerda"));
  peixes.push(new Peixe(Tilapia, width, random(height), "esquerda"));
  peixes.push(new Peixe(Sardinha, width, random(height), "esquerda"));
}

function Peixe(imagem, x, y, direcao) {
  this.imagem = imagem;
  this.x = x;
  this.y = y;
  this.velocidadeX = random(1, 3); 
  this.escala = 0.1; 
  this.direcao = direcao; 
  this.caught = false; 

  this.move = function() {
    if (!this.caught) {
      if (this.direcao === "esquerda") {
        this.x -= this.velocidadeX;
    
        if (this.x < -this.imagem.width * this.escala) {
          this.x = width;
          this.y = random(height);
        }
      } else if (this.direcao === "direita") {
        this.x += this.velocidadeX;
        
        if (this.x > width) {
          this.x = -this.imagem.width * this.escala;
          this.y = random(height);
        }
      }
    }
  };

  this.display = function() {
    push(); 
    translate(this.x, this.y); 
    scale(this.escala); 
    image(this.imagem, 0, 0); 
    pop(); 
  };
  
  this.checkCollision = function(lineY) {
    var lineTopY = lineY - 10;
    var lineBottomY = lineY + 10;
    
    if (this.y > lineTopY && this.y < lineBottomY) {
      return true;
    }
    
    return false;
  };
  
  this.catch = function() {
    this.caught = true;
    this.x = -this.imagem.width * this.escala;
    this.y = random(height);
  };
}
