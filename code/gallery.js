let currentIndex = 0;
const images = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const imageCounter = document.getElementById('image-counter');

// Preload images for better gallery experience
function preloadImages() {
  // Load first few images immediately
  const firstImages = Array.from(images).slice(0, 4);
  firstImages.forEach(img => {
    const imgObj = new Image();
    imgObj.src = img.src;
  });
  
  // Lazy load the rest if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          lazyObserver.unobserve(img);
        }
      });
    });
    
    Array.from(images).slice(4).forEach(img => {
      img.dataset.src = img.src;
      img.src = ''; // Or a placeholder
      lazyObserver.observe(img);
    });
  }
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

// In gallery.js
 let initialDistance = null;

modalImage.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    initialDistance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
  }
});

modalImage.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const currentDistance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    
    if (initialDistance) {
      const scale = currentDistance / initialDistance;
      modalImage.style.transform = `scale(${Math.min(Math.max(1, scale), 3)})`;
    }
  }
});

modalImage.addEventListener('touchend', () => {
  initialDistance = null;
  setTimeout(() => {
    modalImage.style.transform = 'scale(1)';
  }, 300);
});
// In gallery.js, extend lazy loading to all images
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazyload"));
  
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazyload");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});

//enhace features 
// (Removed duplicate declaration and event listeners for initialDistance and pinch-to-zoom)