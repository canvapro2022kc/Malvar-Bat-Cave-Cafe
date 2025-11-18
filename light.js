// light.js
const hour = new Date().getHours();
const body = document.body;

// Auto-switch based on time
if (hour >= 5 && hour < 18) {
  body.classList.add("light-theme");
} else {
  body.classList.remove("light-theme");
}