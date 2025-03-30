"use client";
import React, { useState } from 'react';
// import './EmailTemplate.css';

const EmailTemplate = ({ userName, email }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    return (
        <div className="email-verification">
            <div className="email-card">
                <div className="logo">
                    <img src="/your-logo.png" alt="Logo" />
                </div>
                
                <h1>Email Verification</h1>
                
                <div className="welcome-message">
                    <h2>Hello {userName || 'Valued Customer'}!</h2>
                    <p>Thank you for Registering. Please verify your email address to get started.</p>
                    <p className="email-display">{email}</p>
                </div>

                <div className="otp-section">
                    <p>Enter the 6-digit code sent to your email:</p>
                    <div className="otp-inputs">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                            />
                        ))}
                    </div>
                    
                    <button className="verify-button">
                        Verify Email
                    </button>
                    
                    <div className="resend-section">
                        <p>Didn't receive the code?</p>
                        <button className="resend-button">Resend Code</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailTemplate;