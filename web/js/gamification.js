const GAMIFICATION = {
    xp: parseInt(localStorage.getItem('fastapi_xp') || '0'),
    level: 1,
    levelName: "Novato",
    badges: JSON.parse(localStorage.getItem('fastapi_badges') || '[]'),
    completed: JSON.parse(localStorage.getItem('fastapi_completed') || '[]'),

    levels: [
        { name: "Novato", min: 0 },
        { name: "Aprendiz API", min: 500 },
        { name: "Desarrollador FastAPI", min: 1500 },
        { name: "Maestro Microservicios", min: 4000 }
    ],

    init() {
        this.updateLevel();
        this.renderStats();
    },

    addXP(amount, reason) {
        this.xp += amount;
        localStorage.setItem('fastapi_xp', this.xp);
        this.updateLevel();
        this.renderStats();
        this.notifyXP(amount, reason);
    },

    updateLevel() {
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (this.xp >= this.levels[i].min) {
                this.level = i + 1;
                this.levelName = this.levels[i].name;
                break;
            }
        }
    },

    renderStats() {
        const xpEl = document.getElementById('user-xp');
        const levelEl = document.getElementById('user-level');
        const levelNameEl = document.getElementById('user-level-name');
        const progressEl = document.getElementById('course-progress');
        const progressPct = document.getElementById('progress-pct');

        if (xpEl) xpEl.textContent = this.xp + ' XP';
        if (levelEl) levelEl.textContent = 'Nivel ' + this.level;
        if (levelNameEl) levelNameEl.textContent = this.levelName;

        const totalModules = document.querySelectorAll('.module-page').length || 8;
        const pct = Math.round((this.completed.length / totalModules) * 100);
        if (progressEl) progressEl.style.width = pct + '%';
        if (progressPct) progressPct.textContent = pct + '%';

        const currentLevelMin = this.levels[this.level - 1].min;
        const nextLevelMin = this.levels[this.level] ? this.levels[this.level].min : this.xp;
        const range = nextLevelMin - currentLevelMin;
        const xpProgress = range === 0 ? 100 : ((this.xp - currentLevelMin) / range) * 100;
        const xpBar = document.getElementById('xp-progress-fill');
        if (xpBar) xpBar.style.width = Math.min(100, xpProgress) + '%';
    },

    markCompleted(moduleId) {
        if (!this.completed.includes(moduleId)) {
            this.completed.push(moduleId);
            localStorage.setItem('fastapi_completed', JSON.stringify(this.completed));
            this.addXP(250, 'Modulo ' + moduleId + ' completado');
            this.renderStats();
            this.updateSidebarBadges();
        }
    },

    updateSidebarBadges() {
        document.querySelectorAll('.nav-item').forEach(item => {
            const modId = item.getAttribute('data-module');
            const badge = item.querySelector('.nav-badge');
            if (badge && this.completed.includes(modId)) {
                badge.innerHTML = '&#10003;';
                badge.classList.add('completed');
            }
        });
    },

    notifyXP(amount, reason) {
        const toast = document.createElement('div');
        toast.className = 'xp-toast';
        toast.innerHTML =
            '<div class="xp-toast-icon">&#10024;</div>' +
            '<div class="xp-toast-content">' +
            '<div class="xp-toast-amount">+' + amount + ' XP</div>' +
            '<div class="xp-toast-reason">' + reason + '</div>' +
            '</div>';
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
};

window.GAMIFICATION = GAMIFICATION;
document.addEventListener('DOMContentLoaded', () => GAMIFICATION.init());
