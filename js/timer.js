function startTimerSms(duration, display) {
    var timer = duration, minutes, seconds;
    var block = document.getElementById("block");
    var call = document.getElementById("call");
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }

        else if (timer === 0){

            block.style.display = "none";
            call.style.display = "flex";

        }

    }, 1000);}

window.onload = function () {
    var fiveMinutes = 30 * 3,
        display = document.querySelector('#time');
    startTimerSms(fiveMinutes, display);

    var pi = document.getElementById('#time');
};
/* Call  */
var call = document.getElementById('call');
var callTwo = document.getElementById("callTwo");
call.addEventListener('click', function (){
    call.style.display = "none";
    callTwo.style.display = "flex";



});