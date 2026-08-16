const SIMULATORS = {
    init() {
        this.renderJSXSimulator();
        this.renderPropsSimulator();
        this.renderSimulator();
        this.renderHooksSimulator();
        this.renderQuizSimulator();
        this.renderDebugSimulator();
        this.renderRouterArchitect();
        this.renderRequestLifecycle();
        this.renderInteractiveCRUD();
    },

    // ── JSX Live Editor ──
    renderJSXSimulator() {
        const containers = document.querySelectorAll('.sim-routes-container');
        containers.forEach(container => {
            container.innerHTML = `
                <div class="simulator-card glass-panel">
                    <div class="sim-header"><span class="sim-icon">&#9889;</span><h3>JSX Live Editor</h3></div>
                    <div class="sim-body">
                        <div class="sim-input-group"><label>JSX:</label>
                        <textarea id="jsx-input" class="sim-textarea" spellcheck="false" style="min-height:80px;">&lt;h1&gt;Hola React!&lt;/h1&gt;
&lt;p style={{color: 'blue'}}&gt;Esto es JSX&lt;/p&gt;</textarea></div>
                        <div class="sim-output" style="margin-top:10px;">
                            <div class="code-header">Compilado a JavaScript:</div>
                            <div id="jsx-output" class="browser-preview" style="color:var(--text-muted);font-size:0.8rem;">React.createElement("h1", null, "Hola React!")</div>
                        </div>
                    </div>
                    <div class="sim-footer">
                        <button class="btn btn-primary" onclick="SIMULATORS.checkJSX()">Compilar +50 XP</button>
                    </div>
                </div>
            `;
            const input = container.querySelector('#jsx-input');
            if (input) input.addEventListener('input', (e) => this.updateJSX(e.target.value));
        });
    },

    updateJSX(jsx) {
        const output = document.getElementById('jsx-output');
        if (!output) return;
        const matchH1 = jsx.match(/<h1[^>]*>([^<]*)<\/h1>/);
        const matchP = jsx.match(/<p[^>]*>([^<]*)<\/p>/);
        let result = '// JSX compilado a React.createElement\n';
        if (matchH1) result += `React.createElement("h1", null, "${matchH1[1]}")`;
        if (matchP) result += `\nReact.createElement("p", {style: {color: 'blue'}}, "${matchP[1]}")`;
        output.textContent = result || '// Escribe JSX para compilar';
    },

    checkJSX() {
        if (window.GAMIFICATION) { if (window.confetti) confetti({ particleCount: 50, spread: 50 }); window.GAMIFICATION.addXP(50, 'JSX compilado'); }
    },

    // ── Props Simulator ──
    renderPropsSimulator() {
        const containers = document.querySelectorAll('.sim-jinja-container');
        containers.forEach(container => {
            container.innerHTML = `
                <div class="simulator-card glass-panel">
                    <div class="sim-header"><span class="sim-icon">&#128230;</span><h3>Props Simulator</h3></div>
                    <div class="sim-body">
                        <div class="sim-split">
                            <div><label>Componente:</label>
                            <textarea id="props-component" class="sim-textarea" spellcheck="false" style="min-height:80px;">function Saludo({ nombre, edad }) {
  return &lt;div&gt;
    &lt;h2&gt;Hola, {nombre}!&lt;/h2&gt;
    &lt;p&gt;Edad: {edad}&lt;/p&gt;
  &lt;/div&gt;
}</textarea></div>
                            <div><label>Props (JSON):</label>
                            <textarea id="props-json" class="sim-textarea" spellcheck="false" style="min-height:80px;">{
  "nombre": "Ana",
  "edad": 25
}</textarea></div>
                        </div>
                        <div class="sim-output" style="margin-top:10px;">
                            <div class="code-header">Renderizado:</div>
                            <div id="props-output" class="browser-preview"></div>
                        </div>
                    </div>
                    <div class="sim-footer">
                        <button class="btn btn-primary" onclick="SIMULATORS.checkProps()">Renderizar +50 XP</button>
                    </div>
                </div>
            `;
            const input = document.getElementById('props-json');
            const comp = document.getElementById('props-component');
            if (input && comp) {
                const update = () => this.updateProps(comp.value, input.value);
                input.addEventListener('input', update);
                comp.addEventListener('input', update);
            }
        });
    },

    updateProps(component, jsonStr) {
        const output = document.getElementById('props-output');
        if (!output) return;
        try {
            const props = JSON.parse(jsonStr);
            let result = component;
            Object.entries(props).forEach(([k, v]) => {
                result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
            });
            result = result.replace(/<\/?[^>]+>/g, m => m);
            output.innerHTML = `<div style="padding:10px;border:1px solid var(--glass-border);border-radius:6px;">${result}</div>`;
        } catch (e) {
            output.innerHTML = 'JSON invalido';
        }
    },

    checkProps() {
        if (window.GAMIFICATION) { if (window.confetti) confetti({ particleCount: 50, spread: 50 }); window.GAMIFICATION.addXP(50, 'Props renderizadas'); }
    },

    // ── State Simulator ──
    renderSimulator() {
        const containers = document.querySelectorAll('.sim-orm-container');
        containers.forEach(container => {
            let count = 0;
            container.innerHTML = `
                <div class="simulator-card glass-panel">
                    <div class="sim-header"><span class="sim-icon">&#128204;</span><h3>useState Simulator</h3></div>
                    <div class="sim-body">
                        <div class="sim-input-group"><label>Valor actual del estado:</label>
                        <div class="browser-preview" id="state-value" style="font-size:1.5rem;text-align:center;">${count}</div></div>
                        <div style="display:flex;gap:10px;margin-top:10px;">
                            <button class="btn btn-primary" onclick="SIMULATORS.setState(${count + 1})">setCount(${count + 1})</button>
                            <button class="btn btn-secondary" onclick="SIMULATORS.setState(${count - 1})">setCount(${count - 1})</button>
                            <button class="btn btn-secondary" onclick="SIMULATORS.setState(0)">Reset</button>
                        </div>
                        <div class="sim-output" style="margin-top:10px;">
                            <div class="code-header">Codigo equivalente:</div>
                            <pre><code class="language-jsx">const [count, setCount] = useState(${count})</code></pre>
                        </div>
                    </div>
                    <div class="sim-footer">
                        <button class="btn btn-primary" onclick="SIMULATORS.checkState()">Validar +50 XP</button>
                    </div>
                </div>
            `;
            this.stateCount = count;
        });
    },

    setState(val) {
        const el = document.getElementById('state-value');
        if (el) {
            this.stateCount = val;
            el.textContent = val;
            const code = document.querySelector('.sim-orm-container pre code');
            if (code) code.textContent = `const [count, setCount] = useState(${val})`;
        }
    },

    checkState() {
        if (window.GAMIFICATION) { if (window.confetti) confetti({ particleCount: 50, spread: 50 }); window.GAMIFICATION.addXP(50, 'Estado gestionado'); }
    },

    // ── Hooks Playground ──
    renderHooksSimulator() {
        const containers = document.querySelectorAll('.sim-db-container');
        containers.forEach(container => {
            container.innerHTML = `
                <div class="simulator-card glass-panel">
                    <div class="sim-header"><span class="sim-icon">&#128640;</span><h3>Hooks Playground</h3></div>
                    <div class="sim-body">
                        <div class="sim-input-group"><label>Elige un Hook:</label>
                        <select id="hook-select" class="sim-select">
                            <option value="useState">useState - Estado local</option>
                            <option value="useEffect">useEffect - Efectos secundarios</option>
                            <option value="useRef">useRef - Referencias DOM</option>
                            <option value="useMemo">useMemo - Valores memorizados</option>
                        </select></div>
                        <div id="hook-output" class="browser-preview" style="margin-top:10px;font-family:monospace;font-size:0.8rem;white-space:pre-wrap;">
useState:
const [state, setState] = useState(initialValue)
                        </div>
                    </div>
                    <div class="sim-footer">
                        <button class="btn btn-primary" onclick="SIMULATORS.checkHook()">Explorar +50 XP</button>
                    </div>
                </div>
            `;
            const select = container.querySelector('#hook-select');
            if (select) select.addEventListener('change', () => this.updateHook(select.value));
        });
    },

    updateHook(hook) {
        const output = document.getElementById('hook-output');
        if (!output) return;
        const hooks = {
            useState: `useState:
const [state, setState] = useState(initialValue)

// Ejemplo:
const [count, setCount] = useState(0)
setCount(count + 1)  // Actualiza estado`,
            useEffect: `useEffect:
useEffect(() => {
  // Efecto (se ejecuta tras render)
  return () => {
    // Cleanup (al desmontar)
  }
}, [dependencies])

// Ejemplo:
useEffect(() => {
  fetch('/api/data').then(setData)
}, [])`,
            useRef: `useRef:
const ref = useRef(initialValue)

// Ejemplo:
const inputRef = useRef(null)
inputRef.current.focus()  // Acceso DOM`,
            useMemo: `useMemo:
const memoValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])

// Ejemplo:
const total = useMemo(() =>
  items.reduce((sum, i) => sum + i.price, 0),
  [items]
)`
        };
        output.textContent = hooks[hook] || hooks.useState;
    },

    checkHook() {
        if (window.GAMIFICATION) { if (window.confetti) confetti({ particleCount: 50, spread: 50 }); window.GAMIFICATION.addXP(50, 'Hook explorado'); }
    },

    // ── Quiz ──
    renderQuizSimulator() {
        const containers = document.querySelectorAll('.sim-quiz-container');
        containers.forEach(container => this.loadQuiz(container));
    },

    loadQuiz(container) {
        const questions = [
            { q: "Que funcion retorna JSX?", a: ["React.createElement()", "document.write()", "innerHTML"], c: 0 },
            { q: "Como se pasan datos a un componente hijo?", a: ["Props", "State", "Hooks"], c: 0 },
            { q: "Que Hook se usa para estado local?", a: ["useState", "useEffect", "useRef"], c: 0 },
            { q: "Que Hook ejecuta codigo tras renderizar?", a: ["useEffect", "useState", "useCallback"], c: 0 }
        ];
        const random = questions[Math.floor(Math.random() * questions.length)];
        container.innerHTML = `
            <div class="simulator-card glass-panel quiz-card">
                <div class="sim-header"><span class="sim-icon">&#127918;</span><h3>Quiz React</h3></div>
                <div class="sim-body">
                    <p class="quiz-question">${random.q}</p>
                    <div class="quiz-options">${random.a.map((opt, i) => `<button class="quiz-option-btn glass-panel-inner" onclick="SIMULATORS.answerQuiz(this, ${i === random.c})">${opt}</button>`).join('')}</div>
                </div>
                <div id="quiz-feedback" class="quiz-feedback"></div>
            </div>`;
    },

    answerQuiz(btn, isCorrect) {
        const feedback = document.getElementById('quiz-feedback');
        const container = btn.closest('.sim-quiz-container');
        if (isCorrect) {
            btn.classList.add('correct');
            feedback.innerHTML = '<span class="text-success">Correcto! +75 XP</span>';
            if (window.confetti) confetti({ particleCount: 100, spread: 70 });
            if (window.GAMIFICATION) window.GAMIFICATION.addXP(75, 'Quiz React');
            setTimeout(() => this.loadQuiz(container), 2000);
        } else {
            btn.classList.add('incorrect');
            feedback.innerHTML = '<span class="text-error">Intenta de nuevo</span>';
            setTimeout(() => btn.classList.remove('incorrect'), 1000);
        }
    },

    // ── Debug ──
    renderDebugSimulator() {
        const containers = document.querySelectorAll('.sim-debug-container');
        containers.forEach(container => this.loadDebug(container));
    },

    loadDebug(container) {
        const levels = [
            { task: "Falta el return en el componente", code: 'function App() {\n  <h1>Hola React</h1>\n}', options: ['return <h1>Hola React</h1>', 'render <h1>Hola React</h1>', '<h1>Hola React</h1>'], correct: 0 },
            { task: "useState sin importar", code: 'function App() {\n  const [count, setCount] = useState(0)\n}', options: ["import { useState } from 'react'", "import React from 'react'", "const useState = React.useState"], correct: 0 },
        ];
        const level = levels[Math.floor(Math.random() * levels.length)];
        container.innerHTML = `
            <div class="simulator-card glass-panel debug-card">
                <div class="sim-header"><span class="sim-icon">&#128027;</span><h3>Debug React</h3></div>
                <div class="sim-body">
                    <p class="debug-task"><strong>Bug:</strong> ${level.task}</p>
                    <pre><code class="language-jsx">${level.code}</code></pre>
                    <div class="debug-options">${level.options.map((opt, i) => `<button class="quiz-option-btn glass-panel-inner" onclick="SIMULATORS.solveDebug(this, ${i === level.correct})">${opt}</button>`).join('')}</div>
                </div>
                <div id="debug-feedback" class="quiz-feedback"></div>
            </div>`;
    },

    solveDebug(btn, isCorrect) {
        const container = btn.closest('.sim-debug-container');
        const feedback = container.querySelector('.quiz-feedback');
        if (isCorrect) {
            btn.classList.add('correct');
            feedback.innerHTML = '<span class="text-success">Bug arreglado! +100 XP</span>';
            if (window.confetti) confetti({ particleCount: 150, spread: 100 });
            if (window.GAMIFICATION) window.GAMIFICATION.addXP(100, 'Bug React solucionado');
            setTimeout(() => this.loadDebug(container), 2500);
        } else {
            btn.classList.add('incorrect');
            feedback.innerHTML = '<span class="text-error">Sigue intentando...</span>';
            setTimeout(() => btn.classList.remove('incorrect'), 1000);
        }
    },

    // ── Router Architect ──
    renderRouterArchitect() {
        const containers = document.querySelectorAll('.sim-arch-container');
        containers.forEach(container => {
            container.innerHTML = `
                <div class="simulator-card glass-panel">
                    <div class="sim-header"><span class="sim-icon">&#128204;</span><h3>Router Architect</h3></div>
                    <div class="sim-body">
                        <p class="quiz-question">Arrastra los componentes a su ubicacion correcta:</p>
                        <div class="arch-drop-zones" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="drop-zone glass-panel-inner" data-type="router">
                                <div class="zone-label">Router Registry</div>
                                <div class="zone-content" id="zone-router"></div>
                            </div>
                            <div class="drop-zone glass-panel-inner" data-type="provider">
                                <div class="zone-label">Provider Config</div>
                                <div class="zone-content" id="zone-provider"></div>
                            </div>
                        </div>
                        <div class="arch-items" style="display: flex; gap: 10px; margin-top: 25px; justify-content: center; flex-wrap: wrap;">
                            <div class="arch-item glass-panel-inner" draggable="true" ondragstart="SIMULATORS.onDragStart(event)" id="item-router">BrowserRouter</div>
                            <div class="arch-item glass-panel-inner" draggable="true" ondragstart="SIMULATORS.onDragStart(event)" id="item-provider">Routes + Route</div>
                        </div>
                    </div>
                    <div id="arch-feedback" class="quiz-feedback"></div>
                </div>
            `;
            this.initArchEvents(container);
        });
    },

    onDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    },

    initArchEvents(container) {
        const zones = container.querySelectorAll('.drop-zone');
        zones.forEach(zone => {
            zone.addEventListener('dragover', (e) => e.preventDefault());
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData('text');
                const item = document.getElementById(id);
                const type = zone.getAttribute('data-type');
                
                if ((type === 'router' && id === 'item-router') || (type === 'provider' && id === 'item-provider')) {
                    zone.querySelector('.zone-content').appendChild(item);
                    item.setAttribute('draggable', 'false');
                    this.checkArchProgress(container);
                } else {
                    item.classList.add('shake');
                    setTimeout(() => item.classList.remove('shake'), 400);
                }
            });
        });
    },

    checkArchProgress(container) {
        const itemsInZones = container.querySelectorAll('.zone-content .arch-item').length;
        if (itemsInZones === 2) {
            const feedback = container.querySelector('#arch-feedback');
            feedback.innerHTML = '<span class="text-success">Arquitectura React Router validada! +150 XP</span>';
            if (window.confetti) confetti({ particleCount: 200, spread: 130 });
            if (window.GAMIFICATION) window.GAMIFICATION.addXP(150, 'Arquitectura React Router dominada');
        }
    },

    // ── Request Lifecycle ──
    renderRequestLifecycle() {
        const containers = document.querySelectorAll('.sim-lifecycle-container');
        containers.forEach(container => {
            container.innerHTML = `
                <div class="simulator-card glass-panel">
                    <div class="sim-header"><span class="sim-icon">&#128260;</span><h3>Request Lifecycle: React Flow</h3></div>
                    <div class="sim-body">
                        <div class="lifecycle-steps" style="display: flex; flex-direction: column; gap: 10px;">
                            <div class="lifecycle-step" data-step="1">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <strong>Cliente HTTP</strong>
                                    <p>GET /productos</p>
                                </div>
                            </div>
                            <div class="lifecycle-step" data-step="2">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <strong>React Router</strong>
                                    <p>Matchea ruta con &lt;Route path="/productos" /&gt;</p>
                                </div>
                            </div>
                            <div class="lifecycle-step" data-step="3">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <strong>Componente Productos</strong>
                                    <p>Render inicial con useState(null)</p>
                                </div>
                            </div>
                            <div class="lifecycle-step" data-step="4">
                                <div class="step-number">4</div>
                                <div class="step-content">
                                    <strong>useEffect</strong>
                                    <p>Ejecuta fetch('/api/productos')</p>
                                </div>
                            </div>
                            <div class="lifecycle-step" data-step="5">
                                <div class="step-number">5</div>
                                <div class="step-content">
                                    <strong>API Backend</strong>
                                    <p>Retorna JSON con productos</p>
                                </div>
                            </div>
                            <div class="lifecycle-step" data-step="6">
                                <div class="step-number">6</div>
                                <div class="step-content">
                                    <strong>setState</strong>
                                    <p>Actualiza estado con datos recibidos</p>
                                </div>
                            </div>
                            <div class="lifecycle-step" data-step="7">
                                <div class="step-number">7</div>
                                <div class="step-content">
                                    <strong>Re-render</strong>
                                    <p>React actualiza solo componentes afectados</p>
                                </div>
                            </div>
                            <div class="lifecycle-step" data-step="8">
                                <div class="step-number">8</div>
                                <div class="step-content">
                                    <strong>DOM Actualizado</strong>
                                    <p>Virtual DOM → Real DOM (diferencias minimas)</p>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary" style="margin-top: 20px;" onclick="SIMULATORS.animateLifecycle()">Animar Flujo +75 XP</button>
                    </div>
                </div>
            `;
        });
    },

    animateLifecycle() {
        const steps = document.querySelectorAll('.lifecycle-step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('active');
                if (index === steps.length - 1) {
                    if (window.confetti) confetti({ particleCount: 100, spread: 70 });
                    if (window.GAMIFICATION) window.GAMIFICATION.addXP(75, 'Request Lifecycle completado');
                }
            }, index * 500);
        });
        setTimeout(() => {
            steps.forEach(step => step.classList.remove('active'));
        }, steps.length * 500 + 2000);
    },

    // ── Interactive CRUD ──
    renderInteractiveCRUD() {
        const containers = document.querySelectorAll('.sim-crud-container');
        containers.forEach(container => {
            this.crudData = [
                { id: 1, nombre: 'Laptop Gamer', precio: 4500000, stock: 8 },
                { id: 2, nombre: 'Teclado Mecanico', precio: 350000, stock: 25 }
            ];
            this.crudNextId = 3;
            
            container.innerHTML = `
                <div class="simulator-card glass-panel">
                    <div class="sim-header"><span class="sim-icon">&#128260;</span><h3>CRUD Interactivo: Productos</h3></div>
                    <div class="sim-body">
                        <div class="crud-form" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                            <input type="text" id="crud-nombre" placeholder="Nombre" class="sim-input">
                            <input type="number" id="crud-precio" placeholder="Precio" class="sim-input" step="0.01">
                            <input type="number" id="crud-stock" placeholder="Stock" class="sim-input">
                            <button class="btn btn-primary" onclick="SIMULATORS.crudCreate()">Crear</button>
                        </div>
                        <div class="crud-table">
                            <table class="comparison-table">
                                <thead>
                                    <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
                                </thead>
                                <tbody id="crud-tbody"></tbody>
                            </table>
                        </div>
                        <div class="crud-console" style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; font-family: monospace; font-size: 0.85rem; max-height: 150px; overflow-y: auto;" id="crud-console"></div>
                    </div>
                </div>
            `;
            this.crudRender();
        });
    },

    crudRender() {
        const tbody = document.getElementById('crud-tbody');
        if (!tbody) return;
        tbody.innerHTML = this.crudData.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>$${item.precio.toLocaleString('es-CO')}</td>
                <td>${item.stock}</td>
                <td><button class="btn btn-sm" onclick="SIMULATORS.crudDelete(${item.id})">Eliminar</button></td>
            </tr>
        `).join('');
    },

    crudLog(msg) {
        const console = document.getElementById('crud-console');
        if (console) {
            const time = new Date().toLocaleTimeString('es-CO');
            console.innerHTML += `<div>[${time}] ${msg}</div>`;
            console.scrollTop = console.scrollHeight;
        }
    },

    crudCreate() {
        const nombre = document.getElementById('crud-nombre').value;
        const precio = parseFloat(document.getElementById('crud-precio').value);
        const stock = parseInt(document.getElementById('crud-stock').value);
        
        if (!nombre || isNaN(precio) || isNaN(stock)) {
            this.crudLog('ERROR: Datos invalidos');
            return;
        }
        
        const newItem = { id: this.crudNextId++, nombre, precio, stock };
        this.crudData.push(newItem);
        this.crudRender();
        this.crudLog(`POST /productos → 201 Created (id: ${newItem.id})`);
        
        document.getElementById('crud-nombre').value = '';
        document.getElementById('crud-precio').value = '';
        document.getElementById('crud-stock').value = '';
        
        if (window.GAMIFICATION) window.GAMIFICATION.addXP(25, 'Producto creado');
    },

    crudDelete(id) {
        this.crudData = this.crudData.filter(item => item.id !== id);
        this.crudRender();
        this.crudLog(`DELETE /productos/${id} → 204 No Content`);
        if (window.GAMIFICATION) window.GAMIFICATION.addXP(25, 'Producto eliminado');
    }
};

window.SIMULATORS = SIMULATORS;
document.addEventListener('DOMContentLoaded', () => SIMULATORS.init());
