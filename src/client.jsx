// FaceRecognition.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

function FaceRecognition() {
  const webcamRef = useRef(null);
  const [faces, setFaces] = useState([]);

  const captureAndRecognize = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Convert base64 image to Blob
    const blob = await fetch(imageSrc).then(res => res.blob());

    // Create FormData to send the image file
    const formData = new FormData();
    formData.append('image', blob, 'captured_image.jpg');

    try {
      // Send the image to the backend
      const response = await axios.post('http://127.0.0.1:5003/recognize-face', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setFaces(response.data.faces);
      console.log(response.data);

    } catch (error) {
      console.error('Error recognizing face:', error);
    }
  };z

  return (
    <div>
      <h1>Face Recognition</h1>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={captureAndRecognize}>Capture & Recognize</button>

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
