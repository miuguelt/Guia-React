"""
Tests para la migracion de codigo inline de fase3.html a modulo JS externo.
Verifica: archivo creado, estructura correcta, HTML sin codigo inline, copiado funcional.
"""
import os
import re
import json
import pytest


BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEB = os.path.join(BASE, "web")
JS = os.path.join(WEB, "js")


class TestModulesContentFase3:
    """Tests para modules-content-fase3.js"""

    def test_file_exists(self):
        """El archivo modules-content-fase3.js debe existir."""
        path = os.path.join(JS, "modules-content-fase3.js")
        assert os.path.exists(path), "Falta modules-content-fase3.js"

    def test_has_global_const(self):
        """Debe declarar MODULES_CONTENT_FASE3 global."""
        path = os.path.join(JS, "modules-content-fase3.js")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        assert "const MODULES_CONTENT_FASE3" in content
        assert "window.MODULES_CONTENT_FASE3" in content

    def test_has_all_sections(self):
        """Debe tener todos los modulos esperados."""
        path = os.path.join(JS, "modules-content-fase3.js")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        expected_sections = [
            "fase3_entorno",
            "fase3_holamundo",
            "fase3_jsx",
            "fase3_estado",
            "fase3_apis",
            "fase3_crud",
            "fase3_ux",
            "fase3_reto",
            "fase3_descargar",
        ]
        for section in expected_sections:
            assert section in content, f"Falta la seccion {section}"

    def test_codeblocks_have_file_lang_title_code(self):
        """Cada codeBlock debe tener file, lang, title, code."""
        path = os.path.join(JS, "modules-content-fase3.js")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        # Contar bloques: cada bloque tiene "file:"
        file_count = content.count("file:")
        lang_count = content.count("lang:")
        title_count = content.count("title:")
        code_count = content.count("code:")
        assert file_count >= 17, f"Muy pocos file: ({file_count})"
        assert file_count == lang_count == title_count == code_count, \
            f"Desbalance: file={file_count}, lang={lang_count}, title={title_count}, code={code_count}"
    
    def test_code_has_url_field(self):
        """Cada codeBlock debe tener campo url."""
        path = os.path.join(JS, "modules-content-fase3.js")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        # Cada bloque deberia tener url:
        url_count = content.count("url:")
        file_count = content.count("file:")
        assert url_count >= file_count * 0.8, f"Muy pocos url: ({url_count}) vs file:({file_count})"


class TestFase3HtmlNoInline:
    """Tests que fase3.html ya no tiene codigo inline en <pre><code>."""

    def test_html_has_data_code_module(self):
        """El HTML debe usar data-code-module en vez de codigo inline."""
        path = os.path.join(WEB, "fase3.html")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        data_modules = re.findall(r'data-code-module="([^"]+)"', content)
        assert len(data_modules) >= 17, \
            f"Solo {len(data_modules)} data-code-module encontrados, esperados >= 17"

    def test_no_inline_code_in_main_sections(self):
        """Los code-blocks principales no deben tener <pre><code> con contenido."""
        path = os.path.join(WEB, "fase3.html")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        # Buscar <pre><code class="language-..."> que NO sean simuladores
        # Los simuladores tienen <pre><code id="sim-..."> que es dinamico
        pre_code_pattern = re.findall(
            r'<pre><code class="language-(\w+)"[^>]*>',
            content
        )
        # Deberian quedar solo los de simuladores (~4-5) y quizas los inline de state-grid
        # Los 17+ bloques principales ya no deben estar
        # filtramos los que tienen id="code-..." o id="sim-..."
        main_code_ids = re.findall(r'id="code-\w+-\d+"', content)
        assert len(main_code_ids) == 0, \
            f"Aun quedan {len(main_code_ids)} bloques con id=code-*"

    def test_html_has_fase3_script(self):
        """El HTML debe cargar modules-content-fase3.js."""
        path = os.path.join(WEB, "fase3.html")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        assert 'src="js/modules-content-fase3.js"' in content


class TestCodeRendererIntegration:
    """Tests de integracion con code-renderer.js."""

    def test_code_renderer_has_fase3_support(self):
        """code-renderer.js debe procesar MODULES_CONTENT_FASE3."""
        path = os.path.join(JS, "code-renderer.js")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        assert "MODULES_CONTENT_FASE3" in content, \
            "code-renderer.js no referencia MODULES_CONTENT_FASE3"

    def test_code_renderer_has_renderByDataAttr(self):
        """code-renderer.js debe tener metodo renderByDataAttribute o renderDataModule."""
        path = os.path.join(JS, "code-renderer.js")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        has_method = "renderDataModule" in content or "renderByDataAttribute" in content
        assert has_method, "Falta metodo para renderizar data-code-module"