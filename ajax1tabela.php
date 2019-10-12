<?php
  // Pegar os dados que estao na BDs e enviar em formato JSON para o ficheiro JavaScript
  include_once("config.php");
  header("Content-Type: application/json; charset=UTF-8");

  $query = "SELECT nome,idade,mail FROM users";
  $stmt = $mysqli->prepare($query);
  $stmt->execute();
  $result = $stmt->get_result();
  $output = $result->fetch_all(MYSQLI_ASSOC);

  echo json_encode($output);
?>