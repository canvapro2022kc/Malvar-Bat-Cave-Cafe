// admin-key.js
let keySequence = []; // store the recent keys pressed
const SECRET_COMBO = ['.', '*']; // the sequence to trigger admin key prompt
const ADMIN_KEY = "malvar-admin-2025"; // your secret access key

document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Record pressed key, keep only last 2
  keySequence.push(key);
  if (keySequence.length > 2) keySequence.shift();

  // Check if the last 2 keys match the combo
  if (keySequence.join('') === SECRET_COMBO.join('')) {
    e.preventDefault();
    const keyInput = prompt("Enter Admin Access Key:");

    if (keyInput === ADMIN_KEY) {
      alert("Admin access granted.");
      window.location.href = "admin.php";
    } else if (keyInput) {
      alert("Invalid key. Access denied.");
    }

    // Clear sequence after attempt
    keySequence = [];
  }
});
