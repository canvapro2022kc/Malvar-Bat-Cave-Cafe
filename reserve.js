document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("reserveForm");
  const calculateBtn = document.getElementById("calculateBtn");
  const estimateContainer = document.getElementById("estimateContainer");
  const submitBtn = document.getElementById("submitBtn");

  const BASE_RATE = 50;
  const MIN_FEE = 75;
  const PROJECTOR_RATE = 150;
  const SPEAKER_RATE = 150;
  const WHOLE_PLACE_RATE = 1000;
  const WHOLE_PLACE_MIN = 1800;

  let estimatedCost = 0;
  let endTimeFormatted = "";

  // -----------------------
  // Validation Functions
  // -----------------------
  const validateName = (name) => /^[A-Za-z]+$/.test(name.trim());
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const validatePhone = (phone) => /^09\d{9}$/.test(phone.trim());
  const validateStudentID = (id) => /^2([0-6])-\d{5}$/.test(id.trim());

  function validateDate(dateValue) {
    if (!dateValue) return false;
    const selectedDate = new Date(dateValue);
    const today = new Date();
    today.setHours(0,0,0,0);
    return selectedDate >= today;
  }

  const validateRentalType = () =>
    !!document.querySelector("input[name='rentalType']:checked");

  const validateHours = (hours) => hours && parseFloat(hours) > 0;
  const validateStartTime = (time) => !!time;


  // -----------------------
  // Popup System (GLOBAL, FIXED)
  // -----------------------
  function showPopup(message) {
    document.getElementById("popupText").textContent = message;
    document.getElementById("popupOverlay").style.display = "flex";
  }

  document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("popupOverlay").style.display = "none";
  });


  // -----------------------
  // Enable Calculate Button
  // -----------------------
  function toggleButtons() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const studentId = document.getElementById("studentId").value;
    const date = document.getElementById("date").value;

    const allValid =
      validateName(firstName) &&
      validateName(lastName) &&
      validateEmail(email) &&
      validatePhone(phone) &&
      validateStudentID(studentId) &&
      validateDate(date) &&
      validateRentalType();

    calculateBtn.disabled = !allValid;
  }

  form.addEventListener("input", toggleButtons);
  form.addEventListener("change", toggleButtons);


  // -----------------------
  // Calculate Cost
  // -----------------------
  calculateBtn.addEventListener("click", () => {

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const date = document.getElementById("date").value;
    const hours = parseFloat(document.getElementById("hours").value);
    const startTime = document.getElementById("startTime").value;
    const rentalType = document.querySelector("input[name='rentalType']:checked");
    const projector = document.getElementById("projector").checked;
    const speaker = document.getElementById("speaker").checked;

    if (
      !validateName(firstName) ||
      !validateName(lastName) ||
      !validateEmail(email) ||
      !validatePhone(phone) ||
      !validateStudentID(studentId) ||
      !validateDate(date) ||
      !validateRentalType() ||
      !validateHours(hours) ||
      !validateStartTime(startTime)
    ) {
      alert("Please fill out all fields correctly before calculating.");
      return;
    }

    // TIME CALC
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

    // COST CALC
    let total = 0;

    if (rentalType.value === "table") {
      total = hours < 2 ? MIN_FEE : hours * BASE_RATE;
      if (projector) total += hours * PROJECTOR_RATE;
      if (speaker) total += hours * SPEAKER_RATE;

    } else {
      total = hours < 2 ? WHOLE_PLACE_MIN : hours * WHOLE_PLACE_RATE;
    }

    estimatedCost = total;

    // FORMAT TIME
    const endPeriod = endHour >= 12 ? "PM" : "AM";
    const displayHour = ((endHour + 11) % 12) + 1;

    endTimeFormatted = `${displayHour}:${String(endMinute).padStart(2, "0")} ${endPeriod}`;

    // SHOW ESTIMATE
    estimateContainer.style.display = "block";
    estimateContainer.innerHTML = `
      <strong>Estimated Cost:</strong> ₱${estimatedCost.toFixed(2)}<br>
      <strong>Expected End Time:</strong> ${endTimeFormatted}<br>
      <strong>Rental Type:</strong> ${
        rentalType.value === "whole" ? "Whole Place" : "Table Only"
      }
    `;

    submitBtn.disabled = false;
  });


  // -----------------------
  // Submit Reservation
  // -----------------------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const date = document.getElementById("date").value;
    const rentalType = document.querySelector("input[name='rentalType']:checked");

    // Final validation
    if (
      !validateName(firstName) ||
      !validateName(lastName) ||
      !validateEmail(email) ||
      !validatePhone(phone) ||
      !validateStudentID(studentId) ||
      !validateDate(date) ||
      !validateRentalType()
    ) {
      alert("Please fill out all fields correctly before submitting.");
      return;
    }

    // Save to localStorage
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push({
      firstName,
      lastName,
      email,
      phone,
      studentId,
      date,
      startTime: document.getElementById("startTime").value,
      hours: document.getElementById("hours").value,
      rentalType: rentalType.value,
      status: "Pending"
    });

    localStorage.setItem("reservations", JSON.stringify(reservations));

    // POPUP SUCCESS
    showPopup(
      `Reservation Sent! Awaiting admin approval. Type: ${
        rentalType.value === "whole" ? "Whole Place" : "Table Only"
      } — Estimated Fee: ₱${estimatedCost.toFixed(2)} (Ends at ${endTimeFormatted})`
    );

    // RESET
    form.reset();
    estimateContainer.style.display = "none";
    submitBtn.disabled = true;
    calculateBtn.disabled = true;
  });


  // -----------------------
  // Minimum Date
  // -----------------------
  const dateInput = document.getElementById("date");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;

});
