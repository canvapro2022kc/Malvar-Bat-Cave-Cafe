<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require "db_connect.php";
header("Content-Type: application/json");

$action = $_GET["action"] ?? "";

/* =====================================================
GET MENU ITEMS
===================================================== */
if ($action === "get") {
    $result = $conn->query("SELECT * FROM menu ORDER BY id DESC");
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    exit;
}

/* =====================================================
ADD MENU ITEM
===================================================== */
if ($action === "add") {

    if (!isset($_POST["name"], $_POST["description"], $_POST["price"], $_POST["category"])) {
        echo json_encode(["status" => "error", "message" => "Missing fields"]);
        exit;
    }

    $name = $_POST["name"];
    $description = $_POST["description"];
    $price = $_POST["price"];
    $category = $_POST["category"];

    $imagePath = "";

    // Handle image upload
    if (!empty($_FILES["image"]["name"])) {
        $uploadDir = "uploads/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileName = time() . "_" . basename($_FILES["image"]["name"]);
        $target = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target)) {
            $imagePath = $target;
        }
    }

    $stmt = $conn->prepare("
        INSERT INTO menu (name, description, image, price, category, archived, created_at)
        VALUES (?, ?, ?, ?, ?, 0, NOW())
    ");
    $stmt->bind_param("sssds", $name, $description, $imagePath, $price, $category);
    $stmt->execute();

    echo json_encode(["status" => "success"]);
    exit;
}

/* =====================================================
ARCHIVE / RESTORE MENU ITEM 
===================================================== */
if ($action === "archive") {
    $id = $_POST["id"] ?? 0;

    if (!$id) {
        echo json_encode(["status" => "error", "message" => "Missing menu ID"]);
        exit;
    }

    // Toggle archived status (1 → 0, 0 → 1)
    $conn->query("UPDATE menu SET archived = 1 - archived WHERE id = $id");

    echo json_encode(["status" => "success"]);
    exit;
}

echo json_encode(["status" => "error", "message" => "Invalid action"]);
exit;
