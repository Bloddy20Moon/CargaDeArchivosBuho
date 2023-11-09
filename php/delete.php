<?php
try {
 
  //echo $_GET['file'];

  $folder_name = $_GET['file'];
  $fileName = '\/files/'. $folder_name;

  $directory_path = dirname(__FILE__);

  $fullRuta = $directory_path . $fileName;

  if (file_exists($fullRuta)) {
    if (unlink($fullRuta)) {
        echo 'El archivo se ha eliminado con éxito.';
    } else {
        echo 'Hubo un error al eliminar el archivo.';
    }
} else {
    echo 'No existe:';
}


} catch (Exception $e) {
  echo $e->getMessage(); // Muestra el mensaje de error si ocurre una excepción
}
?>