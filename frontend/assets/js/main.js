// API Config
const API_BASE_URL = 'http://localhost:5000/api';

// Global API Fetch Utility
window.apiFetch = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
      // In a real app with JWT, you would add: 'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    
    const config = {
      ...options,
      credentials: options.credentials || 'include',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`API Endpoint not found or backend is not running. Response: ${text.substring(0, 50)}...`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API Error');
    }

    return data;
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      console.error('API Fetch Error: Backend server is not reachable. Ensure you ran `npm start` and are accessing http://localhost:5000');
      throw new Error('Backend server is not running or unreachable.');
    }
    console.error('API Fetch Error:', error);
    throw error;
  }
};

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
