// theme.js
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
  
    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") body.classList.add("light-theme");
  
    // Create toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "themeToggle";
    toggleBtn.title = "Toggle Light/Dark Mode";
    toggleBtn.textContent = body.classList.contains("light-theme") ? "☀️" : "🌙";
  
    // Add it to the navbar (rightmost)
    const nav = document.querySelector(".navbar") || document.querySelector(".admin-nav");
    if (nav) {
      const container = document.createElement("div");
      container.classList.add("nav-theme");
      container.appendChild(toggleBtn);
      nav.appendChild(container);
    }
  
    // Toggle functionality
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("light-theme");
      const isLight = body.classList.contains("light-theme");
      toggleBtn.textContent = isLight ? "☀️" : "🌙";
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  });
  