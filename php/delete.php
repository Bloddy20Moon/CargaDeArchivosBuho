<?php
if (isset($_GET['file'])) {
  $folderName = 'files/' . $_GET['file'];

  if (is_dir($folderName)) {
    // Verificar que sea una carpeta
    $success = deleteFolder($folderName);

    if ($success) {
      $response = array(
        'success' => true,
        'message' => 'Carpeta eliminada con éxito.'
      );
    } else {
      $response = array(
        'success' => false,
        'message' => 'Error al eliminar la carpeta.'
      );
    }
  } else {
    $response = array(
      'success' => false,
      'message' => 'La carpeta no existe.'
    );
  }

  header('Content-Type: application/json');
  echo json_encode($response);
}

function deleteFolder($folder) {
  $files = glob($folder . '/*');
  foreach ($files as $file) {
    is_dir($file) ? deleteFolder($file) : unlink($file);
  }
  return rmdir($folder);
}
?>
