<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');

    // Database connection
    $conn = new mysqli("localhost", "root", "", "matcavecafe");
    if ($conn->connect_error) {
        echo json_encode(["status" => "error", "message" => "Connection Failed: " . $conn->connect_error]);
        exit;
    }

    // Collect & sanitize input
    $first_name = trim($_POST['firstName'] ?? '');
    $last_name  = trim($_POST['lastName'] ?? '');
    $email      = trim($_POST['email'] ?? '');
    $phone      = trim($_POST['phone'] ?? '');
    $student_id = trim($_POST['studentId'] ?? '');
    $reserve_date = $_POST['date'] ?? '';
    $start_time   = $_POST['startTime'] ?? '';
    $hours        = (int)($_POST['hours'] ?? 0);
    $projector    = isset($_POST['projector']) ? 1 : 0;
    $speaker      = isset($_POST['speaker']) ? 1 : 0;
    $total_cost   = (float)($_POST['totalCost'] ?? 0);

    // Validate required fields
    if (!$first_name || !$last_name || !$email || !$phone || !$student_id || !$reserve_date || !$start_time || $hours <= 0) {
        echo json_encode(["status" => "error", "message" => "Please fill in all required fields correctly."]);
        exit;
    }

    // Calculate end time in PHP
    $start_datetime = DateTime::createFromFormat('Y-m-d H:i', "$reserve_date $start_time");
    if (!$start_datetime) {
        echo json_encode(["status" => "error", "message" => "Invalid date or time format."]);
        exit;
    }
    $end_datetime = clone $start_datetime;
    $end_datetime->modify("+$hours hours");

    $start_time_str = $start_datetime->format('H:i:s');
    $end_time_str   = $end_datetime->format('H:i:s');

    // Check for conflicting reservations
    $stmt = $conn->prepare("
        SELECT * FROM reservations
        WHERE reserve_date = ?
          AND status = 'Confirmed'
          AND (
                (start_time < ? AND ADDTIME(start_time, SEC_TO_TIME(hours*3600)) > ?)
              )
    ");
    $stmt->bind_param("sss", $reserve_date, $end_time_str, $start_time_str);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Selected time slot is already booked. Please choose another time."]);
        exit;
    }

    // Insert reservation
    $stmt = $conn->prepare("
        INSERT INTO reservations 
        (first_name, last_name, email, phone, student_id, reserve_date, start_time, hours, projector, speaker, total_cost)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->bind_param(
        "ssssssiiidd",
        $first_name, $last_name, $email, $phone, $student_id,
        $reserve_date, $start_time_str, $hours, $projector, $speaker, $total_cost
    );

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Reservation submitted! Await admin confirmation."]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reserve a Table | Malvar Cave Café</title>
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="reserve.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Josefin+Sans:wght@300;400;700&family=Poppins:wght@300;400;700&display=swap" rel="stylesheet" />
</head>

<body>
  <!-- Navigation -->
  <div class ="container">
  <nav class="navbar">
    <div class="logo">
      <div class="logo-text">
        <img src="images/bcclogo.png" alt="Coffee Icon" class="logo-icon" />
        <img src="images/bcctextbasedlogo.png" alt="Malvar Bat Cave Cafe Logo" class="logo-img" />
      </div>
    </div>
    <div class="nav-right">
    <div class="navigation">
      <a href="index.php">Home</a>
      <a href="menu.php">Menu</a>
      <a href="reserve.php">Book</a>
    </div>
    </div>
  </nav>

  <!-- Reservation Section -->
  <section class="reservation">
    <h1 class="main-heading"><em>Reserve Your Table</em></h1>
    <p class="reserve-subtext">
      Plan your perfect café moment. Choose your date, time, and extras <br>— we’ll handle the rest.
    </p>

    <!-- Booking Rates Table -->
    <div class="rates-section">
      <h2 class="rates-heading">📋 Booking Rates</h2>
      <table class="rates-table">
        <thead>
          <tr>
            <th>Booking Rate Detail</th>
            <th>Price (PHP)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Base Hourly Rate</td>
            <td>₱50.00 / hour</td>
          </tr>
          <tr>
            <td>Minimum Fee</td>
            <td>₱75.00 <br><span class="small-note">(booking less than 2 hours)</span></td>
          </tr>
          <tr>
            <td>Projector</td>
            <td>₱150.00 / hour</td>
          </tr>
          <tr>
            <td>Speaker &amp; Mic</td>
            <td>₱150.00 / hour</td>
          </tr>
          <tr class="category-row">
            <td colspan="2">FOR EVENTS AND GATHERING</td>
          </tr>
          <tr>
            <td>Whole Place Rental</td>
            <td>₱1000.00 / hour</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br> <br>

    <form class="reserve-form" id="reserveForm">
      <div class="input-group">
        <input type="text" id="firstName" placeholder="First Name" required>
        <input type="text" id="lastName" placeholder="Last Name" required>
      </div>

      <div class="input-group">
        <input type="email" id="email" placeholder="Email Address" required>
        <input type="tel" id="phone" placeholder="09xxxxxxxxx" pattern="^09\d{9}$" title="Enter a valid PH phone number (e.g., 09269647382)" required>
      </div>

      <div class="input-group">
        <input type="text" id="studentId" placeholder="Student ID (e.g., 24-62218)" pattern="^2[0-6]-\d{5}$" title="Enter a valid Student ID in the format 2X-XXXXX, where X is 0–6" required>
        <input type="number" id="hours" placeholder="Number of Hours" min="1" required>
      </div>

      <div class="input-group">
        <input type="date" id="date" required>
        <input type="time" id="startTime" min="13:00" max="23:59" required>
      </div>
      <small class="note">Operating Hours: 1:00 PM – 1:00 AM</small>

      <div class="rental-type">
        <label><input type="radio" name="rentalType" value="table"> Rent a Table</label><br>
        <label><input type="radio" name="rentalType" value="whole"> Rent the Whole Place</label>
      </div>

      <div class="equipment-options">
        <label><input type="checkbox" id="projector"> 
          <span>Projector (₱150/hour)</span>
        </label>
        <label><input type="checkbox" id="speaker"> 
          <span>Speaker &amp; Mic (₱150/hour)</span>
        </label>
      </div>

      <div class="button-group">
        <button type="button" class="menu-btn" id="calculateBtn">Calculate Cost</button>
        <button type="submit" class="menu-btn" id="submitBtn" disabled>Submit Reservation</button>
      </div>

      <div id="estimateContainer" class="estimate-box" style="display:none;"></div>

    <div id="confirmationMessage" class="confirmation-message"></div>
    </form>

    <a href="index.html" class="back-home">
      <i class="fa-solid fa-arrow-left"></i> Back to Home
    </a>
  </section> 

  <!-- Footer -->
  <footer>
    <p class="copyright">&copy; 2025 Malvar Cave Café. All Rights Reserved.</p>
  </footer>
  </div>

  <div id="popupOverlay" class="popup-overlay">
    <div class="popup-box">
      <p id="popupText"></p>
      <button id="closePopup">OK</button>
    </div>
  </div> 

  <script src="reserve.js"></script>
  <script src="admin-key.js"></script>
  <script src="light.js"></script>
  <script src="theme.js"></script>
  <script src="bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
