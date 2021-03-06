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

// find the relationship between two heroes
function get_relationship()
{
    $hero_info = json_decode(file_get_contents('php://input'), true);
    $sql =
        'select type_id from relationships
        where hero1_id in
        (select id from heroes
        where name = "' . $hero_info['hero1'] . '")
        and hero2_id in
        (select id from heroes
        where name = "' . $hero_info['hero2'] . '");';
    echo get_json($sql);
}

// update an existing relationship between two heroes
function update_relationship()
{
    $hero_info = json_decode(file_get_contents('php://input'), true);
    if ($_GET['u'] == $hero_info['userName']) {
        $sql =
            'update relationships
            set type_id = ' . $hero_info['relationshipType'] . '
            where hero1_id in
                (select id from heroes where name = "' . $hero_info['hero1'] . '")
            and hero2_id in
                (select id from heroes where name = "' . $hero_info['hero2'] . '");';
        if ($GLOBALS['conn']->query($sql) === TRUE) {
            echo "Updated successfully";
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo 'WRONG USER';
    }
}

// add a new relationship for heroes that don't have a defined relationship yet
function add_relationship()
{
    $hero_info = json_decode(file_get_contents('php://input'), true);
    if ($_GET['u'] == $hero_info['userName'])
    {
        $sql = 'insert into relationships (hero1_id, hero2_id, type_id)
        values (
            (select id from heroes where name = "' . $hero_info['hero1'] . '"),
            (select id from heroes where name = "' . $hero_info['hero2'] . '"),
            ' . $hero_info['relationshipType'] . ')';
        if ($GLOBALS['conn']->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo 'WRONG USER';
    }
}

// add a new relationship for heroes that don't have a defined relationship yet
function delete_relationship()
{
    $hero_info = json_decode(file_get_contents('php://input'), true);
    if ($_GET['u'] == $hero_info['userName'])
    {
        $sql = 'delete from relationships where hero1_id =
        (select id from heroes where name = "' . $hero_info['hero1'] . '")
        and hero2_id =
        (select id from heroes where name = "' . $hero_info['hero2'] . '")';
        if ($GLOBALS['conn']->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo 'WRONG USER';
    }
}


// get basic data about all heroes other than the current user
// including relationships
function get_all_heroes()
{
    $user_name = json_decode(file_get_contents('php://input'), true)['userName'];
    $sql =
        'select heroes.name, heroes.image_url, relationships_filtered.type_id
        from heroes
        left outer join
        (select hero2_id, type_id
        from relationships
        where relationships.hero1_id in
        (select id from heroes where name = "' . $user_name . '"))
        as relationships_filtered
        on heroes.id = relationships_filtered.hero2_id
        where not heroes.name = "' . $user_name . '"
        order by relationships_filtered.type_id desc;';
    echo get_json($sql);
}

// update a hero's info in the heroes table (any field)
function update_user()
{
    $user_info = json_decode(file_get_contents('php://input'), true);
    if ($_GET['u'] == $user_info['userName']) {
        $sql = 'update heroes set ' . $user_info['field'] . ' = "' . $user_info['value'] . '" where name = "' . $user_info['userName'] . '"';
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
    $user_info = json_decode(file_get_contents('php://input'), true);
    // make sure that the current user is the user whose account is being deleted
    if ($_GET['u'] == $user_info['userName']) {
        // first, delete matching records from the relationships table
        $sql = 'delete from relationships where hero1_id = 
            (select id from heroes where name = "' . $user_info['userName'] . '")
            or hero2_id =
            (select id from heroes where name = "' . $user_info['userName'] . '")';
        if ($GLOBALS['conn']->query($sql) === TRUE) {
            echo "Updated successfully";
        } else {
            echo "Error: " . $conn->error;
        }
        // finally, delete from the heroes table
        $sql = 'delete from heroes where name = "' . $user_info['userName'] . '"';
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
