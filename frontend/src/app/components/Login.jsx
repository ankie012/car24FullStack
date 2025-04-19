import React from 'react';
import '../style/login.css'; 

const Login = () => {
  return (
    <div className="login-container">
      {/* Left side image and text */}
      <div className="login-left">
        <img src="/cars24-logo.png" alt="Cars24 Logo" className="logo" />
        <h1 className="login-heading">
          A whole new <br /> world of Cars
        </h1>
      </div>

      {/* Right side form */}
      <div className="login-right">
        <div className="form-box">
          <h2 className="form-title">Log in to continue</h2>

          <label className="label" htmlFor="phone">Mobile number</label>
          <div className="input-wrapper">
            <span className="country-code">+91-</span>
            <input
              type="text"
              id="phone"
              placeholder="999 999 9999"
              className="phone-input"
            />
          </div>

          <div className="checkbox-container">
            <input type="checkbox" id="whatsapp" defaultChecked />
            <label htmlFor="whatsapp" className="checkbox-label">
              Get instant updates from CARS24 on your <strong>WhatsApp</strong>.
            </label>
          </div>

          <button className="otp-button" disabled>GET OTP</button>

          <p className="terms-text">
            By logging in, you agree to CARS24's <a href="#">Privacy Policy</a> and <a href="#">Terms & Conditions</a>.<br />
            CARS24 NBFC's <a href="#">Terms of Use</a> and <a href="#">TU CIBIL Terms of Use</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
