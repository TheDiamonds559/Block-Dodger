const play = document.getElementById('canvas');
const ctx = play.getContext('2d');

let object = {
    x: 200,
    y: 40,
    width: 40,
    height: 40,
    color: '#ff00ff',
    speed: 10,
}

const player = {
    x: 160,
    y: 360,
    width: 40,
    height: 40,
    color: '#f00',
    score: 0,
    high: 0,
    speed: 10,
}

let playerScore = () => {
    document.getElementById('score').textContent = 'Score: ' + player.score;
    if(player.score > player.high){
        player.high = player.score;
        document.getElementById('hScore').textContent = 'High Score: ' + player.high;
    };
    if(player.score >= 50 && player.score < 100){
        object.speed = 20;
        player.speed = 8
    } else if(player.score >= 100 && player.score < 200){
        object.speed = 40;
        player.speed = 4
    } else if(player.score >= 200){
        object.speed = ((40 / 200) * 100) * 4;
        player.speed = (4 / 200) * 100;
    } else {
        object.speed = 10;
        player.speed = 10;
    }
}

let objReset = () => {
    object.y = 40;
    object.x = Math.random() * 401;
    if(object.x > 360){
        objReset();
    }
}

let playerReset = () => {
    player.x = Math.random() * 361;
    if(player.x > 360){
        playerReset();
    }
    player.score = 0;
    playerScore();
    objReset();
}

let draw = (w, h, xPos, yPos, colour = '#000') => {
    ctx.fillStyle = colour;
    ctx.fillRect(xPos, yPos, w, h);
}

let drawObject = () =>{
    draw(object.width, object.height, object.x, object.y, object.color);
}

let drawPlayer = () => {
    draw(player.width, player.height, player.x, player.y, player.color);
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

let update = (time = 0) => {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if(dropCounter > dropInterval){
        drop();
    }

    if(player.y == object.y && player.x > object.x && player.x < object.x + object.width){
        alert('Game over!');
        playerReset();
    }
    draw(play.width, play.height, 0, 0);
    drawPlayer();
    drawObject();
    requestAnimationFrame(update);
}

let drop = () => {
    object.y += object.speed;
    if(player.y == object.y && player.x + player.width > object.x && player.x < object.x + object.width){
        alert('Game over!');
        playerReset();
    } else if(object.y > 400){
        player.score += player.speed * 2;
        playerScore();
        objReset();
    }
    dropCounter = 0;
}

let move = (dir) => {
    player.x += dir;
    if(player.x > 360){
        player.x -= dir;
    } else if(player.x < 0){
        player.x -= dir;
    }
    if(player.y == object.y && player.x + player.width > object.x && player.x < object.x + object.width){
        alert('Game over!');
        playerReset();
    }
}

document.addEventListener('keydown', event => {
    if(event.keyCode === 68){
        move(player.speed);
    }
    else if(event.keyCode === 65){
        move(-player.speed);
    }
})

update()