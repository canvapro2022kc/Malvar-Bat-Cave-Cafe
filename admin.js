// admin.js
document.addEventListener("DOMContentLoaded", () => {
    // ---- TAB SWITCHING ----
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");
  
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
      });
    });
  
    // ---- MENU MANAGEMENT ----
    const menuForm = document.getElementById("menuForm");
    const menuList = document.getElementById("menuList");
    let menus = JSON.parse(localStorage.getItem("menus")) || [];
  
    function renderMenus() {
      menuList.innerHTML = menus.map((item, i) => `
        <li>
          <span>${item.name} - ₱${item.price} (${item.category}) ${item.archived ? "[ARCHIVED]" : ""}</span>
          <button class="action-btn archive" data-index="${i}">${item.archived ? "Restore" : "Archive"}</button>
        </li>
      `).join("");
    }
  
    menuForm.addEventListener("submit", e => {
      e.preventDefault();
      menus.push({
        name: menuForm.menuName.value,
        price: menuForm.menuPrice.value,
        category: menuForm.menuCategory.value,
        archived: false
      });
      localStorage.setItem("menus", JSON.stringify(menus));
      menuForm.reset();
      renderMenus();
    });
  
    menuList.addEventListener("click", e => {
      if (e.target.classList.contains("archive")) {
        const i = e.target.dataset.index;
        menus[i].archived = !menus[i].archived;
        localStorage.setItem("menus", JSON.stringify(menus));
        renderMenus();
      }
    });
  
    renderMenus();
  
    // ---- EQUIPMENT MANAGEMENT ----
    const equipForm = document.getElementById("equipForm");
    const equipList = document.getElementById("equipList");
    let equipments = JSON.parse(localStorage.getItem("equipments")) || [];
  
    function renderEquipments() {
      equipList.innerHTML = equipments.map((eq, i) => `
        <li>
          <span>${eq.name} - ₱${eq.rate}/hr ${eq.archived ? "[ARCHIVED]" : ""}</span>
          <button class="action-btn archive" data-index="${i}">${eq.archived ? "Restore" : "Archive"}</button>
        </li>
      `).join("");
    }
  
    equipForm.addEventListener("submit", e => {
      e.preventDefault();
      equipments.push({
        name: equipForm.equipName.value,
        rate: equipForm.equipRate.value,
        archived: false
      });
      localStorage.setItem("equipments", JSON.stringify(equipments));
      equipForm.reset();
      renderEquipments();
    });
  
    equipList.addEventListener("click", e => {
      if (e.target.classList.contains("archive")) {
        const i = e.target.dataset.index;
        equipments[i].archived = !equipments[i].archived;
        localStorage.setItem("equipments", JSON.stringify(equipments));
        renderEquipments();
      }
    });
  
    renderEquipments();
  
    // ---- RESERVATION CONTROL ----
    const reservationList = document.getElementById("reservationList");
    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  
    // limit to 20 guests per time slot
    const MAX_CAPACITY = 20;
  
    function renderReservations() {
      reservationList.innerHTML = reservations.map((r, i) => `
        <li>
          <span>
            <strong>${r.firstName} ${r.lastName}</strong><br>
            Date: ${r.date} | Time: ${r.startTime} | Hours: ${r.hours}<br>
            Guests: ${r.guests} | Status: ${r.status}
          </span>
          ${r.status === "Pending" ? `
            <button class="action-btn approve" data-index="${i}">Approve</button>
            <button class="action-btn decline" data-index="${i}">Decline</button>
          ` : ""}
        </li>
      `).join("");
    }
  
    reservationList.addEventListener("click", e => {
      const i = e.target.dataset.index;
      if (e.target.classList.contains("approve")) {
        const res = reservations[i];
        // Check total guests for overlapping time
        const sameTime = reservations.filter(r =>
          r.date === res.date &&
          r.startTime === res.startTime &&
          r.status === "Approved"
        );
  
        const currentTotal = sameTime.reduce((sum, r) => sum + Number(r.guests), 0);
        const newTotal = currentTotal + Number(res.guests);
  
        if (newTotal > MAX_CAPACITY) {
          alert("Cannot approve: exceeds 20-person limit at that time.");
          return;
        }
  
        res.status = "Approved";
      }
      else if (e.target.classList.contains("decline")) {
        reservations[i].status = "Declined";
      }
  
      localStorage.setItem("reservations", JSON.stringify(reservations));
      renderReservations();
    });
  
    renderReservations();
  
    // ---- LOGOUT ----
    document.getElementById("logoutBtn").addEventListener("click", () => {
      window.location.href = "index.html";
    });

  });
  