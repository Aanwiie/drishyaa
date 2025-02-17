import React, { useRef, useState } from 'react';
import Header from './common/Header'; // Adjust the path as necessary
import Footer from './common/Footer'; // Adjust the path as necessary

const UploadPage = () => {
  const videoRef = useRef(null); // Reference for the video element
  const mediaStreamRef = useRef(null); // Reference for the media stream
  const [isCameraActive, setIsCameraActive] = useState(false); // State to track camera status

  const handleTryRealTime = async () => {
    try {
      // Request access to the user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaStreamRef.current = stream; // Store the stream for later use
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Set the video element's source to the camera stream
        videoRef.current.play(); // Start playing the video stream
        setIsCameraActive(true); // Set camera status to active
      }
    } catch (err) {
      console.error('Error accessing the camera:', err);
    }
  };

  const handleTerminate = () => {
    if (mediaStreamRef.current) {
      const tracks = mediaStreamRef.current.getTracks(); // Get all tracks from the media stream
      tracks.forEach((track) => track.stop()); // Stop each track
      mediaStreamRef.current = null; // Clear the reference to the stream
      if (videoRef.current) {
        videoRef.current.srcObject = null; // Clear the video source
      }
      setIsCameraActive(false); // Set camera status to inactive
    }
  };

  return (
    <div
      style={{
        color: '#FFFFFF',
        fontFamily: "'Press Start 2P', cursive",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        textAlign: 'center',
        margin: 0,
        padding: 0,
        width: '100%',
        background: '#000000',
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <h1
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px #FF5722',
            fontWeight: 'bold',
            fontSize: '56px',
            marginBottom: '40px',
            marginTop: '60px',
            fontFamily: "'Press Start 2P', cursive",
          }}
        >
          Ready to Upscale?
        </h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '1000px',
            marginBottom: '20px',
            marginTop: '20px',
          }}
        >
          {/* Box 1: Upload Footage */}
          <div
            style={{
              backgroundColor: '#FF5722',
              color: '#FFFFFF',
              padding: '30px', // Increased padding for larger size
              borderRadius: '10px',
              textAlign: 'center',
              width: '250px', // Increased width for bigger size
              margin: '10px',
            }}
          >
            <h3 style={{ fontSize: '16px' }}>Upload Footage</h3>
            <input type="file" style={{ marginTop: '10px' }} />
          </div>

          {/* Box 2: Upload a Face */}
          <div
            style={{
              backgroundColor: '#FF5722',
              color: '#FFFFFF',
              padding: '30px', // Increased padding for larger size
              borderRadius: '10px',
              textAlign: 'center',
              width: '250px', // Increased width for bigger size
              margin: '10px',
            }}
          >
            <h3 style={{ fontSize: '16px' }}>Upload a Face</h3>
            <input type="file" style={{ marginTop: '10px' }} />
          </div>

          {/* Box 3: Try Real Time */}
          <div
            style={{
              backgroundColor: '#FF5722',
              color: '#FFFFFF',
              padding: '30px', // Increased padding for larger size
              borderRadius: '10px',
              textAlign: 'center',
              width: '250px', // Increased width for bigger size
              margin: '10px',
            }}
          >
            <h3 style={{ fontSize: '16px' }}>Try Real Time</h3>
            <button
              onClick={handleTryRealTime}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#FF5722',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: "'Press Start 2P', cursive",
              }}
            >
              Try Now
            </button>
          </div>
        </div>

        {/* Video element to display the camera stream */}
        <video
          ref={videoRef}
          style={{
            width: '100%',
            maxWidth: '600px',
            borderRadius: '10px',
            marginTop: '20px',
          }}
          autoPlay
          playsInline
        />

        {/* Terminate button below the video, only show if camera is active */}
        {isCameraActive && (
          <button
            onClick={handleTerminate}
            style={{
              backgroundColor: '#FF5722',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: "'Press Start 2P', cursive",
              marginTop: '10px',
              marginBottom: '40px', // Increased bottom margin for more padding
            }}
          >
            Terminate
          </button>
        )}
      </main>

      <Footer style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '20px' }}>
        8 BIT
      </Footer>
    </div>
  );
};

export default UploadPage;
