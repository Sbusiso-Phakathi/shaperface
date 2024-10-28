import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

function FaceRecognition() {
  const webcamRef = useRef(null);
  const [faces, setFaces] = useState([]);
  const captureInterval = 3000; 

  useEffect(() => {
    const interval = setInterval(() => {
      captureAndRecognize();
    }, captureInterval);

    return () => clearInterval(interval); 
  }, []);

  const captureAndRecognize = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) return;

    const blob = await fetch(imageSrc).then(res => res.blob());

    const formData = new FormData();
    formData.append('image', blob, 'captured_image.jpg');

    try {
      const response = await axios.post('http://127.0.0.1:5002/recognize-face', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setFaces(response.data.faces);
      console.log(response.data);
    } catch (error) {
      console.error('Error recognizing face:', error);
      console.log()
    }
  };

  return (
    <div>
      <h1>Shaper Face</h1>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      
      {faces.length > 0 && (
        <div>
          <h2>Detected Faces:</h2>
          {faces.map((face, index) => (
            <div key={index}>
              <p>Face {index + 1}</p>
              <p>Location - Top: {face.location.top}, Right: {face.location.right}, Bottom: {face.location.bottom}, Left: {face.location.left}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



export default FaceRecognition;
