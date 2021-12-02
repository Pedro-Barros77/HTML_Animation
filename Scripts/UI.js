function setUIInfo() {
    setFPS();

    let label = document.getElementById("fpsLabel");
    label.innerText
        = "FPS: " + FPS
        + ", angulo do sol: " + sunAngle.toFixed(2)
        + ", Horas: " + getStringTime(getSceneTime(), true);

    document.getElementById("speedLabel").innerText = "Velocidade: x" + sceneSpeed;
}

//To calculate FPS_____________________________________
let frameCount = 0;
let markedTime = new Date().getTime();
let FPS = 0;

function setFPS() {
    frameCount++;
    let now = new Date().getTime();
    if (now - markedTime >= 1000) {
        FPS = frameCount;
        markedTime = new Date().getTime();
        frameCount = 0;
    }
}
//_____________________________________________________

function setCanvasSize() {
    let canvasCol = document.getElementById("canvasCol");

    let maxHeight = 80 * window.innerHeight / 100;
    let maxWidth = maxHeight * 2;
    let minWidth = 500;
    let newCanvasWidth;

    if (canvasCol.offsetWidth >= maxWidth) newCanvasWidth = maxWidth;
    else if (canvasCol.offsetWidth < minWidth) newCanvasWidth = minWidth;
    else newCanvasWidth = canvasCol.offsetWidth;

    canvas.setAttribute("width", newCanvasWidth);
    canvas.setAttribute("height", Math.floor(50 * newCanvasWidth / 100));
}