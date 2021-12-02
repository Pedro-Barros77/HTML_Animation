let canvas = document.getElementById("gameCanvas");
let builder = canvas.getContext("2d");

let sceneSpeed = 1;

let sunAngle = 0; //começa 12:00pm
let sunSpeed = 1;
let maxLightRadius = (canvas.offsetWidth / 3) * 2;
let lightRadius = maxLightRadius;

let nightR = 6, nightG = 15, nightB = 34;
let dayR = 185, dayG = 248, dayB = 255;

let sunSetStart = 20;
let sunSetEnd = 95;
let sunRiseStart = 265;
let sunRiseEnd = 360;

let R = dayR
let G = dayG;
let B = dayB;

const floorHeight = 70 * canvas.offsetHeight / 100;

function loop() {
    setCanvasSize();

    sceneSpeed = document.getElementById("speedRange").value;

    setUIInfo();


    //Scene Drawing____________________________________________________
    builder.clearRect(0, 0, 900, 500);

    drawSky();

    drawSun();
    drawSunLight();

    drawGrass();

    requestAnimationFrame(loop);
}

loop();