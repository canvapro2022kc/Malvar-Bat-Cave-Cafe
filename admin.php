<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Dashboard | Malvar Cave Café</title>
  <link rel="stylesheet" href="admin.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
</head>

<body>
  <nav class="admin-nav">
    <h1>☕ Malvar Bat Cave Café — Admin Panel</h1>
    <div class="logout">
      <button id="logoutBtn">Logout</button>
    </div>
  </nav>
  
  <main class="admin-container">
    <div class="tabs">
      <button class="tab active" data-tab="menu">Menu</button>
      <button class="tab" data-tab="equipments">Equipments</button>
      <button class="tab" data-tab="reservations">Reservations</button>
    </div>

    <!-- MENU MANAGEMENT -->
    <section id="menu" class="tab-content active">
      <h2>Menu Management</h2>
      <form id="menuForm" enctype="multipart/form-data">
        <input type="text" name="name" id="menuName" placeholder="Item Name" required>

        <textarea name="description" id="menuDescription" placeholder="Item Description" required></textarea>

        <input type="number" name="price" id="menuPrice" placeholder="Price (PHP)" required>

        <select name="category" id="menuCategory">
            <option value="Specialty Coffee">Specialty Coffee</option>
            <option value="Pastries">Pastries</option>
            <option value="Snacks">Snacks</option>
        </select>

        <input type="file" name="image" id="menuImage" accept="image/*" required>

        <button type="submit">Add Item</button>
      </form>

     <!-- Image Preview -->
      <img id="previewImage" src="" style="width:120px; margin-top:10px; display:none;">



      <ul id="menuList"></ul>
    </section>

    <!-- EQUIPMENT MANAGEMENT -->
    <section id="equipments" class="tab-content">
      <h2>Equipment Management</h2>
      <form id="equipForm">
        <input type="text" id="equipName" placeholder="Equipment Name" required>
        <input type="number" id="equipRate" placeholder="Hourly Rate (PHP)" required>
        <button type="submit">Add Equipment</button>
      </form>
      <ul id="equipList"></ul>
    </section>

    <!-- RESERVATION MANAGEMENT -->
    <section id="reservations" class="tab-content">
      <h2>Reservation Requests</h2>
      <ul id="reservationList"></ul>
    </section>
  </main>

  <script src="admin.js"></script>
  <script src="light.js"></script>
  <script src="theme.js"></script>
</body>
</html>
