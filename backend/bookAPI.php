<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];
$file = "./books.json";

switch($method){
    case "POST":
        $input = file_get_contents("php://input");
        postData($input, $file);
	break;
    case "GET":
        getData($file);
    break;
}


function postData($input, $file){

    file_put_contents($file, $input);
}

function getData($file){
    $data = file_get_contents($file);

    echo $data;
}


?>