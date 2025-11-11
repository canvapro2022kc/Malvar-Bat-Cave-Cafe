//LIGHT THEME

function applyTimeBasedTheme() {
  const now = new Date();
  const hour = now.getHours(); // 0-23

  if (hour >= 13 && hour < 18) { // 1 PM to 5:59 PM
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
}

// Run once on page load
applyTimeBasedTheme();

// Optional: Update theme every minute automatically
setInterval(applyTimeBasedTheme, 60000);

//END OF CODE FOR LIGHT THEME