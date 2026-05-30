/* ==========================================================================
   INTERACTION LOGIC — MAISON MONOCHROME
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // Element Selectors
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuPanel = document.getElementById('menu-panel');
  const searchInputWrapper = document.querySelector('.search-input-wrapper');
  const searchInput = document.getElementById('menu-search-input');
  const searchIconBtn = document.querySelector('.search-icon-btn');
  const langButtons = document.querySelectorAll('.lang-btn');

  // Open Menu Function
  const openMenu = () => {
    menuOverlay.classList.add('is-open');
    document.body.classList.add('menu-open');
  };

  // Close Menu Function
  const closeMenu = () => {
    menuOverlay.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    
    // Reset search bar state on close
    resetSearchBar();
  };

  // Toggle Menu Function
  const toggleMenu = () => {
    if (menuOverlay.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Event Listeners for Open/Close
  hamburgerBtn.addEventListener('click', toggleMenu);

  // Close Menu on clicking outside the panel (overlay container click)
  menuOverlay.addEventListener('click', (e) => {
    // If the click is on the overlay wrapper itself (and not inside the sliding panel)
    if (e.target === menuOverlay) {
      closeMenu();
    }
  });

  // ESC Key listener to close menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // ==========================================================================
  // SEARCH BAR INTERACTION
  // ==========================================================================
  
  const resetSearchBar = () => {
    searchInputWrapper.classList.remove('active');
    searchInput.value = '';
    searchInput.blur();
  };

  // Open / Focus search input when clicking search button
  searchIconBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    const isSearchActive = searchInputWrapper.classList.contains('active');
    
    if (!isSearchActive) {
      // Expand and focus
      searchInputWrapper.classList.add('active');
      searchInput.focus();
    } else {
      // If there's text, perform mock search
      if (searchInput.value.trim() !== '') {
        alert(`Searching for: "${searchInput.value}"`);
        resetSearchBar();
        closeMenu();
      } else {
        // If empty, collapse
        resetSearchBar();
      }
    }
  });

  // Focus and blur events on search input to manage classes
  searchInput.addEventListener('focus', () => {
    searchInputWrapper.classList.add('active');
  });

  searchInput.addEventListener('blur', () => {
    if (searchInput.value.trim() === '') {
      searchInputWrapper.classList.remove('active');
    }
  });

  // Submit search on ENTER keypress
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
      alert(`Searching for: "${searchInput.value}"`);
      resetSearchBar();
      closeMenu();
    }
  });

  // ==========================================================================
  // LANGUAGE SELECTOR
  // ==========================================================================
  
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const selectedLang = btn.getAttribute('data-lang');
      console.log(`Language switched to: ${selectedLang.toUpperCase()}`);
    });
  });

});
