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

// define all functions required by app

// convert sql output to json
function get_json($sql) {
    $result = $GLOBALS['conn']->query($sql);
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    return json_encode($rows);
}

// check to see if name exists in heroes table, name column
function hero_exists()
{
    $hero_name = json_decode(file_get_contents('php://input'),true)['userName'];
    // count(*) output will automatically be boolean since name field has unique constraint
    $sql = 'select count(*) as hero_exists from heroes where name = "' . $hero_name. '";';
    echo get_json($sql);
}

// user superglobals to handle requests from the app
// determine which function to run,
// and whether the current user has the right to run it

if (function_exists($_GET['f'])) {
    if($_GET['u'] == '123') {
        $_GET['f']();
    } else {
        echo 'WRONG USER';
    }
}
