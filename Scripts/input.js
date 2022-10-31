let numAngle = document.getElementById("numAngle");
let angleVal = document.getElementById("lblAngle");

let numTime = document.getElementById("numTime");
let timeVal = document.getElementById("lblTime");

let isEditing = false;

function editStyle(button, input, label){
    let btnEdit = button;
    let penIcon = btnEdit.children[0];

    input.style.display = input.style.display == "none" ? "inline" : "none";
    label.style.display = label.style.display == "none" ? "inline" : "none";

    penIcon.className = penIcon.className == "fas fa-check-square" ? "fas fa-pen" : "fas fa-check-square";
}



function editSunAngle(sender){
    editStyle(sender, numAngle, angleVal);

    let oldVal = parseFloat(angleVal.innerHTML);
    numAngle.setAttribute('value', oldVal);
    
    if(isEditing){
        sunAngle = clamp(parseFloat(numAngle.value),0,359);
        numAngle.value = sunAngle;
        angleVal.innerHTML = sunAngle;
    }
    isEditing = !isEditing;
}

function editTime(sender){
    editStyle(sender, numTime, timeVal);

    let oldVal = timeVal.innerHTML;
    numTime.value = oldVal;

    // sceneTime = (sunAngle * DAY) / 360;
    // let dateTime = new Date(BLANK_TIME.setTime(sceneTime));
    // let finalDate = new Date(dateTime.setHours(dateTime.getHours() - 9));
    // console.log(finalDate.getTime());
    
    if(isEditing){
        
    }
    isEditing = !isEditing;
}   