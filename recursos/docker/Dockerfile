FROM python:3.11-slim

LABEL maintainer="SENA ADSO <adso@sena.edu.co>"
LABEL description="Guia React - Aplicacion web estatica"
LABEL version="1.0"

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY . .

EXPOSE 8030

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8030')" || exit 1

CMD ["python", "-m", "http.server", "8030", "--bind", "0.0.0.0"]
