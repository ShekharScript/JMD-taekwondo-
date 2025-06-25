let currentIndex = 0;
const images = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const imageCounter = document.getElementById('image-counter');

// Preload images for better gallery experience
function preloadImages() {
  images.forEach(img => {
    const imgObj = new Image();
    imgObj.src = img.src;
  });
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', () => {
  preloadImages();
  
  // Add click handlers
  images.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
  });
});

function openModal(index) {
  modal.style.display = 'flex';
  currentIndex = index;
  updateModal();
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleKeyDown);
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', handleKeyDown);
}

function changeImage(step) {
  currentIndex = (currentIndex + step + images.length) % images.length;
  updateModal();
}

function updateModal() {
  const currentImg = images[currentIndex];
  modalImage.src = currentImg.src;
  modalImage.alt = currentImg.alt;
  modalCaption.textContent = currentImg.alt || '';
  imageCounter.textContent = `${currentIndex + 1}/${images.length}`;
}

function handleKeyDown(e) {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') changeImage(-1);
  if (e.key === 'ArrowRight') changeImage(1);
}

// Touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

modal.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, {passive: true});

function handleSwipe() {
  const difference = touchStartX - touchEndX;
  if (difference > 50) changeImage(1); // Swipe left
  if (difference < -50) changeImage(-1); // Swipe right
}

// Close modal when clicking outside image
modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.classList.contains('close')) {
    closeModal();
  }
});