"use client"
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

import { Switch } from "@heroui/switch";

export default function Page() {
  const webcamRef = useRef(null);

  const [imgArr, setImgArr] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const count = useRef(0);
  const intervalId = useRef(null);

  const PHOTO_DURATION = 10000;
  const [countdown, setCountdown] = useState(PHOTO_DURATION);
  const [isMirrored, setIsMirrored] = useState(true);


  const handleStart = () => {
    if (isActive) {
      return;
    }
    setImgArr([]);
    count.current = 0;
    setIsActive(true);

    intervalId.current = setInterval(() => {
      handleCountdown();
      capture();
    }, PHOTO_DURATION);
  }

  // put clearInterval in capture function instead of handleStart function i.e. in the function which is setInterval handler
  const capture = useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();
    setImgArr((prevImgArr) => [...prevImgArr, imgSrc]);
    count.current += 1;

    if (count.current >= 4) {
      clearInterval(intervalId.current);
      setIsActive(false);
      intervalId.current = null;
    }
  }, []);

  const handleCountdown = () => {
    let timer = setInterval(() => {
      setCountdown((countdown) => {
        if (countdown === 0) {
          clearInterval(timer);
          return PHOTO_DURATION;  // goes back to original duration after reaching zero
        } else {
          return countdown - 1000;
        }
      });
    }, 1000);
  }

  return (
    <>
      <p>한날 한짤</p>
      <Switch isSelected={ isMirrored } onValueChange={ setIsMirrored }>mirroring</Switch>
      <Webcam
        ref={ webcamRef }
        mirrored={ isMirrored }
        screenshotFormat="image/jpeg"
        videoConstraints={ { width: 360, height: 360 } }
      />

      <p>remaining time: { countdown / 1000 }</p>
      <button onClick={ handleStart } disabled={ isActive }>start</button>
      <div className="flex flex-row">
        { imgArr.map((i) => <img key={ i } src={ i }/>) }
      </div>
    </>
  );
}
