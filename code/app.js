const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

// Intersection Observer for scroll animations
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    observer.observe(section);
});

// Add to hero section h1 elements
document.querySelectorAll('#hero h1').forEach((el, i) => {
    el.style.setProperty('--i', i);
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;
    if (scroll_position > 250) {
        header.style.backgroundColor = '#29323c';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

menu_item.forEach((item) => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    });
});

// Touch improvements for mobile menu
document.querySelectorAll('#header .nav-list ul a').forEach(item => {
    item.style.minHeight = '44px';
    item.style.minWidth = '44px';
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.justifyContent = 'center';
});
// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  // Show/hide back to top button
  if (scrollPosition > 300) {
    backToTopButton.classList.add('active');
  } else {
    backToTopButton.classList.remove('active');
  }
  
  // Adjust button positions to prevent overlap
  if (window.innerWidth <= 767) {
    // Mobile layout
    backToTopButton.style.bottom = '90px';
  } else {
    // Desktop layout
    backToTopButton.style.bottom = '120px';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  vibrate();
});


