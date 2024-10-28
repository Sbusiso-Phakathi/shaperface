import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import SignUp from 'SignUp'; // import the SignUp component
import SignIn from 'SignIn'; // import the SignIn component

function FaceRecognition() {
  const webcamRef = useRef(null);
  const [faces, setFaces] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // new state to track authentication
  const [showSignUp, setShowSignUp] = useState(false);
  const captureInterval = 3000;

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
        'https://miserable-tomb-97xvjqq975r39x6x-5000.app.github.dev/recognize-face',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setFaces(response.data.faces);
      console.log(response.data);
    } catch (error) {
      console.error('Error recognizing face:', error);
    }
  };

  return (
    <div>
      <h1>Shaper Face</h1>
      {isAuthenticated ? (
        <div>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          {faces.length > 0 && (
            <div>
              <h2>Detected Faces:</h2>
              {faces.map((face, index) => (
                <div key={index}>
                  <p>Face {index + 1}</p>
                  <p>
                    Location - Top: {face.location.top}, Right: {face.location.right}, Bottom: {face.location.bottom},
                    Left: {face.location.left}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {showSignUp ? (
            <SignUp onSignUpSuccess={() => setIsAuthenticated(true)} />
          ) : (
            <SignIn onSignInSuccess={() => setIsAuthenticated(true)} />
          )}
          <button onClick={() => setShowSignUp(!showSignUp)}>
            {showSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      )}
    </div>
  );
}

export default FaceRecognition;
