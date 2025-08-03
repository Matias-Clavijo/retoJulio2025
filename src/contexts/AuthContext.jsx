import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api/stockBack';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        // Verificar token al cargar la aplicación
        if (token) {
            validateToken(token);
        } else {
            setLoading(false);
        }
    }, [token]);

    const validateToken = async (tokenToValidate) => {
        try {
            // Aquí podrías verificar el token con el backend
            // Por ahora, simulamos validación exitosa si hay token
            if (tokenToValidate) {
                const savedUser = localStorage.getItem('user');
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                } else {
                    // Usuario básico si hay token pero no datos guardados
                    setUser({ 
                        id: 1, 
                        name: 'Usuario',
                        email: 'usuario@empresa.com'
                    });
                }
            }
        } catch (error) {
            console.error('Error validating token:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            setLoading(true);
            
            // Llamada real al backend para login
            const result = await authAPI.login(credentials);
            
            console.log(result);
            if (result.data.jwt) {
                const token = result.data.jwt;
                setToken(token);
                console.log(token);
                localStorage.setItem('token', token);
                
                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Error al conectar con el servidor' };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            
            // Llamada real al backend para registro
            const result = await authAPI.register(userData);
            
            if (result.success) {
                return { success: true, data: result.data };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: 'Error al conectar con el servidor' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const isAuthenticated = () => {
        return !!user && !!token;
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 