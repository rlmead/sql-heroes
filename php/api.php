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
function get_json($sql)
{
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
    $hero_name = json_decode(file_get_contents('php://input'), true)['userName'];
    // count(*) output will automatically be boolean since name field has unique constraint
    $sql = 'select count(*) as hero_exists from heroes where name = "' . $hero_name . '";';
    echo get_json($sql);
}

// add a new hero to the heroes table
function add_hero()
{
    $hero_info = json_decode(file_get_contents('php://input'), true);
    $sql = 'insert into heroes (name, about_me, biography, image_url) values ("' . $hero_info['userName'] . '", "' . $hero_info['aboutMe'] . '", "' . $hero_info['biography'] . '", null)';
    if ($GLOBALS['conn']->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $conn->error;
    }
}

// retrieve a hero's image from the heroes table
function get_hero_data()
{
    $hero_info = json_decode(file_get_contents('php://input'), true);
    $sql = 'select ' . $hero_info['field'] . ' from heroes where name = "' . $hero_info['heroName'] . '";';
    echo get_json($sql);
}

// update a hero's info in the heroes table (any field)
function update_user()
{
    $hero_info = json_decode(file_get_contents('php://input'), true);
    if ($_GET['u'] == $hero_info['userName']) {
        $sql = 'update heroes set ' . $hero_info['field'] . ' = "' . $hero_info['value'] . '" where name = "' . $hero_info['userName'] . '"';
        if ($GLOBALS['conn']->query($sql) === TRUE) {
            echo "Updated successfully";
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo 'WRONG USER';
    }
}

// delete a hero from the heroes table
function delete_user()
{
    $hero_info = json_decode(file_get_contents('php://input'), true);
    if ($_GET['u'] == $hero_info['userName']) {
        $sql = 'delete from heroes where name = "' . $hero_info['userName'] . '"';
        if ($GLOBALS['conn']->query($sql) === TRUE) {
            echo "Updated successfully";
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo 'WRONG USER';
    }
}

// use superglobals to handle requests from the app
// determine which function to run,
// and whether the current user has the right to run it

if (function_exists($_GET['f'])) {
    // if ($_GET['u'] == '123') {
    $_GET['f']();
}
