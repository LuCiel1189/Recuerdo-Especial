let currentPhotoIndex = 0;

// Crear partículas de luz flotantes
function createLightParticles() {
    const container = document.getElementById('particles');
    const particleCount = 25; // Cantidad de luces

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('light-particle');

        // Tamaños variados para las luces
        const size = Math.random() * 12 + 6; 
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Posición horizontal aleatoria
        particle.style.left = `${Math.random() * 100}vw`;

        // Tiempos de animación aleatorios para que no suban juntas
        const duration = Math.random() * 8 + 6; // Entre 6 y 14 segundos
        const delay = Math.random() * 8;
        
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }
}

// Iniciar luces al cargar la página
window.onload = createLightParticles;

function nextStep(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.remove('active'));

    const currentStep = document.getElementById(`step-${stepNumber}`);
    if (currentStep) {
        currentStep.classList.add('active');
    }

    // Si entramos al paso 3 (fotos), revelamos la primera foto automáticamente
    if (stepNumber === 3 && currentPhotoIndex === 0) {
        revealNextPhoto();
    }
}

function playMusicAndNext(nextStepNumber) {
    const music = document.getElementById('bg-music');
    if (music) {
        music.play().catch(error => console.log("Auto-play prevenido:", error));
    }
    nextStep(nextStepNumber);
}

function revealNextPhoto() {
    const photos = document.querySelectorAll('.gallery-item');
    const hint = document.getElementById('photo-hint');
    const nextBtn = document.getElementById('next-to-letter-btn');

    if (currentPhotoIndex < photos.length) {
        photos[currentPhotoIndex].classList.add('show');
        currentPhotoIndex++;

        if (currentPhotoIndex < photos.length) {
            hint.textContent = `Toca la pantalla para revelar una foto (${currentPhotoIndex + 1}/${photos.length})`;
        } else {
            hint.textContent = "¡Aquí están todos nuestros momentos!";
            nextBtn.style.display = "inline-block";
        }
    }
}
