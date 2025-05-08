document.addEventListener('DOMContentLoaded', () => {
  // Create particle effects
  createParticles();
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Handle scroll to top button visibility
    handleScrollToTopButton();
  });

  // Initialize scroll to top button
  initScrollToTopButton();

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', handleMenuToggle);
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleMenuToggle();
      }
    });
  }
  
  function handleMenuToggle() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Update aria-expanded attribute for accessibility
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleSmoothScroll);
    anchor.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSmoothScroll(e);
      }
    });
  });
  
  function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (hamburger && hamburger.classList.contains('active')) {
        handleMenuToggle();
      }
      
      // Set focus to the target element for accessibility
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus();
    }
  }

  // Enhanced scroll animations with staggered items
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .about-text p, .stat-item, .organizer-card, .sponsor-card, .feature-card, .timeline-item, .winner-card, .resource-card, .gallery-item, .testimonial-card, .competition-year-content');
  
  const staggeredContainers = document.querySelectorAll('[data-stagger="true"]');
  
  const handleScrollAnimations = () => {
    // Handle regular animated elements
    animatedElements.forEach(element => {
      if (isElementInViewport(element, 0.2)) {
        element.classList.add('active');
      }
    });
    
    // Handle staggered containers
    staggeredContainers.forEach(container => {
      if (isElementInViewport(container, 0.1)) {
        // Add active class to container
        container.classList.add('active');
        
        // Get all children that should be staggered
        const staggerItems = container.querySelectorAll('.stagger-item');
        
        // Activate each item with built-in delays from CSS
        staggerItems.forEach(item => {
          item.classList.add('active');
        });
      }
    });
  };
  
  // Enhanced element in viewport detection with options
  function isElementInViewport(el, threshold = 0, fullVisible = false) {
    if (!el) return false;
    
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const vertInView = fullVisible
      ? (rect.top >= 0 && rect.bottom <= windowHeight)
      : (rect.top <= windowHeight * (1 - threshold) && rect.bottom >= windowHeight * threshold);
      
    const horInView = fullVisible
      ? (rect.left >= 0 && rect.right <= windowWidth)
      : (rect.left <= windowWidth && rect.right >= 0);
      
    return vertInView && horInView;
  }
  
  // Initialize staggered animations for various page elements
  function initStaggeredAnimations() {
    // Add staggered animation to FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
      faqItems.forEach((item, index) => {
        item.classList.add('stagger-item');
        // Add custom delay based on index if not using CSS delay classes
        item.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
      });
      
      // Add the FAQ container as a staggered container
      const faqContainer = document.querySelector('.faq-container');
      if (faqContainer) {
        faqContainer.setAttribute('data-stagger', 'true');
      }
    }

    // Add staggered animation to instruction steps
    const instructionSteps = document.querySelectorAll('.instruction-step');
    if (instructionSteps.length > 0) {
      instructionSteps.forEach((step, index) => {
        step.classList.add('stagger-item');
        // Add custom delay based on index if not using CSS delay classes
        step.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
      });
      
      // Add the instruction steps container as a staggered container
      const instructionStepsContainer = document.querySelector('.instruction-steps');
      if (instructionStepsContainer) {
        instructionStepsContainer.setAttribute('data-stagger', 'true');
      }
    }
  }

  // Initialize staggered animations
  initStaggeredAnimations();
  
  // Initial checks
  setTimeout(() => {
    handleScrollAnimations();
    
    // Add active class to elements in first visible view without scroll
    document.querySelectorAll('.stagger-item').forEach((item, index) => {
      if (isElementInViewport(item, 0)) {
        setTimeout(() => {
          item.classList.add('active');
        }, 100 + (index * 100)); // Add progressive delay for better visual effect
      }
    });
  }, 300);
  
  // Optimized scroll listener with requestAnimationFrame
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScrollAnimations();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Magnetic effect for buttons with accessibility
  const buttons = document.querySelectorAll('.cta-button, .submit-btn, .outline-button');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', handleButtonHover);
    button.addEventListener('mouseleave', handleButtonReset);
    button.addEventListener('focus', handleButtonFocus);
    button.addEventListener('blur', handleButtonReset);
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.target.click();
      }
    });
  });
  
  function handleButtonHover(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.style.transform = `translateY(-5px) scale(1.02) perspective(500px) rotateX(${(rect.height / 2 - y) / 10}deg) rotateY(${-(rect.width / 2 - x) / 10}deg)`;
    this.style.boxShadow = `0 15px 25px rgba(0, 0, 0, 0.2), 0 0 20px var(--glow-color)`;
  }
  
  function handleButtonReset() {
    this.style.transform = '';
    this.style.boxShadow = '';
  }
  
  function handleButtonFocus() {
    this.style.transform = 'translateY(-5px) scale(1.02)';
    this.style.boxShadow = `0 15px 25px rgba(0, 0, 0, 0.2), 0 0 20px var(--glow-color)`;
  }

  // Custom cursor effect
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  
  // Only enable on non-touch devices
  if (cursorDot && cursorOutline && !isTouchDevice()) {
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Add hover effect
    document.querySelectorAll('a, button, input, textarea, .feature-card, .timeline-content, .sponsor-card, .organizer-card, .resource-card, .year-tab').forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hover');
      });
    });
  } else {
    // Hide custom cursor on touch devices
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorOutline) cursorOutline.style.display = 'none';
  }
  
  // Check if device has touch capability
  function isTouchDevice() {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
  }
  
  // Handle FAQ accordion on register page
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', toggleFaq);
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFaq.call(question);
        }
      });
      
      // Add accessibility attributes
      question.setAttribute('tabindex', '0');
      question.setAttribute('role', 'button');
      question.setAttribute('aria-expanded', 'false');
      
      const answer = item.querySelector('.faq-answer');
      answer.id = `answer-${Math.random().toString(36).substring(2, 9)}`;
      question.setAttribute('aria-controls', answer.id);
    });
  }
  
  function toggleFaq() {
    const item = this.closest('.faq-item');
    const isActive = item.classList.contains('active');
    
    // Close all FAQs
    faqItems.forEach(faq => {
      faq.classList.remove('active');
      const question = faq.querySelector('.faq-question');
      question.setAttribute('aria-expanded', 'false');
    });
    
    // Toggle current FAQ
    if (!isActive) {
      item.classList.add('active');
      this.setAttribute('aria-expanded', 'true');
    }
  }
  
  // Tabs functionality for past competitions page
  const yearTabs = document.querySelectorAll('.year-tab');
  const yearContents = document.querySelectorAll('.competition-year-content');
  
  if (yearTabs.length > 0) {
    // Add accessibility attributes
    const tabsContainer = document.querySelector('.year-tabs');
    tabsContainer.setAttribute('role', 'tablist');
    
    yearTabs.forEach((tab, index) => {
      const year = tab.getAttribute('data-year');
      const content = document.getElementById(`year-${year}`);
      
      if (content) {
        // Set up tab attributes
        tab.setAttribute('role', 'tab');
        tab.setAttribute('id', `tab-${year}`);
        tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
        tab.setAttribute('aria-controls', `year-${year}`);
        tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');
        
        // Set up panel attributes
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-labelledby', `tab-${year}`);
        content.setAttribute('tabindex', '0');
        
        // Add event listeners
        tab.addEventListener('click', () => switchTab(index));
        tab.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchTab(index);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextTab = (index + 1) % yearTabs.length;
            switchTab(nextTab);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevTab = (index - 1 + yearTabs.length) % yearTabs.length;
            switchTab(prevTab);
          }
        });
      }
    });
  }
  
  function switchTab(tabIndex) {
    // Remove active class from all tabs and hide all content
    yearTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });
    yearContents.forEach(c => c.classList.add('hidden'));
    
    // Add active class to clicked tab and show corresponding content
    const selectedTab = yearTabs[tabIndex];
    selectedTab.classList.add('active');
    selectedTab.setAttribute('aria-selected', 'true');
    selectedTab.setAttribute('tabindex', '0');
    selectedTab.focus();
    
    const year = selectedTab.getAttribute('data-year');
    const selectedContent = document.getElementById(`year-${year}`);
    if (selectedContent) {
      selectedContent.classList.remove('hidden');
    }
  }
  
  // Testimonial slider functionality for past competitions page
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const dots = document.querySelectorAll('.dot');
  const slides = document.querySelectorAll('.testimonial-card');
  let currentSlide = 0;
  
  if (slides.length > 0) {
    function showSlide(n) {
      // Hide all slides
      slides.forEach(slide => {
        slide.style.display = 'none';
        slide.setAttribute('aria-hidden', 'true');
      });
      dots.forEach(dot => {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      });
      
      // Show the current slide
      slides[n].style.display = 'block';
      slides[n].setAttribute('aria-hidden', 'false');
      dots[n].classList.add('active');
      dots[n].setAttribute('aria-selected', 'true');
      currentSlide = n;
    }
    
    // Add accessibility attributes
    const slider = document.querySelector('.testimonials-slider');
    slider.setAttribute('role', 'region');
    slider.setAttribute('aria-roledescription', 'carousel');
    
    slides.forEach((slide, index) => {
      slide.setAttribute('role', 'tabpanel');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('id', `slide-${index}`);
      slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    });
    
    const dotsContainer = document.querySelector('.slider-dots');
    dotsContainer.setAttribute('role', 'tablist');
    
    dots.forEach((dot, index) => {
      dot.setAttribute('role', 'tab');
      dot.setAttribute('tabindex', index === 0 ? '0' : '-1');
      dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      dot.setAttribute('aria-controls', `slide-${index}`);
      dot.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
    });
    
    if (nextBtn) {
      nextBtn.setAttribute('aria-label', 'Next slide');
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });
    }
    
    if (prevBtn) {
      prevBtn.setAttribute('aria-label', 'Previous slide');
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });
    }
    
    // Dot controls with keyboard accessibility
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showSlide(index);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          const nextDot = (index + 1) % dots.length;
          dots[nextDot].focus();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevDot = (index - 1 + dots.length) % dots.length;
          dots[prevDot].focus();
        }
      });
    });
    
    // Initialize slider
    showSlide(0);
  }
});

