// admin-key.js (Option 1: secret combo → login page)
let keySequence = []; 
const SECRET_COMBO = ['K', '2'];  
const ACCESS_PHRASE = "malvar-admin-2025"; 

document.addEventListener("keydown", (e) => {
  keySequence.push(e.key);
  if (keySequence.length > 2) keySequence.shift();

  console.log("Pressed:", keySequence.join(""));

  if (keySequence.join('') === SECRET_COMBO.join('')) {
    e.preventDefault();
    
    const input = prompt("Enter Admin Access Phrase:");

    if (input === ACCESS_PHRASE) {
      window.location.href = "admin.php"; // GO TO LOGIN PAGE
    } else if (input) {
      alert("Invalid admin phrase.");
    }
    keySequence = [];
  }

});
