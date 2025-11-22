<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require "db_connect.php";
header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

if ($action === "get") {
    $result = $conn->query("SELECT * FROM equipment ORDER BY id DESC");
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    exit;
}

if ($action === "add") {
    $name = $_POST['name'];
    $rate = $_POST['rate'];

    $stmt = $conn->prepare("INSERT INTO equipment(name,rate) VALUES (?,?)");
    $stmt->bind_param("sd", $name, $rate);
    $stmt->execute();

    echo json_encode(["status"=>"success"]);
    exit;
}

if ($action === "archive") {
    $id = $_POST['id'];

    $conn->query("UPDATE equipment SET archived = 1 - archived WHERE id = $id");
    echo json_encode(["status"=>"success"]);
    exit;
}

?>
