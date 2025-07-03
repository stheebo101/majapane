document.addEventListener('DOMContentLoaded', function() {
  // Loading screen
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
      setTimeout(() => {
          loadingScreen.style.opacity = '0';
          setTimeout(() => {
              loadingScreen.style.display = 'none';
          }, 500);
      }, 1500);
  }

  // Mobile navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('active');
          navLinks.classList.toggle('active');
      });
  }

  // Highlight nav link on hover
  const navItems = document.querySelectorAll('.nav-links a');
  const navHighlight = document.querySelector('.nav-highlight');
  
  function moveHighlight(e) {
      if (!e.target.classList.contains('active')) {
          const linkRect = e.target.getBoundingClientRect();
          const navRect = document.querySelector('nav').getBoundingClientRect();
          
          navHighlight.style.width = `${linkRect.width}px`;
          navHighlight.style.left = `${linkRect.left - navRect.left}px`;
      }
  }
  
  function resetHighlight() {
      const activeLink = document.querySelector('.nav-links a.active');
      if (activeLink) {
          const linkRect = activeLink.getBoundingClientRect();
          const navRect = document.querySelector('nav').getBoundingClientRect();
          
          navHighlight.style.width = `${linkRect.width}px`;
          navHighlight.style.left = `${linkRect.left - navRect.left}px`;
      }
  }
  
  if (navItems.length && navHighlight) {
      navItems.forEach(link => {
          link.addEventListener('mouseenter', moveHighlight);
      });
      
      document.querySelector('nav').addEventListener('mouseleave', resetHighlight);
      
      // Initialize highlight position
      resetHighlight();
  }

  // Image modal functionality
  const modal = document.querySelector('.fullscreen-modal');
  const modalImg = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const closeModal = document.querySelector('.close-modal');
  
  function openModal(imgElement) {
      if (modal && modalImg) {
          modal.classList.add('active');
          modalImg.src = imgElement.src;
          modalImg.alt = imgElement.alt;
          
          // Set modal info if available
          const parentInfo = imgElement.closest('.carousel-item') || imgElement.closest('.panel-content') || imgElement.closest('.related-item');
          if (parentInfo) {
              const title = parentInfo.querySelector('h3, h4')?.textContent || '';
              const desc = parentInfo.querySelector('p')?.textContent || '';
              
              modalTitle.textContent = title;
              modalDesc.textContent = desc;
          }
          
          document.body.style.overflow = 'hidden';
      }
  }
  
  function closeModalFunc() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
  }
  
  if (closeModal) {
      closeModal.addEventListener('click', closeModalFunc);
  }
  
  if (modal) {
      modal.addEventListener('click', (e) => {
          if (e.target === modal) {
              closeModalFunc();
          }
      });
  }
  
  // Add click event to all zoomable images
  const zoomableImages = document.querySelectorAll('.panel-image, .warrior-main-image, .carousel-item img, .related-item img');
  zoomableImages.forEach(img => {
      img.addEventListener('click', function() {
          openModal(this);
      });
  });

  // Modal navigation
  const modalPrev = document.querySelector('.modal-prev');
  const modalNext = document.querySelector('.modal-next');
  
  if (modalPrev && modalNext) {
      let currentImageIndex = 0;
      const galleryImages = Array.from(zoomableImages);
      
      function navigateModal(direction) {
          currentImageIndex = galleryImages.findIndex(img => img.src === modalImg.src);
          
          if (direction === 'prev') {
              currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
          } else {
              currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
          }
          
          openModal(galleryImages[currentImageIndex]);
      }
      
      modalPrev.addEventListener('click', () => navigateModal('prev'));
      modalNext.addEventListener('click', () => navigateModal('next'));
      
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
          if (modal.classList.contains('active')) {
              if (e.key === 'ArrowLeft') {
                  navigateModal('prev');
              } else if (e.key === 'ArrowRight') {
                  navigateModal('next');
              } else if (e.key === 'Escape') {
                  closeModalFunc();
              }
          }
      });
  }

  // Triptych panel controls
  const combineBtn = document.getElementById('combinePanels');
  const separateBtn = document.getElementById('separatePanels');
  const triptychPanels = document.querySelectorAll('.triptych-panel');
  
  if (combineBtn && separateBtn && triptychPanels.length) {
      combineBtn.addEventListener('click', () => {
          triptychPanels.forEach(panel => {
              panel.style.transform = '';
          });
      });
      
      separateBtn.addEventListener('click', () => {
          triptychPanels[0].style.transform = 'perspective(1000px) rotateY(-15deg)';
          triptychPanels[1].style.transform = 'scale(1.05)';
          triptychPanels[2].style.transform = 'perspective(1000px) rotateY(15deg)';
      });
  }

  // Warrior image zoom
  const warriorImage = document.querySelector('.warrior-main-image');
  const zoomInBtn = document.querySelector('.zoom-in');
  const zoomOutBtn = document.querySelector('.zoom-out');
  const resetZoomBtn = document.querySelector('.reset-zoom');
  
  if (warriorImage && zoomInBtn && zoomOutBtn && resetZoomBtn) {
      let scale = 1;
      
      zoomInBtn.addEventListener('click', () => {
          scale += 0.1;
          warriorImage.style.transform = `scale(${scale})`;
      });
      
      zoomOutBtn.addEventListener('click', () => {
          if (scale > 0.5) {
              scale -= 0.1;
              warriorImage.style.transform = `scale(${scale})`;
          }
      });
      
      resetZoomBtn.addEventListener('click', () => {
          scale = 1;
          warriorImage.style.transform = 'scale(1)';
      });
  }

  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabButtons.length && tabPanes.length) {
      tabButtons.forEach(button => {
          button.addEventListener('click', () => {
              const tabId = button.getAttribute('data-tab');
              
              // Update buttons
              tabButtons.forEach(btn => btn.classList.remove('active'));
              button.classList.add('active');
              
              // Update panes
              tabPanes.forEach(pane => pane.classList.remove('active'));
              document.getElementById(tabId).classList.add('active');
          });
      });
  }

  // Accordion functionality
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  if (accordionHeaders.length) {
      accordionHeaders.forEach(header => {
          header.addEventListener('click', () => {
              const item = header.parentElement;
              const content = header.nextElementSibling;
              
              // Toggle the active class
              item.classList.toggle('active');
              
              // Toggle the content visibility
              if (item.classList.contains('active')) {
                  content.style.maxHeight = content.scrollHeight + 'px';
              } else {
                  content.style.maxHeight = 0;
              }
              
              // Close other items
              accordionHeaders.forEach(otherHeader => {
                  if (otherHeader !== header) {
                      const otherItem = otherHeader.parentElement;
                      const otherContent = otherHeader.nextElementSibling;
                      
                      otherItem.classList.remove('active');
                      otherContent.style.maxHeight = 0;
                  }
              });
          });
      });
  }

  // Carousel functionality
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselPrev = document.querySelector('.carousel-prev');
  const carouselNext = document.querySelector('.carousel-next');
  
  if (carouselTrack && carouselPrev && carouselNext) {
      const items = document.querySelectorAll('.carousel-item');
      const itemWidth = items[0].offsetWidth;
      let position = 0;
      
      carouselNext.addEventListener('click', () => {
          if (position > -(items.length - 1) * itemWidth) {
              position -= itemWidth;
              carouselTrack.style.transform = `translateX(${position}px)`;
          }
      });
      
      carouselPrev.addEventListener('click', () => {
          if (position < 0) {
              position += itemWidth;
              carouselTrack.style.transform = `translateX(${position}px)`;
          }
      });
  }

  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.reveal-text');
  
  if (revealElements.length) {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('animate');
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.1 });
      
      revealElements.forEach(element => {
          observer.observe(element);
      });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 100,
                  behavior: 'smooth'
              }); 
          }
      });
  });
});
// End of script.js