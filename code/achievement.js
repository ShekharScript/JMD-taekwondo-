// Modern Achievements Page JS
// Tab switching & smooth scroll

document.addEventListener('DOMContentLoaded', function () {
  // Tab switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remove active from all
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabContents.forEach(tc => tc.classList.remove('active'));
      // Activate current
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      const tab = this.getAttribute('data-tab');
      document.getElementById(tab).classList.add('active');
      // Optional: scroll to top of main content on tab switch
      document.querySelector('.achievements-main').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Smooth scroll for anchor links (if any)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Image modal zoom functionality
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeModal = document.getElementById('close-modal');
  
  if (modal && modalImg && closeModal) {
    // Debug: Check all images on page load
    console.log('Checking all achievement images...');
    document.querySelectorAll('.blurred-bg-image-container img').forEach(function(img, index) {
      console.log(`Image ${index + 1}:`, img.src, 'Dimensions:', img.naturalWidth, 'x', img.naturalHeight);
      img.onload = function() {
        console.log(`Image ${index + 1} loaded successfully:`, img.src);
      };
      img.onerror = function() {
        console.error(`Image ${index + 1} failed to load:`, img.src);
      };
    });
    
    // Make image containers clickable
    document.querySelectorAll('.blurred-bg-image-container').forEach(function(container) {
      container.style.cursor = 'pointer';
      container.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
          console.log('Opening modal with image:', img.src);
          console.log('Image natural dimensions:', img.naturalWidth, 'x', img.naturalHeight);
          modal.style.display = 'flex';
          
          // Add loading state
          modalImg.style.opacity = '0.5';
          
          // Set image with error handling
          modalImg.onload = function() {
            modalImg.style.opacity = '1';
            console.log('Modal image loaded successfully');
            console.log('Modal image dimensions:', modalImg.naturalWidth, 'x', modalImg.naturalHeight);
          };
          
          modalImg.onerror = function() {
            console.error('Failed to load image in modal:', img.src);
            modalImg.style.opacity = '1';
            // Show error message or fallback
            modalImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
          };
          
          // Ensure we're using the correct path
          const imagePath = img.src;
          console.log('Setting modal image to:', imagePath);
          modalImg.src = imagePath;
          modalImg.alt = img.alt;
          document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
      });
    });
    
    // Close modal functionality
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
      modalImg.src = '';
      document.body.style.overflow = 'auto'; // Restore scroll
    });
    
    // Close on background click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        modalImg.src = '';
        document.body.style.overflow = 'auto';
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        modalImg.src = '';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Responsive Hamburger Menu for Achievements Page
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list ul');

  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navList.classList.toggle('active');
    });
    // Close menu on link click (mobile UX)
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
      });
    });
  }
});