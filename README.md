# CARGA DE DATOS CON PHP NOVIEMBRE
## INTEGRANTES:
* Adrian Josue Alvarado Sanchez
* Joandi Casimiro
>Proposito: Registrar los Datos por Medio de una pagina a una carpeta llamada "files"
###### RECOMENDACION:
###### Tener instalador el [**XAAMP**](https://www.apachefriends.org/es/index.html)
###### Tener instalador el [**Live Premiew**](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server)
###### Cargar el link: ```html <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/> ``` en el Index

## Carga de Datos por PHP
+ Paso 1
   * Abrir el XAAMP Y activarlo en Apache
![image](https://github.com/Bloddy20Moon/CargaDeArchivosBuho/assets/118792974/c614e691-2418-480d-8d8a-88eac50a8c8a)

+ Paso 2
   * En este caso la carpeta esta en la direccion de C:\xampp\htdocs\CargaBuho
![image](https://github.com/Bloddy20Moon/CargaDeArchivosBuho/assets/118792974/73b45d7b-2da0-4300-9943-91d662a3965e)

+ Paso 3
   * Comenzar con el index HTML
######  En este caso usamos el Live Preview para poder verlo en el mismo Visual Studio
![image](https://github.com/Bloddy20Moon/CargaDeArchivosBuho/assets/118792974/fc6b40fc-a51f-44b2-8995-307bb8ebcb37)

+ Paso 4
   * Copiamos el codigo en el HTML (Adicionalmente le ponemos un Fondo Animado para una mejor vista)
   * Para que no se vea vacio tome un fondo de la pagina de [**Animated BackGrounds**](https://animatedbackgrounds.me/)
```html
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carga de Datos</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
</head>
<body>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
    <defs>
      <linearGradient id="bg">
        <stop offset="0%" style="stop-color:rgba(130, 158, 249, 0.06)"></stop>
        <stop offset="50%" style="stop-color:rgba(76, 190, 255, 0.6)"></stop>
        <stop offset="100%" style="stop-color:rgba(115, 209, 72, 0.2)"></stop>
      </linearGradient>
      <path id="wave" fill="url(#bg)" d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
    s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z" />
    </defs>
    <g>
      <use xlink:href='#wave' opacity=".3">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          dur="10s"
          calcMode="spline"
          values="270 230; -334 180; 270 230"
          keyTimes="0; .5; 1"
          keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
          repeatCount="indefinite" />
      </use>
      <use xlink:href='#wave' opacity=".6">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          dur="8s"
          calcMode="spline"
          values="-270 230;243 220;-270 230"
          keyTimes="0; .6; 1"
          keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
          repeatCount="indefinite" />
      </use>
      <use xlink:href='#wave' opacity=".9">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          dur="6s"
          calcMode="spline"
          values="0 230;-140 200;0 230"
          keyTimes="0; .4; 1"
          keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
          repeatCount="indefinite" />
      </use>
    </g>
  </svg>
  

  <div class="wrapper">
    <header>Sube tus archivos aquí!</header>
    <form action="#">
      <input class="file-input" type="file" name="file" hidden>
      <i class="fa fa-hourglass-start"></i>
      <p>Importa Tus datos mas rapido</p>
    </form>
    <section class="progress-area"></section>
    <section class="uploaded-area"></section>
  </div>

  <script src="script.js"></script>
</body>
</html>
```
+ Paso 5
   * Para una carga ponemos el JS y el PHP
```html const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () =>{
  fileInput.click();
});

fileInput.onchange = ({target})=>{
  let file = target.files[0];
  if(file){
    let fileName = file.name;
    if(fileName.length >= 12){
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName);
  }
}

function uploadFile(name){
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/php.php");
  xhr.upload.addEventListener("progress", ({loaded, total}) =>{
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
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
    if(loaded == total){
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fa fa-file"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });
  let data = new FormData(form);
  xhr.send(data);
}
```
   * El archivo PHP estaría así:
```html
<?php
  $file_name =  $_FILES['file']['name'];
  $tmp_name = $_FILES['file']['tmp_name'];
  $file_up_name = time().$file_name;
  move_uploaded_file($tmp_name, "files/".$file_up_name);
?>
```
+ Paso 5
   * Los archivos de guardaría en la carpeta C:\xampp\htdocs\CargaBuho\php\files (Crear la carpeta files en la carpeta PHP)
![image](https://github.com/Bloddy20Moon/CargaDeArchivosBuho/assets/118792974/4d0ded93-5930-41ea-aae3-293c0247aec0)
 
+ Paso 6
   * Ya con todo quedaría la pagina así:
   * Para entrar a la pagina http://localhost/CargaBuho/
![image](https://github.com/Bloddy20Moon/CargaDeArchivosBuho/assets/118792974/a3d14661-0b7b-452f-b206-7b282ea08968)

   * El archivo esta en el github, si deseas entrar, [**pulsa aqui**](https://github.com/Bloddy20Moon/CargaDeArchivosBuho)

https://github.com/Bloddy20Moon/CargaDeArchivosBuho/assets/118792974/bdb4bd6a-2a27-4706-8827-c61f39e4b617


