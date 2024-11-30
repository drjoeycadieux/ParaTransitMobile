import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

const TakePhotoEmergency = () => {
  const [photoUri, setPhotoUri] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null); // Using useRef to store camera reference

  // Handle taking a picture
  const takePicture = async () => {
    if (cameraRef.current) {
      console.log('Taking picture...');
      const data = await cameraRef.current.takePictureAsync();
      console.log('Picture taken:', data);
      setPhotoUri(data.uri);
    }
  };

  // Handle camera ready state
  const handleCameraReady = () => {
    console.log('Camera is ready!');
    setIsCameraReady(true);
  };

  return (
    <View style={styles.container}>
      {/* Display the camera */}
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onCameraReady={handleCameraReady} // Updated to call the function
        ref={cameraRef}
      >
        {/* Show the capture button only when the camera is ready */}
        {isCameraReady ? (
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
          >
            <Text style={styles.captureText}>Capture</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.loadingText}>Loading Camera...</Text> // Show loading text while camera is initializing
        )}
      </RNCamera>

      {/* Show captured photo */}
      {photoUri && (
        <View style={styles.imageContainer}>
          <Text style={styles.photoLabel}>Captured Photo:</Text>
          <Image source={{ uri: photoUri }} style={styles.capturedImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    padding: 15,
    borderRadius: 50,
  },
  captureText: {
    fontSize: 18,
    color: 'white',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
    position: 'absolute',
    bottom: 50,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  photoLabel: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  capturedImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default TakePhotoEmergency;
