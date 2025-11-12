// light.js
const hour = new Date().getHours();
const body = document.body;

// Auto-switch based on time
if (hour >= 5 && hour < 18) {
  body.classList.add("light-theme");
} else {
  body.classList.remove("light-theme");
}

// Optional: Press "L" key to toggle manually
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "l") {
    body.classList.toggle("light-theme");
  }
});
