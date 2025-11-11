document.addEventListener("keydown", (e) => {
    // Detect Ctrl + Shift + A
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
      e.preventDefault();
  
      // Ask for admin key
      const key = prompt("Enter Admin Access Key:");
  
      // Change this value to your own secret key
      const ADMIN_KEY = "malvar-admin-2025";
  
      if (key === ADMIN_KEY) {
        alert("Admin access granted.");
        window.location.href = "admin.html";
      } else if (key) {
        alert("Invalid key. Access denied.");
      }
    }
  });
  