document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reserveForm");
    const calculateBtn = document.getElementById("calculateBtn");
    const estimateContainer = document.getElementById("estimateContainer");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const submitBtn = document.getElementById("submitBtn");
  
    const BASE_RATE = 50;      // per hour
    const MIN_FEE = 75;        // if < 2 hours
    const PROJECTOR_RATE = 150;
    const SPEAKER_RATE = 150;
  
    let estimatedCost = 0;
    let endTimeFormatted = "";
  
    calculateBtn.addEventListener("click", () => {
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
  
      // Convert start time to hours/minutes
      const [hour, minute] = startTime.split(":").map(Number);
      let endHour = hour + hours;
      let endMinute = minute;
  
      // Handle wrap-around past midnight
      if (endHour >= 24) endHour -= 24;
  
      // Validate operating hours (1 PM - 1 AM)
      const validStart = hour >= 13 || hour < 1;
      const validEnd = endHour >= 13 || endHour < 1;
  
      if (!validStart || !validEnd) {
        alert("Reservation time must be between 1:00 PM and 1:00 AM.");
        return;
      }
  
      // Calculate cost
      let total = hours < 2 ? MIN_FEE : hours * BASE_RATE;
      if (projector) total += hours * PROJECTOR_RATE;
      if (speaker) total += hours * SPEAKER_RATE;
      estimatedCost = total;
  
      // Format end time (12-hour clock)
      const endPeriod = endHour >= 12 ? "PM" : "AM";
      const displayHour = ((endHour + 11) % 12) + 1;
      endTimeFormatted = `${displayHour}:${endMinute.toString().padStart(2, "0")} ${endPeriod}`;
  
      estimateContainer.style.display = "block";
      estimateContainer.innerHTML = `
        <strong>Estimated Cost:</strong> ₱${estimatedCost.toFixed(2)}<br>
        <strong>Expected End Time:</strong> ${endTimeFormatted}
      `;
      submitBtn.disabled = false;
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const studentId = document.getElementById("studentId");
      const date = document.getElementById("date").value;
      const startTime = document.getElementById("startTime").value;
      const hours = document.getElementById("hours").value;
      const guests = document.getElementById("guests").value;
    
      if (!email.checkValidity() || !phone.checkValidity() || !studentId.checkValidity()) {
        alert("Please fill out all fields correctly before submitting.");
        return;
      }
    
      // Save reservation to localStorage for admin
      let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
      reservations.push({
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: email.value,
        phone: phone.value,
        studentId: studentId.value,
        date,
        startTime,
        hours,
        guests,
        status: "Pending"
      });
      localStorage.setItem("reservations", JSON.stringify(reservations));
    
      confirmationMessage.style.display = "block";
      confirmationMessage.textContent = `Reservation Request Sent! Awaiting admin approval. Estimated Fee: ₱${estimatedCost.toFixed(2)} (Ends at ${endTimeFormatted})`;
    
      form.reset();
      estimateContainer.style.display = "none";
      submitBtn.disabled = true;
    
      setTimeout(() => {
        confirmationMessage.style.display = "none";
      }, 7000);
    });    
  });
  