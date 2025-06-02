let nuvemX;
let nuvemY;
let gotasX = [];
let gotasY = [];
let focosX = [];
let focosY = [];
let focosAtivo = [];

function setup() {
  createCanvas(600, 400);
  nuvemX = width / 2;
  nuvemY = 100;

  // criar 5 focos de fogo em posições aleatórias
  for (let i = 0; i < 5; i++) {
    focosX[i] = random(50, width - 50);
    focosY[i] = random(height - 90, height - 50);
    focosAtivo[i] = true;
  }
}

function draw() {
  background(135, 206, 250); // céu azul

  // mostrar instruções no topo
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("Utilize as setas ⬅️➡️ para mover a nuvem e espaço para soltar gotas", width / 2, 20);

  // chão verde
  fill(30, 120, 30);
  rect(0, height - 50, width, 50);

  // desenhar nuvem
  fill(255);
  ellipse(nuvemX, nuvemY, 80, 60);
  ellipse(nuvemX - 30, nuvemY + 10, 60, 50);
  ellipse(nuvemX + 30, nuvemY + 10, 60, 50);

  // mover nuvem com setas esquerda e direita
  if (keyIsDown(LEFT_ARROW)) {
    nuvemX = nuvemX - 5;
    if (nuvemX < 40) {
      nuvemX = 40;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    nuvemX = nuvemX + 5;
    if (nuvemX > width - 40) {
      nuvemX = width - 40;
    }
  }

  // desenhar gotas e fazer elas caírem
  for (let i = gotasX.length - 1; i >= 0; i--) {
    fill(0, 0, 255);
    ellipse(gotasX[i], gotasY[i], 10, 10);
    gotasY[i] = gotasY[i] + 7;

    // checar colisão com fogo
    for (let j = 0; j < focosX.length; j++) {
      if (focosAtivo[j]) {
        let d = dist(gotasX[i], gotasY[i], focosX[j], focosY[j]);
        if (d < 20) {
          focosAtivo[j] = false; // apagar fogo
          gotasX.splice(i, 1);
          gotasY.splice(i, 1);
          break;
        }
      }
    }

    // tirar gota que saiu da tela
    if (gotasY[i] > height) {
      gotasX.splice(i, 1);
      gotasY.splice(i, 1);
    }
  }

  // desenhar focos de fogo
  for (let i = 0; i < focosX.length; i++) {
    if (focosAtivo[i]) {
      fill(255, 0, 0);
      ellipse(focosX[i], focosY[i], 20, 20);
    }
  }

  // verificar se ganhou
  let ganhou = true;
  for (let i = 0; i < focosAtivo.length; i++) {
    if (focosAtivo[i]) {
      ganhou = false;
    }
  }
  if (ganhou) {
    fill(0);
    textSize(32);
    textAlign(CENTER);
    text("Muito bem! Você salvou a floresta😉", width / 2, height / 2);
    noLoop();
  }
}

function keyPressed() {
  // soltar gota com espaço
  if (key === ' ') {
    gotasX.push(nuvemX);
    gotasY.push(nuvemY + 30);
  }
}
