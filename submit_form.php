<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Process the form submission
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Example: Save to a file or send an email
    // Replace this with your actual processing logic

    // Example response (for testing purposes)
    echo "Form submitted successfully!";
} else {
    // Handle other HTTP methods if necessary
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
