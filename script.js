// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const animBox = document.getElementById('animBox');
const pulseBtn = document.getElementById('pulseBtn');
const rotateBtn = document.getElementById('rotateBtn');
const bounceBtn = document.getElementById('bounceBtn');
const resetBtn = document.getElementById('resetBtn');
const colorOptions = document.querySelectorAll('.color-option');
const notification = document.getElementById('notification');
const animationCountEl = document.getElementById('animationCount');
const themeTogglesEl = document.getElementById('themeToggles');
const colorChangesEl = document.getElementById('colorChanges');

// Stats counters
let animationCount = 0;
let themeToggles = 0;
let colorChanges = 0;

// User preferences object
const userPreferences = {
  theme: 'light',
  primaryColor: '#4a6fa5',
  lastAnimation: 'none'
};

// Load user preferences from localStorage
function loadPreferences() {
  const savedPreferences = localStorage.getItem('userPreferences');
  
  if (savedPreferences) {
    const parsedPrefs = JSON.parse(savedPreferences);
    Object.assign(userPreferences, parsedPrefs);
    
    // Apply loaded preferences
    if (userPreferences.theme === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggle.checked = true;
    }
    
    // Apply saved primary color
    document.documentElement.style.setProperty('--primary-color', userPreferences.primaryColor);
    
    // Apply saved animation if there was one
    if (userPreferences.lastAnimation !== 'none') {
      applyAnimation(userPreferences.lastAnimation);
    }
    
    // Load stats
    animationCount = parseInt(localStorage.getItem('animationCount') || '0');
    themeToggles = parseInt(localStorage.getItem('themeToggles') || '0');
    colorChanges = parseInt(localStorage.getItem('colorChanges') || '0');
    
    updateStatsDisplay();
  }
}

// Save user preferences to localStorage
function savePreferences() {
  localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  localStorage.setItem('animationCount', animationCount.toString());
  localStorage.setItem('themeToggles', themeToggles.toString());
  localStorage.setItem('colorChanges', colorChanges.toString());
  
  showNotification();
}

// Update stats display
function updateStatsDisplay() {
  animationCountEl.textContent = animationCount;
  themeTogglesEl.textContent = themeToggles;
  colorChangesEl.textContent = colorChanges;
}

// Show notification
function showNotification() {
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Apply animation to the box
function applyAnimation(animationType) {
  // Remove all existing animations
  animBox.classList.remove('pulse', 'rotate', 'bounce');
  
  if (animationType !== 'none') {
    // Add the new animation
    animBox.classList.add(animationType);
    userPreferences.lastAnimation = animationType;
    
    // Update stats
    animationCount++;
    updateStatsDisplay();
    savePreferences();
  } else {
    userPreferences.lastAnimation = 'none';
    savePreferences();
  }
}

// Event listeners for animation buttons
pulseBtn.addEventListener('click', () => applyAnimation('pulse'));
rotateBtn.addEventListener('click', () => applyAnimation('rotate'));
bounceBtn.addEventListener('click', () => applyAnimation('bounce'));
resetBtn.addEventListener('click', () => applyAnimation('none'));

// Theme toggle
themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.body.classList.add('dark-theme');
    userPreferences.theme = 'dark';
  } else {
    document.body.classList.remove('dark-theme');
    userPreferences.theme = 'light';
  }
  
  // Update stats
  themeToggles++;
  updateStatsDisplay();
  savePreferences();
});

// Color options
colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    const selectedColor = option.getAttribute('data-color');
    document.documentElement.style.setProperty('--primary-color', selectedColor);
    userPreferences.primaryColor = selectedColor;
    
    // Update stats
    colorChanges++;
    updateStatsDisplay();
    savePreferences();
  });
});

// Initialize the app
loadPreferences();