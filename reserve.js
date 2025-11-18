document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reserveForm");
  const calculateBtn = document.getElementById("calculateBtn");
  const estimateContainer = document.getElementById("estimateContainer");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const submitBtn = document.getElementById("submitBtn");

  // Rates
  const BASE_RATE = 50;           // per hour, table rental
  const MIN_FEE = 75;             // minimum for table rental
  const PROJECTOR_RATE = 150;
  const SPEAKER_RATE = 150;

  const WHOLE_PLACE_RATE = 1000;  // NEW → cost per hour for whole-place rental
  const WHOLE_PLACE_MIN = 1800;   // NEW → minimum cost if < 2 hours

  let estimatedCost = 0;
  let endTimeFormatted = "";

  calculateBtn.addEventListener("click", () => {
    const rentalType = document.querySelector("input[name='rentalType']:checked");

    if (!rentalType) {
      alert("Please select whether you're renting a table or the entire place.");
      return;
    }

    const hours = parseFloat(document.getElementById("hours").value);
    const startTime = document.getElementById("startTime").value;
    const projector = document.getElementById("projector").checked;
    const speaker = document.getElementById("speaker").checked;

    if (!hours || hours <= 0) {
      alert("Please enter a valid number of hours.");
      return;
    }

    if (!startTime) {
      alert("Please select a start time.");
      return;
    }

    //Date Validation
    document.addEventListener("DOMContentLoaded", () => {
      const dateInput = document.getElementById("date");
  
      // Get today's date in YYYY-MM-DD format
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // months start at 0
      const dd = String(today.getDate()).padStart(2, '0');
  
      const minDate = `${yyyy}-${mm}-${dd}`;
      dateInput.setAttribute('min', minDate);
  });
  

    // Time handling
    const [hour, minute] = startTime.split(":").map(Number);
    let endHour = hour + hours;
    let endMinute = minute;

    if (endHour >= 24) endHour -= 24;

    const validStart = hour >= 13 || hour < 1;
    const validEnd = endHour >= 13 || endHour < 1;

    if (!validStart || !validEnd) {
      alert("Reservation time must be between 1:00 PM and 1:00 AM.");
      return;
    }

    // -------------------------
    // COST CALCULATION SECTION
    // -------------------------
    let total = 0;

    if (rentalType.value === "table") {
      // TABLE RENTAL COST
      total = hours < 2 ? MIN_FEE : hours * BASE_RATE;

    } else if (rentalType.value === "whole") {
      // WHOLE PLACE RENTAL COST (FIXED AS REQUESTED)
      total = hours < 2 ? WHOLE_PLACE_MIN : hours * WHOLE_PLACE_RATE;
    }

    // Additional options only apply to table rental
    if (rentalType.value === "table" || "whole") {
      if (projector) total += hours * PROJECTOR_RATE;
      if (speaker) total += hours * SPEAKER_RATE;
    }

    estimatedCost = total;

    // 12-hour format
    const endPeriod = endHour >= 12 ? "PM" : "AM";
    const displayHour = ((endHour + 11) % 12) + 1;
    endTimeFormatted = `${displayHour}:${endMinute.toString().padStart(2, "0")} ${endPeriod}`;

    estimateContainer.style.display = "block";
    estimateContainer.innerHTML = `
      <strong>Estimated Cost:</strong> ₱${estimatedCost.toFixed(2)}<br>
      <strong>Expected End Time:</strong> ${endTimeFormatted}<br>
      <strong>Rental Type:</strong> ${rentalType.value === "whole" ? "Whole Place" : "Table Only"}
    `;

    submitBtn.disabled = false;
  });

  // FORM SUBMIT
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const studentId = document.getElementById("studentId");
    const rentalType = document.querySelector("input[name='rentalType']:checked");

    if (!email.checkValidity() || !phone.checkValidity() || !studentId.checkValidity()) {
      alert("Please fill out all fields correctly before submitting.");
      return;
    }

    if (!rentalType) {
      alert("Please select rent type before submitting.");
      return;
    }

    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    reservations.push({
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: email.value,
      phone: phone.value,
      studentId: studentId.value,
      date: document.getElementById("date").value,
      startTime: document.getElementById("startTime").value,
      hours: document.getElementById("hours").value,
      guests: document.getElementById("guests").value,
      rentalType: rentalType.value,
      status: "Pending"
    });

    localStorage.setItem("reservations", JSON.stringify(reservations));

    confirmationMessage.style.display = "block";
    confirmationMessage.textContent = 
      `Reservation Sent! Awaiting admin approval. Type: ${rentalType.value === "whole" ? "Whole Place" : "Table Only"} — Estimated Fee: ₱${estimatedCost.toFixed(2)} (Ends at ${endTimeFormatted})`;

    form.reset();
    estimateContainer.style.display = "none";
    submitBtn.disabled = true;

    setTimeout(() => {
      confirmationMessage.style.display = "none";
    }, 7000);
  });
});
