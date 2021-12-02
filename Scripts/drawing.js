function drawSky() {
    builder.beginPath();
    builder.rect(0, 0, canvas.offsetWidth, 70 * canvas.offsetHeight / 100);

    const sunSetSpan = (sunSetEnd - sunSetStart);
    const sunRiseSpan = (sunRiseEnd - sunRiseStart);

    if (isBetween(sunAngle, sunSetStart, sunSetEnd)) {
        setNextSkyColor(sunSetSpan, false);
    }
    else if (isBetween(sunAngle, sunRiseStart, sunRiseEnd)) {
        setNextSkyColor(sunRiseSpan, true);
    }

    builder.fillStyle = "rgb(" + R + ", " + G + ", " + B + ")";
    builder.fill();
    builder.closePath();
}

function setNextSkyColor(transitionSpan, isRising) {
    let rStep = (dayR - nightR) / transitionSpan * sunSpeed * sceneSpeed;
    let gStep = (dayG - nightG) / transitionSpan * sunSpeed * sceneSpeed;
    let bStep = (dayB - nightB) / transitionSpan * sunSpeed * sceneSpeed;

    if (isRising) {
        R = (R < dayR ? R + rStep : R - rStep);
        G = (G < dayG ? G + gStep : G - gStep);
        B = (B < dayB ? B + bStep : B - bStep);
    }
    else {
        R = (R < nightR ? R + rStep : R - rStep);
        G = (G < nightG ? G + gStep : G - gStep);
        B = (B < nightB ? B + bStep : B - bStep);
    }
}

function drawSun() {
    let sunRadius = 5.5 * canvas.offsetWidth / 100;
    //Salva orientação atual
    builder.save();
    //posiciona centro do circulo na metade da largura, e na altura total
    builder.translate(canvas.offsetWidth / 2, canvas.offsetHeight + sunRadius * 4);

    //rotaciona todo o canvas
    var X_Radians = Math.PI / 180 * sunAngle;
    builder.rotate(X_Radians);

    //move o ponto inicial do desenho
    let sunDistance = -(canvas.offsetWidth / 2 + sunRadius * 3);
    builder.translate(0, sunDistance);//(raio)

    builder.fillStyle = "rgb(255, 239, 0)";

    //desenha o sol
    builder.beginPath();
    builder.arc(0, 0, sunRadius, 0, 2 * Math.PI);
    builder.closePath();
    builder.fill();
    builder.restore();
    builder.save();



    //brilho_____________________
    builder.translate(canvas.offsetWidth / 2, canvas.offsetHeight + sunRadius * 4);
    builder.rotate(X_Radians);
    builder.translate(0, sunDistance);//(raio)

    let gradient = builder.createRadialGradient(
        0, 0, sunRadius,
        0, 0, sunRadius * 5/* ,
        0, 0, sunRadius * 8 */);

    gradient.addColorStop(0, "rgba(255, 239, 0,0.9)");
    gradient.addColorStop(0.05, "rgba(255, 239, 0, 0.5)");
    gradient.addColorStop(0.5, "rgba(255, 239, 0, 0.3)");
    gradient.addColorStop(1, "rgba(255, 239, 0,0)");

    builder.beginPath();
    builder.fillStyle = gradient;
    builder.arc(0, 0, sunRadius * 5, 0, 2 * Math.PI);

    builder.closePath();
    builder.fill();
    builder.restore();


    sunAngle += sunSpeed * sceneSpeed;
    if (sunAngle >= 360) sunAngle = 0;
}

let lightOpacity = 0;

function drawSunLight() {

    const sunRiseSpan = (sunRiseEnd - sunRiseStart);
    const sunSetSpan = (sunSetEnd - sunSetStart);
    let showLight = false, isRising;

    let radiusStep = maxLightRadius / (sunRiseSpan / 2) * sunSpeed * sceneSpeed;
    let opacityStep = 1 / (sunRiseSpan / 2) * sunSpeed * sceneSpeed;

    if (isBetween(sunAngle, sunRiseStart, sunRiseEnd)) {
        isRising = true;
        showLight = true;
    }
    else if (isBetween(sunAngle, sunSetStart, sunSetEnd)) {
        isRising = false;
        showLight = true;
    }

    if (showLight) {
        if (isRising) {

            //Grow up
            if (lightRadius < maxLightRadius) lightRadius += radiusStep;
            //Fade in
            if (isBetween(sunAngle, sunRiseStart, sunRiseEnd - sunRiseSpan / 2)) {
                if (lightOpacity < 1) lightOpacity += opacityStep;
            }
            //Fade Out
            else if (isBetween(sunAngle, sunRiseEnd - (sunRiseSpan / 5) * 3, sunRiseEnd)) {
                if (lightOpacity > 0) {
                    if (lightOpacity - opacityStep < 0)
                        lightOpacity = 0;
                    else
                        lightOpacity -= opacityStep;
                }
                lightRadius += radiusStep / 2;
            }
        }
        else {
            //Shrink down
            if (lightRadius > 0) {
                if (lightRadius - radiusStep < 0)
                    lightRadius = 0;
                else
                    lightRadius -= radiusStep;
            }
            //Fade in
            if (isBetween(sunAngle, sunSetStart, sunSetEnd - sunSetSpan / 2)) {
                if (lightOpacity < 1) lightOpacity += opacityStep;
            }
            //Fade Out
            if (isBetween(sunAngle, sunSetEnd - (sunSetSpan / 5) * 3, sunSetEnd)) {
                if (lightOpacity > 0) {
                    if (lightOpacity - opacityStep < 0)
                        lightOpacity = 0;
                    else
                        lightOpacity -= opacityStep;
                }
            }
        }

        let circleXPos = isRising ? 0 : canvas.offsetWidth;

        builder.beginPath();
        builder.arc(circleXPos, floorHeight, lightRadius, 0, 2 * Math.PI)
        let gradient = builder.createRadialGradient(
            circleXPos, floorHeight, 5 * lightRadius / 100,
            circleXPos, floorHeight, 70 * lightRadius / 100);

        gradient.addColorStop(0, "rgba(255, 124, 43," + (0.8 * lightOpacity) + ")");
        gradient.addColorStop(0.5, "rgba(255, 225, 105," + (0.4 * lightOpacity) + ")");
        gradient.addColorStop(1, "rgba(255, 225, 255,0)");
        builder.fillStyle = gradient;
        builder.fill();
        builder.closePath();

    }
    if (isBetween(sunAngle, sunSetEnd, sunRiseStart)) {
        lightRadius = 0;
        lightOpacity = 0;
    }
}

function drawGrass() {
    builder.beginPath();
    builder.rect(0, floorHeight, canvas.offsetWidth, canvas.offsetHeight - floorHeight);
    builder.fillStyle = "green";
    builder.fill();
    builder.closePath();
}