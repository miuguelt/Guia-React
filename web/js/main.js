const APP = {
    currentPage: 'welcome',

    init() {
        this.initSidebar();
        this.initSearch();
        this.initProgressTracking();
        this.initCopyButtons();
        this.initParticles();
        this.initScrollAnimations();
        GAMIFICATION.renderStats();
        GAMIFICATION.updateSidebarBadges();
    },

    initSidebar() {
        const toggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        if (toggle && sidebar) {
            toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
        }
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = item.getAttribute('href');
                if (target && target.startsWith('#')) {
                    this.navigateTo(target.substring(1));
                    if (window.innerWidth <= 1024) sidebar.classList.remove('open');
                }
            });
        });
    },

    navigateTo(pageId) {
        document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
        const target = document.getElementById(pageId);
        if (target) {
            target.classList.add('active');
            this.currentPage = pageId;
            this.updateBreadcrumb(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },

    updateBreadcrumb(pageId) {
        const breadcrumb = document.getElementById('breadcrumb-current');
        if (breadcrumb) {
            const names = {
                'welcome': 'Inicio',
                'm-reflexion': 'Reflexion',
                'm-entorno': 'Entorno',
                'm-endpoint': 'Endpoints',
                'm-database': 'Base de Datos',
                'm-modelos': 'Modelos',
                'm-schemas': 'Pydantic',
                'm-crud': 'CRUD',
                'm-docker': 'Docker',
                'm-simuladores': 'Simuladores',
                'm-retos': 'Retos'
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
                if (moduleId) {
                    GAMIFICATION.markCompleted(moduleId);
                    btn.textContent = 'Completado';
                    btn.classList.add('completed');
                    btn.disabled = true;
                    this.checkVictory();
                }
            });
        });
        this.addNextButtons();
    },

    addNextButtons() {
        const modules = ['m-reflexion', 'm-entorno', 'm-endpoint', 'm-database', 'm-modelos', 'm-schemas', 'm-crud', 'm-docker', 'm-simuladores', 'm-retos'];
        modules.forEach((moduleId, index) => {
            const section = document.getElementById(moduleId);
            if (section && !section.querySelector('.next-button-container')) {
                const nextModule = modules[index + 1];
                if (nextModule) {
                    const container = document.createElement('div');
                    container.className = 'next-button-container';
                    const btn = document.createElement('button');
                    btn.className = 'btn-next';
                    btn.textContent = 'Siguiente Modulo';
                    btn.onclick = () => this.navigateTo(nextModule);
                    container.appendChild(btn);
                    const sectionCard = section.querySelector('.section-card');
                    if (sectionCard) sectionCard.appendChild(container);
                }
            }
        });
    },

    checkVictory() {
        const totalModules = 10;
        const completed = GAMIFICATION.completed.length;
        if (completed >= totalModules) {
            setTimeout(() => this.showVictoryModal(), 500);
        }
    },

    showVictoryModal() {
        const modal = document.getElementById('victory-modal');
        if (modal) {
            document.getElementById('modal-modules').textContent = GAMIFICATION.completed.length;
            document.getElementById('modal-xp').textContent = GAMIFICATION.xp;
            document.getElementById('modal-level').textContent = GAMIFICATION.level;
            modal.style.display = 'flex';
            if (window.confetti) {
                confetti({ particleCount: 300, spread: 160, origin: { y: 0.5 } });
                setTimeout(() => confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } }), 500);
                setTimeout(() => confetti({ particleCount: 100, spread: 80, origin: { y: 0.7 } }), 1000);
            }
        }
    },

    closeVictoryModal() {
        const modal = document.getElementById('victory-modal');
        if (modal) modal.style.display = 'none';
    },

    initCopyButtons() {
        document.querySelectorAll('pre').forEach(pre => {
            if (!pre.querySelector('.copy-btn')) {
                const btn = document.createElement('button');
                btn.className = 'copy-btn';
                btn.textContent = 'Copiar';
                btn.onclick = () => {
                    const code = pre.querySelector('code') ? pre.querySelector('code').textContent : pre.textContent;
                    navigator.clipboard.writeText(code).then(() => {
                        btn.textContent = 'Copiado!';
                        setTimeout(() => btn.textContent = 'Copiar', 2000);
                    });
                };
                pre.style.position = 'relative';
                pre.appendChild(btn);
            }
        });
    },

    initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 20 + 's';
            p.style.animationDuration = (15 + Math.random() * 10) + 's';
            container.appendChild(p);
        }
    },

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('animate-in');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.section-card, .simulator-card, .concept-card').forEach(el => observer.observe(el));
    }
};

window.APP = APP;
document.addEventListener('DOMContentLoaded', () => APP.init());

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    setTimeout(() => document.getElementById(tabName).classList.add("active"), 10);
    evt.currentTarget.className += " active";
}
