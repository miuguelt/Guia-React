/**
 * SIMULATORS - Guia React & Spring Boot API (SENA ADSO)
 * Simuladores interactivos en vivo: API Tester, CRUD Studio, Mobile Drawer, Hooks Visualizer, JSX Sandbox y Quiz.
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
    },

    // ══════════════════════════════════════════════════════════════
    // 1. SPRING BOOT API ENDPOINT TESTER EN VIVO
    // ══════════════════════════════════════════════════════════════
    renderSpringBootApiSimulator() {
        const container = document.querySelector('.sim-api-container');
        if (!container) return;

        const endpoints = [
            { method: 'GET', path: '/api/hello', desc: 'Verificar estado del backend', body: '' },
            { method: 'GET', path: '/api/fincas', desc: 'Listar todas las fincas', body: '' },
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
                <div class="sim-footer" style="margin-top:1rem;display:flex;justify-content:space-between;align-items:center;">
                    <small style="color:var(--text-dim);">💡 React procesa esta respuesta con <code>await response.json()</code> y actualiza el estado.</small>
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
                responsePre.textContent = `❌ No se pudo conectar con Spring Boot en http://localhost:31026\nCausa: ${err.message}\n\n💡 Tip: Puedes activar el modo simulado o asegurarte de que tu backend Spring esté corriendo con .\\mvnw spring-boot:run`;
            }
        } else {
            // MOCK RESPONSES
            await new Promise(r => setTimeout(r, 400));
            if (ep.path === '/api/hello') {
                statusBadge.textContent = '200 OK';
                statusBadge.className = 'status-badge status-200';
                responsePre.textContent = JSON.stringify({ mensaje: "API Fincas y Cultivos SENA ADSO operativa", timestamp: new Date().toISOString() }, null, 2);
            } else if (ep.path === '/api/fincas' && ep.method === 'GET') {
                statusBadge.textContent = '200 OK';
                statusBadge.className = 'status-badge status-200';
                responsePre.textContent = JSON.stringify([
                    { id: 1, nombre: "Finca La Esperanza", propietario: "Carlos Rueda", vereda: "El Gualilo", municipio: "Vélez", hectareas: 15.0 },
                    { id: 2, nombre: "Finca La Floresta", propietario: "María Gómez", vereda: "San José", municipio: "Vélez", hectareas: 8.0 },
                    { id: 3, nombre: "Finca El Roble", propietario: "Andrés Silva", vereda: "Zavala", municipio: "Barbosa", hectareas: 22.0 }
                ], null, 2);
            } else if (ep.path === '/api/fincas' && ep.method === 'POST') {
                statusBadge.textContent = '201 Created';
                statusBadge.className = 'status-badge status-201';
                let parsed = { nombre: "Finca El Porvenir", propietario: "Laura Gómez", vereda: "El Palmar", municipio: "Vélez", hectareas: 14.5 };
                try { parsed = JSON.parse(bodyArea.value); } catch(e){}
                responsePre.textContent = JSON.stringify({ id: 4, ...parsed, fechaCreacion: new Date().toISOString() }, null, 2);
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
        if (window.GAMIFICATION) {
            window.GAMIFICATION.addXP(75, 'Llamada HTTP a Spring Boot probada');
        }
        if (window.APP && window.APP.showToast) {
            window.APP.showToast('Petición completada y estado actualizado', 'success');
        }
    },

    // ══════════════════════════════════════════════════════════════
    // 2. CRUD STUDIO INTERACTIVO (MODALES Y TOASTS EN VIVO)
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

            <!-- MODAL INTERACTIVO DENTRO DEL SIMULADOR -->
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
            // Actualizar
            const idx = this.crudData.findIndex(f => f.id === parseInt(id, 10));
            if (idx !== -1) {
                this.crudData[idx] = { id: parseInt(id, 10), nombre, propietario, hectareas, vereda, municipio };
            }
            if (window.APP && window.APP.showToast) {
                window.APP.showToast(`Finca "${nombre}" actualizada con éxito (PUT 200)`, 'success');
            }
        } else {
            // Crear nuevo
            const newId = this.crudData.length > 0 ? Math.max(...this.crudData.map(f => f.id)) + 1 : 1;
            this.crudData.push({ id: newId, nombre, propietario, hectareas, vereda, municipio });
            if (window.APP && window.APP.showToast) {
                window.APP.showToast(`Finca "${nombre}" creada en PostgreSQL (POST 201)`, 'success');
            }
        }

        this.closeCrudModal();
        this.renderCrudTable();
        if (window.GAMIFICATION) {
            window.GAMIFICATION.addXP(100, 'Operación CRUD completada en el simulador');
        }
    },

    // ══════════════════════════════════════════════════════════════
    // 3. SIMULADOR DE MENÚ HAMBURGUESA & MOBILE-FIRST LAYOUT
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
                        <!-- Barra de App Simulada -->
                        <div style="padding:0.75rem 1rem; background:rgba(17,24,39,0.9); border-bottom:1px solid var(--glass-border); display:flex; justify-content:space-between; align-items:center; position:relative;">
                            <div style="font-weight:700; font-size:0.9rem; color:var(--text-main);">🌿 AgroManager</div>
                            <button id="sim-burger-btn" onclick="SIMULATORS.toggleSimDrawer()" style="background:rgba(255,255,255,0.06); border:1px solid var(--glass-border); border-radius:6px; color:white; width:34px; height:34px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
                                ☰
                            </button>
                        </div>

                        <!-- Mini Contenido de la Pantalla -->
                        <div style="padding:1rem; position:relative; min-height:220px;">
                            <h4 style="font-size:0.95rem; margin-bottom:0.4rem;">Panel Principal</h4>
                            <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.75rem;">Fincas activas: 3 | Cultivos: 5</p>
                            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--glass-border); border-radius:8px; padding:0.75rem; font-size:0.8rem;">
                                🏡 Finca La Esperanza — 15 ha
                            </div>

                            <!-- Drawer Móvil Simulado -->
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
    // 4. VISUALIZADOR DE USESTATE & USEEFFECT
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
    // 5. JSX LIVE EDITOR
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

    // ── Props Simulator ──
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
    // 6. QUIZ Y DEBUGGER DE ERRORES COMUNES
    // ══════════════════════════════════════════════════════════════
    renderQuizSimulator() {
        const container = document.querySelector('.sim-quiz-container');
        if (!container) return;

        const questions = [
            {
                q: "¿Por qué React exige una prop 'key' única al renderizar elementos con .map()?",
                options: [
                    "Para que el Virtual DOM identifique exactamente qué elemento cambió, se agregó o eliminó sin re-renderizar toda la lista.",
                    "Para ordenar los elementos alfabéticamente de forma automática.",
                    "Es obligatorio solo por sintaxis de JavaScript pero no afecta el rendimiento."
                ],
                correct: 0,
                feedback: "¡Correcto! Las keys permiten la reconciliación eficiente del Virtual DOM."
            },
            {
                q: "Si tu backend Spring Boot corre en el puerto 31026 y React en el 5173, ¿qué sucede si no configuras CORS?",
                options: [
                    "El servidor Spring Boot se apaga automáticamente.",
                    "El navegador bloquea la respuesta por seguridad aplicando la política de mismo origen (Same-Origin Policy).",
                    "React transforma la petición en una llamada SOAP."
                ],
                correct: 1,
                feedback: "¡Exacto! CORS es una medida de seguridad implementada por los navegadores."
            },
            {
                q: "¿Cuál es la forma correcta de actualizar un array en el estado de React?",
                options: [
                    "fincas.push(nuevaFinca); setFincas(fincas);",
                    "setFincas(prev => [...prev, nuevaFinca]); (Usando inmutabilidad con spread operator)",
                    "fincas[0] = nuevaFinca;"
                ],
                correct: 1,
                feedback: "¡Excelente! La inmutabilidad es la regla de oro en React para que detecte el cambio de referencia."
            }
        ];

        container.innerHTML = `
            <div class="simulator-card glass-panel">
                <div class="sim-header">
                    <h3><span>🧠</span> Quiz de Maestría React + Spring Boot</h3>
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
