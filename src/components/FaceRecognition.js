// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';
// import SignUp from './SignUp'; // import the SignUp component
// import SignIn from './SignIn'; // import the SignIn component

// function FaceRecognition() {
//   const webcamRef = useRef(null);
//   const [faces, setFaces] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // new state to track authentication
//   const [showSignUp, setShowSignUp] = useState(false);
//   const captureInterval = 3000;

//   useEffect(() => {
//     if (isAuthenticated) {
//       const interval = setInterval(() => {
//         captureAndRecognize();
//       }, captureInterval);

//       return () => clearInterval(interval);
//     }
//   }, [isAuthenticated]);

//   const captureAndRecognize = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (!imageSrc) return;

//     const blob = await fetch(imageSrc).then((res) => res.blob());

//     const formData = new FormData();
//     formData.append('image', blob, 'captured_image.jpg');

//     try {
//       const response = await axios.post(
//         'http://localhost:5002/recognize-face',
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );

//       setFaces(response.data.faces);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error recognizing face:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Shaper Face</h1>
//       {isAuthenticated ? (
//         <div>
//           <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
//           {faces.length > 0 && (
//             <div>
//               <h2>Detected Faces:</h2>
//               {faces.map((face, index) => (
//                 <div key={index}>
//                   <p>Face {index + 1}</p>
//                   <p>
//                     Location - Top: {face.location.top}, Right: {face.location.right}, Bottom: {face.location.bottom},
//                     Left: {face.location.left}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div>
//           {showSignUp ? (
//             <SignUp onSignUpSuccess={() => setIsAuthenticated(true)} />
//           ) : (
//             <SignIn onSignInSuccess={() => setIsAuthenticated(true)} />
//           )}
//           <button onClick={() => setShowSignUp(!showSignUp)}>
//             {showSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FaceRecognition;
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import SignUp from './SignUp'; // import the SignUp component
import SignIn from './SignIn'; // import the SignIn component

function FaceRecognition() {
  const webcamRef = useRef(null);
  const [faces, setFaces] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const captureInterval = 3000;

  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => setIsScanning(false), 10000); // 10 seconds for scan
    return () => clearTimeout(timer);
  }, []);

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
      console.log(response.data);
    } catch (error) {
      console.error('Error recognizing face:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>ATTENDANCE REGISTER</h1>
      {isAuthenticated ? (
        <div style={styles.cameraContainer}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={styles.webcam}
          />
          <div style={styles.cameraOverlay}></div>
          {faces.length > 0 && (
            <div style={styles.facesContainer}>
              {/* <h2>Detected Faces:</h2> */}
              {/* {faces.map((face, index) => (
                <div key={index} style={styles.faceInfo}>
                  <p>Face {index + 1}</p>
                  <p>
                    Location - Top: {face.location.top}, Right: {face.location.right}, Bottom: {face.location.bottom},
                    Left: {face.location.left}
                  </p>
                </div>
              ))} */}
            </div>
          )}
          <p style={styles.instructions}>Hold your head still for at least 10 seconds to get accurate face recognition</p>
        </div>
      ) : (
        <div style={styles.authContainer}>
          {showSignUp ? (
            <SignUp onSignUpSuccess={() => setIsAuthenticated(true)} />
          ) : (
            <SignIn onSignInSuccess={() => setIsAuthenticated(true)} />
          )}
          <button style={styles.toggleButton} onClick={() => setShowSignUp(!showSignUp)}>
            {showSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  cameraContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  webcam: {
    width: '600px',
    height: '600px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  cameraOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '300px',
    height: '300px',
    transform: 'translate(-50%, -50%)',
    border: '3px solid white',
    borderRadius: '8px',
    boxSizing: 'border-box',
  },
  facesContainer: {
    marginTop: '20px',
    textAlign: 'left',
  },
  faceInfo: {
    fontSize: '14px',
    color: '#555',
  },
  instructions: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#666',
  },
  authContainer: {
    padding: '20px',
  },
  toggleButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default FaceRecognition;