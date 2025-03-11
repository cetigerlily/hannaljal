"use client"

import { useEffect } from "react";

export default function Page() {
  let width = 320;
  let height = 0;

  let streaming = false;
  let video = null;
  let canvas = null;
  let photo = null;
  let startButton = null;

  useEffect(() => {
    startUp();
  }, []);

  function startUp() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startButton = document.getElementById('start-button');

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.error(`An error occurred: ${error}`);
      })

    video.addEventListener("canplay", (event) => {
      if (!streaming) {
        height = (video.videoHeight / video.videoWidth) * width;
        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
      }
    });

    startButton.addEventListener(
      "click",
      (ev) => {
        takePicture();
        ev.preventDefault();
      },
      false,
    );
    clearPhoto();
  }

  function clearPhoto() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  function takePicture() {
    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    } else {
      clearPhoto();
    }
  }

  return (
    <div className="content-area">
      <div className="camera">
        <video id="video">Video stream not available.</video>
        <button id="start-button">Take photo</button>
      </div>
      <canvas id="canvas"></canvas>
      <div className="output">
        <img id="photo" />
      </div>
    </div>
  );
};
