$(document).ready(function () {
    // Al cargar la página, ocultamos las cortinas
    $('.left-curtain').css('width', '0%');
    $('.right-curtain').css('width', '0%');

    $('.valentines-day').click(function () {
        // Animación de desvanecimiento de los elementos del sobre
        $('.envelope').css({ 'animation': 'fall 3s linear 1', '-webkit-animation': 'fall 3s linear 1' });
        $('.envelope').fadeOut(800, function () {
            // Ocultar elementos dentro de .valentines-day
            $('.valentines-day .heart, .valentines-day .text, .valentines-day .front').hide();

            // Hacer visible la carta con una animación ondulante
            $('#card').css({ 'visibility': 'visible', 'opacity': 0, 'transform': 'scale(0.1)' });
            $('#card').animate({ 'opacity': 1 }, {
                duration: 1000, step: function (now, fx) {
                    var scale = 1 + Math.sin(now * Math.PI) * 0.1; // Calculamos la escala basada en la función seno
                    $(this).css('transform', 'scale(' + scale + ')');
                }
            }); // Animación de ondulación
        });
    });
}); 


document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = new Audio();
    audioPlayer.src = 'https://bcodestorague.anteroteobaldob.workers.dev/share/anteroteobaldob_gmail_com/AUDIO/those%20eyes%20.mp3';
    audioPlayer.loop = true;
    audioPlayer.volume = 0.3;
    let musicStarted = false;

    const startMusic = () => {
        if (!musicStarted) {
            audioPlayer.play().catch(e => console.log(e));
            musicStarted = true;
        }
    };

    // --- MODAL ---
    const modal = document.createElement('div');
    modal.id = 'musicModal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Activa la música</h2>
            <button id="startMusicBtn">Acceder / Continuar</button>
        </div>
    `;
    document.body.appendChild(modal);

    const style = document.createElement('style');
    style.innerHTML = `
        #musicModal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(8px);
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        #musicModal .modal-content {
            background: white;
            padding: 2rem;
            text-align: center;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        #musicModal button {
            margin-top: 1rem;
            padding: 0.6rem 1.2rem;
            font-size: 1rem;
            cursor: pointer;
            border: none;
            border-radius: 8px;
            background-color: #ff4081;
            color: white;
        }
    `;
    document.head.appendChild(style);

    document.getElementById('startMusicBtn').addEventListener('click', () => {
        startMusic();
        modal.remove();
    });
    // --- FIN MODAL ---

    // Opcional: mantener el inicio de música también por scroll o click
    window.addEventListener('scroll', () => startMusic());
    document.addEventListener('click', () => startMusic());

    // --- CORAZONES ---
    const createHeart = (x, y) => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.opacity = '0.9';
        heart.style.animation = `heart-fly ${Math.random() * 3 + 2}s linear forwards`;
        
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                @keyframes heart-fly {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
                    100% { transform: translate(-50%, -150%) scale(0.5); opacity: 0; }
                }
            </style>
        `);
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    };

    const createHeartExplosion = (x, y) => {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 100;
                const offsetY = (Math.random() - 0.5) * 100;
                createHeart(x + offsetX, y + offsetY);
            }, i * 50);
        }
    };

    document.addEventListener('click', (e) => createHeartExplosion(e.clientX, e.clientY));
    document.addEventListener('touchstart', (e) => {
        Array.from(e.touches).forEach(touch => createHeartExplosion(touch.clientX, touch.clientY));
    });

    // --- SECCIONES ---
    const secciones = document.querySelectorAll('.seccion');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
    }, { threshold: 0.1 });
    secciones.forEach(seccion => observer.observe(seccion));

    // --- PÉTALOS ---
    function crearPetalos() {
        const colores = ['#ff9bb8', '#e75480', '#c9a0dc', '#ffd6e8'];
        const contenedor = document.querySelector('.flotantes');
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const petalo = document.createElement('div');
                petalo.classList.add('petalo');
                petalo.innerHTML = '❀';
                petalo.style.left = `${Math.random() * 100}vw`;
                petalo.style.color = colores[Math.floor(Math.random() * colores.length)];
                petalo.style.fontSize = `${Math.random() * 1 + 1}rem`;
                petalo.style.animationDuration = `${Math.random() * 3 + 5}s`;
                contenedor.appendChild(petalo);
                setTimeout(() => petalo.remove(), 8000);
            }, i * 500);
        }
    }
    crearPetalos();
    setInterval(crearPetalos, 6000);

    // --- VISIBILITY CHANGE ---
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            audioPlayer.pause();
        } else if (audioPlayer.paused) {
            audioPlayer.play();
        }
    });
});
