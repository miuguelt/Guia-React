import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ rolRequerido }) {
  const { usuario, cargando, isAuthenticated } = useAuth();

  if (cargando) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Verificando credenciales de acceso...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (rolRequerido && usuario?.rol !== rolRequerido) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#f87171' }}>
        ⛔ Acceso Denegado: Se requiere el rol <strong>{rolRequerido}</strong>.
      </div>
    );
  }

  return <Outlet />;
}
