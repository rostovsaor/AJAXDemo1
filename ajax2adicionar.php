<?php
  include_once("config.php");

  //Gravar os dados na base de dados
  $nome = mysqli_real_escape_string($mysqli, $_GET['nome']);
  $idade = $_GET['idade'];
  $mail = mysqli_real_escape_string($mysqli, $_GET['mail']);

  if(!empty($nome) && !empty($idade) && !empty($mail)) {
    $result = mysqli_query($mysqli, "INSERT INTO users(nome,idade,mail) VALUES('$nome','$idade','$mail')");
  }
  //include"ajax1.php" para voltar a recarregar a tabela com novos dados
  include_once("ajax1tabela.php");
?>