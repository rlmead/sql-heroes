<?php
// define connection arguments
$servername = "localhost";
$username = "root";
$password = "root";
$database = "sql_heroes";

// create connection
$conn = new mysqli($servername, $username, $password, $database);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function get_data()
{
    // do a query! print the stuff!
    $sql = "SELECT * FROM heroes";
    $result = $GLOBALS['conn']->query($sql);
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
}

// get_data();

// switch case depending on _GET
// switch () {

// }

// this is currently very insecure!
if (function_exists($_GET['f'])) {
    $_GET['f']();
    // if($_GET['u'] == 123) {
    // } else {
    //     echo 'WRONG USER';
    // }
}
