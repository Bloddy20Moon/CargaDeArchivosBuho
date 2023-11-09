const dropArea = document.getElementById("dropArea");
const form = document.querySelector("form");
const fileInput = document.querySelector(".file-input");
const progressArea = document.querySelector(".progress-area");
const uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  let file = target.files[0];
  if (file) {
    let fileName = file.name;
    /*if (fileName.length >= 12) {
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }*/
    //console.log(fileName);
    uploadFile(fileName);
  }
};

function uploadFile(name) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/php.php");
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB";
    let progressHTML = `<li class="row">
                          <i class="fa fa-file"></i>
                          <div class="content">
                            <div class "details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if (loaded == total) {
      setTimeout(() => {
        progressArea.innerHTML = "";
        let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fa fa-file"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                              <button class="download-button" onclick="downloadFile('${name}')">Descargar</button>
                              <button class="delete-button" onclick="deleteFile('${name}')">Eliminar</button>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
        uploadedArea.classList.remove("onprogress");
        uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
      }, 3000); // Retraso de 3 segundos (3000 ms)
    }
  });

  let data = new FormData(form);
  xhr.send(data);
}



function downloadFile(name) {
  // Crea un enlace temporal para la descarga
  //const downloadLink = document.createElement('a');
  const encodedName = encodeURIComponent(name); // Codifica el nombre del archivo

  //downloadLink.href = `php/files/${encodedName}/${encodedName}`;
  //downloadLink.download = name; // Establece el nombre de archivo para la descarga
  //downloadLink.style.display = 'none';

  // Agrega el enlace al cuerpo del documento y simula un clic
  //document.body.appendChild(downloadLink);
  //downloadLink.click();

  // Elimina el enlace temporal
  //document.body.removeChild(downloadLink);
  const archivoURL = `php/files/${encodedName}/${encodedName}`

  fetch(archivoURL)
  .then(function(response) {
    return response.blob();
  })
  .then(function(blob) {
    // Crear un objeto URL para el blob
    var blobURL = window.URL.createObjectURL(blob);

    // Crear un elemento de hipervínculo
    var link = document.createElement('a');
    link.href = blobURL;
    link.download = name;

    // Simular un clic en el hipervínculo para iniciar la descarga
    link.click();

    // Liberar el objeto URL
    window.URL.revokeObjectURL(blobURL);
  });

}

/*function deleteFile( name) {
  fetch(`php/delete.php?file=${name}`, {
    method: 'GET' // Utiliza el método HTTP DELETE para la eliminación
  })
    .then(response => response.text())
    .then(data => {
      
        // Eliminación exitosa, puedes eliminar la entrada de la lista.
        const uploadedItems = document.querySelectorAll(`.uploaded-area .row .details .name`);
        for (let i = 0; i < uploadedItems.length; i++) {
          if (uploadedItems[i].textContent.includes(name)) {
            uploadedItems[i].closest(".row").remove();
          }
        }
      
    })
}*/


/*function deleteFile( name) {
  fetch(`php/delete.php?file=${name}`, {
    method: 'GET' // Utiliza el método HTTP DELETE para la eliminación
  })
  //Chatgtp me dijo :v
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Eliminación exitosa, puedes eliminar la entrada de la lista.
        const uploadedItems = document.querySelectorAll(`.uploaded-area .row .details .name`);
        for (let i = 0; i < uploadedItems.length; i++) {
          if (uploadedItems[i].textContent.includes(name)) {
            uploadedItems[i].closest(".row").remove();
          }
        }
      } else {
        // La eliminación no tuvo éxito, muestra un mensaje de error.
        console.error(data.message);
      } 
    })
    .catch(error => {
      console.error("Error al eliminar el archivo:", error);
    });
}*/

 /*function deleteFile(name) {
  // Elimina el archivo y la carpeta asociada
  fetch(`php/files/delete.php?file=${name}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Eliminación exitosa, puedes eliminar la entrada de la lista en la página web.
        const uploadedItems = document.querySelectorAll('.uploaded-area .row .details .name');
        for (let i = 0; i < uploadedItems.length; i++) {
          if (uploadedItems[i].textContent.includes(name)) {
            uploadedItems[i].closest('.row').remove();
          }
        }
      } else {
        // La eliminación no tuvo éxito, muestra un mensaje de error.
        console.error(data.message);
      }
    });
}*/

function deleteFile(name) {
  
  fetch(`php/delete.php?file=${name}`, {
    method: 'GET'
  })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Imprimirá el mensaje devuelto por el archivo PHP en la consola
    });
}




dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("on-drag"); // Agrega una clase para resaltar el área de soltar
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("on-drag"); // Elimina la clase al salir del área de soltar
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("on-drag"); // Elimina la clase cuando se suelta el archivo

  const files = e.dataTransfer.files;

  if (files.length > 0) {
    const file = files[0];
    let fileName = file.name;

    // Reemplaza espacios en blanco con guiones bajos
    fileName = fileName.replace(/ /g, '_');
    
    // Continúa con el manejo del archivo, por ejemplo, puedes notificar que el archivo se ha soltado.
    alert(`Archivo ${fileName} soltado correctamente.`);
  }
});
