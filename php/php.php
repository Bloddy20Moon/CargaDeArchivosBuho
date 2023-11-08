<?php
if (!empty($_FILES['file']['name'])) {
  $file_name = $_FILES['file']['name'];
  $tmp_name = $_FILES['file']['tmp_name'];
  $folder_name = "files/" . pathinfo($file_name, PATHINFO_FILENAME);
  if (!file_exists($folder_name)) {
    mkdir($folder_name, 0777, true);
  }
  $file_up_name = time() . '_' . $file_name; // Agregar timestamp al nombre del archivo
  move_uploaded_file($tmp_name, $folder_name . "/" . $file_up_name);
  echo "Archivo subido exitosamente.";
}
?>
