/* ==========================================================================
   Marimuthu Portfolio Script Definitions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Update Footer copyright year dynamically
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // Loading Overlay Control
  // ==========================================================================
  const handleLoad = () => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('fade-out');
    }
    
    // Start typewriter effect after loader transitions out
    setTimeout(() => {
      // Reveal all hero components immediately on load
      const heroReveals = document.querySelectorAll('.hero-section .reveal');
      heroReveals.forEach(el => {
        el.classList.add('active');
      });
      typeWriterInit();
    }, 600);
  };

  if (document.readyState === 'complete') {
    handleLoad();
  } else {
    window.addEventListener('load', handleLoad);
  }

  // ==========================================================================
  // Dark/Light Theme Switching
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  document.body.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ==========================================================================
  // Custom Dynamic Glassmorphism Card Glow
  // ==========================================================================
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
  });

  // ==========================================================================
  // Typewriter Animation
  // ==========================================================================
  const typewriterElement = document.getElementById('typewriter');
  const strings = [
    "Computer Science Engineering Student",
    "Python Developer",
    "Web Developer",
    "AI Enthusiast"
  ];
  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeWriterInit() {
    if (!typewriterElement) return;
    const currentString = strings[stringIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterElement.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentString.length) {
      typeSpeed = 2000; // Delay when full string is typed
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      typeSpeed = 500; // Brief delay before next word
    }

    setTimeout(typeWriterInit, typeSpeed);
  }

  // ==========================================================================
  // Mobile Overlay Menu
  // ==========================================================================
  const menuBtn = document.getElementById('menu-btn');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuBtn && mobileOverlay) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', isOpen);
      mobileOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================================================
  // Header Scrolled / Back to Top Button Actions
  // ==========================================================================
  const header = document.querySelector('.header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Force highlight the Contact nav link when scrolled to the absolute bottom of page
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
    if (isAtBottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#contact') {
          link.classList.add('active');
        }
      });
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // Numbers Count-up Animation
  // ==========================================================================
  const counterElements = document.querySelectorAll('.metric-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      const duration = 1500; 
      const startTime = performance.now();
      
      function updateCount(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing out quadratic curves
        const easeProgress = progress * (2 - progress);
        const currentVal = Math.floor(easeProgress * target);
        
        counter.textContent = currentVal;
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target + "+";
        }
      }
      
      requestAnimationFrame(updateCount);
    });
  }

  // ==========================================================================
  // Viewport Intersection Observers (Reveal & Nav highlighting)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // If skill card container triggers, render child bar percentages
        if (entry.target.classList.contains('skills-category-card')) {
          const progressBars = entry.target.querySelectorAll('.skill-bar-fill');
          progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-progress');
          });
        }
        
        // If metrics stats block triggers, run count animation
        if (entry.target.classList.contains('about-stats-card')) {
          animateCounters();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // Highlight active link inside Header Navbar
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const navObserverOptions = {
    rootMargin: '-90px 0px -60% 0px',
    threshold: 0.15
  };

  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    activeSectionObserver.observe(section);
  });

  // ==========================================================================
  // Contact Form Validations & Simulation
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success');
  const resetBtn = document.getElementById('form-reset-btn');

  const inputs = {
    name: { el: document.getElementById('form-name'), err: document.getElementById('name-error') },
    email: { el: document.getElementById('form-email'), err: document.getElementById('email-error') },
    subject: { el: document.getElementById('form-subject'), err: document.getElementById('subject-error') },
    message: { el: document.getElementById('form-message'), err: document.getElementById('message-error') }
  };

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm && successBanner) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      // Clear error statuses
      Object.values(inputs).forEach(item => {
        if (item.el) {
          item.el.closest('.form-group').classList.remove('has-error');
        }
      });
      
      // Name Verification
      if (inputs.name.el && !inputs.name.el.value.trim()) {
        inputs.name.el.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
      
      // Email Verification
      if (inputs.email.el && (!inputs.email.el.value.trim() || !validateEmail(inputs.email.el.value.trim()))) {
        inputs.email.el.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
      
      // Subject Verification
      if (inputs.subject.el && !inputs.subject.el.value.trim()) {
        inputs.subject.el.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
      
      // Message Verification
      if (inputs.message.el && !inputs.message.el.value.trim()) {
        inputs.message.el.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
      
      if (isValid) {
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending Message...</span><div class="loader-spinner" style="width: 14px; height: 14px; margin: 0; border-width: 2px;"></div>';
        
        // Simulate sending animation delay
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          successBanner.classList.add('visible');
        }, 1200);
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        contactForm.reset();
        successBanner.classList.remove('visible');
      });
    }
  }

  // ==========================================================================
  // Optimized HTML5 Canvas Particles System
  // ==========================================================================
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationFrameId = null;
    let isTabVisible = true;
    
    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        const theme = document.body.getAttribute('data-theme');
        ctx.fillStyle = theme === 'dark' ? 'rgba(6, 182, 214, 0.25)' : 'rgba(79, 70, 229, 0.1)';
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Magnetized interaction around cursor
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
              this.x += 1.5;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
              this.x -= 1.5;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
              this.y += 1.5;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
              this.y -= 1.5;
            }
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function initParticles() {
      particlesArray = [];
      // Calculate responsive density counts
      const density = (canvas.width * canvas.height) / 11000;
      const numberOfParticles = Math.min(Math.max(density, 25), 85); 

      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;

        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    }

    function connectParticles() {
      let opacityValue = 1;
      const theme = document.body.getAttribute('data-theme');
      const maxDistance = 120;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            opacityValue = 1 - (distance / maxDistance);
            ctx.strokeStyle = theme === 'dark' 
              ? `rgba(6, 182, 214, ${opacityValue * 0.12})`
              : `rgba(79, 70, 229, ${opacityValue * 0.06})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      if (!isTabVisible) return; // Stop animation loop when tab is hidden to save energy
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    // Initialize Canvas Size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Visibility Handling
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isTabVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isTabVisible = true;
        animateParticles();
      }
    });

    // Run animation
    animateParticles();
  }
});
