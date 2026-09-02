<?php
session_start();

$_SESSION = [];
session_unset();
session_destroy();

// optional safety cookie clear
setcookie("PHPSESSID", "", time() - 3600, "/");

// Safely navigate up two directories from assets/api/ to the root
header("Location: ../../index.php");

exit;
?>