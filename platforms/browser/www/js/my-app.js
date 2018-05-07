var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Proyecto Cordova',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [{
        path: '/about/',
        url: 'about.html',
    }, ],
    // ... other parameters
});

var app2 = {

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        
        console.log(navigator.vibrate);
        console.log(navigator.camera);// atento a la camara
        checkImgList();
        
    },

};

app2.initialize();


var Latitude = undefined;
var Longitude = undefined;
var img = undefined;
var imgList = [];
var comment = undefined;
var title = undefined;
var z = 0;

function checkImgList(){
    
    imgListPre=localStorage.getItem('imageList');
    
    imgListPre=JSON.parse(imgListPre);
    
    if( imgListPre != null){
        
        imgList = imgListPre;
        
    }else{
        
        localStorage.setItem("imageList", JSON.stringify(imgList));
        
    }
    
}

function onBatteryStatus(status) {
    
    alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
    
}

document.getElementById("info2").addEventListener("click",function(){
    
        alert("Cordova versión " + device.cordova);

})



// creación foto + info
function ficha() {
    
    getMapLocation();
    
    $$("#nuevaFicha").html('  <div class="card-header"><div class="row ep"><button type="button" id="addpic" class="col button button-fill button-round material-icons"><i class="material-icons" >add_a_photo</i></button><button id="file" class="col button button-fill button-round"><i class="material-icons">images</i></button><button type="button" id="reset" class="col button button-fill button-round material-icons"><i class="material-icons">reply</i></button></div></div> '+
    '<div class="card-content"><input type="text" placeholder=" Título" id="title"><input type="text" placeholder=" Comentario" id="comment"><button type="button" id="addObj" class="col button button-round">Enviar</button></div>  ')
    
    $$('#addpic').on('click',cameraStart);
    $$('#addObj').on('click',createObject);
    $$('#reset').on('click',resetFicha);
    $$("#file").on("click",gallery);
    
//alert('Nueva entrada');
}

function createObject(){
    
    comment = undefined;
    title = undefined;
    
    comment = $$('#comment').val();
    title = $$('#title').val();
    console.log(comment);
    if(img == undefined || comment == undefined || title == undefined || comment == "" || title == ""){
        
        alert ('Faltan campos');
        
    }else{
        
        setTimeout(function(){
            
            z = 0
            
            interval = setInterval(function(){
                
                if(z == 10){
                    
                    alert('Fallo en la localizacion');
                    
                    clearInterval(interval);
                    
                }else if(Latitude != undefined){

                    newobject = { "url" : img , "latitud" : Latitude , "longitud" : Longitude , "titulo" : title , "comentario" : comment};

                    imgList.push(newobject);

                    localStorage.setItem("imageList", JSON.stringify(imgList));

                    Latitude = undefined;
                    img = undefined;
                    clearInterval(interval);

                }
                
                z++

            }, 500);    
        
        
        }, 1000);
        
        $$("#nuevaFicha").html(''); 
        
    } 
    
}

document.getElementById("Ficha").addEventListener("click",ficha)

function gallery () {
    
   
    navigator.camera.getPicture(gallerySuccess, galleryFail, 
    { quality: 100,destinationType: Camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM });
    
}

function gallerySuccess(imageURI) {
    $$(".card-header").html('<img id="picDisplay" src="' + imageURI + '">')
    var largeImage = document.getElementById ('picDisplay');
        img = imageURI;
        largeImage.style.display = 'block';
        largeImage.src = imageURI;
    
}

function galleryFail() {
    
    console.log('fallo');
    
}


function informacion() {
    
    alert('Proyecto Aplicación movil Versión 1.1');
    
}

document.getElementById("info").addEventListener("click",informacion)

//camara y envio

function cameraStart(){
    
    navigator.camera.getPicture(cameraSuccess, cameraError,{ saveToPhotoAlbum:true, quality: 100 }); 
    
}


function cameraSuccess(imageURI){
    
    $$(".card-header").html('<img id="picDisplay" src="' + imageURI + '">')
    var largeImage = document.getElementById ('picDisplay');
    largeImage.style.display = 'block';
    img = imageURI;
    largeImage.src = imageURI;
    
}

function cameraError(){
    
    alert('error en la foto');
    
}

function geoImage() {

alert('latitud: ' + Latitude + 'longitud:' + Longitude);
    
}

//geolocalizacion

navigator.geolocation.getCurrentPosition(function(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  getMap(latitude, longitude);
});

// Get geo coordinates

function getMapLocation() {

    navigator.geolocation.getCurrentPosition (onMapSuccess, onMapError, { enableHighAccuracy: true });
    
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    
    //getMap(Latitude, Longitude);

}

// Get map by using coordinates

function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });
    
    marker.setMap(map);
    
    google.maps.event.addListener(marker, 'click', function () {
            
            
        $$("#nuevaFicha").html('  <div class="card-header"><h2>Tu</h2><h1 id="reset">X</h1></div> '+
        '<div class="card-content"><p>Posicion actual</p></div>  ');
        $$('#reset').on('click',resetFicha);
    });
    
    map.setZoom(15);
    map.setCenter(marker.getPosition());
    
    createMarkers();
    
}


function createMarkers() {
    
    
    var imgListca = localStorage.getItem('imageList');
    
    imgListca=JSON.parse(imgListca);
    
    console.log(imgListca);
    
    console.log(imgListca[0].latitud);
    
    if (imgListca != null ){
        
        var x = imgListca.length;
        
        for(y = 0;y < x;y++){

            var latLong = new google.maps.LatLng(imgListca[y].latitud, imgListca[y].longitud);

            var marker = new google.maps.Marker({
                position: latLong
                
            });

            marker.setMap(map);
            marker.imgsrc = imgListca[y].url;
            marker.titulo = imgListca[y].titulo;
            marker.comentario = imgListca[y].comentario;
            google.maps.event.addListener(marker, 'click', function () {

                $$("#nuevaFicha").html('  <div class="card-header"><h2>' + this.titulo + '</h2><h1 id="reset">x</h1></div><div class="card-content"><img id="picDisplay" src="' + this.imgsrc + '" > </div>'+
                '<div class="card-content"><p>' + this.comentario + '</p></div>  ');
                
                $$('#reset').on('click',resetFicha);
                
            });

            $$("#listado").append('<div class="card-header"><h2>' + imgListca[y].titulo + '</h2></div><div class="card-content"><img id="picDisplay" src="' + imgListca[y].url + '" > </div>'+
                '<div class="card-content"><p>' + imgListca[y].comentario + '</p></div>');
            
        }
    }
}

function resetFicha(){
    
    comment = undefined;
    title = undefined;
    img = undefined;
    Latitude = undefined;
    
    $$("#nuevaFicha").html(''); 
    
}

// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        getMap(updatedLatitude, updatedLongitude);
    }
}

// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
    
}

