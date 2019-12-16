let gymkanaPoints = [];
let mapSrc = "";
window.onload = () => {
    if ("geolocation" in navigator) {
        /* la geolocalización está disponible */
    } else {
        window.alert("No tienes disponible la geolocalización")
    }
    let watch1 = navigator.geolocation.watchPosition(function (position) {
        cerca(position.coords.latitude, position.coords.longitude);
    });
};


function cerca(lat, lon) {
    const pos = document.getElementById("pos");
    pos.innerText = `Latitud: ${lat}, Logitud: ${lon}`;
    let distance = distanceBetweenPoints(gymkanaPoints[0][0], gymkanaPoints[0][1], lat, lon);
    document.getElementById("distance").innerText = distance;
    if (distance <=500){
        vib(2000, 2);
        detenerVibrado();
    }else if (distance <=100){
        vib(1500, 4);
    }else if(distance <= 50){
        vib(1000, 5);
    }else if(distance <= 20){
        vib(500, 5);
    }else if(distance <=10){
        vib(200, 10);
    }else if (distance <= 3){
        vib(10000, 1);
        window.alert("Has ganado");
    }
}

function addPoint() {
    const form = document.forms['pointForm'];
    gymkanaPoints.push([form.elements.latitude.value, form.elements.longitude.value]);
    let liPoint = document.createElement("li");
    liPoint.innerText = `Latitud: ${form.elements.latitude.value}, Logitud: ${form.elements.longitude.value}`;
    document.getElementById("points").appendChild(liPoint);
    form.reset();
    updateMapSrc();
}

function updateMapSrc() {
    let stringPoints = gymkanaPoints.map(p => {
        return `${p[1]},${p[0]},pm2rdl1`
    });
    let finalString = stringPoints.reduce((acc, cur) => {
        return acc.concat(cur).concat('~');
    }, "https://static-maps.yandex.ru/1.x/?lang=en_US&size=450,450&z=15&l=map&pt=");
    finalString = finalString.slice(0, -1);
    document.getElementById("map").setAttribute("src", finalString);
}


distanceBetweenPoints = (lat1, lon1, lat2, lon2, R = 6371) => {
    lat1 = deg2rads(lat1);
    lat2 = deg2rads(lat2);
    lon2 = deg2rads(lon2);
    lon1 = deg2rads(lon1);
    return Math.acos(Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.cos(lon2 - lon1)) * R * 1000;
};
deg2rads = (degrees) => degrees * (Math.PI / 180);



function iniciarVibrado(duracion) {
    navigator.vibrate(duracion);
}

function vib(duracion, intervalo) {
    intervaloDeVibrado = setInterval(function() {
        iniciarVibrado(duracion);
    }, intervalo);
}

function detenerVibrado() {
    // Limpiar el intervalo y detener las vibraciones existentes
    if(intervaloDeVibrado) clearInterval(intervaloDeVibrado);
    navigator.vibrate(0);
}
