import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwt_token'));
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (token) {
      // En un entorno real se valida el token con GET /api/auth/me o decodificando el payload JWT
      setUsuario({ email: 'aprendiz@sena.edu.co', rol: 'ROLE_ADMIN' });
    }
    setCargando(false);
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch('http://localhost:31026/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Credenciales inválidas');
    const data = await res.json();
    setToken(data.token);
    localStorage.setItem('jwt_token', data.token);
    setUsuario(data.usuario);
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem('jwt_token');
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, cargando, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
