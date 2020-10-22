<?php
    include("includes/config.php");
    $users = new Users();

    // Check if user is logged in correctly
    $secret = $users->getSecret($_SESSION["username"]);
    if (!isset($_SESSION["username"]) || $_SESSION["active"] != $secret) {
        header("location: index.php");
    }

    // Get target folder and upload file
    $target_dir = "upload/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $sourceMessage = $_REQUEST["source"];
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if image file is a actual image or fake image
    if (isset($_POST["submit"])) {
        $check = getimagesize($_FILES["image"]["tmp_name"]);
        if ($check !== false) {
            $uploadOk = 1;
        } else {
            $message = "Filen är inte en bild";
            header("Location: portfolio.php?message=$message");
        }
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        $message = "Bilden finns redan";
        header("Location: portfolio.php?message=$message");
    }

    // Check file size
    if ($_FILES["image"]["size"] > 500000) {
        $message = "Bilden är för stor";
        header("Location: portfolio.php?message=$message");
    }

    // Allow certain file formats
    if (
        $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif"
    ) {
        $message = "Endast JPG, JPEG, PNG & GIF bilder är tillåtna";
        header("Location: portfolio.php?message=$message");
    }

    // Check if $uploadOk
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            if($sourceMessage == "create") {
                $message = "Skapade ny referens med bilden " . htmlspecialchars(basename($_FILES["image"]["name"]));
            } else {
                $message = "Editerade referens och bytte till bilden " . htmlspecialchars(basename($_FILES["image"]["name"]));
            }
            header("Location: portfolio.php?message=$message");
        } else {
            $message = "Tyvärr kunde inte bilden laddas upp";
            header("Location: portfolio.php?message=$message");
        }
    }
?>