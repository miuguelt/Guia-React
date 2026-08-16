# ==============================================================================
# Dockerfile: Servicio de Guía Web Estática (Nginx)
# Despliegue en Coolify / Docker
# ==============================================================================

FROM nginx:1.25-alpine

LABEL maintainer="SENA ADSO <desarrollo@sena.edu.co>"
LABEL description="Servidor Nginx ultraligero para la Guía Web Interactiva"

# Limpiar directorio web predeterminado
RUN rm -rf /usr/share/nginx/html/*

# Copiar archivos estáticos de la guía web (carpeta web/)
COPY web/ /usr/share/nginx/html/

# Configurar permisos para lectura global
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
