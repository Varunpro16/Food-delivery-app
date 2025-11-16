import { useState } from "react";
import axios from "axios";

const OTPLogin = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);

    const sendOtp = async () => {
        try {
            await axios.post("http://localhost:5000/send-otp", { phone });
            setShowOtpInput(true);
            alert("OTP sent to your phone");
        } catch (error) {
            alert("Error sending OTP");
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post("http://localhost:5000/verify-otp", { phone, otp });
            alert("Login successful!");
            console.log(response.data.token); // Save JWT for future authentication
        } catch (error) {
            alert("Invalid OTP");
        }
    };

    return (
        <div>
            <h2>OTP Login</h2>
            <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={sendOtp}>Send OTP</button>

            {showOtpInput && (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </>
            )}
        </div>
    );
};

export default OTPLogin;
