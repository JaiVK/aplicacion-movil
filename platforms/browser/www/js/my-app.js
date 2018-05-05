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

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app2 = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        window.addEventListener("batterystatus", onBatteryStatus, false);
        console.log(navigator.vibrate);
        console.log(navigator.camera);// atento a la camara
    },

    // Update DOM on a Received Event
   /* receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    } */
};

app2.initialize();





function onBatteryStatus(status) {
alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
}

document.getElementById("info2").addEventListener("click",function(){
                                                  alert("Cordova versión " + device.cordova);

                                                  }
                                                 
                                                 )

function vibrarrr() {
navigator.vibrate([5000,1000,5000]);
alert('vibrandoooooo');
}

document.getElementById("vibracion").addEventListener("click",vibrarrr)


// creación foto + info
function ficha() {
    $$("#nuevaFicha").html('  <div class="card-header"><button type="button" id="addpic" class="material-icons">add_a_photo</button></div>    <div class="card-content"><input type="text"><button type="button" class="col button button-outline button-round button-raised">Enviar</button></div>  ')
    $$('#addpic').on('click',cameraStart)
//alert('Nueva entrada');
}

document.getElementById("Ficha").addEventListener("click",ficha)

function images() {
alert('la ruta donde se guardan las imagenes es: file:///storage/emulated/0/Android/data/io.cordova.hellocordova/cache');
}
document.getElementById("file2").addEventListener("click",images)

function gallery () {
    
    navigator.camera.getPicture(gallerySuccess, galleryFail, 
    { quality: 50,destinationType: Camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM });
    
}

function gallerySuccess(imageURI) {
    
    var largeImage = document.getElementById ('1525428176283.jpg');
        largeImage.style.display = 'block';
        largeImage.src = imageURI;
    
}

function galleryFail() {
    
    console.log('fallo');
    
}


document.getElementById("file").addEventListener("click",gallery)

function informacion() {
alert('Proyecto Aplicación movil Versión 1.0');
}

document.getElementById("info").addEventListener("click",informacion)


function cameraStart(){
 navigator.camera.getPicture(cameraSuccess, cameraError);   
}


function cameraSuccess(data){
    alert('foto guardada en ' + data);
    
}

function cameraError(){
    alert('error en la foto');
    
}

document.getElementById("camera").addEventListener("click",cameraStart)

//geolocalizacion

navigator.geolocation.getCurrentPosition(function(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  getMap(latitude, longitude);
});



var Latitude = undefined;
var Longitude = undefined;

// Get geo coordinates

function getMapLocation() {

    navigator.geolocation.getCurrentPosition (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getMap(Latitude, Longitude);

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
    map.setZoom(15);
    map.setCenter(marker.getPosition());
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

