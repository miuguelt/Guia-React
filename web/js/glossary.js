/**
 * GLOSSARY - Diccionario Técnico Interactivo React 19 & Spring Boot (SENA ADSO)
 */

const GLOSSARY_TERMS = [
    {
        term: "Virtual DOM",
        tag: "Core React",
        desc: "Copia ligera del DOM real en memoria. React compara el Virtual DOM actual con la versión previa (Reconciliation/Diffing) y aplica únicamente los cambios mínimos necesarios al navegador, logrando un rendimiento superior.",
        example: "Cuando llamas a setCount(5), React actualiza el Virtual DOM primero antes de tocar el HTML real."
    },
    {
        term: "React 19 Actions",
        tag: "React 19",
        desc: "Nuevo estándar para manejar mutaciones asíncronas y envíos de formularios. Permite usar funciones async directamente en la prop 'action' o mediante useActionState, administrando automáticamente los estados de carga (isPending) y errores.",
        example: "const [state, formAction, isPending] = useActionState(crearFincaAction, null);"
    },
    {
        term: "Optimistic UI (useOptimistic)",
        tag: "React 19",
        desc: "Técnica de UX donde la interfaz se actualiza de inmediato (0 ms) asumiendo que la petición al servidor tendrá éxito. Si Spring Boot responde con error, React revierte automáticamente los cambios al estado real.",
        example: "const [optimisticFincas, setOptimisticFincas] = useOptimistic(fincas, (state, nueva) => [...state, nueva]);"
    },
    {
        term: "CORS (Cross-Origin Resource Sharing)",
        tag: "Seguridad / HTTP",
        desc: "Mecanismo de seguridad del navegador que restringe peticiones HTTP entre diferentes orígenes (ej. frontend en http://localhost:5173 hacia backend en http://localhost:31026). Se resuelve con @CrossOrigin en Spring o con Vite Proxy.",
        example: "@CrossOrigin(origins = 'http://localhost:5173') en el RestController de Spring Boot."
    },
    {
        term: "Vite Proxy",
        tag: "Herramientas / Dev",
        desc: "Configuración en vite.config.js que redirige las peticiones que empiezan por /api directamente al servidor de Spring Boot en desarrollo, engañando al navegador para que crea que ambos están en el mismo origen.",
        example: "server: { proxy: { '/api': 'http://localhost:31026' } }"
    },
    {
        term: "JWT (JSON Web Token)",
        tag: "Autenticación",
        desc: "Estándar compacto y autónomo para transmitir información de identidad firmada digitalmente entre React y Spring Boot. Se envía en el encabezado HTTP 'Authorization: Bearer <token>' tras iniciar sesión.",
        example: "headers: { 'Authorization': `Bearer ${token}` }"
    },
    {
        term: "Debounce",
        tag: "Rendimiento",
        desc: "Técnica que retrasa la ejecución de una función (como una búsqueda en vivo) hasta que el usuario deja de escribir durante un tiempo determinado (ej. 300 ms), evitando saturar el servidor con decenas de peticiones innecesarias.",
        example: "const busquedaDebounced = useDebounce(busqueda, 300);"
    },
    {
        term: "Skeleton Loader",
        tag: "UX",
        desc: "Marcador de posición visual con animación de silueta (shimmer) que se muestra mientras los datos de la API se están cargando, eliminando el parpadeo y los saltos visuales bruscos (CLS).",
        example: "<Skeleton height={40} count={3} /> en lugar de un spinner genérico."
    },
    {
        term: "Spring Pageable",
        tag: "Spring Boot",
        desc: "Interfaz de Spring Data JPA para paginar y ordenar colecciones de datos en la base de datos de forma eficiente, evitando traer miles de registros a la memoria en una sola petición.",
        example: "GET /api/fincas?page=0&size=10&sort=nombre,asc"
    },
    {
        term: "HMR (Hot Module Replacement)",
        tag: "Vite / DX",
        desc: "Característica de Vite que reemplaza, añade o elimina módulos en el navegador en milisegundos mientras la aplicación está corriendo, sin recargar toda la página y conservando el estado de los componentes.",
        example: "Editas un componente .jsx y ves el cambio al instante sin perder lo que tenías escrito en los inputs."
    },
    {
        term: "Suspense",
        tag: "React 18/19",
        desc: "Componente contenedor que permite mostrar una interfaz alternativa de carga (fallback) de manera declarativa mientras los componentes hijos terminan de resolver datos asíncronos o código diferido.",
        example: "<Suspense fallback={<SkeletonFincas />}><ListaFincas /></Suspense>"
    },
    {
        term: "Zero-Trust",
        tag: "Seguridad",
        desc: "Principio de diseño donde ninguna petición es considerada confiable por defecto, exigiendo autenticación y validación de permisos en cada endpoint de Spring Boot sin importar si proviene de la red local o externa.",
        example: "Validar el rol ROLE_ADMIN en el backend antes de permitir DELETE /api/fincas/1."
    }
];

const Glossary = {
    render(containerId = 'glossary-container') {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="glossary-search-box" style="margin-bottom:1.5rem;">
                <input type="text" id="glossary-input" class="form-control" placeholder="🔍 Buscar término técnico (ej. CORS, JWT, Optimistic UI, Debounce)..." style="font-size:0.95rem;padding:0.75rem 1rem;">
            </div>
            <div id="glossary-cards-grid" class="glossary-grid">
                ${this.getCardsHtml(GLOSSARY_TERMS)}
            </div>
        `;

        const input = document.getElementById('glossary-input');
        if (input) {
            input.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const filtered = GLOSSARY_TERMS.filter(t => 
                    t.term.toLowerCase().includes(query) || 
                    t.desc.toLowerCase().includes(query) ||
                    t.tag.toLowerCase().includes(query)
                );
                const grid = document.getElementById('glossary-cards-grid');
                if (grid) grid.innerHTML = this.getCardsHtml(filtered);
            });
        }
    },

    getCardsHtml(terms) {
        if (terms.length === 0) {
            return '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-muted);">No se encontraron términos que coincidan con la búsqueda.</div>';
        }
        return terms.map(t => `
            <div class="glossary-card">
                <div class="glossary-term">
                    <span>${t.term}</span>
                    <span class="glossary-tag">${t.tag}</span>
                </div>
                <p class="glossary-desc">${t.desc}</p>
                <div style="margin-top:0.75rem;padding:0.5rem 0.75rem;background:rgba(0,0,0,0.3);border-radius:6px;border-left:3px solid var(--accent-primary);font-size:0.78rem;font-family:'JetBrains Mono',monospace;color:#7dd3fc;">
                    💡 ${t.example}
                </div>
            </div>
        `).join('');
    }
};

window.Glossary = Glossary;
