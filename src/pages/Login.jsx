import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      localStorage.setItem('zenith_token', token);
      localStorage.removeItem('zenith_guild_id');

      setStatus({
        type: 'success',
        text: 'Authentication successful! Redirecting..'
      });

      setTimeout(() => navigate('/dashboard'), 1000);
    } else if (error) {
      setStatus({
        type: 'error',
        text: `Authentication Failed: ${error}`
      });
    }
  }, [location, navigate]);

  return (
    <div
      className="login-body animate-route-enter"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at top, #1a1f35 0%, #0d0f18 70%)',
        color: 'white',
        textAlign: 'center',
        padding: '20px'
      }}
    >

      {/* Title */}
      <h1
        style={{
          fontSize: '3rem',
          fontWeight: '800',
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #00A8FC, #5865F2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 12px rgba(88, 101, 242, 0.5))'
        }}
      >
        zyntra
      </h1>

      <p style={{ opacity: 0.8, marginBottom: '40px', fontSize: '1.1rem' }}>
        Premium Guild Management & Automation
      </p>

      {/* Card */}
      <div
        className="login-card glass-panel"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '35px 40px',
          borderRadius: '18px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 40px rgba(88, 101, 242, 0.25)',
          animation: 'cardPop 0.6s ease-out forwards'
        }}
      >

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90px',
            height: '90px',
            margin: '0 auto 22px auto',
            background: 'rgba(88, 101, 242, 0.12)',
            border: '1px solid rgba(88, 101, 242, 0.35)',
            borderRadius: '26px',
            boxShadow: '0 0 35px rgba(88, 101, 242, 0.25)',
            backdropFilter: 'blur(6px)'
          }}
        >
          <span
            style={{
              fontSize: '3.8rem',
              fontWeight: '900',
              fontFamily: "'Outfit', sans-serif",
              lineHeight: 1,
              background: 'linear-gradient(135deg, #00A8FC, #5865F2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 12px rgba(88, 101, 242, 0.55))'
            }}
          >
            Z
          </span>
        </div>

        {/* Login Button / Status */}
        {!status ? (
          <a
            href="/api/auth/login"
            className="btn-discord"
            style={{
              textDecoration: 'none',
              marginTop: '18px',
              padding: '12px 20px',
              fontSize: '1.05rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#5865F2',
              borderRadius: '10px',
              color: 'white',
              fontWeight: '600',
              boxShadow: '0 0 20px rgba(88, 101, 242, 0.4)',
              transition: '0.2s'
            }}
          >
            <i className="fa-brands fa-discord"></i>
            Login with Discord
          </a>
        ) : (
          <div id="login-status" style={{ marginTop: '18px' }}>
            <span
              style={{
                color: status.type === 'success' ? '#4ADE80' : '#FF4D4D',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {status.type === 'error' && (
                <i className="fa-solid fa-circle-exclamation"></i>
              )}
              {status.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
