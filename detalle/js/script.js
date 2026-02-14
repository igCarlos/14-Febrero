const heartsContainer = document.createElement('div');
heartsContainer.classList.add('hearts-background');
heartsContainer.style.position = 'fixed';
heartsContainer.style.top = '0';
heartsContainer.style.left = '0';
heartsContainer.style.width = '100%';
heartsContainer.style.height = '100%';
heartsContainer.style.pointerEvents = 'none';
heartsContainer.style.zIndex = '-1';
document.body.appendChild(heartsContainer);

const numHearts = 100;

for (let i = 0; i < numHearts; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '❤';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.animationDelay = Math.random() * 15 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.opacity = Math.random() * 0.7 + 0.1;
    heart.style.color = getRandomHeartColor();
    heartsContainer.appendChild(heart);
}

function getRandomHeartColor() {
    const colors = [
        '#ff6b8b', '#ff8fab', '#ffb6c1', '#ff69b4', '#ff1493',
        '#ff66cc', '#ff99dd', '#ff77aa', '#ff3388', '#ff5599'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

const daysElement = document.getElementById('daysCount');
const horasElement = document.getElementById('horasCount');
const minutosElement = document.getElementById('minutosCount');
const segundosElement = document.getElementById('segundosCount');

let targetDays = 0;
let targetHoras = 0;
let targetMinutos = 0;
let targetSegundos = 0;

let currentDays = 0;
let currentHoras = 0;
let currentMinutos = 0;
let currentSegundos = 0;

const duration = 3000;

setInterval(()=>{
    const fechaInicio = "2026-01-07:20:00:00";
    const fechaInicial = new Date(fechaInicio)
    const fechaActual = new Date();

    const diferenciaMs = fechaActual - fechaInicial;

    let calcularDias = Math.floor(diferenciaMs/(1000*60*60*24));
    let calcularHora = Math.floor(diferenciaMs/(1000*60*60));
    let calcularMinuto = Math.floor(diferenciaMs/(1000*60));
    let calcularSegundo = Math.floor(diferenciaMs/(1000));

    targetDays = calcularDias;
    targetHoras = calcularHora;
    targetMinutos = calcularMinuto;
    targetSegundos = calcularSegundo;
    
    
},1000);


function animateCounter() {
    const startTime = performance.now();
    function updateCounter(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        currentDays = Math.floor(progress * targetDays);
        daysElement.textContent = currentDays;
        daysElement.style.animation = 'none';
        void daysElement.offsetWidth;
        daysElement.style.animation = 'countUp 0.5s forwards';

        currentHoras = Math.floor(progress * targetHoras);
        horasElement.textContent = currentHoras;
        horasElement.style.animation = 'none';
        void horasElement.offsetWidth;
        horasElement.style.animation = 'countUp 0.5s forwards';

        currentMinutos = Math.floor(progress * targetMinutos);
        minutosElement.textContent = currentMinutos;
        minutosElement.style.animation = 'none';
        void minutosElement.offsetWidth;
        minutosElement.style.animation = 'countUp 0.5s forwards';

        currentSegundos = Math.floor(progress * targetSegundos);
        segundosElement.textContent = currentSegundos;
        segundosElement.style.animation = 'none';
        void segundosElement.offsetWidth;
        segundosElement.style.animation = 'countUp 0.5s forwards';

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
                daysElement.textContent = targetDays;
                daysElement.style.animation = 'none';

                horasElement.textContent = targetHoras;
                horasElement.style.animation = 'none';

                minutosElement.textContent = targetMinutos;
                minutosElement.style.animation = 'none';

                segundosElement.textContent = targetSegundos;
                segundosElement.style.animation = 'none';
                void segundosElement.offsetWidth;
                segundosElement.style.animation = 'countUp 0.5s forwards';
        }
    }
    requestAnimationFrame(updateCounter);
}

setTimeout(animateCounter, 1000);
setInterval(()=>{
    daysElement.textContent = targetDays;
    daysElement.style.animation = 'none';

    horasElement.textContent = targetHoras;
    horasElement.style.animation = 'none';

    minutosElement.textContent = targetMinutos;
    minutosElement.style.animation = 'none';

    segundosElement.textContent = targetSegundos;
    segundosElement.style.animation = 'none';
},1000)

const surpriseBtn = document.getElementById('surpriseBtn');
const closeBtn = document.getElementById('closeBtn');
const modal = document.getElementById('revealMessage');

surpriseBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    createHeartsExplosion();
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

function createHeartsExplosion() {
    const modalContent = document.querySelector('.reveal-content');
    const numExplosionHearts = 50;
    for (let i = 0; i < numExplosionHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = '❤';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 25 + 15 + 'px';
        heart.style.color = getRandomHeartColor();
        heart.style.opacity = '0.9';
        heart.style.zIndex = '1001';
        heart.style.animation = `float 4s linear ${Math.random() * 1}s forwards`;
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        heart.style.left = xPos + '%';
        heart.style.top = yPos + '%';
        modalContent.appendChild(heart);
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 4000);
    }
}