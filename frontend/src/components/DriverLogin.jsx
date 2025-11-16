import React, { useEffect, useState } from "react";
import { auth, database } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

const DriverLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [driverId, setDriverId] = useState(null);

  useEffect(() => {
    let intervalId;
    
    const updateLocation = () => {
        console.log("inside");
        
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Location updated:", latitude, longitude);
            
            if (driverId) {
            //   set(ref(database, `locations/drivers/${driverId}`), {
            //     lat: latitude,
            //     lng: longitude,
            //     updatedAt: new Date().toISOString(),
            //   });
            }
          },
          (error) => {
            console.error("Location error:", error.message);
          },
          { enableHighAccuracy: true }
        );
      }
    };

    if (driverId) {
      updateLocation(); // Run immediately
      intervalId = setInterval(updateLocation, 5000); // Update every 5 seconds
    }

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [driverId]); // Run effect when driverId changes

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Login successful!");
        setDriverId(userCredential.user.uid);
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Driver Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DriverLogin;
