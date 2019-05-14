/* Video */


var mediaSource = new MediaSource();
mediaSource.addEventListener("sourceopen", handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;
var camera_record = document.getElementById('camera_record');
var gumVideo = document.querySelector("video#gum");
var recordedVideo = document.querySelector("video#recorded");

var recordButton = document.querySelector("button#record");
var playButton = document.querySelector("button#play");
var pauseButton = document.querySelector("button#pause");


var nextPage = document.getElementById("nextPage");


recordButton.onclick = toggleRecording;
playButton.onclick = play;

pauseButton.onclick = pause;


function pause() {
  
  console.log("recording paused");
  mediaRecorder.pause();

}
function resume(){
  console.log("recording paused");
  mediaRecorder.resume();
}
function stopRecording() {
  mediaRecorder.stop();
  pauseButton.style.display = "none";
  playButton.style.display = "block";
  camera_record.style.display = "none";
  console.log("Recorded Blobs: ", recordedBlobs);
  recordedVideo.controls = true;





}



console.log(location.host);

var constraints = {
  audio: true,
  video: true
};
/* Input Number */
navigator.mediaDevices
  .getUserMedia(constraints)
  .then(successCallback, errorCallback);

function successCallback(stream) {
  console.log("getUserMedia() got stream: ", stream);
  window.stream = stream;
  recordedVideo.srcObject = stream;
}




function errorCallback(error) {
  console.log("navigator.getUserMedia error: ", error);
}

function handleSourceOpen(event) {
  console.log("MediaSource opened");
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log("Source buffer: ", sourceBuffer);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function handleStop(event) {
  console.log("Recorder stopped: ", event);
}



function toggleRecording() {
  if (recordButton.textContent === "Записать видео") {

    startRecording();
    startTimer(90, document.querySelector('#mins'));

    recordButton.textContent = "Закончить запись";
  } else if (recordButton.textContent === "Закончить запись"){
    stopRecording();
    stopCounter();

    recordButton.textContent = "Перезаписать видео";
    playButton.disabled = false;
    nextPage.style.display = "block";

  }
  else if (recordButton.textContent === "Перезаписать видео"){
    startRecording();
    startTimer(90, document.querySelector('#mins'));
    recordButton.textContent = "Закончить запись";
    nextPage.style.display = "none";
  }

}




pauseButton.onclick = function() {
  if (pauseButton.textContent === "Поставить на паузу") {
    pauseButton.textContent = "Продолжить запись";
    mediaRecorder.pause();
    stopCounter();

  } else if( pauseButton.textContent === "Продолжить запись"){
    pauseButton.textContent = "Поставить на паузу";
    mediaRecorder.resume();
    startTimer(90, document.querySelector('#mins'));
  }
};

function startRecording() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(successCallback, errorCallback);

  var options = { mimeType: "video/webm;codecs=vp9", bitsPerSecond: 100000 };
  recordedBlobs = [];
  playButton.style.display = "none";
  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e0) {
    console.log(
      "Unable to create MediaRecorder with options Object: ",
      options,
      e0
    );
    try {
      options = { mimeType: "video/webm;codecs=vp8", bitsPerSecond: 100000 };
      mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e1) {
      console.log(
        "Unable to create MediaRecorder with options Object: ",
        options,
        e1
      );
      try {
        options = "video/mp4";
        mediaRecorder = new MediaRecorder(window.stream, options);
      } catch (e2) {
        alert("MediaRecorder is not supported by this browser.");
        console.error("Exception while creating MediaRecorder:", e2);
        return;
      }
    }
  }
  console.log("Created MediaRecorder", mediaRecorder, "with options", options);

  playButton.disabled = true;
  pauseButton.style.display = "block";
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log("MediaRecorder started", mediaRecorder);
}


function play() {
  var superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
  recordedVideo.srcObject = null;
  playButton.style.display = "none";

}


      /* Timer */

var interval = undefined;

// start the timer
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  interval = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

// stop
function stopCounter() {
  // clear the interval
  clearInterval(interval);
  interval = undefined;
}

// reset the timer
function resetCounter(){
  clearInterval(interval);
  interval = undefined;
  currentTimeInt = '01:30';
  document.getElementById('mins').innerHTML = currentTimeInt;
  //stopCounter(); startCounter();
}

// change the time and handle end of time event
function newNumber(){
  currentTimeInt--; // decrement the current time
  document.getElementById('mins').innerHTML = currentTimeInt;
  if(currentTimeInt === 0){
    console.log("Done");
    stopCounter();
  }
  if(currentTimeInt === "0") {
    alert("ff")

  }
}




/* button  RECORD */

document.getElementById("record").addEventListener("click", function() {
  toggle(document.querySelectorAll(".camera_recordNow"));
});

function toggle(elements, specifiedDisplay) {
  var element, index;

  elements = elements.length ? elements : [elements];
  for (index = 0; index < elements.length; index++) {
    element = elements[index];

    if (isElementHidden(element)) {
      element.style.display = "";

      // If the element is still hidden after removing the inline display
      if (isElementHidden(element)) {
        element.style.display = specifiedDisplay || "block";
      }
    } else {
      element.style.display = "none";
    }
  }
  function isElementHidden(element) {
    return (
      window.getComputedStyle(element, null).getPropertyValue("display") ===
      "none"
    );
  }
}

/* Pause button */
document.getElementById('pause').addEventListener('click', function () {
  toggle(document.querySelectorAll('.camera_recordPause'));
});

