import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage404 = ({ title, subtitle, message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-neutral-100 text-center p-4">
            <h1 className="text-6xl font-bold text-neutral-900 mb-4">{title}</h1>
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">{subtitle}</h2>
            <p className="text-neutral-600 mb-6">{message}</p>
            <Link
                to="/home"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
                Go back home
            </Link>
        </div>
    );
};

ErrorPage404.defaultProps = {
    title: "404",
    subtitle: "Page not found",
    message: "The page you are looking for does not exist.",
};

export default ErrorPage404;    
