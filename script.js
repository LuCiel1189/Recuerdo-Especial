let currentPhotoIndex = 0;

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
            nextBtn.style.display = "inline-block"; // Muestra el botón para ir a la carta cuando aparecen todas
        }
    }
}
