let currentPhotoIndex = -1;

// Crear partículas de luz flotantes
function createLightParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    container.innerHTML = '';
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('light-particle');

        const size = Math.random() * 10 + 5; 
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}vw`;

        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 8;
        
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }
}

// Genera los destellos apenas carga la ventana
window.onload = createLightParticles;

function nextStep(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.remove('active'));

    const currentStep = document.getElementById(`step-${stepNumber}`);
    if (currentStep) {
        currentStep.classList.add('active');
    }

    if (stepNumber === 3 && currentPhotoIndex === -1) {
        revealNextPhoto();
    }
}

function playMusicAndNext(nextStepNumber) {
    const music = document.getElementById('bg-music');
    if (music) {
        music.muted = false; // Desactiva el silencio
        music.currentTime = 0; // Inicia desde el segundo 0
        
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("Música sonando perfectamente");
            }).catch(error => {
                console.log("Error al reproducir audio:", error);
            });
        }
    }
    nextStep(nextStepNumber);
}

function revealNextPhoto() {
    const photos = document.querySelectorAll('.fullscreen-photo');
    const hint = document.getElementById('photo-hint');
    const nextBtn = document.getElementById('next-to-letter-btn');

    currentPhotoIndex++;

    if (currentPhotoIndex < photos.length) {
        photos.forEach(photo => photo.classList.remove('show'));
        photos[currentPhotoIndex].classList.add('show');
        hint.textContent = `Toca la foto para ver la siguiente (${currentPhotoIndex + 1}/${photos.length})`;
    } 
    
    if (currentPhotoIndex >= photos.length - 1) {
        hint.textContent = "✨ ¡Nuestros momentos especiales! ✨";
        nextBtn.style.display = "inline-block";
    }
}
