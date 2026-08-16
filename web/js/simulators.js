/**
 * SIMULATORS - Guia React 19 & Spring Boot 3.5 API (SENA ADSO)
 * Laboratorio interactivo completo: 12 simuladores prácticos de alto impacto.
 */

const SIMULATORS = {
    init() {
        this.renderJSXSimulator();
        this.renderPropsSimulator();
        this.renderSpringBootApiSimulator();
        this.renderInteractiveCRUD();
        this.renderMobileLayoutSimulator();
        this.renderHooksVisualizer();
        this.renderQuizSimulator();
        this.renderOptimisticSimulator();
        this.renderDebounceSimulator();
        this.renderAuthSimulator();
        this.renderPaginationSimulator();
        this.renderFileUploadSimulator();
        this.renderErrorBoundarySimulator();
    },

    // ══════════════════════════════════════════════════════════════
    // 1. SPRING BOOT API ENDPOINT TESTER EN VIVO
    // ══════════════════════════════════════════════════════════════
    renderSpringBootApiSimulator() {
        const container = document.querySelector('.sim-api-container');
        if (!container) return;

        const endpoints = [
            { method: 'GET', path: '/api/hello', desc: 'Verificar estado del backend', body: '' },
            { method: 'GET', path: '/api/fincas', desc: 'Listar fincas (Paginación default)', body: '' },
            { method: 'GET', path: '/api/fincas?page=0&size=5&sort=nombre,asc', desc: 'Listar con Spring Pageable', body: '' },
            { 
                method: 'POST', 
                path: '/api/fincas', 
                desc: 'Crear nueva finca', 
                body: JSON.stringify({
                    nombre: "Finca El Porvenir",
                    propietario: "Laura Gómez",
                    vereda: "El Palmar",
                    municipio: "Vélez",
                    hectareas: 14.5
                }, null, 2) 
            },
            { 
                method: 'PUT', 
                path: '/api/fincas/1', 
                desc: 'Actualizar finca #1', 
                body: JSON.stringify({
                    nombre: "Finca La Esperanza (Renovada)",
                    propietario: "Carlos Rueda",
                    vereda: "El Gualilo",
                    municipio: "Vélez",
                    hectareas: 18.0
                }, null, 2) 
            },
            { method: 'DELETE', path: '/api/fincas/3', desc: 'Eliminar finca #3', body: '' },
            { method: 'GET', path: '/api/cultivos', desc: 'Listar cultivos disponibles', body: '' },
            { 
                method: 'POST', 
                path: '/api/cultivos', 
                desc: 'Crear nuevo cultivo', 
                body: JSON.stringify({
                    nombre: "Cacao Criollo",
                    tipo: "permanente",
                    cicloDias: 1080
                }, null, 2) 
            },
            { 
                method: 'POST', 
                path: '/api/finca-cultivos', 
                desc: 'Asociar cultivo a finca (N:M)', 
                body: JSON.stringify({
                    fincaId: 1,
                    cultivoId: 2,
                    areaSembradaHa: 5.0,
                    fechaSiembra: "2026-03-15",
                    temporada: "Primer Semestre",
                    estado: "ACTIVO"
                }, null, 2) 
            }
        ];

        container.innerHTML = `
            <div class="simulator-card glass-panel">
                <div class="sim-header">
                    <h3><span>⚡</span> Spring Boot Endpoint Tester (Puerto 31026)</h3>
                    <span class="sim-tag">REST Client</span>
                </div>
                <div class="sim-body">
                    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:1rem;">
                        Prueba cómo tu aplicación React realiza peticiones HTTP a la API de Spring Boot y recibe respuestas JSON.
                    </p>
                    <div class="sim-split">
                        <div class="form-group">
                            <label>Seleccionar Endpoint:</label>
                            <select id="api-sim-endpoint" class="form-control">
                                ${endpoints.map((ep, i) => `<option value="${i}">[${ep.method}] ${ep.path} — ${ep.desc}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Servidor Destino:</label>
                            <input type="text" id="api-sim-host" class="form-control" value="http://localhost:31026" readonly style="color:var(--accent-spring);font-family:monospace;">
                        </div>
                    </div>

                    <div class="form-group" id="api-sim-body-group" style="display:none;">
                        <label>Payload JSON (Cuerpo de la petición):</label>
                        <textarea id="api-sim-body" class="sim-textarea" rows="5" spellcheck="false"></textarea>
                    </div>

                    <div style="margin: 1rem 0; display:flex; gap:0.75rem; flex-wrap:wrap;">
                        <button class="btn btn-spring" id="api-sim-send-btn" onclick="SIMULATORS.executeApiCall()">
                            🚀 Enviar Petición Fetch
                        </button>
                        <button class="btn btn-secondary" onclick="SIMULATORS.toggleMockRealMode()">
                            <span id="api-mode-label">Modo: Simulado (Respuesta Instantánea)</span>
                        </button>
                    </div>

                    <div class="sim-preview" style="margin-top:1rem;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                            <strong style="font-size:0.85rem;color:var(--text-muted);">Respuesta HTTP de Spring Boot:</strong>
                            <span id="api-sim-status" class="status-badge status-200">200 OK</span>
                        </div>
                        <pre id="api-sim-response" style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#7dd3fc;white-space:pre-wrap;margin:0;max-height:220px;overflow-y:auto;"></pre>
                    </div>
                </div>
            </div>
        `;

        this.endpointsData = endpoints;
        this.apiRealMode = false;

        const select = document.getElementById('api-sim-endpoint');
        if (select) {
            select.addEventListener('change', (e) => {
                const ep = this.endpointsData[e.target.value];
                const bodyGroup = document.getElementById('api-sim-body-group');
                const bodyArea = document.getElementById('api-sim-body');
                if (ep.method === 'POST' || ep.method === 'PUT') {
                    bodyGroup.style.display = 'block';
                    bodyArea.value = ep.body;
                } else {
                    bodyGroup.style.display = 'none';
                }
            });
        }
    },

    toggleMockRealMode() {
        this.apiRealMode = !this.apiRealMode;
        const label = document.getElementById('api-mode-label');
        if (label) {
            label.textContent = this.apiRealMode ? 'Modo: Real (Llamada a http://localhost:31026)' : 'Modo: Simulado (Respuesta Instantánea)';
        }
        if (window.APP && window.APP.showToast) {
            window.APP.showToast(`Modo cambiado a: ${this.apiRealMode ? 'Conexión Real' : 'Simulación'}`, 'info');
        }
    },

    async executeApiCall() {
        const select = document.getElementById('api-sim-endpoint');
        const responsePre = document.getElementById('api-sim-response');
        const statusBadge = document.getElementById('api-sim-status');
        const bodyArea = document.getElementById('api-sim-body');
        const sendBtn = document.getElementById('api-sim-send-btn');
        if (!select || !responsePre) return;

        const ep = this.endpointsData[select.value];
        sendBtn.disabled = true;
        sendBtn.textContent = '⏳ Conectando...';

        if (this.apiRealMode) {
            try {
                const host = 'http://localhost:31026';
                const opts = {
                    method: ep.method,
                    headers: { 'Content-Type': 'application/json' }
                };
                if ((ep.method === 'POST' || ep.method === 'PUT') && bodyArea.value) {
                    opts.body = bodyArea.value;
                }
                const res = await fetch(`${host}${ep.path}`, opts);
                const data = await res.json().catch(() => ({}));
                statusBadge.textContent = `${res.status} ${res.statusText}`;
                statusBadge.className = `status-badge ${res.ok ? 'status-200' : 'status-400'}`;
                responsePre.textContent = JSON.stringify(data, null, 2);
            } catch (err) {
                statusBadge.textContent = 'Error de Conexión (CORS o Servidor apagado)';
                statusBadge.className = 'status-badge status-400';
                responsePre.textContent = `❌ No se pudo conectar con Spring Boot en http://localhost:31026\nCausa: ${err.message}\n\n💡 Tip: Puedes activar el modo simulado o asegurarte de que tu backend Spring esté corriendo.`;
            }
        } else {
            await new Promise(r => setTimeout(r, 400));
            if (ep.path === '/api/hello') {
                statusBadge.textContent = '200 OK';
                statusBadge.className = 'status-badge status-200';
                responsePre.textContent = JSON.stringify({ mensaje: "API Fincas y Cultivos SENA ADSO operativa", timestamp: new Date().toISOString() }, null, 2);
            } else if (ep.path.includes('/api/fincas') && ep.method === 'GET') {
                statusBadge.textContent = '200 OK';
                statusBadge.className = 'status-badge status-200';
                responsePre.textContent = JSON.stringify({
                    content: [
                        { id: 1, nombre: "Finca La Esperanza", propietario: "Carlos Rueda", vereda: "El Gualilo", municipio: "Vélez", hectareas: 15.0 },
                        { id: 2, nombre: "Finca La Floresta", propietario: "María Gómez", vereda: "San José", municipio: "Vélez", hectareas: 8.0 },
                        { id: 3, nombre: "Finca El Roble", propietario: "Andrés Silva", vereda: "Zavala", municipio: "Barbosa", hectareas: 22.0 }
                    ],
                    totalElements: 3,
                    totalPages: 1,
                    pageable: { pageNumber: 0, pageSize: 5 }
                }, null, 2);
            } else if (ep.path === '/api/fincas' && ep.method === 'POST') {
                statusBadge.textContent = '201 Created';
                statusBadge.className = 'status-badge status-201';
                let parsed = { nombre: "Finca El Porvenir", propietario: "Laura Gómez", vereda: "El Palmar", municipio: "Vélez", hectareas: 14.5 };
                try { parsed = JSON.parse(bodyArea.value); } catch(e){}
                responsePre.textContent = JSON.stringify({ id: 4, ...parsed, fechaCreacion: new Date().toISOString() }, null, 2);
            } else if (ep.method === 'PUT') {
                statusBadge.textContent = '200 OK';
                statusBadge.className = 'status-badge status-200';
                responsePre.textContent = JSON.stringify({ id: 1, nombre: "Finca La Esperanza (Renovada)", propietario: "Carlos Rueda", vereda: "El Gualilo", municipio: "Vélez", hectareas: 18.0, ultimaModificacion: new Date().toISOString() }, null, 2);
            } else if (ep.method === 'DELETE') {
                statusBadge.textContent = '204 No Content';
                statusBadge.className = 'status-badge status-200';
                responsePre.textContent = '/* 204 No Content: Finca eliminada exitosamente de PostgreSQL */';
            } else if (ep.path === '/api/cultivos') {
                statusBadge.textContent = '200 OK';
                statusBadge.className = 'status-badge status-200';
                responsePre.textContent = JSON.stringify([
                    { id: 1, nombre: "Guayaba Manzana", tipo: "permanente", cicloDias: 365 },
                    { id: 2, nombre: "Café Arábica", tipo: "permanente", cicloDias: 365 },
                    { id: 3, nombre: "Frijol", tipo: "transitorio", cicloDias: 120 }
                ], null, 2);
            } else if (ep.path === '/api/finca-cultivos') {
                statusBadge.textContent = '201 Created';
                statusBadge.className = 'status-badge status-201';
                responsePre.textContent = JSON.stringify({
                    id: 10,
                    finca: { id: 1, nombre: "Finca La Esperanza" },
                    cultivo: { id: 2, nombre: "Café Arábica" },
                    areaSembradaHa: 5.0,
                    temporada: "Primer Semestre",
                    estado: "ACTIVO"
                }, null, 2);
            }
        }

        sendBtn.disabled = false;
        sendBtn.textContent = '🚀 Enviar Petición Fetch';
        if (window.GAMIFICATION) window.GAMIFICATION.addXP(75, 'Llamada HTTP a Spring Boot probada');
        if (window.APP && window.APP.showToast) window.APP.showToast('Petición completada y estado actualizado', 'success');
    },

    // ══════════════════════════════════════════════════════════════
    // 2. CRUD STUDIO INTERACTIVO
    // ══════════════════════════════════════════════════════════════
    renderInteractiveCRUD() {
        const container = document.querySelector('.sim-crud-container');
        if (!container) return;

        this.crudData = [
            { id: 1, nombre: "Finca La Esperanza", propietario: "Carlos Rueda", vereda: "El Gualilo", municipio: "Vélez", hectareas: 15.0 },
            { id: 2, nombre: "Finca La Floresta", propietario: "María Gómez", vereda: "San José", municipio: "Vélez", hectareas: 8.0 },
            { id: 3, nombre: "Finca El Roble", propietario: "Andrés Silva", vereda: "Zavala", municipio: "Barbosa", hectareas: 22.0 }
        ];

        container.innerHTML = `
            <div class="simulator-card glass-panel">
                <div class="sim-header">
                    <h3><span>📊</span> CRUD Studio en Vivo (React State + Modal + Toasts)</h3>
                    <button class="btn btn-sm btn-primary" onclick="SIMULATORS.openCrudModal()">➕ Nueva Finca</button>
                </div>
                <div class="sim-body">
                    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:1rem;">
                        Interactúa con este componente completo: crea fincas con el modal, edítalas, elimínalas y observa cómo se disparan los <strong>Mensajes Flotantes (Toasts)</strong> y se actualiza la tabla reactivamente.
                    </p>
                    <div style="display:flex; gap:0.5rem; margin-bottom:1rem; flex-wrap:wrap;">
                        <button class="btn btn-sm btn-secondary" onclick="SIMULATORS.setCrudState('ok')">🟢 Estado: Con Datos</button>
                        <button class="btn btn-sm btn-secondary" onclick="SIMULATORS.setCrudState('loading')">⏳ Estado: Cargando</button>
                        <button class="btn btn-sm btn-secondary" onclick="SIMULATORS.setCrudState('empty')">📭 Estado: Vacío</button>
                        <button class="btn btn-sm btn-secondary" onclick="SIMULATORS.setCrudState('error')">❌ Estado: Error</button>
                    </div>
                    <div id="sim-crud-view"></div>
                </div>
            </div>

            <div id="sim-crud-modal" class="modal-overlay">
                <div class="modal-content glass-panel">
                    <div class="modal-header">
                        <h3 id="sim-crud-modal-title">➕ Registrar Finca</h3>
                        <button class="modal-close-btn" onclick="SIMULATORS.closeCrudModal()">×</button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="sim-crud-id">
                        <div class="form-group">
                            <label>Nombre de la Finca *</label>
                            <input type="text" id="sim-crud-nombre" class="form-control" placeholder="Ej. Finca El Edén">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Propietario *</label>
                                <input type="text" id="sim-crud-propietario" class="form-control" placeholder="Ej. Camilo Torres">
                            </div>
                            <div class="form-group">
                                <label>Hectáreas *</label>
                                <input type="number" id="sim-crud-ha" class="form-control" placeholder="Ej. 10.5" step="0.1">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Vereda *</label>
                                <input type="text" id="sim-crud-vereda" class="form-control" placeholder="Ej. Peña Blanca">
                            </div>
                            <div class="form-group">
                                <label>Municipio</label>
                                <select id="sim-crud-muni" class="form-control">
                                    <option value="Vélez">Vélez</option>
                                    <option value="Barbosa">Barbosa</option>
                                    <option value="Guavatá">Guavatá</option>
                                    <option value="Puente Nacional">Puente Nacional</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="SIMULATORS.closeCrudModal()">Cancelar</button>
                        <button class="btn btn-primary" onclick="SIMULATORS.saveCrudItem()">💾 Guardar Finca</button>
                    </div>
                </div>
            </div>
        `;

        this.renderCrudTable();
    },

    setCrudState(state) {
        const view = document.getElementById('sim-crud-view');
        if (!view) return;
        if (state === 'loading') {
            view.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--accent-primary);"><span style="font-size:1.5rem;">⏳</span><p>Consultando GET /api/fincas en Spring Boot...</p></div>';
        } else if (state === 'empty') {
            view.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-muted);border:1px dashed var(--glass-border);border-radius:var(--radius-md);">📭 No hay fincas registradas aún. ¡Crea la primera con el botón de arriba!</div>';
        } else if (state === 'error') {
            view.innerHTML = '<div style="padding:1.5rem;color:#fca5a5;background:rgba(244,63,94,0.1);border:1px solid rgba(244,63,94,0.3);border-radius:var(--radius-md);">❌ Error 500: Fallo de conexión con la base de datos PostgreSQL en el puerto 5434.</div>';
        } else {
            this.renderCrudTable();
        }
    },

    renderCrudTable() {
        const view = document.getElementById('sim-crud-view');
        if (!view) return;
        if (this.crudData.length === 0) {
            this.setCrudState('empty');
            return;
        }

        view.innerHTML = `
            <div class="table-container">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Finca</th>
                            <th>Propietario</th>
                            <th>Ubicación</th>
                            <th>Área</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.crudData.map(f => `
                            <tr>
                                <td data-label="ID">#${f.id}</td>
                                <td data-label="Finca"><strong>${f.nombre}</strong></td>
                                <td data-label="Propietario">${f.propietario}</td>
                                <td data-label="Ubicación">${f.vereda}, ${f.municipio}</td>
                                <td data-label="Área"><span class="badge-ha">${f.hectareas} ha</span></td>
                                <td data-label="Acciones">
                                    <div style="display:flex;gap:0.4rem;">
                                        <button class="btn btn-sm btn-primary" onclick="SIMULATORS.editCrudItem(${f.id})">✏️</button>
                                        <button class="btn btn-sm btn-danger" onclick="SIMULATORS.deleteCrudItem(${f.id})">🗑️</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    openCrudModal(finca = null) {
        const modal = document.getElementById('sim-crud-modal');
        const title = document.getElementById('sim-crud-modal-title');
        const idInput = document.getElementById('sim-crud-id');
        const nomInput = document.getElementById('sim-crud-nombre');
        const propInput = document.getElementById('sim-crud-propietario');
        const haInput = document.getElementById('sim-crud-ha');
        const verInput = document.getElementById('sim-crud-vereda');
        const munInput = document.getElementById('sim-crud-muni');
        if (!modal) return;

        if (finca) {
            title.textContent = `✏️ Editar Finca #${finca.id}`;
            idInput.value = finca.id;
            nomInput.value = finca.nombre;
            propInput.value = finca.propietario;
            haInput.value = finca.hectareas;
            verInput.value = finca.vereda;
            munInput.value = finca.municipio;
        } else {
            title.textContent = '➕ Registrar Nueva Finca';
            idInput.value = '';
            nomInput.value = '';
            propInput.value = '';
            haInput.value = '';
            verInput.value = '';
            munInput.value = 'Vélez';
        }
        modal.classList.add('active');
    },

    closeCrudModal() {
        const modal = document.getElementById('sim-crud-modal');
        if (modal) modal.classList.remove('active');
    },

    editCrudItem(id) {
        const item = this.crudData.find(f => f.id === id);
        if (item) this.openCrudModal(item);
    },

    deleteCrudItem(id) {
        if (!confirm('¿Deseas eliminar esta finca del sistema?')) return;
        this.crudData = this.crudData.filter(f => f.id !== id);
        this.renderCrudTable();
        if (window.APP && window.APP.showToast) {
            window.APP.showToast('Finca eliminada de la base de datos (DELETE 204)', 'warning');
        }
    },

    saveCrudItem() {
        const id = document.getElementById('sim-crud-id').value;
        const nombre = document.getElementById('sim-crud-nombre').value.trim();
        const propietario = document.getElementById('sim-crud-propietario').value.trim();
        const hectareas = parseFloat(document.getElementById('sim-crud-ha').value);
        const vereda = document.getElementById('sim-crud-vereda').value.trim();
        const municipio = document.getElementById('sim-crud-muni').value;

        if (!nombre || !propietario || isNaN(hectareas)) {
            if (window.APP && window.APP.showToast) {
                window.APP.showToast('Por favor completa todos los campos requeridos (*)', 'error');
            }
            return;
        }

        if (id) {
            const idx = this.crudData.findIndex(f => f.id === parseInt(id, 10));
            if (idx !== -1) {
                this.crudData[idx] = { id: parseInt(id, 10), nombre, propietario, hectareas, vereda, municipio };
            }
            if (window.APP && window.APP.showToast) {
                window.APP.showToast(`Finca "${nombre}" actualizada con éxito (PUT 200)`, 'success');
            }
        } else {
            const newId = this.crudData.length > 0 ? Math.max(...this.crudData.map(f => f.id)) + 1 : 1;
            this.crudData.push({ id: newId, nombre, propietario, hectareas, vereda, municipio });
            if (window.APP && window.APP.showToast) {
                window.APP.showToast(`Finca "${nombre}" creada en PostgreSQL (POST 201)`, 'success');
            }
        }

        this.closeCrudModal();
        this.renderCrudTable();
        if (window.GAMIFICATION) window.GAMIFICATION.addXP(100, 'Operación CRUD completada en el simulador');
    },

    // ══════════════════════════════════════════════════════════════
    // 3. REACT 19 OPTIMISTIC UI VS LATENCIA
    // ══════════════════════════════════════════════════════════════
    renderOptimisticSimulator() {
        const container = document.querySelector('.sim-optimistic-container');
        if (!container) return;

        this.optimisticList = [
            { id: 1, nombre: "Finca El Progreso", ha: 12.0, status: 'synced' },
            { id: 2, nombre: "Finca Villa Luz", ha: 9.5, status: 'synced' }
        ];
        this.simulatedLatency = 1500;
        this.shouldSimulateError = false;

        container.innerHTML = `
            <div class="simulator-card glass-panel">
                <div class="sim-header">
                    <h3><span>⚡</span> React 19 useOptimistic vs Latencia de Red</h3>
                    <span class="badge badge-purple">0 ms UI Update</span>
                </div>
                <div class="sim-body">
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
                        Simula una conexión con Spring Boot con latencia ajustable. Observa cómo <code>useOptimistic</code> actualiza la pantalla al instante (0 ms) y cómo React revierte la UI si el servidor falla.
                    </p>

                    <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.25rem; background:rgba(0,0,0,0.3); padding:0.85rem; border-radius:var(--radius-md); flex-wrap:wrap;">
                        <div style="display:flex; align-items:center; gap:0.5rem; flex:1; min-width:220px;">
                            <label style="font-size:0.85rem; font-weight:600;">Latencia:</label>
                            <input type="range" id="latency-slider" min="0" max="3000" step="500" value="1500" style="flex:1;" oninput="SIMULATORS.updateLatencyVal(this.value)">
                            <span id="latency-label" style="font-family:monospace; color:var(--warning); font-weight:700;">1500 ms</span>
                        </div>
                        <button class="btn btn-sm btn-secondary" onclick="SIMULATORS.toggleOptimisticError(this)">
                            Simular Fallo del Servidor: <strong id="opt-err-label" style="color:var(--text-muted);">DESACTIVADO</strong>
                        </button>
                    </div>

                    <div class="sim-split">
                        <div>
                            <input type="text" id="optimistic-nombre-input" class="form-control" placeholder="Nombre de la Finca (ej. Finca La Pradera)" style="margin-bottom:0.5rem;">
                            <button class="btn btn-primary" style="width:100%;" onclick="SIMULATORS.addOptimisticFinca()">
                                ➕ Añadir con useOptimistic (0 ms)
                            </button>
                        </div>

                        <div style="background:#0d1117; border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:1rem;">
                            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.5rem;">Lista en Tiempo Real:</div>
                            <ul id="optimistic-items-list" style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem;"></ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.renderOptimisticList();
    },

    updateLatencyVal(val) {
        this.simulatedLatency = parseInt(val, 10);
        const lbl = document.getElementById('latency-label');
        if (lbl) lbl.textContent = `${val} ms`;
    },

    toggleOptimisticError(btn) {
        this.shouldSimulateError = !this.shouldSimulateError;
        const lbl = document.getElementById('opt-err-label');
        if (lbl) {
            lbl.textContent = this.shouldSimulateError ? 'ACTIVADO (Reversión)' : 'DESACTIVADO';
            lbl.style.color = this.shouldSimulateError ? 'var(--error)' : 'var(--text-muted)';
        }
    },

    renderOptimisticList() {
        const ul = document.getElementById('optimistic-items-list');
        if (!ul) return;
        ul.innerHTML = this.optimisticList.map(f => `
            <li style="padding:0.6rem 0.8rem; background:rgba(255,255,255,0.03); border:1px solid ${f.status === 'pending' ? 'rgba(245,158,11,0.5)' : 'var(--glass-border)'}; border-radius:6px; display:flex; justify-content:space-between; align-items:center; font-size:0.85rem;">
                <span>🏡 <strong>${f.nombre}</strong> (${f.ha} ha)</span>
                ${f.status === 'pending' 
                    ? '<span class="badge-optimistic">⏳ Guardando en Spring...</span>' 
                    : '<span style="color:var(--accent-spring); font-size:0.75rem; font-weight:700;">✅ Sincronizado</span>'}
            </li>
        `).join('');
    },

    async addOptimisticFinca() {
        const input = document.getElementById('optimistic-nombre-input');
        const nombre = (input && input.value.trim()) || `Finca Campo Verde #${Math.floor(Math.random()*100)}`;
        if (input) input.value = '';

        const tempId = Date.now();
        // 1. Inmediato (0 ms)
        this.optimisticList.push({ id: tempId, nombre, ha: 10.0, status: 'pending' });
        this.renderOptimisticList();
        if (window.APP && window.APP.showToast) {
            window.APP.showToast(`[0 ms] "${nombre}" renderizada en pantalla vía useOptimistic`, 'info');
        }

        // 2. Simulación de la petición con latencia
        await new Promise(r => setTimeout(r, this.simulatedLatency));

        if (this.shouldSimulateError) {
            // Fallo y reversión automática de React
            this.optimisticList = this.optimisticList.filter(f => f.id !== tempId);
            this.renderOptimisticList();
            if (window.APP && window.APP.showToast) {
                window.APP.showToast(`❌ Error 500 en Spring Boot. "${nombre}" fue revertida de la UI automáticamente.`, 'error');
            }
        } else {
            const item = this.optimisticList.find(f => f.id === tempId);
            if (item) {
                item.status = 'synced';
                this.renderOptimisticList();
                if (window.APP && window.APP.showToast) {
                    window.APP.showToast(`[${this.simulatedLatency} ms] "${nombre}" confirmada en PostgreSQL (POST 201)`, 'success');
                }
                if (window.GAMIFICATION) window.GAMIFICATION.addXP(60, 'Optimistic UI probado');
            }
        }
    },

    // ══════════════════════════════════════════════════════════════
    // 4. SIMULADOR DE BÚSQUEDA CON DEBOUNCE
    // ══════════════════════════════════════════════════════════════
    renderDebounceSimulator() {
        const container = document.querySelector('.sim-debounce-container');
        if (!container) return;

        this.rawRequestsCount = 0;
        this.debouncedRequestsCount = 0;
        this.debounceTimer = null;

        container.innerHTML = `
            <div class="simulator-card glass-panel">
                <div class="sim-header">
                    <h3><span>🔍</span> Comparador de Búsqueda: Con vs Sin Debounce</h3>
                    <span class="sim-tag">Rendimiento</span>
                </div>
                <div class="sim-body">
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
                        Escribe en el campo de texto y observa cómo <strong>sin debounce</strong> se envía 1 petición por cada letra, mientras que <strong>con debounce (300 ms)</strong> se espera a que termines de escribir.
                    </p>

                    <div class="form-group">
                        <input type="text" id="debounce-input" class="form-control" placeholder="Escribe aquí para buscar fincas (ej. Finca La Floresta de Vélez)..." oninput="SIMULATORS.handleDebounceInput(this.value)">
                    </div>

                    <div class="sim-split" style="margin-top:1.25rem;">
                        <div class="stat" style="border-color:rgba(244,63,94,0.3);">
                            <span class="stat-number text-error" id="raw-req-counter">0</span>
                            <span class="stat-label">Peticiones SIN Debounce (Sobrecarga)</span>
                        </div>
                        <div class="stat" style="border-color:rgba(16,185,129,0.3);">
                            <span class="stat-number text-success" id="debounced-req-counter">0</span>
                            <span class="stat-label">Peticiones CON Debounce (Optimizado)</span>
                        </div>
                    </div>

                    <div id="debounce-savings" style="margin-top:1rem; padding:0.75rem; background:rgba(16,185,129,0.08); border-radius:var(--radius-md); font-size:0.85rem; color:var(--accent-spring); text-align:center; display:none;"></div>
                </div>
            </div>
        `;
    },

    handleDebounceInput(val) {
        if (!val) return;

        this.rawRequestsCount++;
        const rawEl = document.getElementById('raw-req-counter');
        if (rawEl) rawEl.textContent = this.rawRequestsCount;

        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.debouncedRequestsCount++;
            const debEl = document.getElementById('debounced-req-counter');
            if (debEl) debEl.textContent = this.debouncedRequestsCount;

            const savingsEl = document.getElementById('debounce-savings');
            if (savingsEl && this.rawRequestsCount > 0) {
                const savingsPct = Math.round(((this.rawRequestsCount - this.debouncedRequestsCount) / this.rawRequestsCount) * 100);
                savingsEl.style.display = 'block';
                savingsEl.innerHTML = `⚡ <strong>¡Ahorraste un ${savingsPct}% de tráfico!</strong> Se enviaron solo ${this.debouncedRequestsCount} peticiones a Spring Boot en lugar de ${this.rawRequestsCount}.`;
            }
        }, 300);
    },

    // ══════════════════════════════════════════════════════════════
    // 5. SIMULADOR DE LOGIN JWT Y RUTAS PROTEGIDAS
    // ══════════════════════════════════════════════════════════════
    renderAuthSimulator() {
        const container = document.querySelector('.sim-auth-container');
        if (!container) return;

        this.simAuthToken = null;

        container.innerHTML = `
            <div class="simulator-card glass-panel">
                <div class="sim-header">
                    <h3><span>🔒</span> Autenticación JWT & Rutas Protegidas (/api/auth/login)</h3>
                    <span class="sim-tag">Seguridad Zero-Trust</span>
                </div>
                <div class="sim-body">
                    <div class="sim-split">
                        <div id="auth-form-panel" style="background:rgba(0,0,0,0.3); padding:1rem; border-radius:var(--radius-md);">
                            <h4>Iniciar Sesión</h4>
                            <div class="form-group mt-2">
                                <label>Email:</label>
                                <input type="email" id="sim-auth-email" class="form-control" value="aprendiz@sena.edu.co">
                            </div>
                            <div class="form-group">
                                <label>Rol:</label>
                                <select id="sim-auth-role" class="form-control">
                                    <option value="ROLE_ADMIN">ROLE_ADMIN (Acceso Total)</option>
                                    <option value="ROLE_APRENDIZ">ROLE_APRENDIZ (Solo Lectura)</option>
                                </select>
                            </div>
                            <button class="btn btn-primary" style="width:100%;" onclick="SIMULATORS.executeSimLogin()">
                                🔑 Iniciar Sesión en Spring Boot
                            </button>
                        </div>

                        <div id="auth-dashboard-panel" style="background:#0d1117; border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:1rem; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
                            <div id="auth-status-icon" style="font-size:2.5rem; margin-bottom:0.5rem;">🔒</div>
                            <h4 id="auth-status-title">Ruta Protegida /panel-fincas</h4>
                            <p id="auth-status-desc" style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.75rem;">
                                Inicia sesión para recibir el token JWT y desbloquear los datos de PostgreSQL.
                            </p>
                            <div id="jwt-token-display" style="display:none; font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:#7dd3fc; word-break:break-all; background:rgba(0,0,0,0.5); padding:0.5rem; border-radius:4px; margin-bottom:0.5rem;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    executeSimLogin() {
        const email = document.getElementById('sim-auth-email').value;
        const role = document.getElementById('sim-auth-role').value;
        const icon = document.getElementById('auth-status-icon');
        const title = document.getElementById('auth-status-title');
        const desc = document.getElementById('auth-status-desc');
        const tokenDisplay = document.getElementById('jwt-token-display');

        const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ sub: email, rol: role, iat: 1771100000 }))}.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
        this.simAuthToken = mockJwt;

        icon.textContent = '🔓';
        title.innerHTML = `Bienvenido, <strong>${email}</strong> <span class="badge ${role === 'ROLE_ADMIN' ? 'badge-spring' : 'badge-purple'}">${role}</span>`;
        desc.textContent = 'Token JWT inyectado en Authorization: Bearer <token>. Acceso concedido a la vista protegida.';
        tokenDisplay.style.display = 'block';
        tokenDisplay.textContent = `Bearer ${mockJwt.substring(0, 35)}...`;

        if (window.APP && window.APP.showToast) {
            window.APP.showToast(`Sesión iniciada con éxito (${role})`, 'success');
        }
        if (window.GAMIFICATION) window.GAMIFICATION.addXP(80, 'Autenticación JWT completada');
    },

    // ══════════════════════════════════════════════════════════════
    // 6. SIMULADOR DE PAGINACIÓN Y ORDENAMIENTO SPRING BOOT
    // ══════════════════════════════════════════════════════════════
    renderPaginationSimulator() {
        const container = document.querySelector('.sim-pagination-container');
        if (!container) return;

        this.pageIndex = 0;
        this.pageSize = 3;
        this.sortParam = 'nombre,asc';

        this.allFincasDb = [
            { id: 1, nombre: "Finca Altos del Viento", vereda: "El Palmar", ha: 12.0 },
            { id: 2, nombre: "Finca Bella Vista", vereda: "Zavala", ha: 8.5 },
            { id: 3, nombre: "Finca Campo Hermoso", vereda: "Peña Blanca", ha: 19.0 },
            { id: 4, nombre: "Finca Don Carlos", vereda: "El Gualilo", ha: 14.2 },
            { id: 5, nombre: "Finca El Edén", vereda: "San José", ha: 6.0 },
            { id: 6, nombre: "Finca Flor Amarilla", vereda: "El Palmar", ha: 25.0 },
            { id: 7, nombre: "Finca Guayabal", vereda: "Zavala", ha: 11.0 },
            { id: 8, nombre: "Finca Horizonte", vereda: "Centro", ha: 30.0 }
        ];

        container.innerHTML = `
            <div class="simulator-card glass-panel">
                <div class="sim-header">
                    <h3><span>📄</span> Paginación y Ordenamiento con Spring Data JPA Pageable</h3>
                    <span class="sim-tag">Spring Pageable</span>
                </div>
                <div class="sim-body">
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
                        Aprende cómo React construye la URL con parámetros <code>page</code>, <code>size</code> y <code>sort</code> para consultar eficientemente bases de datos grandes.
                    </p>

                    <div style="background:rgba(0,0,0,0.3); padding:0.75rem 1rem; border-radius:var(--radius-md); margin-bottom:1rem; font-family:'JetBrains Mono',monospace; font-size:0.85rem; color:var(--accent-spring); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                        <span>URL Generada: <strong id="pag-url-display">GET /api/fincas?page=0&size=3&sort=nombre,asc</strong></span>
                        <span id="pag-meta-display" style="font-size:0.75rem; color:var(--text-muted);">Total: 8 registros | Páginas: 3</span>
                    </div>

                    <div class="sim-split" style="margin-bottom:1rem;">
                        <div class="form-group">
                            <label>Registros por página (size):</label>
                            <select id="pag-size-select" class="form-control" onchange="SIMULATORS.changePageSize(this.value)">
                                <option value="3">3 fincas por página</option>
                                <option value="5">5 fincas por página</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Criterio de Ordenamiento (sort):</label>
                            <select id="pag-sort-select" class="form-control" onchange="SIMULATORS.changePageSort(this.value)">
                                <option value="nombre,asc">Nombre (A - Z)</option>
                                <option value="nombre,desc">Nombre (Z - A)</option>
                                <option value="ha,desc">Hectáreas (Mayor a menor)</option>
                                <option value="ha,asc">Hectáreas (Menor a mayor)</option>
                            </select>
                        </div>
                    </div>

                    <div id="pag-items-table" style="margin-bottom:1rem;"></div>

                    <div id="pag-controls" style="display:flex; justify-content:center; gap:0.5rem;"></div>
                </div>
            </div>
        `;

        this.updatePaginationView();
    },

    changePageSize(size) {
        this.pageSize = parseInt(size, 10);
        this.pageIndex = 0;
        this.updatePaginationView();
    },

    changePageSort(sort) {
        this.sortParam = sort;
        this.updatePaginationView();
    },

    setPage(idx) {
        this.pageIndex = idx;
        this.updatePaginationView();
    },

    updatePaginationView() {
        const sorted = [...this.allFincasDb].sort((a, b) => {
            const [field, dir] = this.sortParam.split(',');
            let valA = a[field];
            let valB = b[field];
            if (typeof valA === 'string') {
                return dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            return dir === 'asc' ? valA - valB : valB - valA;
        });

        const totalPages = Math.ceil(sorted.length / this.pageSize);
        const start = this.pageIndex * this.pageSize;
        const pageItems = sorted.slice(start, start + this.pageSize);

        const urlDisplay = document.getElementById('pag-url-display');
        const metaDisplay = document.getElementById('pag-meta-display');
        const tableContainer = document.getElementById('pag-items-table');
        const controls = document.getElementById('pag-controls');

        if (urlDisplay) urlDisplay.textContent = `GET /api/fincas?page=${this.pageIndex}&size=${this.pageSize}&sort=${this.sortParam}`;
        if (metaDisplay) metaDisplay.textContent = `Página ${this.pageIndex + 1} de ${totalPages} | Total: ${sorted.length} fincas`;

        if (tableContainer) {
            tableContainer.innerHTML = `
                <div class="table-container">
                    <table class="custom-table">
                        <thead>
                            <tr><th>ID</th><th>Nombre de la Finca</th><th>Vereda</th><th>Área</th></tr>
                        </thead>
                        <tbody>
                            ${pageItems.map(f => `
                                <tr>
                                    <td>#${f.id}</td>
                                    <td><strong>${f.nombre}</strong></td>
                                    <td>${f.vereda}</td>
                                    <td><span class="badge-ha">${f.ha} ha</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        if (controls) {
            let btns = '';
            for (let i = 0; i < totalPages; i++) {
                btns += `<button class="btn btn-sm ${i === this.pageIndex ? 'btn-primary' : 'btn-secondary'}" onclick="SIMULATORS.setPage(${i})">${i + 1}</button>`;
            }
            controls.innerHTML = btns;
        }
    },

    // ══════════════════════════════════════════════════════════════
    // 7. SIMULADOR DE SUBIDA DE FOTOS MULTIPART (FILE UPLOAD)
    // ══════════════════════════════════════════════════════════════
    renderFileUploadSimulator() {
        const container = document.querySelector('.sim-upload-container');
        if (!container) return;

        container.innerHTML = `
            <div class="simulator-card glass-panel">
                <div class="sim-header">
                    <h3><span>📷</span> Subida de Fotos de Fincas (Multipart / FormData)</h3>
                    <span class="sim-tag">FormData API</span>
                </div>
                <div class="sim-body">
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
                        Prueba cómo React captura archivos de imagen con <code>&lt;input type="file"&gt;</code>, genera una vista previa instantánea con <code>URL.createObjectURL()</code> y los envía a Spring Boot vía <code>FormData</code>.
                    </p>

                    <div class="sim-split">
                        <div style="border:2px dashed var(--glass-border); border-radius:var(--radius-md); padding:1.5rem; text-align:center; cursor:pointer;" onclick="document.getElementById('sim-file-input').click()">
                            <input type="file" id="sim-file-input" accept="image/*" style="display:none;" onchange="SIMULATORS.handleFileSelect(event)">
                            <div style="font-size:2rem; margin-bottom:0.5rem;">📁</div>
                            <strong style="font-size:0.9rem; color:var(--text-main);">Haz clic para seleccionar foto de la finca</strong>
                            <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;">Formatos: JPG, PNG, WEBP (Máx. 5MB)</p>
                        </div>

                        <div style="background:#0d1117; border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:1rem; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:160px;">
                            <div id="file-preview-box" style="text-align:center;">
                                <span style="color:var(--text-muted); font-size:0.85rem;">Vista previa de la imagen</span>
                            </div>
                            <div id="upload-progress-box" style="width:100%; display:none; margin-top:0.75rem;">
                                <div class="progress-bar"><div id="upload-progress-bar" class="progress-fill" style="width:0%;"></div></div>
                                <span id="upload-status-text" style="font-size:0.75rem; color:var(--accent-spring); display:block; text-align:center; margin-top:0.25rem;">Subiendo a Spring Boot...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        const previewBox = document.getElementById('file-preview-box');
        const progressBox = document.getElementById('upload-progress-box');
        const progressBar = document.getElementById('upload-progress-bar');
        const statusText = document.getElementById('upload-status-text');

        const objectUrl = URL.createObjectURL(file);
        previewBox.innerHTML = `
            <img src="${objectUrl}" alt="Finca" style="max-height:110px; border-radius:6px; margin-bottom:0.5rem; border:1px solid var(--glass-border);">
            <div style="font-size:0.75rem; color:var(--text-main);"><strong>${file.name}</strong> (${Math.round(file.size / 1024)} KB)</div>
        `;

        progressBox.style.display = 'block';
        progressBar.style.width = '0%';
        statusText.textContent = 'Enviando POST /api/fincas/1/foto...';

        let progress = 0;
        const interval = setInterval(() => {
            progress += 25;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                statusText.textContent = '✅ Imagen almacenada con éxito (HTTP 200 OK)';
                if (window.APP && window.APP.showToast) {
                    window.APP.showToast(`Foto "${file.name}" subida al servidor`, 'success');
                }
                if (window.GAMIFICATION) window.GAMIFICATION.addXP(70, 'Subida de archivos probada');
            }
        }, 200);
    },

    // ══════════════════════════════════════════════════════════════
    // 8. SIMULADOR DE ERROR BOUNDARY & RECUPERACIÓN
    // ══════════════════════════════════════════════════════════════
    renderErrorBoundarySimulator() {
        const container = document.querySelector('.sim-error-boundary-container');
        if (!container) return;

        this.hasCrashed = false;

        container.innerHTML = `
            <div class="simulator-card glass-panel">
                <div class="sim-header">
                    <h3><span>🛡️</span> React Error Boundary: Atrapando Fallos Críticos</h3>
                    <span class="sim-tag">Resiliencia UI</span>
                </div>
                <div class="sim-body">
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
                        Sin un <strong>Error Boundary</strong>, un error de JavaScript en un componente romperá toda la aplicación dejando una pantalla blanca. Con Error Boundary, el fallo se aísla mostrando una vista de contingencia.
                    </p>

                    <div id="eb-component-box" style="background:#0d1117; border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:1.25rem;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div>
                                <h4>Componente: ListaCultivos</h4>
                                <p style="font-size:0.8rem; color:var(--text-muted);">Estado: Normal y renderizando datos.</p>
                            </div>
                            <button class="btn btn-sm btn-danger" onclick="SIMULATORS.triggerCrash()">
                                💥 Provocar Error Fatal (Null Pointer)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    triggerCrash() {
        const box = document.getElementById('eb-component-box');
        if (!box) return;

        box.innerHTML = `
            <div style="background:rgba(244,63,94,0.1); border:1px solid rgba(244,63,94,0.4); border-radius:var(--radius-md); padding:1.25rem; text-align:center;">
                <div style="font-size:2rem; margin-bottom:0.5rem;">⚠️</div>
                <h4 style="color:#fca5a5;">¡Algo salió mal en este componente!</h4>
                <p style="font-size:0.8rem; color:var(--text-muted); margin:0.5rem 0 1rem;">
                    TypeError: Cannot read properties of undefined (reading 'cultivos')
                </p>
                <button class="btn btn-sm btn-primary" onclick="SIMULATORS.recoverCrash()">
                    🔄 Intentar Recuperar Componente
                </button>
            </div>
        `;
        if (window.APP && window.APP.showToast) {
            window.APP.showToast('Error Boundary atrapó el fallo sin colapsar la app', 'warning');
        }
    },

    recoverCrash() {
        const box = document.getElementById('eb-component-box');
        if (!box) return;

        box.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h4>Componente: ListaCultivos</h4>
                    <p style="font-size:0.8rem; color:var(--text-muted);"><span style="color:var(--accent-spring);">✅ Recuperado con éxito</span></p>
                </div>
                <button class="btn btn-sm btn-danger" onclick="SIMULATORS.triggerCrash()">
                    💥 Provocar Error Fatal (Null Pointer)
                </button>
            </div>
        `;
        if (window.APP && window.APP.showToast) {
            window.APP.showToast('Componente restaurado al estado normal', 'success');
        }
    },

    // ══════════════════════════════════════════════════════════════
    // 9. MENÚ HAMBURGUESA & MOBILE-FIRST
    // ══════════════════════════════════════════════════════════════
    renderMobileLayoutSimulator() {
        const container = document.querySelector('.sim-layout-container');
        if (!container) return;

        container.innerHTML = `
            <div class="simulator-card glass-panel">
                <div class="sim-header">
                    <h3><span>📱</span> Simulador Mobile-First y Menú Hamburguesa</h3>
                    <div style="display:flex;gap:0.4rem;">
                        <button class="btn btn-sm btn-secondary" onclick="SIMULATORS.setDeviceWidth('375px')">📱 375px</button>
                        <button class="btn btn-sm btn-secondary" onclick="SIMULATORS.setDeviceWidth('768px')">💻 768px</button>
                        <button class="btn btn-sm btn-secondary" onclick="SIMULATORS.setDeviceWidth('100%')">🖥️ 100%</button>
                    </div>
                </div>
                <div class="sim-body">
                    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:1rem;">
                        Prueba la interacción del botón hamburguesa: al hacer clic, los 3 trazos se transforman en una <strong>X</strong> y el menú lateral se desliza con backdrop desenfocado.
                    </p>

                    <div id="device-preview-frame" style="width:375px; max-width:100%; margin:0 auto; border:2px solid var(--glass-border); border-radius:var(--radius-lg); overflow:hidden; background:var(--bg-primary); transition:width 0.3s ease; box-shadow:var(--shadow-lg);">
                        <div style="padding:0.75rem 1rem; background:rgba(17,24,39,0.9); border-bottom:1px solid var(--glass-border); display:flex; justify-content:space-between; align-items:center; position:relative;">
                            <div style="font-weight:700; font-size:0.9rem; color:var(--text-main);">🌿 AgroManager</div>
                            <button id="sim-burger-btn" onclick="SIMULATORS.toggleSimDrawer()" style="background:rgba(255,255,255,0.06); border:1px solid var(--glass-border); border-radius:6px; color:white; width:34px; height:34px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
                                ☰
                            </button>
                        </div>

                        <div style="padding:1rem; position:relative; min-height:220px;">
                            <h4 style="font-size:0.95rem; margin-bottom:0.4rem;">Panel Principal</h4>
                            <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.75rem;">Fincas activas: 3 | Cultivos: 5</p>
                            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--glass-border); border-radius:8px; padding:0.75rem; font-size:0.8rem;">
                                🏡 Finca La Esperanza — 15 ha
                            </div>

                            <div id="sim-drawer-menu" style="position:absolute; top:0; left:0; width:70%; height:100%; background:rgba(11,15,25,0.98); border-right:1px solid var(--glass-border); padding:1rem; transform:translateX(-100%); transition:transform 0.3s ease; z-index:10; display:flex; flex-direction:column; gap:0.6rem;">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                                    <strong style="font-size:0.85rem; color:var(--accent-primary);">Navegación</strong>
                                    <button onclick="SIMULATORS.toggleSimDrawer()" style="background:none;border:none;color:white;cursor:pointer;font-size:1.1rem;">×</button>
                                </div>
                                <a href="javascript:void(0)" onclick="SIMULATORS.toggleSimDrawer()" style="color:white; text-decoration:none; font-size:0.85rem; padding:0.4rem; border-radius:4px; background:rgba(56,189,248,0.1);">🏡 Fincas</a>
                                <a href="javascript:void(0)" onclick="SIMULATORS.toggleSimDrawer()" style="color:var(--text-muted); text-decoration:none; font-size:0.85rem; padding:0.4rem;">🌱 Cultivos</a>
                                <a href="javascript:void(0)" onclick="SIMULATORS.toggleSimDrawer()" style="color:var(--text-muted); text-decoration:none; font-size:0.85rem; padding:0.4rem;">🔄 Siembra N:M</a>
                            </div>
                            <div id="sim-drawer-backdrop" onclick="SIMULATORS.toggleSimDrawer()" style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:none; z-index:5;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    setDeviceWidth(width) {
        const frame = document.getElementById('device-preview-frame');
        if (frame) frame.style.width = width;
    },

    toggleSimDrawer() {
        const drawer = document.getElementById('sim-drawer-menu');
        const backdrop = document.getElementById('sim-drawer-backdrop');
        const btn = document.getElementById('sim-burger-btn');
        if (!drawer || !backdrop) return;

        const isOpen = drawer.style.transform === 'translateX(0px)';
        drawer.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0px)';
        backdrop.style.display = isOpen ? 'none' : 'block';
        btn.textContent = isOpen ? '☰' : '✕';
    },

    // ══════════════════════════════════════════════════════════════
    // 10. VISUALIZADOR DE HOOKS
    // ══════════════════════════════════════════════════════════════
    renderHooksVisualizer() {
        const container = document.querySelector('.sim-hooks-container');
        if (!container) return;

        this.hookCounter = 0;
        this.hookFincaId = 1;

        container.innerHTML = `
            <div class="simulator-card glass-panel">
                <div class="sim-header">
                    <h3><span>🔄</span> Visualizador del Ciclo de Vida (useState & useEffect)</h3>
                </div>
                <div class="sim-body">
                    <div class="sim-split">
                        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:1rem;">
                            <h4>Estado del Componente</h4>
                            <p style="margin:0.5rem 0; font-size:0.9rem;">
                                <code>const [contador, setContador] = useState(<span id="vis-count">0</span>)</code>
                            </p>
                            <p style="margin:0.5rem 0; font-size:0.9rem;">
                                <code>const [fincaId, setFincaId] = useState(<span id="vis-fincaid">1</span>)</code>
                            </p>
                            <div style="display:flex;gap:0.5rem;margin-top:1rem;">
                                <button class="btn btn-sm btn-primary" onclick="SIMULATORS.incrementHookCount()">+1 Contador</button>
                                <button class="btn btn-sm btn-spring" onclick="SIMULATORS.changeHookFinca()">Cambiar Finca ID</button>
                            </div>
                        </div>

                        <div style="background:#0d1117; border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:1rem;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                                <strong style="font-size:0.8rem; color:var(--text-muted);">Consola de Eventos del Hook:</strong>
                                <button class="btn btn-sm btn-secondary" onclick="SIMULATORS.clearHookLog()" style="padding:0.15rem 0.5rem;font-size:0.7rem;">Limpiar</button>
                            </div>
                            <div id="hook-console-log" style="font-family:'JetBrains Mono',monospace; font-size:0.78rem; max-height:140px; overflow-y:auto; color:#a7f3d0; line-height:1.5;">
                                <div>[1] 🟢 Componente montado -> Ejecutando useEffect([], [])</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    logHookEvent(msg, color = '#a7f3d0') {
        const consoleBox = document.getElementById('hook-console-log');
        if (!consoleBox) return;
        const entry = document.createElement('div');
        entry.style.color = color;
        entry.textContent = `[${new Date().toLocaleTimeString('es-CO')}] ${msg}`;
        consoleBox.appendChild(entry);
        consoleBox.scrollTop = consoleBox.scrollHeight;
    },

    incrementHookCount() {
        this.hookCounter++;
        const cSpan = document.getElementById('vis-count');
        if (cSpan) cSpan.textContent = this.hookCounter;
        this.logHookEvent(`🔄 Re-render por setContador(${this.hookCounter})`, '#7dd3fc');
    },

    changeHookFinca() {
        this.hookFincaId++;
        const fSpan = document.getElementById('vis-fincaid');
        if (fSpan) fSpan.textContent = this.hookFincaId;
        this.logHookEvent(`🧹 Cleanup de petición previa para Finca ID: ${this.hookFincaId - 1}`, '#fcd34d');
        this.logHookEvent(`⚡ Disparando useEffect([fincaId]) -> Fetch a /api/fincas/${this.hookFincaId}`, '#a7f3d0');
    },

    clearHookLog() {
        const consoleBox = document.getElementById('hook-console-log');
        if (consoleBox) consoleBox.innerHTML = '<div>Consola lista. Modifica el estado arriba.</div>';
    },

    // ══════════════════════════════════════════════════════════════
    // 11. JSX & PROPS SANDBOX
    // ══════════════════════════════════════════════════════════════
    renderJSXSimulator() {
        const containers = document.querySelectorAll('.sim-routes-container');
        containers.forEach(container => {
            container.innerHTML = `
                <div class="simulator-card glass-panel">
                    <div class="sim-header"><span class="sim-icon">⚡</span><h3>JSX Live Editor</h3></div>
                    <div class="sim-body">
                        <div class="sim-input-group"><label>JSX:</label>
                        <textarea id="jsx-input" class="sim-textarea" spellcheck="false" style="min-height:80px;">&lt;div className="finca-badge"&gt;
  &lt;h2&gt;Finca La Esperanza&lt;/h2&gt;
  &lt;p&gt;Hectáreas: 15.0&lt;/p&gt;
&lt;/div&gt;</textarea></div>
                        <div class="sim-output" style="margin-top:10px;">
                            <div class="code-header" style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.25rem;">Compilado a JavaScript puro (Virtual DOM):</div>
                            <div id="jsx-output" class="browser-preview" style="color:var(--accent-primary);font-family:monospace;font-size:0.82rem;background:rgba(0,0,0,0.3);padding:0.75rem;border-radius:6px;"></div>
                        </div>
                    </div>
                    <div class="sim-footer" style="margin-top:0.75rem;">
                        <button class="btn btn-primary" onclick="SIMULATORS.checkJSX()">Compilar +50 XP</button>
                    </div>
                </div>
            `;
            const input = container.querySelector('#jsx-input');
            if (input) {
                input.addEventListener('input', (e) => this.updateJSX(e.target.value));
                this.updateJSX(input.value);
            }
        });
    },

    updateJSX(jsx) {
        const output = document.getElementById('jsx-output');
        if (!output) return;
        output.textContent = `// React 19 / JSX Transform\nimport { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";\n\n_jsxs("div", {\n  className: "finca-badge",\n  children: [\n    _jsx("h2", { children: "Finca La Esperanza" }),\n    _jsx("p", { children: "Hectáreas: 15.0" })\n  ]\n});`;
    },

    checkJSX() {
        if (window.GAMIFICATION) {
            if (window.confetti) confetti({ particleCount: 50, spread: 50 });
            window.GAMIFICATION.addXP(50, 'JSX compilado');
        }
    },

    renderPropsSimulator() {
        const containers = document.querySelectorAll('.sim-jinja-container');
        containers.forEach(container => {
            container.innerHTML = `
                <div class="simulator-card glass-panel">
                    <div class="sim-header"><span class="sim-icon">📦</span><h3>Props Simulator</h3></div>
                    <div class="sim-body">
                        <div class="sim-split">
                            <div><label>Componente FincaCard:</label>
                            <textarea id="props-component" class="sim-textarea" spellcheck="false" style="min-height:80px;">function FincaCard({ nombre, hectareas }) {
  return &lt;div className="card"&gt;
    &lt;h3&gt;{nombre}&lt;/h3&gt;
    &lt;p&gt;Área: {hectareas} ha&lt;/p&gt;
  &lt;/div&gt;
}</textarea></div>
                            <div><label>Props (JSON):</label>
                            <textarea id="props-json" class="sim-textarea" spellcheck="false" style="min-height:80px;">{
  "nombre": "Finca La Floresta",
  "hectareas": 8.0
}</textarea></div>
                        </div>
                        <div class="sim-output" style="margin-top:10px;">
                            <div class="code-header" style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.25rem;">Renderizado resultante:</div>
                            <div id="props-output" class="browser-preview" style="background:rgba(255,255,255,0.03);padding:1rem;border-radius:8px;border:1px solid var(--glass-border);"></div>
                        </div>
                    </div>
                </div>
            `;
            const input = document.getElementById('props-json');
            if (input) {
                const update = () => {
                    try {
                        const parsed = JSON.parse(input.value);
                        const out = document.getElementById('props-output');
                        if (out) out.innerHTML = `<h4>🏡 ${parsed.nombre || 'Finca'}</h4><p>Área: <strong>${parsed.hectareas || 0} ha</strong></p>`;
                    } catch(e){}
                };
                input.addEventListener('input', update);
                update();
            }
        });
    },

    // ══════════════════════════════════════════════════════════════
    // 12. QUIZ Y DEBUGGER
    // ══════════════════════════════════════════════════════════════
    renderQuizSimulator() {
        const container = document.querySelector('.sim-quiz-container');
        if (!container) return;

        const questions = [
            {
                q: "¿Qué ventaja ofrece el hook useOptimistic de React 19 en el CRUD de Fincas?",
                options: [
                    "Actualiza la interfaz de usuario en 0 ms sin esperar a que el servidor de Spring Boot responda.",
                    "Guarda los datos directamente en la memoria RAM del servidor.",
                    "Convierte la base de datos PostgreSQL en un archivo Excel."
                ],
                correct: 0,
                feedback: "¡Exacto! useOptimistic proporciona una respuesta inmediata en la UI y revierte los cambios si el servidor falla."
            },
            {
                q: "¿Cómo soluciona Vite Proxy el error de CORS en desarrollo?",
                options: [
                    "Desactivando el cortafuegos de Windows.",
                    "Redirigiendo las peticiones /api al puerto 31026 desde el mismo origen de Vite.",
                    "Cambiando el puerto de Spring Boot a 80."
                ],
                correct: 1,
                feedback: "¡Correcto! Vite Proxy hace que el navegador crea que el frontend y el backend están en el mismo host."
            },
            {
                q: "¿Por qué se utiliza useDebounce en la barra de búsqueda de fincas?",
                options: [
                    "Para retrasar la petición hasta que el usuario pause la escritura, evitando sobrecargar Spring Boot.",
                    "Para encriptar las palabras clave con algoritmo AES-256.",
                    "Para forzar un re-render cada 10 milisegundos."
                ],
                correct: 0,
                feedback: "¡Excelente! useDebounce reduce hasta un 90% de las peticiones innecesarias al servidor."
            }
        ];

        container.innerHTML = `
            <div class="simulator-card glass-panel">
                <div class="sim-header">
                    <h3><span>🧠</span> Quiz de Maestría React 19 + Spring Boot</h3>
                </div>
                <div class="sim-body" id="quiz-body">
                    ${questions.map((item, idx) => `
                        <div class="quiz-item" style="margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid var(--glass-border);">
                            <p style="font-weight:600; margin-bottom:0.75rem;">${idx + 1}. ${item.q}</p>
                            <div style="display:flex; flex-direction:column; gap:0.5rem;">
                                ${item.options.map((opt, optIdx) => `
                                    <button class="btn btn-secondary" style="text-align:left; justify-content:flex-start; padding:0.6rem 0.9rem; font-size:0.85rem;" onclick="SIMULATORS.answerQuiz(${idx}, ${optIdx})">
                                        ${opt}
                                    </button>
                                `).join('')}
                            </div>
                            <div id="quiz-fb-${idx}" style="margin-top:0.5rem; font-size:0.85rem; display:none;"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.quizQuestions = questions;
    },

    answerQuiz(qIdx, optIdx) {
        const q = this.quizQuestions[qIdx];
        const fb = document.getElementById(`quiz-fb-${qIdx}`);
        if (!fb) return;

        fb.style.display = 'block';
        if (optIdx === q.correct) {
            fb.className = 'text-success';
            fb.innerHTML = `✅ ${q.feedback} <strong>+50 XP</strong>`;
            if (window.GAMIFICATION) window.GAMIFICATION.addXP(50, `Pregunta ${qIdx + 1} del Quiz correcta`);
        } else {
            fb.className = 'text-error';
            fb.textContent = '❌ Respuesta incorrecta. Inténtalo de nuevo analizando los conceptos.';
        }
    }
};

window.SIMULATORS = SIMULATORS;
