document.addEventListener("DOMContentLoaded", () => {

    // ----------------------
    // TAB SWITCHING
    // ----------------------
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

    // ----------------------
    // MENU MANAGEMENT
    // ----------------------
    const menuForm = document.getElementById("menuForm");
    const menuList = document.getElementById("menuList");

    function loadMenus() {
        fetch("admin-menu.php?action=get")
            .then(r => r.json())
            .then(data => {
                menuList.innerHTML = data.map(item => `
                    <li>
                        <span style="display:flex; align-items:center; gap:1rem;">
                            <img src="${item.image}" style="width:60px; height:60px; object-fit:cover; border-radius:6px; border:1px solid #c49b63;">
                            <div>
                                <strong>${item.name}</strong> (${item.category})<br>
                                <em>${item.description}</em><br>
                                Price: ₱${item.price}<br>
                                ${item.archived == 1 ? "<span style='color:#ffb300;'>[ARCHIVED]</span>" : ""}
                            </div>
                        </span>
                        <button class="action-btn archive" data-id="${item.id}">
                            ${item.archived == 1 ? "Restore" : "Archive"}
                        </button>
                    </li>
                `).join("");
            });
    }
    loadMenus();

    // IMAGE PREVIEW FIXED
    const menuImage = document.getElementById("menuImage");
    if (menuImage) {
        menuImage.addEventListener("change", function () {
            const file = this.files[0];
            const img = document.getElementById("previewImage");

            if (file && img) {
                img.src = URL.createObjectURL(file);
                img.style.display = "block";
            }
        });
    }

    menuForm.addEventListener("submit", e => {
        e.preventDefault();
        const formData = new FormData(menuForm);

        fetch("admin-menu.php?action=add", {
            method: "POST",
            body: formData
        }).then(() => {
            menuForm.reset();
            loadMenus();
        });
    });

    menuList.addEventListener("click", e => {
        if (e.target.classList.contains("archive")) {
            fetch("admin-menu.php?action=archive", {
                method: "POST",
                body: new URLSearchParams({ id: e.target.dataset.id })
            }).then(loadMenus);
        }
    });


    // ----------------------
    // EQUIPMENT MANAGEMENT
    // ----------------------
    const equipForm = document.getElementById("equipForm");
    const equipList = document.getElementById("equipList");

    function loadEquip() {
        fetch("admin-equipment.php?action=get")
            .then(r => r.json())
            .then(data => {
                equipList.innerHTML = data.map(eq => `
                    <li>
                        <span>${eq.name} - ₱${eq.rate}/hr ${eq.archived == 1 ? "[ARCHIVED]" : ""}</span>
                        <button class="action-btn archive" data-id="${eq.id}">
                            ${eq.archived == 1 ? "Restore" : "Archive"}
                        </button>
                    </li>
                `).join("");
            });
    }
    loadEquip();

    equipForm.addEventListener("submit", e => {
        e.preventDefault();
        const formData = new FormData(equipForm);

        fetch("admin-equipment.php?action=add", {
            method: "POST",
            body: formData
        }).then(() => {
            equipForm.reset();
            loadEquip();
        });
    });

    equipList.addEventListener("click", e => {
        if (e.target.classList.contains("archive")) {
            fetch("admin-equipment.php?action=archive", {
                method: "POST",
                body: new URLSearchParams({ id: e.target.dataset.id })
            }).then(loadEquip);
        }
    });


    // ----------------------
    // RESERVATION MANAGEMENT
    // ----------------------
    const reservationList = document.getElementById("reservationList");

    function loadReservations() {
        fetch("admin-reservations.php?action=get")
            .then(r => r.json())
            .then(data => {
                reservationList.innerHTML = data.map(r => `
                    <li>
                        <span>
                            <strong>${r.first_name} ${r.last_name}</strong><br>
                            Date: ${r.reserve_date} | Time: ${r.start_time} | Hours: ${r.hours}<br>
                            Status: ${r.status}
                        </span>
                        ${r.status === "Pending" ? `
                            <button class="action-btn approve" data-id="${r.id}">Approve</button>
                            <button class="action-btn decline" data-id="${r.id}">Decline</button>
                        ` : ""}
                    </li>
                `).join("");
            });
    }
    loadReservations();

    reservationList.addEventListener("click", e => {
        if (e.target.classList.contains("approve")) {
            fetch("admin-reservations.php?action=approve", {
                method: "POST",
                body: new URLSearchParams({ id: e.target.dataset.id })
            }).then(loadReservations);
        }
        if (e.target.classList.contains("decline")) {
            fetch("admin-reservations.php?action=decline", {
                method: "POST",
                body: new URLSearchParams({ id: e.target.dataset.id })
            }).then(loadReservations);
        }
    });

});
