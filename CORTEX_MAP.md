# CORTEX MAP - Guia React

**Proyecto:** Guia React | SENA ADSO  
**Version:** 2.0  
**Ultima actualizacion:** Agosto 2026

---

## 1. Estructura Critica

```
Guia React/
├── web/                          # Guia web interactiva (puerto 8030)
│   ├── css/styles.css            # Estilos Mobile-First (320px a 2560px), Modales, Toasts
│   ├── js/
│   │   ├── main.js               # Enrutamiento SPA, Toasts, Modales y Drawer
│   │   ├── modules-content.js    # 12 modulos con conexion Spring Boot y AI Prompts
│   │   ├── simulators.js         # API Tester, CRUD Studio, Mobile Drawer, Hooks
│   │   ├── code-renderer.js      # Resaltador Prism con JSX/TSX/Java/Bash
│   │   └── gamification.js       # Gamificacion con XP y badges
│   └── index.html
├── recursos/
│   ├── codigo-ejemplo/           # SSOT - Codigo fuente REAL en React 19/18 + Vite
│   │   └── src/
│   │       ├── components/       # Navbar, Modal, Toast, TablaFincas, FincaCard
│   │       ├── services/         # api.js conectado a Spring Boot (31026)
│   │       └── pages/            # Home, FincasCrudPage
│   ├── sql/                      # Scripts de BD
│   └── docker/                   # Dockerfile, compose
├── tests/                        # Tests pytest / vitest
├── .devbrain/                    # Automatizacion
├── generar_guia.py               # Generador DOCX
└── start-windows.ps1             # Servidor web en puerto 8030
```

---

## 2. Puntos de Entrada

| Archivo | Proposito | Comando |
|---------|-----------|---------|
| start-windows.ps1 | Servir guia web interactiva (puerto 8030) | `.\start-windows.ps1` |
| generar_guia.py | Generar documento DOCX oficial | `python generar_guia.py` |

---

## 3. Puertos y Servicios

| Servicio | Puerto | Descripcion |
|----------|--------|-------------|
| Guia Web | 8030 | Guia interactiva HTML/CSS/JS |
| Spring Boot API | 31026 | Backend antecesor (guia-spring) con endpoints Fincas/Cultivos |
| PostgreSQL | 5434 | Base de datos persistente (servicio postgresql-x64-18) |

---

## 4. Ruta Curricular ADSO
- **Fase**: 3 de 5 (Frontend React)
- **Antecesora**: guia-spring (Fase 2) — Puerto 31026
- **Sucesora**: Guia FastAPI (Fase 4) — Puerto 8025
- **Dominio compartido**: Fincas y Cultivos (Santander, Colombia)
- **Puerto guia web**: 8030
- **Stack**: React 19/18, Vite, CSS Modules, Mobile-First, Fetch API / Axios

---

*Documento vivo: Actualizado conforme evoluciona el proyecto.*
