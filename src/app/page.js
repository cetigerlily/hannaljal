"use client"
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function Page() {
  const webcamRef = useRef(null);
  const [imgArr, setImgArr] = useState([]);
  const count = useRef(0);

  const [isActive, setIsActive] = useState(false);
  const intervalId = useRef(null);

  const handleStart = () => {
    if (isActive) {
      return;
    }
    setImgArr([]);
    count.current = 0;
    setIsActive(true);

    intervalId.current = setInterval(() => {
      capture();
    }, 2000);
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

  return (
    <>
      <p>한날 한짤</p>
      { isActive ? (
        <Webcam
          ref={ webcamRef }
          mirrored={ true }
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 360, height: 360 }}
        />
      ) : (
        <div className="h-[360] w-[360] bg-blue">
          <p>start taking pictures!</p>
        </div>
      )}
      <button onClick={ handleStart } disabled={ isActive }>start</button>
      <div className="flex flex-row">
        { imgArr.map((i) => <img key={ i } src={ i }/>) }
      </div>
    </>
  );
}
