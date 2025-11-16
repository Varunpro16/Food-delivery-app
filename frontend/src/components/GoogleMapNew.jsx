import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import bike from '../assests/ride-a-bike.png'

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const GoogleMapView = () => {
  const [position, setPosition] = useState(null);
  const zoomLevel = 18; // Street-level zoom

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (location) => {
            const { latitude, longitude } = location.coords;
            setPosition({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Location error:", error.message);
          },
          { enableHighAccuracy: true }
        );
      }
    };

    updateLocation();
    const intervalId = setInterval(updateLocation, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBPX_zAw31fJYCtNQao1_t2f-4ZtC8vL70">
      {position ? (
        <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={zoomLevel}>
           <Marker
          position={position}
          icon={bike}
        />
        </GoogleMap>
      ) : (
        <div>Loading map...</div>
      )}
    </LoadScript>
  );
};

export default GoogleMapView;
