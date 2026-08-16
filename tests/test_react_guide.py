"""
Tests basicos para la guia React.
Verifica que los archivos web existen y tienen contenido valido.
"""
import os
import json
import pytest


class TestWebFiles:
    """Tests para archivos web."""
    
    def test_index_html_exists(self):
        """El archivo index.html debe existir."""
        assert os.path.exists("web/index.html")
    
    def test_index_html_has_content(self):
        """El index.html debe tener contenido."""
        with open("web/index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert len(content) > 1000
        assert "<!DOCTYPE html>" in content
        assert "React" in content
    
    def test_styles_css_exists(self):
        """El archivo styles.css debe existir."""
        assert os.path.exists("web/css/styles.css")
    
    def test_main_js_exists(self):
        """El archivo main.js debe existir."""
        assert os.path.exists("web/js/main.js")
    
    def test_modules_content_js_exists(self):
        """El archivo modules-content.js debe existir."""
        assert os.path.exists("web/js/modules-content.js")
    
    def test_simulators_js_exists(self):
        """El archivo simulators.js debe existir."""
        assert os.path.exists("web/js/simulators.js")
    
    def test_gamification_js_exists(self):
        """El archivo gamification.js debe existir."""
        assert os.path.exists("web/js/gamification.js")


class TestCodeExamples:
    """Tests para ejemplos de codigo."""
    
    def test_saludo_component_exists(self):
        """El componente Saludo.jsx debe existir."""
        assert os.path.exists("recursos/codigo-ejemplo/src/components/Saludo.jsx")
    
    def test_contador_component_exists(self):
        """El componente Contador.jsx debe existir."""
        assert os.path.exists("recursos/codigo-ejemplo/src/components/Contador.jsx")
    
    def test_reloj_component_exists(self):
        """El componente Reloj.jsx debe existir."""
        assert os.path.exists("recursos/codigo-ejemplo/src/components/Reloj.jsx")
    
    def test_usefetch_hook_exists(self):
        """El hook useFetch.js debe existir."""
        assert os.path.exists("recursos/codigo-ejemplo/src/hooks/useFetch.js")
    
    def test_saludo_has_props(self):
        """El componente Saludo debe usar props."""
        with open("recursos/codigo-ejemplo/src/components/Saludo.jsx", "r", encoding="utf-8") as f:
            content = f.read()
        assert "nombre" in content
        assert "function Saludo" in content
    
    def test_contador_has_usestate(self):
        """El componente Contador debe usar useState."""
        with open("recursos/codigo-ejemplo/src/components/Contador.jsx", "r", encoding="utf-8") as f:
            content = f.read()
        assert "useState" in content
        assert "setContador" in content
    
    def test_reloj_has_useeffect(self):
        """El componente Reloj debe usar useEffect."""
        with open("recursos/codigo-ejemplo/src/components/Reloj.jsx", "r", encoding="utf-8") as f:
            content = f.read()
        assert "useEffect" in content
        assert "setInterval" in content
    
    def test_usefetch_has_fetch(self):
        """El hook useFetch debe usar fetch."""
        with open("recursos/codigo-ejemplo/src/hooks/useFetch.js", "r", encoding="utf-8") as f:
            content = f.read()
        assert "fetch" in content
        assert "useState" in content
        assert "useEffect" in content


class TestDocumentation:
    """Tests para documentacion."""
    
    def test_readme_exists(self):
        """El archivo README.md debe existir."""
        assert os.path.exists("README.md")
    
    def test_readme_has_min_lines(self):
        """El README debe tener al menos 300 lineas."""
        with open("README.md", "r", encoding="utf-8") as f:
            lines = len(f.readlines())
        assert lines >= 300, f"README tiene {lines} lineas, minimo 300"
    
    def test_readme_has_modules(self):
        """El README debe listar los modulos."""
        with open("README.md", "r", encoding="utf-8") as f:
            content = f.read()
        assert "Modulos" in content
        assert "Simuladores" in content
    
    def test_cortex_map_exists(self):
        """El archivo CORTEX_MAP.md debe existir."""
        assert os.path.exists("CORTEX_MAP.md")


class TestDevBrain:
    """Tests para integracion DevBrain."""
    
    def test_devbrain_dir_exists(self):
        """El directorio .devbrain debe existir."""
        assert os.path.exists(".devbrain")
    
    def test_session_start_exists(self):
        """El script session-start.ps1 debe existir."""
        assert os.path.exists(".devbrain/session-start.ps1")
    
    def test_session_end_exists(self):
        """El script session-end.ps1 debe existir."""
        assert os.path.exists(".devbrain/session-end.ps1")
    
    def test_checkpoint_exists(self):
        """El script checkpoint.ps1 debe existir."""
        assert os.path.exists(".devbrain/checkpoint.ps1")
    
    def test_integrity_check_exists(self):
        """El script integrity-check.ps1 debe existir."""
        assert os.path.exists(".devbrain/integrity-check.ps1")
    
    def test_lessons_learned_exists(self):
        """El archivo lessons_learned.md debe existir."""
        assert os.path.exists(".devbrain/knowledge/lessons_learned.md")
    
    def test_antigravityrules_exists(self):
        """El archivo .antigravityrules debe existir."""
        assert os.path.exists(".antigravityrules")


class TestSimulators:
    """Tests para simuladores."""
    
    def test_simulators_count(self):
        """Debe haber al menos 9 simuladores."""
        with open("web/js/simulators.js", "r", encoding="utf-8") as f:
            content = f.read()
        
        simulator_methods = [
            "renderJSXSimulator",
            "renderPropsSimulator",
            "renderSimulator",
            "renderHooksSimulator",
            "renderQuizSimulator",
            "renderDebugSimulator",
            "renderRouterArchitect",
            "renderRequestLifecycle",
            "renderInteractiveCRUD"
        ]
        
        found = sum(1 for method in simulator_methods if method in content)
        assert found >= 9, f"Solo se encontraron {found} simuladores, minimo 9"
    
    def test_simulators_have_xp(self):
        """Los simuladores deben otorgar XP."""
        with open("web/js/simulators.js", "r", encoding="utf-8") as f:
            content = f.read()
        assert "addXP" in content


class TestGamification:
    """Tests para gamificacion."""
    
    def test_gamification_has_levels(self):
        """La gamificacion debe tener niveles."""
        with open("web/js/gamification.js", "r", encoding="utf-8") as f:
            content = f.read()
        assert "levels" in content
        assert "Novato" in content
    
    def test_gamification_has_xp(self):
        """La gamificacion debe tener sistema XP."""
        with open("web/js/gamification.js", "r", encoding="utf-8") as f:
            content = f.read()
        assert "addXP" in content
        assert "xp" in content


class TestServer:
    """Tests para el servidor."""
    
    def test_start_windows_exists(self):
        """El script start-windows.ps1 debe existir."""
        assert os.path.exists("start-windows.ps1")
    
    def test_start_windows_has_port(self):
        """El script debe usar el puerto 8030."""
        with open("start-windows.ps1", "r", encoding="utf-8") as f:
            content = f.read()
        assert "8030" in content
