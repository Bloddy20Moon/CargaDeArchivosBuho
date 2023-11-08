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
    if (fileName.length >= 12) {
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
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
                            <div class="details">
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
      }, 3000); // Retraso de 2 segundos (2000 ms)
    }
  });

  let data = new FormData(form);
  xhr.send(data);
}

function downloadFile(name) {
  // Agrega el código para descargar el archivo con el nombre proporcionado.
  // Puedes usar la ventana emergente o redirigir a una página para la descarga.
  // Por ejemplo, abrir una nueva ventana con el archivo.
  window.open(`php/files/${name}`);
}

function deleteFile(name) {
  // Agrega el código para eliminar el archivo con el nombre proporcionado.
  // Puedes utilizar AJAX para comunicarte con el servidor y eliminar el archivo.
  // Por ejemplo, aquí se muestra cómo podrías hacerlo con fetch:
  fetch(`php/delete.php?file=${name}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Eliminación exitosa, puedes eliminar la entrada de la lista.
        const uploadedItem = document.querySelector(`.uploaded-area .row .name:contains('${name}')`);
        if (uploadedItem) {
          uploadedItem.parentElement.parentElement.remove();
        }
      } else {
        // La eliminación no tuvo éxito, muestra un mensaje de error o maneja la situación de otra manera.
        console.error("Error al eliminar el archivo");
      }
    })
    .catch(error => {
      console.error("Error al eliminar el archivo:", error);
    });
}
