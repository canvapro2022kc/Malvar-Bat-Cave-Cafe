document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reserveForm");
    const calculateBtn = document.getElementById("calculateBtn");
    const estimateContainer = document.getElementById("estimateContainer");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const submitBtn = document.getElementById("submitBtn");

    const BASE_RATE = 50;     
    const MIN_FEE = 75;       
    const PROJECTOR_RATE = 150;
    const SPEAKER_RATE = 150;

    let estimatedCost = 0;
    let endTimeFormatted = "";

    // Convert 24h hour to 12h format
    function formatTime(hour, minute) {
        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = ((hour + 11) % 12) + 1;
        return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
    }

    // Check if time is within operating hours (1 PM to 1 AM)
    function isValidOperatingTime(hour) {
        return (hour >= 13 && hour <= 23) || (hour >= 0 && hour < 1);
    }

    calculateBtn.addEventListener("click", () => {
        const hours = parseFloat(document.getElementById("hours").value);
        const startTime = document.getElementById("startTime").value;
        const projector = document.getElementById("projector").checked;
        const speaker = document.getElementById("speaker").checked;

        if (!hours || hours <= 0) { alert("Enter valid hours."); return; }
        if (!startTime) { alert("Select start time."); return; }

        const [hour, minute] = startTime.split(":").map(Number);
        if (!isValidOperatingTime(hour)) {
            alert("Start time must be within 1 PM – 1 AM");
            return;
        }

        // Calculate end time
        let endHour = hour + Math.floor(hours);
        let endMinute = minute + Math.round((hours % 1) * 60);
        if (endMinute >= 60) { endHour += 1; endMinute -= 60; }
        endHour = endHour % 24;

        if (!isValidOperatingTime(endHour)) {
            alert("End time must be within 1 PM – 1 AM");
            return;
        }

        // Calculate total cost
        let total = hours < 2 ? MIN_FEE : hours * BASE_RATE;
        if (projector) total += hours * PROJECTOR_RATE;
        if (speaker) total += hours * SPEAKER_RATE;
        estimatedCost = total;

        endTimeFormatted = formatTime(endHour, endMinute);

        estimateContainer.style.display = "block";
        estimateContainer.innerHTML = `
            <strong>Estimated Cost:</strong> ₱${estimatedCost.toFixed(2)}<br>
            <strong>Expected End Time:</strong> ${endTimeFormatted}
        `;
        submitBtn.disabled = false;
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const studentId = document.getElementById("studentId").value.trim();
        const date = document.getElementById("date").value;
        const startTime = document.getElementById("startTime").value;
        const hours = document.getElementById("hours").value;
        const projector = document.getElementById("projector").checked ? 1 : 0;
        const speaker = document.getElementById("speaker").checked ? 1 : 0;

        if (!firstName || !lastName || !email || !phone || !studentId || !date || !startTime || !hours) {
            alert("Please fill out all fields.");
            return;
        }

        fetch("reserve.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                firstName,
                lastName,
                email,
                phone,
                studentId,
                date,
                startTime,
                hours,
                projector,
                speaker,
                totalCost: estimatedCost
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                confirmationMessage.style.display = "block";
                confirmationMessage.textContent = `Reservation Sent! Await admin approval. Fee: ₱${estimatedCost.toFixed(2)} (Ends at ${endTimeFormatted})`;
                form.reset();
                estimateContainer.style.display = "none";
                submitBtn.disabled = true;
                setTimeout(() => confirmationMessage.style.display = "none", 7000);
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            console.error(err);
            alert("Error submitting reservation.");
        });
    });
});
