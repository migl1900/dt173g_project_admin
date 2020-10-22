<?php
    /* 
    DT173G - Webbutveckling III
    Project
    Author: Michael Glimmerdahl
    Date: 2020-10-18
    */
    
    // If Logout request unset session and redirect to login page
    if(isset($_REQUEST["Logout"])) {
        session_unset();
        header('Location:' . $_SERVER['PHP_SELF']);
    }

    // If prior session exits redirect to secure page
    include("includes/config.php");
    if (isset($_SESSION["username"])) {
        header("location: portfolio.php");
    }

    $username = "";
    $password = "";

    $users = new Users();

    // If login button pressed
    if (isset($_REQUEST["Login"])) {
        $username = $_REQUEST["username"];
        $password = $_REQUEST["password"];

        if ($users->loginUser($username, $password)) {
            header("Location: portfolio.php");
        } else {
            $loginMessage = "<div class='error'>Felaktigt användarnamn / lösenord</div>";
            $username = $_REQUEST["username"];
            $password = $_REQUEST["password"];
        }
    }
?>

<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <title>Login</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <div class="container">
        <div class="center-text">
            <span class="logo-name">Michael<br />Glimmerdahl</span>
            <br />
            <span class="logo-title">webbutvecklare</span>
        </div>
        <br /><br />
        <div class="form-container center">
            <?php
                // Check if message is sent
                if (isset($loginMessage)) {
                    echo $loginMessage;
                }
            ?>
            <form method="post">
                <p>
                    <label for="username">Användarnamn</label>
                    <input type="text" name="username" id="username" value="<?= $username; ?>" required />
                </p>
                <p>
                    <label for="password">Lösenord</label>
                    <input type="password" name="password" id="password" autocomplete="on" value="<?= $password; ?>" required />
                </p>
                <p>
                    <input type="submit" value="Logga in" name="Login">
                </p>
            </form>
        </div>
    </div>
</body>
</html>