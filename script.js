const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let score = 0;
let scoreHtml = document.getElementById('score');
timePassed = 1000;

function handleKeyUp(event){
    if (event.keyCode === 38){
        if (!isJumping){
            jump();
        }
      
    }
}

function jump(){
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 180){
            clearInterval(upInterval);
            let downInterval = setInterval (() => {
                if (position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 28);
            
        }else{
            position += 20;
            dino.style.bottom = position + 'px';
    }
    }, 20)
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1400;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = 1400 + 'px';

    let leftInterval = setInterval(() => {
        if (cactusPosition < 0){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if (cactusPosition > 0 && cactusPosition == 300 && position == 0){
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="gameover"> Fim de jogo.</h1>'
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

    setTimeout(createCactus, randomTime);
}

let scoreUp = setInterval (() => {
    score++;
    scoreHtml.innerHTML = score;
    if (timePassed >= 0){
        timePassed--;
    }
}, timePassed)


createCactus();
document.addEventListener('keydown', handleKeyUp);