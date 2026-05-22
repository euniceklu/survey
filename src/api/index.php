<?php
header('Content-Type: application/json');

require_once '../config.php';
require_once '../database.php';

$database = new Database();
$conn = $database->getConnection();

$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod) {
    case 'GET':
        handleGetRequest($conn);
        break;
    case 'POST':
        handlePostRequest($conn);
        break;
    case 'PUT':
        handlePutRequest($conn);
        break;
    case 'DELETE':
        handleDeleteRequest($conn);
        break;
    default:
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

function handleGetRequest($conn) {
    // Implement logic to handle GET requests
    echo json_encode(["message" => "GET request received"]);
}

function handlePostRequest($conn) {
    // Implement logic to handle POST requests
    echo json_encode(["message" => "POST request received"]);
}

function handlePutRequest($conn) {
    // Implement logic to handle PUT requests
    echo json_encode(["message" => "PUT request received"]);
}

function handleDeleteRequest($conn) {
    // Implement logic to handle DELETE requests
    echo json_encode(["message" => "DELETE request received"]);
}
?>