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


  /*if (isset($_GET['file'])) {
    $folder_name = $_GET['file'];
    $fileName = 'php/files/'.$folder_name. '/' . $_GET['file'];
    //echo $fileName;

    header('Content-Type: application/json');
    echo $folder_name;
    
    /*if (unlink($fileName)) {
        echo 'El archivo se ha eliminado con éxito.';
    } else {
        echo 'Hubo un error al eliminar el archivo.';
    }*/
  //}

    /*if (file_exists($fileName)) {
      // Elimina el archivo
      if (unlink($fileName)) {
        // Verifica y elimina la carpeta si está vacía
        $directory = dirname($fileName);
        if (is_dir($directory) && count(glob("$directory/*")) === 0) {
          rmdir($directory);
        }

        $response = array(
          'success' => true,
          'message' => 'Archivo eliminado con éxito.'
        );
        $json = json_encode($response);
      } else {
        $response = array(
          'success' => false,
          'message' => 'Error al eliminar el archivo.'
        );
        $json = json_encode($response);
      }
      
    } else {
      $response = array(
        'success' => false,
        'message' => 'El archivo no existe.'
      );
      $json = json_encode($response);
    }

    header('Content-Type: application/json');
    echo json_encode($response);
  }*/
} catch (Exception $e) {
  echo $e->getMessage(); // Muestra el mensaje de error si ocurre una excepción
}
?>