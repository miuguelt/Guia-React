/**
 * CODE RENDERER - Guia React SENA ADSO
 * Renderiza bloques de codigo con header de ruta de archivo y soporte para IA Prompts.
 */

const CodeRenderer = {

    renderModule(moduleId) {
        const content = (window.MODULES_CONTENT && window.MODULES_CONTENT[moduleId]) || 
                        (window.MODULES_CONTENT_FASE3 && window.MODULES_CONTENT_FASE3[moduleId]);
        if (!content) return;

        const container = document.getElementById(`code-${moduleId}`);
        if (!container) return;

        container.innerHTML = '';
        if (content.codeBlocks) {
            content.codeBlocks.forEach(block => {
                container.appendChild(this.createCodeBlock(block));
            });
        }
    },

    createCodeBlock(block) {
        if (block.type === 'prompt') {
            return this.createPromptBox(block);
        }
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';

        const header = this.createFileHeader(block);
        wrapper.appendChild(header);

        const pre = document.createElement('pre');
        pre.className = 'code-block';
        pre.innerHTML = `<code class="language-${block.lang}">${this.escapeHtml(block.code)}</code>`;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copiar';
        copyBtn.onclick = () => this.copyCode(block.code, copyBtn);
        pre.appendChild(copyBtn);

        wrapper.appendChild(pre);
        return wrapper;
    },

    createPromptBox(prompt) {
        const box = document.createElement('div');
        box.className = 'prompt-box';
        const text = this.escapeHtml(prompt.text);
        const safeText = prompt.text.replace(/'/g, "\\'").replace(/\n/g, '\\n');
        box.innerHTML = `<div class="prompt-label">🤖 Prompt para IA (Copilot / Claude / ChatGPT)</div>
            <div class="prompt-text">${text}</div>
            <div class="prompt-meta"><strong>🎯 Herramienta recomendada:</strong> ${prompt.tool || 'Antigravity, Claude, ChatGPT, GitHub Copilot'} · <strong>💡 Consejo:</strong> ${prompt.tip || 'Revisa siempre el código generado y pruébalo en tu aplicación'}</div>
            <button class="prompt-copy-btn" onclick="navigator.clipboard.writeText('${safeText}');this.textContent='✅ ¡Copiado!';setTimeout(()=>this.textContent='📋 Copiar Prompt',2000)">📋 Copiar Prompt</button>`;
        return box;
    },

    createFileHeader(block) {
        const header = document.createElement('div');
        header.className = 'code-file-header';

        const icon = this.getFileIcon(block.file);
        const langBadge = this.getLangBadge(block.lang);

        header.innerHTML = `
            <div class="file-header-left">
                <span class="file-icon">${icon}</span>
                <span class="file-path">${block.file}</span>
                ${langBadge}
            </div>
            <div class="file-header-right">
                <span class="file-title">${block.title || ''}</span>
            </div>
        `;
        return header;
    },

    getFileIcon(filename) {
        const icons = {
            '.jsx': '⚛️',
            '.tsx': '⚛️',
            '.js': '⚡',
            '.ts': '🔷',
            '.html': '🌐',
            '.css': '🎨',
            '.json': '📋',
            '.yml': '⚙️',
            '.yaml': '⚙️',
            '.sql': '🗄️',
            '.java': '☕',
            '.http': '🔗',
            '.env': '🔒',
            '.md': '📄',
            'Dockerfile': '🐳',
            'powershell': '▶️',
            'bash': '▶️'
        };

        for (const [ext, icon] of Object.entries(icons)) {
            if (filename === ext || filename.endsWith(ext)) return icon;
        }
        return '📄';
    },

    getLangBadge(lang) {
        const colors = {
            'jsx': '#0284c7',
            'tsx': '#2563eb',
            'javascript': '#d97706',
            'typescript': '#2563eb',
            'java': '#ea580c',
            'css': '#7c3aed',
            'powershell': '#0369a1',
            'bash': '#059669',
            'sql': '#c2410c',
            'yaml': '#dc2626',
            'dockerfile': '#0284c7',
            'http': '#0891b2',
            'json': '#374151'
        };
        const color = colors[lang] || '#4b5563';
        return `<span class="lang-badge" style="background:${color}">${lang}</span>`;
    },

    async copyCode(code, btn) {
        try {
            await navigator.clipboard.writeText(code);
            btn.textContent = '¡Copiado!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = 'Copiar';
                btn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            btn.textContent = 'Error';
            setTimeout(() => btn.textContent = 'Copiar', 2000);
        }
    },

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    renderDataModule(moduleId) {
        let idx = null;
        let actualModuleId = moduleId;
        if (moduleId.includes(':')) {
            const parts = moduleId.split(':');
            actualModuleId = parts[0];
            idx = parseInt(parts[1], 10);
        }

        const content = (window.MODULES_CONTENT && window.MODULES_CONTENT[actualModuleId]) || 
                        (window.MODULES_CONTENT_FASE3 && window.MODULES_CONTENT_FASE3[actualModuleId]);
        if (!content || !content.codeBlocks) return;

        const containers = document.querySelectorAll(`[data-code-module="${moduleId}"]`);
        if (!containers.length) return;

        containers.forEach(container => {
            container.innerHTML = '';
            const blocks = idx !== null && !isNaN(idx)
                ? [content.codeBlocks[idx]]
                : content.codeBlocks;
            blocks.forEach(block => {
                if (block) container.appendChild(this.createCodeBlock(block));
            });
        });
    },

    renderAll() {
        if (window.MODULES_CONTENT) {
            Object.keys(window.MODULES_CONTENT).forEach(moduleId => {
                this.renderModule(moduleId);
            });
        }

        document.querySelectorAll('[data-code-module]').forEach(el => {
            const moduleId = el.getAttribute('data-code-module');
            if (moduleId) {
                this.renderDataModule(moduleId);
            }
        });

        if (window.Prism) {
            Prism.highlightAll();
        }
    }
};

window.CodeRenderer = CodeRenderer;
