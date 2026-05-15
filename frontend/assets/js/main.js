document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // Theme Toggle Button Logic
  if(themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      let targetTheme = 'light';

      if (currentTheme === 'light' || !currentTheme) {
        targetTheme = 'dark';
      }

      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
    });
  }

  // Navigation Logic for SPA feel
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item[data-target]');
  const contentViews = document.querySelectorAll('.content-view');

  if (navItems.length > 0 && contentViews.length > 0) {
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Hide all content views
        contentViews.forEach(view => view.style.display = 'none');
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Show target content view
        const targetId = item.getAttribute('data-target') + '-section';
        const targetView = document.getElementById(targetId);
        if (targetView) {
          targetView.style.display = 'block';
        }
        
        // On mobile, close sidebar after clicking
        const sidebar = document.getElementById('sidebar');
        if (sidebar && window.innerWidth <= 768) {
          sidebar.classList.remove('open');
        }
      });
    });
  }
});
