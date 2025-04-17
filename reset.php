<?php
// Script to reset the chat history (for testing)
session_start();
unset($_SESSION['chat_history']);
header('Location: ai-assistant.php');
exit;