function createParticles() {
  const numParticles = 50; // Increased from 40 to 50
  
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Assign different shapes to some particles
    const shapeRandom = Math.random();
    if (shapeRandom > 0.8) {
      particle.classList.add('square');
    } else if (shapeRandom > 0.65) {
      particle.classList.add('triangle');
    } else if (shapeRandom > 0.5) {
      particle.classList.add('pulse');
    }
    
    // Enhanced random properties
    const posX = Math.random() * 100;
    const size = Math.random() * 6 + 1; // Slightly larger max size
    const delay = Math.random() * 8; // More varied delays
    const duration = Math.random() * 15 + 8; // More varied durations
    const opacity = Math.random() * 0.5 + 0.1; // Random opacity
    
    // Random colors for some particles
    const useRandomColor = Math.random() > 0.5; // Increased chance of random color
    if (useRandomColor) {
      const hue = Math.floor(Math.random() * 40) + 190; // Blue to cyan range
      const saturation = Math.floor(Math.random() * 20) + 80; // 80-100%
      const lightness = Math.floor(Math.random() * 30) + 60; // 60-90%
      
      if (particle.classList.contains('triangle')) {
        particle.style.borderBottomColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      } else {
        particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      }
      
      particle.style.boxShadow = `0 0 ${size * 2}px hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    particle.style.left = `${posX}%`;
    particle.style.bottom = '-20px';
    
    // Don't set size for triangles (they use border width)
    if (!particle.classList.contains('triangle')) {
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
    }
    
    particle.style.opacity = opacity;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    document.body.appendChild(particle);
  }
  
  // Add some larger, slower background particles
  const numBackgroundParticles = 15; // Increased from 10 to 15
  
  for (let i = 0; i < numBackgroundParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle background-particle';
    
    // Properties for background particles
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const size = Math.random() * 15 + 8; // Larger
    const delay = Math.random() * 5;
    const duration = Math.random() * 30 + 20; // Much slower
    const opacity = Math.random() * 0.15 + 0.05; // Very faint
    
    // Always a soft blue glow for background particles
    const hue = Math.floor(Math.random() * 30) + 190; // Blue to cyan range
    particle.style.backgroundColor = `hsla(${hue}, 100%, 70%, 0.5)`;
    particle.style.boxShadow = `0 0 20px hsla(${hue}, 100%, 70%, 0.5)`;
    particle.style.filter = 'blur(3px)';
    
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    // Use a different animation for background particles
    particle.style.animation = `float-particle-bg ${duration}s infinite linear`;
    
    document.body.appendChild(particle);
  }
}

// Initialize scroll to top button
function initScrollToTopButton() {
  const scrollTopBtn = document.getElementById('scroll-top');
  
  if (scrollTopBtn) {
    // Initial check for button visibility
    handleScrollToTopButton();
    
    // Add click event listener
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    // Add keyboard accessibility
    scrollTopBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToTop();
      }
    });
  }
}

// Handle scroll to top button visibility
function handleScrollToTopButton() {
  const scrollTopBtn = document.getElementById('scroll-top');
  
  if (scrollTopBtn) {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
}

// Scroll to top function with smooth animation
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  // Focus on the first focusable element for accessibility
  setTimeout(() => {
    document.querySelector('a, button, input, [tabindex="0"]')?.focus();
  }, 500);
} 