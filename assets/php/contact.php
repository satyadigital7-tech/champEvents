<?php
/**
 * CHAMP EVENTS — Contact Form Handler
 * +91 9666670066
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// Sanitize inputs
function clean($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

$name       = clean($_POST['name']       ?? '');
$phone      = clean($_POST['phone']      ?? '');
$email      = clean($_POST['email']      ?? '');
$event_type = clean($_POST['event_type'] ?? '');
$event_date = clean($_POST['event_date'] ?? '');
$message    = clean($_POST['message']    ?? '');

// Validate required fields
if (empty($name) || empty($phone) || empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

// Validate phone (basic)
if (!preg_match('/^[0-9+\-\s]{7,15}$/', $phone)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid phone number.']);
    exit;
}

// Compose email
$to      = 'champevents2017@gmail.com'; // Update with actual email
$subject = "New Event Inquiry from $name — Champ Events";

$body = "
CHAMP EVENTS — NEW INQUIRY
===========================
Name:       $name
Phone:      $phone
Email:      $email
Event Type: $event_type
Event Date: $event_date

Message:
$message

---
Received: " . date('d M Y, H:i A') . "
";

$headers  = "From: Champ Events Website <noreply@champevents.in>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your inquiry has been received. We will contact you within 24 hours.'
    ]);
} else {
    // Log error for debugging
    error_log("Champ Events: mail() failed for inquiry from $name ($email)");
    echo json_encode([
        'success' => false,
        'message' => 'Oops! Something went wrong. Please call us directly at +91 9666670066.'
    ]);
}
?>
