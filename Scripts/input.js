let numAngle = document.getElementById("numAngle");
let angleVal = document.getElementById("lblAngle");

let numTime = document.getElementById("numTime");
let timeVal = document.getElementById("lblTime");

let isEditing = false;

function editStyle(button, input, label) {
    let btnEdit = button;
    let penIcon = btnEdit.children[0];

    input.style.display = input.style.display == "none" ? "inline" : "none";
    label.style.display = label.style.display == "none" ? "inline" : "none";

    penIcon.className = penIcon.className == "fas fa-check-square" ? "fas fa-pen" : "fas fa-check-square";
}



function editSunAngle(sender) {
    editStyle(sender, numAngle, angleVal);

    let oldVal = parseFloat(angleVal.innerHTML);

    if (isEditing) {
        sunAngle = clamp(parseFloat(numAngle.value), 0, 359);
        numAngle.value = sunAngle;
        angleVal.innerHTML = sunAngle;
    }
    else {
        numAngle.value = oldVal;
    }

    if (isBetween(sunAngle, sunRiseEnd, 0) || isBetween(sunAngle, 0, sunSetStart)) {
        R = dayR;
        G = dayG;
        B = dayB;
    }
    else if (isBetween(sunAngle, sunSetEnd, sunRiseStart)) {
        R = nightR;
        G = nightG;
        B = nightB;
    }
    else {
        if (isBetween(sunAngle, sunSetStart, sunSetEnd)) {
            R = getProportionalColor(dayR, sunAngle, sunSetStart);
            G = getProportionalColor(dayG, sunAngle, sunSetStart);
            B = getProportionalColor(dayB, sunAngle, sunSetStart);
        }
        else if (isBetween(sunAngle, sunRiseStart, sunRiseEnd)) {
            R = getProportionalColor(dayR - nightR, sunAngle, sunRiseEnd, false);
            G = getProportionalColor(dayG - nightG, sunAngle, sunRiseEnd, false);
            B = getProportionalColor(dayB - nightB, sunAngle, sunRiseEnd, false);

            console.log(`R: ${R}`);
            console.log(`G: ${G}`);
            console.log(`B: ${B}`);
        }
        else {
            R = 255;
            G = 0;
            B = 0;
            return;
        }
    }
    isEditing = !isEditing;
}

function getProportionalColor(Y, X_Value, Y_Value, inverted = true) {
    if (inverted)
        return Y * Y_Value / X_Value;
    else
        return Y * X_Value / Y_Value;
}

function editTime(sender) {
    editStyle(sender, numTime, timeVal);

    let oldVal = timeVal.innerHTML;
    numTime.value = oldVal;

    // sceneTime = (sunAngle * DAY) / 360;
    // let dateTime = new Date(BLANK_TIME.setTime(sceneTime));
    // let finalDate = new Date(dateTime.setHours(dateTime.getHours() - 9));
    // console.log(finalDate.getTime());

    if (isEditing) {

    }
    isEditing = !isEditing;
}   