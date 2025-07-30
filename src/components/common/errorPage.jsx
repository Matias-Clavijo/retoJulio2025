import React from 'react';
import { Link } from 'react-router-dom';


const ErrorPage404 = ({ title, subtitle, message }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#faf6f0',
                fontFamily: 'sans-serif',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '80px', fontWeight: 'bold', color: '#111' }}>404</h1>
                <h2 style={{ fontSize: '24px', color: '#333' }}>Page not found</h2>
                <p style={{ color: '#666', marginBottom: '30px' }}>
                    The page you are looking for does not exist.
                </p>
                <Link to="/">
                    <button
                        style={{
                            backgroundColor: '#0B2240',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: '30px',
                            fontSize: '16px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#1e40af')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#2563eb')}
                    >
                        Go back home
                    </button>
                </Link>
            </div>
        </div>
    );
};

ErrorPage404.defaultProps = {
    title: "404",
    subtitle: "Page not found",
    message: "The page you are looking for does not exist.",
};

export default ErrorPage404;    
