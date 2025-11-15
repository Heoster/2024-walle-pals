// PREMIUM NAVIGATION BAR
class PremiumNavbar {
  constructor() {
    this.navbar = document.querySelector('.navbar-premium') || document.querySelector('.header');
    this.init();
  }

  init() {
    this.setupScrollBehavior();
    this.setupMobileMenu();
    this.setupSearch();
    this.setupActiveLinks();
  }

  setupScrollBehavior() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        this.navbar.style.transform = 'translateY(-100%)';
      } else {
        this.navbar.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  }

  setupMobileMenu() {
    const hamburger = document.querySelector('.nav-toggle') || document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('mobile-active');
        document.body.style.overflow = 
          navMenu.classList.contains('mobile-active') ? 'hidden' : '';
      });
    }
  }

  setupSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    
    if (searchToggle && searchOverlay) {
      searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
      });
      
      if (searchClose) {
        searchClose.addEventListener('click', () => {
          searchOverlay.classList.remove('active');
        });
      }
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchOverlay.classList.remove('active');
        }
      });
    }
  }

  setupActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PremiumNavbar();
});
