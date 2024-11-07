import React, { useRef,useState, useEffect, } from "react";
import "./FaceRecognition.css";
import Webcam from 'react-webcam';
import axios from 'axios';


const Test = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [faces, setFaces] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showSignUp, setShowSignUp] = useState(true);
  const captureInterval = 3000;

//   useEffect(() => {
//     setIsScanning(true);
//     const timer = setTimeout(() => setIsScanning(false), 10000); // 10 seconds for scan
//     return () => clearTimeout(timer);
//   }, []);

  const webcamRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        captureAndRecognize();
      }, captureInterval);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const captureAndRecognize = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const blob = await fetch(imageSrc).then((res) => res.blob());

    const formData = new FormData();
    formData.append('image', blob, 'captured_image.jpg');

    try {
      const response = await axios.post(
        'http://localhost:5002/recognize-face',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setFaces(response.data.faces);
      if (response.data){
        if (response.data.faces[0].location.bottom = 'ok'){
            setIsScanning(false)
        }
    }
      console.log(response.data);
    } catch (error) {
      console.error('Error recognizing face:', error);
    }
};
  return (
    <div className="container">
      <header className="header">
        <div className="logo" />
        <h1>ATTENDANCE REGISTER</h1>
      </header>

      <div className="scanner-frame">
        <div className="frame-top-left"></div>
        <div className="frame-top-right"></div>
        <div className="frame-bottom-left"></div>
        <div className="frame-bottom-right"></div>

        <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />

        {isScanning && (
          <div className="scanning-indicator">
            <span>Scanning...</span>
            <div className="loading-circle" />
          </div>
        )}
        
      </div>

      <footer className="footer">
        <p>Hold your head still for at least 10 seconds to get accurate face recognition</p>
      </footer>
    </div>
  );
};


export default Test;

