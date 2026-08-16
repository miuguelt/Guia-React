const FASE3 = {
    currentSection: 'inicio',
    completed: new Set(),
    totalSections: 8,

    init() {
        this.loadProgress();
        this.injectToast();
        this.initNavigation();
        this.initSidebar();
        this.initCopyButtons();
        this.initCompleteButtons();
        this.initHolaMundoSim();
        this.initEstadoSim();
        this.initCrudSim();
        this.initFiltroSim();
        this.updateProgress();
        this.highlightCode();
    },

    loadProgress() {
        try {
            const saved = localStorage.getItem('fase3-progress');
            if (saved) {
                const arr = JSON.parse(saved);
                arr.forEach(s => this.completed.add(s));
            }
        } catch (e) { /* ignore */ }
    },

    injectToast() {
        if (document.getElementById('fase3-toast')) return;
        const el = document.createElement('div');
        el.id = 'fase3-toast';
        el.setAttribute('role', 'alert');
        el.setAttribute('aria-live', 'polite');
        el.style.cssText = 'position:fixed;bottom:2rem;right:2rem;z-index:9999;background:var(--sena-green);color:var(--white);padding:0.85rem 1.25rem;border-radius:var(--radius-md);font-weight:600;font-size:0.9rem;box-shadow:0 6px 20px rgba(0,0,0,0.2);transform:translateY(calc(100% + 3rem));opacity:0;transition:all 0.35s cubic-bezier(0.4,0,0.2,1);font-family:var(--font-sans);max-width:360px';
        el.style.display = 'none';
        document.body.appendChild(el);
    },

    showToast(msg) {
        const el = document.getElementById('fase3-toast');
        if (!el) return;
        el.textContent = msg;
        el.style.display = 'block';
        requestAnimationFrame(() => {
            el.style.transform = 'translateY(0)';
            el.style.opacity = '1';
        });
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => {
            el.style.transform = 'translateY(calc(100% + 3rem))';
            el.style.opacity = '0';
            setTimeout(() => { el.style.display = 'none'; }, 400);
        }, 2500);
    },

    saveProgress() {
        try {
            localStorage.setItem('fase3-progress', JSON.stringify([...this.completed]));
        } catch (e) { /* ignore */ }
    },

    initNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateTo(section);
                if (window.innerWidth < 768) {
                    document.getElementById('sidebar').classList.remove('open');
                    document.getElementById('sidebar-overlay').classList.remove('active');
                }
            });
        });
    },

    navigateTo(sectionId) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.add('active');
            this.currentSection = sectionId;
            this.updateBreadcrumb(sectionId);
            this.updateNavActive(sectionId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.highlightCode();
        }
    },

    updateBreadcrumb(sectionId) {
        const names = {
            'inicio': 'Inicio',
            'entorno': 'Entorno',
            'holamundo': 'Hola Mundo',
            'jsx': 'JSX y Componentes',
            'estado': 'Estado y Efectos',
            'apis': 'Consumo de APIs',
            'crud': 'CRUD N:M',
            'ux': 'UX para N:M',
            'reto': 'Reto Final'
        };
        const el = document.getElementById('crumb-current');
        if (el) el.textContent = names[sectionId] || sectionId;
    },

    updateNavActive(sectionId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    },

    initSidebar() {
        const toggle = document.getElementById('nav-toggle');
        const sidebar = document.getElementById('sidebar');

        if (!document.getElementById('sidebar-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'sidebar-overlay';
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            });
        }

        if (toggle && sidebar) {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                document.getElementById('sidebar-overlay').classList.toggle('active');
            });
        }
    },

    initCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const codeId = btn.getAttribute('data-copy');
                const codeEl = document.getElementById(codeId);
                if (!codeEl) return;
                const text = codeEl.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    this.showToast('Codigo copiado al portapapeles');
                }).catch(() => {
                    const ta = document.createElement('textarea');
                    ta.value = text;
                    ta.style.position = 'fixed';
                    ta.style.opacity = '0';
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    this.showToast('Codigo copiado al portapapeles');
                });
            });
        });
    },

    initCompleteButtons() {
        document.querySelectorAll('.btn-complete').forEach(btn => {
            const section = btn.getAttribute('data-section');
            if (this.completed.has(section)) {
                btn.textContent = 'Completado';
                btn.classList.add('completed');
            }
            btn.addEventListener('click', () => {
                if (!this.completed.has(section)) {
                    this.completed.add(section);
                    this.saveProgress();
                    btn.textContent = 'Completado';
                    btn.classList.add('completed');
                    this.updateProgress();
                    this.updateNavCompleted(section);
                }
            });
        });
        this.completed.forEach(s => this.updateNavCompleted(s));
    },

    updateNavCompleted(sectionId) {
        const link = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (link) link.classList.add('completed');
    },

    updateProgress() {
        const count = this.completed.size;
        const pct = Math.round((count / this.totalSections) * 100);
        const fill = document.getElementById('progress-fill');
        const label = document.getElementById('progress-label');
        const pctEl = document.getElementById('progress-pct');
        if (fill) fill.style.width = pct + '%';
        if (label) label.textContent = `${count} de ${this.totalSections} completados`;
        if (pctEl) pctEl.textContent = pct + '%';
    },

    highlightCode() {
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    },

    initHolaMundoSim() {
        const nombreInput = document.getElementById('sim-nombre');
        const hectareasInput = document.getElementById('sim-hectareas');
        const output = document.getElementById('sim-holamundo-output');
        const codeEl = document.getElementById('sim-holamundo-code');
        if (!nombreInput || !hectareasInput || !output || !codeEl) return;

        const update = () => {
            const nombre = nombreInput.value || 'Sin nombre';
            const hectareas = parseFloat(hectareasInput.value) || 0;
            const tipo = hectareas > 10 ? 'grande' : 'pequena';

            output.innerHTML = `
                <h3>${nombre}</h3>
                <p>Vereda y municipio de Vélez, Santander</p>
                <p>Hectareas: <strong>${hectareas}</strong> (${tipo})</p>
            `;

            const code = `function App() {
  return (
    <div className="app">
      <h1>${nombre}</h1>
      <p>Vereda y municipio de Vélez, Santander</p>
      <p>
        Hectareas: <strong>${hectareas}</strong>
        ${hectareas > 10 ? ' (grande)' : ' (pequena)'}
      </p>
    </div>
  )
}`;
            codeEl.textContent = code;
            if (typeof Prism !== 'undefined') Prism.highlightElement(codeEl);
        };

        nombreInput.addEventListener('input', update);
        hectareasInput.addEventListener('input', update);
        update();
    },

    initEstadoSim() {
        const valorEl = document.getElementById('sim-estado-valor');
        const listaEl = document.getElementById('sim-estado-lista');
        const codeEl = document.getElementById('sim-estado-code');
        const addBtn = document.getElementById('sim-estado-add');
        const resetBtn = document.getElementById('sim-estado-reset');
        if (!valorEl || !listaEl || !codeEl || !addBtn || !resetBtn) return;

        let fincas = [];
        let counter = 0;
        const nombres = ['El Porvenir', 'Los Alamos', 'La Esperanza', 'San Jose', 'El Cardal', 'La Meseta', 'El Roble', 'Villa Maria'];

        const update = () => {
            valorEl.textContent = fincas.length;
            listaEl.innerHTML = fincas.map((f, i) => `
                <div class="estado-list-item">
                    <span>Finca #${f.id}: ${f.nombre} (${f.ha} ha)</span>
                    <button class="item-remove" data-idx="${i}" title="Eliminar">&times;</button>
                </div>
            `).join('');

            listaEl.querySelectorAll('.item-remove').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.getAttribute('data-idx'));
                    fincas.splice(idx, 1);
                    update();
                });
            });

            const code = `import { useState } from 'react'

function ListaFincas() {
  const [fincas, setFincas] = useState([
${fincas.map(f => `    { id: ${f.id}, nombre: '${f.nombre}', ha: ${f.ha} }`).join(',\n')}
  ])

  const agregar = () => {
    setFincas([...fincas, { id: ${counter + 1}, nombre: 'Nueva', ha: 5 }])
  }

  const eliminar = (id) => {
    setFincas(fincas.filter(f => f.id !== id))
  }

  return (
    <div>
      <p>Total: {fincas.length} fincas</p>
      {fincas.map(f => (
        <div key={f.id}>
          {f.nombre} ({f.ha} ha)
          <button onClick={() => eliminar(f.id)}>x</button>
        </div>
      ))}
      <button onClick={agregar}>+ Agregar</button>
    </div>
  )
}`;
            codeEl.textContent = code;
            if (typeof Prism !== 'undefined') Prism.highlightElement(codeEl);
        };

        addBtn.addEventListener('click', () => {
            counter++;
            const nombre = nombres[counter % nombres.length];
            const ha = (Math.random() * 15 + 1).toFixed(1);
            fincas.push({ id: counter, nombre, ha });
            update();
        });

        resetBtn.addEventListener('click', () => {
            fincas = [];
            counter = 0;
            update();
        });

        update();
    },

    initCrudSim() {
        const fincasListEl = document.getElementById('sim-crud-fincas');
        const detalleEl = document.getElementById('sim-crud-detalle');
        const form = document.getElementById('sim-crud-form');
        const fincaSelect = document.getElementById('sim-crud-finca');
        const cultivoSelect = document.getElementById('sim-crud-cultivo');
        if (!fincasListEl || !detalleEl || !form || !fincaSelect || !cultivoSelect) return;

        const fincas = [
            { id: 1, nombre: 'El Porvenir', propietario: 'Jose Rodriguez', vereda: 'La Mesa', municipio: 'Vélez', hectareas: 8.5 },
            { id: 2, nombre: 'Los Alamos', propietario: 'Maria Peña', vereda: 'El Rosario', municipio: 'Vélez', hectareas: 15.2 },
            { id: 3, nombre: 'La Esperanza', propietario: 'Carlos Gutierrez', vereda: 'El Cardal', municipio: 'Vélez', hectareas: 5.0 }
        ];

        const cultivos = [
            { id: 1, nombre: 'Cafe Castillo', tipo: 'Cafe', ciclo_dias: 365 },
            { id: 2, nombre: 'Maiz Hibrido', tipo: 'Maiz', ciclo_dias: 120 },
            { id: 3, nombre: 'Mango Tommy', tipo: 'Frutales', ciclo_dias: 270 },
            { id: 4, nombre: 'Fríjol Cargamanto', tipo: 'Grano', ciclo_dias: 90 }
        ];

        let asociaciones = [
            { finca_id: 1, cultivo_id: 1, cultivo_nombre: 'Cafe Castillo', area_sembrada_ha: 3.2, fecha_siembra: '2026-03-15', temporada: 'lluvia', estado: 'activo' },
            { finca_id: 1, cultivo_id: 2, cultivo_nombre: 'Maiz Hibrido', area_sembrada_ha: 2.0, fecha_siembra: '2026-01-10', temporada: 'seca', estado: 'activo' },
            { finca_id: 1, cultivo_id: 3, cultivo_nombre: 'Mango Tommy', area_sembrada_ha: 1.5, fecha_siembra: '2025-08-20', temporada: 'lluvia', estado: 'activo' },
            { finca_id: 2, cultivo_id: 1, cultivo_nombre: 'Cafe Castillo', area_sembrada_ha: 8.0, fecha_siembra: '2025-10-05', temporada: 'lluvia', estado: 'activo' },
            { finca_id: 2, cultivo_id: 4, cultivo_nombre: 'Fríjol Cargamanto', area_sembrada_ha: 3.5, fecha_siembra: '2026-02-01', temporada: 'seca', estado: 'cosechado' },
            { finca_id: 3, cultivo_id: 2, cultivo_nombre: 'Maiz Hibrido', area_sembrada_ha: 2.5, fecha_siembra: '2026-04-01', temporada: 'lluvia', estado: 'activo' }
        ];

        let selectedFincaId = null;

        const renderFincas = () => {
            fincasListEl.innerHTML = fincas.map(f => `
                <div class="sim-crud-item ${selectedFincaId === f.id ? 'selected' : ''}" data-id="${f.id}">
                    <span>${f.nombre} (${f.hectareas} ha)</span>
                    <span style="font-size:0.72rem;color:var(--text-muted)">${f.vereda}</span>
                </div>
            `).join('');

            fincasListEl.querySelectorAll('.sim-crud-item').forEach(el => {
                el.addEventListener('click', () => {
                    selectedFincaId = parseInt(el.getAttribute('data-id'));
                    renderFincas();
                    renderDetalle();
                });
            });
        };

        const renderSelects = () => {
            fincaSelect.innerHTML = '<option value="">Finca...</option>' +
                fincas.map(f => `<option value="${f.id}">${f.nombre}</option>`).join('');
            cultivoSelect.innerHTML = '<option value="">Cultivo...</option>' +
                cultivos.map(c => `<option value="${c.id}">${c.nombre} (${c.tipo})</option>`).join('');
        };

        const renderDetalle = () => {
            if (!selectedFincaId) {
                detalleEl.innerHTML = '<p class="sim-empty">Selecciona una finca para ver sus cultivos</p>';
                return;
            }

            const finca = fincas.find(f => f.id === selectedFincaId);
            const cultivosAsociados = asociaciones.filter(a => a.finca_id === selectedFincaId);

            let html = `
                <div style="background:var(--sena-green-bg);border:1px solid var(--sena-green-border);border-radius:var(--radius-sm);padding:0.75rem;margin-bottom:0.75rem">
                    <strong style="color:var(--sena-green-dark)">${finca.nombre}</strong>
                    <div style="font-size:0.78rem;color:var(--text-muted)">${finca.propietario} — ${finca.vereda}</div>
                    <div style="font-size:0.78rem;color:var(--text-muted)">${finca.hectareas} ha en total</div>
                </div>
            `;

            if (cultivosAsociados.length === 0) {
                html += '<p class="sim-empty">Sin cultivos asociados</p>';
            } else {
                html += cultivosAsociados.map(a => `
                    <div class="sim-crud-asoc">
                        <strong>${a.cultivo_nombre}</strong>
                        <span class="badge badge-${a.estado}" style="margin-left:0.5rem">${a.estado}</span>
                        <div class="asoc-attrs">
                            <span class="asoc-attr">Area: ${a.area_sembrada_ha} ha</span>
                            <span class="asoc-attr">Siembra: ${a.fecha_siembra}</span>
                            <span class="asoc-attr">Temp: ${a.temporada}</span>
                        </div>
                    </div>
                `).join('');
            }

            detalleEl.innerHTML = html;
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const areaEl = document.getElementById('sim-crud-area');
            const fechaEl = document.getElementById('sim-crud-fecha');
            const tempEl = document.getElementById('sim-crud-temporada');
            const estEl = document.getElementById('sim-crud-estado');
            if (!areaEl || !fechaEl || !tempEl || !estEl) return;
            const fincaId = parseInt(fincaSelect.value);
            const cultivoId = parseInt(cultivoSelect.value);
            const area = parseFloat(areaEl.value);
            const fecha = fechaEl.value;
            const temporada = tempEl.value;
            const estado = estEl.value;

            if (!fincaId || !cultivoId || !area || !fecha) {
                this.showToast('Completa todos los campos obligatorios');
                return;
            }

            const exists = asociaciones.find(a => a.finca_id === fincaId && a.cultivo_id === cultivoId);
            if (exists) {
                this.showToast('Este cultivo ya esta asociado a esta finca');
                return;
            }

            const cultivo = cultivos.find(c => c.id === cultivoId);
            asociaciones.push({
                finca_id: fincaId,
                cultivo_id: cultivoId,
                cultivo_nombre: cultivo.nombre,
                area_sembrada_ha: area,
                fecha_siembra: fecha,
                temporada: temporada,
                estado: estado
            });

            form.reset();
            renderDetalle();
        });

        renderFincas();
        renderSelects();
        renderDetalle();
    },

    initFiltroSim() {
        const selectEl = document.getElementById('sim-filtro-finca');
        const detalleEl = document.getElementById('sim-filtro-detalle');
        const codeEl = document.getElementById('sim-filtro-code');
        if (!selectEl || !detalleEl) return;

        const data = {
            1: { nombre: 'El Porvenir', hectareas: 8.5, cultivos: [
                { nombre: 'Cafe Castillo', area: 3.2, fecha: '2026-03-15', temporada: 'Lluvia', estado: 'activo' },
                { nombre: 'Maiz Hibrido', area: 2.0, fecha: '2026-01-10', temporada: 'Seca', estado: 'activo' },
                { nombre: 'Mango Tommy', area: 1.5, fecha: '2025-08-20', temporada: 'Lluvia', estado: 'activo' }
            ]},
            2: { nombre: 'Los Alamos', hectareas: 15.2, cultivos: [
                { nombre: 'Cafe Castillo', area: 8.0, fecha: '2025-10-05', temporada: 'Lluvia', estado: 'activo' },
                { nombre: 'Frijol Cargamanto', area: 3.5, fecha: '2026-02-01', temporada: 'Seca', estado: 'cosechado' },
                { nombre: 'Maiz Hibrido', area: 2.0, fecha: '2026-04-15', temporada: 'Lluvia', estado: 'activo' },
                { nombre: 'Yuca Industrial', area: 1.7, fecha: '2026-05-01', temporada: 'Lluvia', estado: 'activo' }
            ]},
            3: { nombre: 'La Esperanza', hectareas: 5.0, cultivos: [
                { nombre: 'Maiz Hibrido', area: 2.5, fecha: '2026-04-01', temporada: 'Lluvia', estado: 'activo' },
                { nombre: 'Frijol Cargamanto', area: 1.0, fecha: '2025-11-20', temporada: 'Lluvia', estado: 'cosechado' }
            ]}
        };

        let filtro = 'todos';

        const render = () => {
            const fincaId = parseInt(selectEl.value);
            const finca = data[fincaId];
            if (!finca) { detalleEl.innerHTML = '<p class="sim-filtro-empty">Selecciona una finca</p>'; return; }

            const filtrados = filtro === 'todos' ? finca.cultivos : finca.cultivos.filter(c => c.estado === filtro);
            const filtroClase = (val) => val === filtro ? 'filtro-btn active' : 'filtro-btn';

            let html = `
                <div class="finca-header" style="margin-bottom:0.75rem">
                    <h2 style="margin:0;font-size:1.1rem">${finca.nombre}</h2>
                    <p style="margin:0;font-size:0.82rem">${finca.hectareas} ha en total</p>
                </div>
                <div class="filtro-bar" style="margin-top:0.75rem">
                    <span>Filtrar:</span>
                    <button class="${filtroClase('todos')}" data-filtro="todos">Todos</button>
                    <button class="${filtroClase('activo')}" data-filtro="activo">Activos</button>
                    <button class="${filtroClase('cosechado')}" data-filtro="cosechado">Cosechados</button>
                </div>
                <p style="font-size:0.82rem;color:var(--text-muted);margin:0.5rem 0">
                    Mostrando <strong>${filtrados.length}</strong> de ${finca.cultivos.length} cultivos
                </p>
            `;

            if (filtrados.length === 0) {
                html += '<p class="sim-filtro-empty">No hay cultivos con estado "' + filtro + '" en esta finca.</p>';
            } else {
                html += '<div class="cultivos-grid">' +
                    filtrados.map(c => `
                        <div class="cultivo-card" style="padding:0.75rem">
                            <div class="cultivo-card-header">
                                <h4 style="font-size:0.9rem">${c.nombre}</h4>
                                <span class="badge badge-${c.estado}">${c.estado}</span>
                            </div>
                            <div class="cultivo-card-body">
                                <p><strong>Area:</strong> ${c.area} ha</p>
                                <p><strong>Siembra:</strong> ${c.fecha}</p>
                                <p><strong>Temporada:</strong> ${c.temporada}</p>
                            </div>
                        </div>
                    `).join('') + '</div>';
            }

            detalleEl.innerHTML = html;

            detalleEl.querySelectorAll('.filtro-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    filtro = btn.getAttribute('data-filtro');
                    render();
                    updateCode(finca, filtro, filtrados.length);
                });
            });

            updateCode(finca, filtro, filtrados.length);
        };

        const updateCode = (finca, filtro, count) => {
            if (!codeEl) return;
            const fincaVar = JSON.stringify(finca.nombre);
            const code = `import { useState } from 'react'

function FiltroCultivos() {
  const [filtroEstado, setFiltroEstado] = useState('${filtro}')
  const cultivos = ${JSON.stringify(finca.cultivos, null, 2)}

  const filtrados = filtroEstado === 'todos'
    ? cultivos
    : cultivos.filter(c => c.estado === filtroEstado)

  return (
    <div>
      <p>Mostrando {filtrados.length} de {cultivos.length}</p>
      <div className="filtro-bar">
        {['todos','activo','cosechado'].map(est =>
          <button key={est}
            className={filtroEstado === est ? 'active' : ''}
            onClick={() => setFiltroEstado(est)}>
            {est === 'todos' ? 'Todos' : est}
          </button>
        )}
      </div>
      {filtrados.map(c =>
        <div key={c.nombre}>
          <strong>{c.nombre}</strong> - {c.area} ha - {c.estado}
        </div>
      )}
    </div>
  )
}`;
            codeEl.textContent = code;
            if (typeof Prism !== 'undefined') Prism.highlightElement(codeEl);
        };

        selectEl.addEventListener('change', render);
        render();
    }
};

document.addEventListener('DOMContentLoaded', () => FASE3.init());
