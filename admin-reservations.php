<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require "db_connect.php";
header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

/* =====================================================
FETCH RESERVATIONS
===================================================== */
if ($action === "get") {
    $stmt = $conn->prepare("SELECT * FROM reservations ORDER BY id DESC");
    $stmt->execute();
    $result = $stmt->get_result();
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    exit;
}

/* =====================================================
APPROVE RESERVATION  (Capacity + Whole Place Logic)
===================================================== */
if ($action === "approve") {

    if (!isset($_POST['id'])) {
        echo json_encode(["status" => "error", "message" => "Missing ID"]);
        exit;
    }

    $id = intval($_POST['id']);

    // Fetch reservation
    $stmt = $conn->prepare("SELECT * FROM reservations WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result()->fetch_assoc();

    if (!$res) {
        echo json_encode(["status" => "error", "message" => "Reservation not found"]);
        exit;
    }

    $date = $res['reserve_date'];
    $start = $res['start_time'];
    $hours = (int)$res['hours'];
    $rentalType = $res['rental_type']; // table or whole

    // Calculate end time
    $end = date("H:i:s", strtotime("$start +{$hours} hours"));


    /* =====================================================
    CHECK 1: Whole place already reserved?
    ====================================================== */
    $stmt = $conn->prepare("
        SELECT id FROM reservations
        WHERE reserve_date = ?
        AND rental_type = 'whole'
        AND status = 'Confirmed'
        AND (start_time < ? AND ADDTIME(start_time, SEC_TO_TIME(hours*3600)) > ?)
    ");
    $stmt->bind_param("sss", $date, $end, $start);
    $stmt->execute();
    $wholeConflict = $stmt->get_result();

    // Cannot approve a table booking if whole place already reserved
    if ($wholeConflict->num_rows > 0 && $rentalType !== "whole") {
        echo json_encode(["status" => "error", "message" => "Whole place is already booked for this time slot."]);
        exit;
    }


    /* =====================================================
    CHECK 2: If approving WHOLE PLACE, decline others
    ====================================================== */
    if ($rentalType === "whole") {

        // Decline all overlapping reservations
        $stmt = $conn->prepare("
            UPDATE reservations
            SET status = 'Declined'
            WHERE reserve_date = ?
            AND id != ?
            AND (start_time < ? AND ADDTIME(start_time, SEC_TO_TIME(hours*3600)) > ?)
        ");
        $stmt->bind_param("siss", $date, $id, $end, $start);
        $stmt->execute();

        // Approve whole-place
        $stmt = $conn->prepare("UPDATE reservations SET status='Confirmed' WHERE id=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        echo json_encode(["status" => "success", "message" => "Whole-place rental approved. All other bookings declined."]);
        exit;
    }


    /* =====================================================
    CHECK 3: Table Booking Capacity (Max 20)
    ====================================================== */

    // Count how many TABLE reservations are already approved for this time slot
    $stmt = $conn->prepare("
        SELECT COUNT(*) AS total
        FROM reservations
        WHERE reserve_date = ?
        AND status='Confirmed'
        AND rental_type='table'
        AND (start_time < ? AND ADDTIME(start_time, SEC_TO_TIME(hours*3600)) > ?)
    ");
    $stmt->bind_param("sss", $date, $end, $start);
    $stmt->execute();
    $countResult = $stmt->get_result()->fetch_assoc();

    $currentCount = (int)$countResult['total'];

    if ($currentCount >= 20) {
        echo json_encode(["status" => "error", "message" => "Cannot approve: 20 table reservations already booked for this time slot."]);
        exit;
    }

    // APPROVE SAFE
    $stmt = $conn->prepare("UPDATE reservations SET status='Confirmed' WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(["status" => "success"]);
    exit;
}


/* =====================================================
DECLINE RESERVATION
===================================================== */
if ($action === "decline") {
    if (!isset($_POST['id'])) {
        echo json_encode(["status" => "error", "message" => "Missing ID"]);
        exit;
    }

    $id = intval($_POST['id']);
    $stmt = $conn->prepare("UPDATE reservations SET status='Declined' WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(["status" => "success"]);
    exit;
}

echo json_encode(["status" => "error", "message" => "Invalid action"]);
exit;
?>
