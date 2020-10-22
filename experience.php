<?php
    /* 
    DT173G - Webbutveckling III
    Project
    Author: Michael Glimmerdahl
    Date: 2020-10-18
    */

    include("includes/config.php");
    $users = new Users();

    // Check if user is logged in correctly
    $secret = $users->getSecret($_SESSION["username"]);
    if (!isset($_SESSION["username"]) || $_SESSION["active"] != $secret) {
        header("location: index.php");
    }
?>

<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <title>Erfarenhet</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <div class="container">
        <!-- Header with logo and nav -->
        <header>
            <div class="center-text">
                <span class="logo-name">Michael<br />Glimmerdahl</span>
                <br />
                <span class="logo-title">webbutvecklare</span>
            </div>
            <div id="hamburgerMenu" class="hamburger-menu active" onClick="toggleMenu()">&#9776;</div>
            <div id="closeMenu" class="hamburger-menu close-button" onClick="toggleMenu()">&times;</div>
            <nav id="navMenu">
                <ul id="menuContent" class="menu-content">
                    <li class="loged-in">Inloggad som: <?php echo $_SESSION["username"]; ?></li>
                    <li><a href="portfolio.php">Portfolio</a></li>
                    <li><a href="education.php">Utbildningar</a></li>
                    <li><a class="current" href="experience.php">Erfarenhet</a></li>
                    <li><a href="index.php?Logout=1">Logga ut</a></li>
                </ul>
            </nav>
        </header>
        <h4>Erfarenhet</h4>
        <div id="message">
            <?php
                // Check if message is sent
                if(isset($_REQUEST["message"])) {
                    echo $_REQUEST["message"];
                }
            ?>
        </div>
        <main>
            <div id="experience" class="experience"></div>
        </main>
        <h4 id="formHeader">Lägg till erfarenhet</h4>
        <div class="form-container">

            <!-- Form used for both create and edit references -->
            <form id="experienceForm" class="form">
                <label for="header"><b>Rubrik:</b></label>
                <input type="text" name="header" id="header" value="" required />
                <label for="position"><b>Tjänst:</b></label>
                <input type="text" name="position" id="position" value="" required />
                <label for="year"><b>Årtal:</b></label>
                <input type="text" name="year" id="year" value="" required />
                <label for="description"><b>Beskrivning:</b></label>
                <textarea name="description" id="description" required></textarea>
                <input type="submit" id="saveExperience" value="Spara erfarenhet">
            </form>

            <!-- Element to create abort button from JavaScript -->
            <div id="abort"></div>
        </div>
    </div>
    <script src="js/main.js"></script>
    <script src="js/experience.js"></script>
</body>
</html>