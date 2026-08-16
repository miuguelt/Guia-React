/**
 * APP CONTROLLER - Guia React & Spring Boot API (SENA ADSO)
 * Manejo de navegación SPA, menú hamburguesa accesible, Toasts flotantes, Modales, Búsqueda y Gamificación.
 */

const APP = {
    currentPage: 'welcome',
    modulesList: [
        'welcome',
        'm-reflexion',
        'm-entorno',
        'm-componentes',
        'm-layout',
        'm-estado',
        'm-efectos',
        'm-api',
        'm-componentes-ui',
        'm-crud',
        'm-ia',
        'm-simuladores',
        'm-retos'
    ],

    init() {
        this.initSidebar();
        this.initSearch();
        this.initHashRouting();
        this.initProgressTracking();
        this.initParticles();
        this.initToastContainer();
        
        if (window.GAMIFICATION) {
            window.GAMIFICATION.renderStats();
            window.GAMIFICATION.updateSidebarBadges();
        }
        if (window.SIMULATORS) {
            window.SIMULATORS.init();
        }
    },

    initSidebar() {
        const toggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');

        const toggleSidebar = () => {
            if (!sidebar) return;
            const isOpen = sidebar.classList.toggle('open');
            if (backdrop) {
                backdrop.classList.toggle('active', isOpen);
            }
            if (toggle) {
                toggle.setAttribute('aria-expanded', isOpen);
            }
        };

        if (toggle) toggle.addEventListener('click', toggleSidebar);
        if (backdrop) backdrop.addEventListener('click', toggleSidebar);

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
                toggleSidebar();
            }
        });

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = item.getAttribute('href');
                if (target && target.startsWith('#')) {
                    this.navigateTo(target.substring(1));
                    if (window.innerWidth <= 1024 && sidebar.classList.contains('open')) {
                        toggleSidebar();
                    }
                }
            });
        });
    },

    initHashRouting() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.replace('#', '');
            if (hash && document.getElementById(hash)) {
                this.navigateTo(hash, false);
            }
        });

        const initialHash = window.location.hash.replace('#', '');
        if (initialHash && document.getElementById(initialHash)) {
            this.navigateTo(initialHash, false);
        }
    },

    navigateTo(pageId, updateHash = true) {
        document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
        const target = document.getElementById(pageId);
        if (target) {
            target.classList.add('active');
            this.currentPage = pageId;
            this.updateBreadcrumb(pageId);
            this.updateActiveNav(pageId);
            if (updateHash) {
                window.location.hash = pageId;
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Renderizar bloques de código asociados si aún no están listos
            if (window.CodeRenderer) {
                window.CodeRenderer.renderModule(pageId);
                if (window.Prism) Prism.highlightAll();
            }
        }
    },

    updateActiveNav(pageId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            const href = item.getAttribute('href');
            if (href === `#${pageId}`) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    },

    updateBreadcrumb(pageId) {
        const breadcrumb = document.getElementById('breadcrumb-current');
        if (breadcrumb) {
            const names = {
                'welcome': 'Inicio y Hoja de Ruta',
                'm-reflexion': 'M1: Fundamentos y Mentalidad',
                'm-entorno': 'M2: Setup y Hola Mundo',
                'm-componentes': 'M3: Componentes y Props',
                'm-layout': 'M4: Layout y Menú Hamburguesa',
                'm-estado': 'M5: Estado y Formularios',
                'm-efectos': 'M6: Efectos y Ciclo de Vida',
                'm-api': 'M7: Consumo Spring Boot',
                'm-componentes-ui': 'M8: Componentes UI (Modales/Toasts)',
                'm-crud': 'M9: CRUD Fincas y Cultivos',
                'm-ia': 'M10: Desarrollo con IA',
                'm-simuladores': 'M11: Simuladores en Vivo',
                'm-retos': 'M12: Retos y Portafolio'
            };
            breadcrumb.textContent = names[pageId] || pageId;
        }
    },

    initSearch() {
        const searchInput = document.getElementById('sidebar-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                document.querySelectorAll('.nav-item').forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(query) ? '' : 'none';
                });
            });
        }
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (searchInput) searchInput.focus();
            }
        });
    },

    initProgressTracking() {
        document.querySelectorAll('.mark-complete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const moduleId = btn.getAttribute('data-module');
                if (moduleId && window.GAMIFICATION) {
                    window.GAMIFICATION.markCompleted(moduleId);
                    btn.textContent = '✅ Módulo Completado';
                    btn.classList.add('completed');
                    btn.disabled = true;
                    this.showToast(`¡Has completado el ${moduleId}! Ganaste +250 XP`, 'success');
                    this.checkVictory();
                }
            });
        });
    },

    checkVictory() {
        if (!window.GAMIFICATION) return;
        const totalModules = 10;
        const completed = window.GAMIFICATION.completed ? window.GAMIFICATION.completed.length : 0;
        if (completed >= totalModules) {
            setTimeout(() => this.showVictoryModal(), 500);
        }
    },

    showVictoryModal() {
        const modal = document.getElementById('victory-modal');
        if (modal) {
            document.getElementById('modal-modules').textContent = window.GAMIFICATION.completed.length;
            document.getElementById('modal-xp').textContent = window.GAMIFICATION.xp;
            document.getElementById('modal-level').textContent = window.GAMIFICATION.level;
            modal.style.display = 'flex';
            modal.classList.add('active');
            if (window.confetti) {
                confetti({ particleCount: 300, spread: 160, origin: { y: 0.5 } });
                setTimeout(() => confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } }), 500);
            }
        }
    },

    closeVictoryModal() {
        const modal = document.getElementById('victory-modal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('active');
        }
    },

    // ── TOAST NOTIFICATIONS ENGINE ──
    initToastContainer() {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
    },

    showToast(message, type = 'info', duration = 4000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
            <div class="toast-body">
                <div class="toast-title">${type.toUpperCase()}</div>
                <div class="toast-msg">${message}</div>
            </div>
            <button class="toast-close" aria-label="Cerrar">×</button>
        `;

        const closeBtn = toast.querySelector('.toast-close');
        const removeToast = () => {
            toast.classList.add('toast-leaving');
            setTimeout(() => toast.remove(), 250);
        };

        if (closeBtn) closeBtn.onclick = removeToast;
        container.appendChild(toast);

        setTimeout(removeToast, duration);
    },

    initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < 18; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 18 + 's';
            p.style.animationDuration = (14 + Math.random() * 10) + 's';
            container.appendChild(p);
        }
    }
};

window.APP = APP;
document.addEventListener('DOMContentLoaded', () => APP.init());
