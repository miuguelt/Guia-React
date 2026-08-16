import { useState } from 'react';

export default function Navbar({ activeSection, onNavigate }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(prev => !prev);
  const handleNav = (section) => {
    if (onNavigate) onNavigate(section);
    setMenuAbierto(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-brand">
        <span className="brand-icon">🌿</span>
        <span className="brand-title">AgroManager <strong>Santander</strong></span>
      </div>

      <button 
        className="hamburger-btn" 
        onClick={toggleMenu} 
        aria-label="Abrir menú de navegación"
        aria-expanded={menuAbierto}
      >
        <span className={menuAbierto ? 'bar open' : 'bar'}></span>
        <span className={menuAbierto ? 'bar open' : 'bar'}></span>
        <span className={menuAbierto ? 'bar open' : 'bar'}></span>
      </button>

      {menuAbierto && <div className="nav-backdrop" onClick={toggleMenu}></div>}

      <nav className={`nav-menu ${menuAbierto ? 'is-active' : ''}`}>
        <button 
          className={activeSection === 'fincas' ? 'nav-item active' : 'nav-item'} 
          onClick={() => handleNav('fincas')}
        >
          🏡 Fincas
        </button>
        <button 
          className={activeSection === 'cultivos' ? 'nav-item active' : 'nav-item'} 
          onClick={() => handleNav('cultivos')}
        >
          🌱 Cultivos
        </button>
        <button 
          className={activeSection === 'asociaciones' ? 'nav-item active' : 'nav-item'} 
          onClick={() => handleNav('asociaciones')}
        >
          🔄 Siembra (N:M)
        </button>
      </nav>
    </header>
  );
}
