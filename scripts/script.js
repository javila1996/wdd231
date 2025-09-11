function toggleMenu() {
    document.querySelector('nav').classList.toggle('active');
    document.querySelector('.menu-toggle').classList.toggle('open');
  }
  
  document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);
  