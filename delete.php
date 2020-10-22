<?php
    include("includes/config.php");
    $users = new Users();

    // Check if user is logged in correctly
    $secret = $users->getSecret($_SESSION["username"]);
    if (!isset($_SESSION["username"]) || $_SESSION["active"] != $secret) {
        header("location: index.php");
    }

    // Delete image from upload folder
    if(isset($_REQUEST["file"])) {
        $file = $_REQUEST["file"];
        $path = "upload/";
        $delete = $path . $file;
        if(file_exists($delete)){
            unlink($delete);
            $message = "Referensen raderades inklusive bilden: " . $file;
        }else{
            $message = "Referensen raderades inte, ingen bild hittades";
        }
    } else {
        $message = "Referensen raderades inte, bildinformation saknas";
    }
    header("Location: portfolio.php?message=$message");
?>