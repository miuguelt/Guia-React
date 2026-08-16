# CORTEX MAP - Guia React

**Proyecto:** Guia React | SENA ADSO  
**Version:** 1.0  
**Ultima actualizacion:** Junio 2026

---

## 1. Estructura Critica

```
Guia React/
├── web/                          # Guia web interactiva (puerto 8030)
├── recursos/
│   ├── codigo-ejemplo/           # SSOT - Codigo fuente REAL
│   ├── sql/                      # Scripts de BD
│   └── docker/                   # Dockerfile, compose
├── tests/                        # Tests pytest
├── .devbrain/                    # Automatizacion
├── generar_guia.py               # Generador DOCX
└── start-windows.ps1             # Servidor web
```

---

## 2. Puntos de Entrada

| Archivo | Proposito | Comando |
|---------|-----------|---------|
| start-windows.ps1 | Servir guia web | .\start-windows.ps1 |
| generar_guia.py | Generar DOCX | python generar_guia.py |

---

## 3. Puertos y Servicios

| Servicio | Puerto | Descripcion |
|----------|--------|-------------|
| Guia Web | 8030 | Guia interactiva HTML/CSS/JS |

---

---

## Ruta ADSO
- **Fase**: 3 de 5
- **Antecesora**: guia-spring (Fase 2) — Puerto 8026
- **Sucesora**: Guia FastApi (Fase 4) — Puerto 8025
- **Dominio compartido**: Fincas y Cultivos (Vélez, Santander)
- **Puerto guia web**: 8030
- **Puerto API**: N/A (frontend puro)
- **Stack**: React 18+, Vite, React Router, CSS Modules, Vitest

---

*Documento vivo: Actualizar conforme evoluciona el proyecto.*
