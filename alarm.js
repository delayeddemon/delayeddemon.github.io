var isPhoneTimerStarted = false; // variable to keep track of phone timer
var editorStartTime = 0;
var phoneStartTime = 0;
var editorTime = 0;
var phoneAllowedTime = 0;
var intervalId = 0;
var timerOn = "";
var editorToPhoneRatio = 6; // 1 hour of editor time = 10 minutes of phone time
var phoneToEditorRatio = 1; // 1 minute of phone time = 1 minute of editor time



function startEditorTimer() {
    clearInterval(intervalId);
    document.getElementById("pause").innerHTML = "Pause";
    timerOn = "editor";
    editorStartTime = new Date().getTime();
    intervalId = setInterval(updateTimer, 1000);
    document.getElementById("editorTime").innerHTML = "Editor Time: 0m 0s";
    document.getElementById("phoneTime").innerHTML = "Phone Time: 0m 0s";
    document.getElementById("remainingPhoneTime").innerHTML = "Remaining Phone Time: 0m 0s";
    document.getElementById("message").innerHTML = "";
    updatePhoneTime(); // call this function to update phone time
}

function startPhoneTimer() {
    if(!isPhoneTimerStarted) { // only start the phone timer if it has not been started before
        clearInterval(intervalId);
        document.getElementById("pause").innerHTML = "Pause";
        timerOn = "phone";
        phoneStartTime = new Date().getTime();
        intervalId = setInterval(updateTimer, 1000);
        document.getElementById("editorTime").innerHTML = "Editor Time: 0m 0s";
        document.getElementById("phoneTime").innerHTML = "Phone Time: 0m 0s";
        document.getElementById("remainingPhoneTime").innerHTML = "Remaining Phone Time: " + phoneAllowedTime + "m 0s";
        document.getElementById("message").innerHTML = "";
        isPhoneTimerStarted = true;
    }
}

function updatePhoneTime() {
    // code to update phone time
}

function updateTimer() {
    var currentTime = new Date().getTime();
    if(timerOn === "editor") {
        editorTime = currentTime - editorStartTime;
        var editorMinutes = Math.floor((editorTime % (1000 * 60 * 60)) / (1000 * 60));
        var editorSeconds = Math.floor((editorTime % (1000 * 60)) / 1000);
        document.getElementById("editorTime").innerHTML = "Editor Time: " + editorMinutes + "m " + editorSeconds + "s";
        phoneAllowedTime = Math.floor(editorMinutes / editorToPhoneRatio);
        document.getElementById("remainingPhoneTime").innerHTML = "Remaining Phone Time: " + phoneAllowedTime + "m 0s";
    } else {
        var phoneTime = currentTime - phoneStartTime;
        var phoneMinutes = Math.floor((phoneTime % (1000 * 60 * 60)) / (1000 * 60));
        var phoneSeconds = Math.floor((phoneTime % (1000 * 60)) / 1000);
        document.getElementById("phoneTime").innerHTML = "Phone Time: " + phoneMinutes + "m " + phoneSeconds + "s";
        phoneAllowedTime -= phoneMinutes;
        document.getElementById("remainingPhoneTime").innerHTML = "Remaining Phone Time: " + phoneAllowedTime + "m 0s";
        if(phoneAllowedTime <= 0) {
            clearInterval(intervalId);
            document.getElementById("timeup").play();
            document.getElementById("message").innerHTML = "Time's up!";
        }
    }
}

function pauseTimer() {
    if(document.getElementById("pause").innerHTML === "Pause") {
        clearInterval(intervalId);
        document.getElementById("pause").innerHTML = "Resume";
    } else {
        intervalId = setInterval(updateTimer, 1000);
        document.getElementById("pause").innerHTML = "Pause";
    }
}

function resetTimer() {
    clearInterval(intervalId);
    document.getElementById("pause").innerHTML = "Pause";
    editorStartTime = 0;
    phoneStartTime = 0;
    editorTime = 0;
    phoneAllowedTime = 0;
    document.getElementById("editorTime").innerHTML = "Editor Time: 0m 0s";
    document.getElementById("phoneTime").innerHTML = "Phone Time: 0m 0s";
    document.getElementById("remainingPhoneTime").innerHTML = "Remaining Phone Time: 0m 0s";
    document.getElementById("message").innerHTML = "";
    isPhoneTimerStarted = false;
}