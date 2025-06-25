let currentIndex = 0;
const images = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');

function openModal(index) {
    modal.style.display = 'block';
    currentIndex = index;
    updateModalImage();
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(step) {
    currentIndex = (currentIndex + step + images.length) % images.length;
    updateModalImage();
}

function updateModalImage() {
    modalImage.src = images[currentIndex].src;
    modalImage.alt = images[currentIndex].alt;
}

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});