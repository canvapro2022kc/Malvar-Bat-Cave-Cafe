document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reserveForm");
    const calculateBtn = document.getElementById("calculateBtn");
    const estimateContainer = document.getElementById("estimateContainer");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const submitBtn = document.getElementById("submitBtn");

    if (!form || !calculateBtn || !estimateContainer || !confirmationMessage || !submitBtn) {
        console.error("Missing one or more required elements in HTML.");
        return;
    }

    // Rates
    const BASE_RATE = 50;
    const MIN_FEE = 75;
    const PROJECTOR_RATE = 150;
    const SPEAKER_RATE = 150;
    const WHOLE_PLACE_RATE = 1000;

    let estimatedCost = 0;
    let endTimeFormatted = "";

    function formatTime(hour, minute) {
        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = ((hour + 11) % 12) + 1;
        return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
    }

    function isValidOperatingTime(hour) {
        return (hour >= 13 && hour <= 23) || hour === 0;
    }

    calculateBtn.addEventListener("click", () => {
        const hoursInput = document.getElementById("hours");
        const startTimeInput = document.getElementById("startTime");
        const rentalType = document.querySelector("input[name='rentalType']:checked");
        const projectorInput = document.getElementById("projector");
        const speakerInput = document.getElementById("speaker");

        if (!hoursInput || !startTimeInput || !rentalType || !projectorInput || !speakerInput) {
            alert("Some form elements are missing.");
            return;
        }

        const hours = parseFloat(hoursInput.value);
        const startTime = startTimeInput.value;
        const projector = projectorInput.checked;
        const speaker = speakerInput.checked;

        if (!hours || hours <= 0) return alert("Enter valid hours.");
        if (!startTime) return alert("Select a start time.");
        if (!rentalType) return alert("Choose a rental type.");

        const [hour, minute] = startTime.split(":").map(Number);
        if (!isValidOperatingTime(hour)) return alert("Start time must be within 1 PM – 1 AM.");

        let endHour = hour + Math.floor(hours);
        let endMinute = minute + Math.round((hours % 1) * 60);

        if (endMinute >= 60) {
            endHour++;
            endMinute -= 60;
        }
        endHour = endHour % 24;

        if (!isValidOperatingTime(endHour)) return alert("End time must be within 1 PM – 1 AM.");

        let total = 0;
        if (rentalType.value === "whole") {
            total = WHOLE_PLACE_RATE * hours + (projector ? PROJECTOR_RATE * hours : 0) + (speaker ? SPEAKER_RATE * hours : 0);
        } else {
            total = hours < 2 ? MIN_FEE : hours * BASE_RATE;
        }

        if (projector) total += hours * PROJECTOR_RATE;
        if (speaker) total += hours * SPEAKER_RATE;

        estimatedCost = total;
        endTimeFormatted = formatTime(endHour, endMinute);
        document.getElementById("totalCost").value = total;

        estimateContainer.style.display = "block";
        estimateContainer.innerHTML = `
            <strong>Estimated Cost:</strong> ₱${total.toFixed(2)}<br>
            <strong>Estimated End Time:</strong> ${endTimeFormatted}
        `;

        submitBtn.disabled = false;
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        fetch("reserve.php", { method: "POST", body: formData })
            .then(r => r.json())
            .then(data => {
                if (data.status === "success") {
                    confirmationMessage.style.display = "block";
                    confirmationMessage.textContent =
                    "Reservation Sent! Fee: ₱" +
                    estimatedCost.toFixed(2) +
                    " (Ends at " +
                    endTimeFormatted +
                    "). Await admin approval.";
                    
                    form.reset();
                    estimateContainer.style.display = "none";
                    submitBtn.disabled = true;

                    setTimeout(() => {
                        confirmationMessage.style.display = "none";
                    }, 6000);
                } else {
                    alert(data.message);
                }
            })
            .catch(err => {
                console.error(err);
                alert("Server error. Please try again.");
            });
    });
});
