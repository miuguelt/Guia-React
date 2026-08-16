import { useEffect } from 'react';

export default function Toast({ id, mensaje, tipo = 'info', onClose, duracion = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose(id);
    }, duracion);
    return () => clearTimeout(timer);
  }, [id, onClose, duracion]);

  const iconos = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`toast toast-${tipo}`}>
      <span className="toast-icon">{iconos[tipo] || 'ℹ️'}</span>
      <div className="toast-body">
        <div className="toast-title">{tipo.toUpperCase()}</div>
        <div className="toast-msg">{mensaje}</div>
      </div>
      <button className="toast-close" onClick={() => onClose && onClose(id)} aria-label="Cerrar">×</button>
    </div>
  );
}
