FROM python:3.8-slim

# Set working directory
WORKDIR /usr/app

# Service specific requirements
COPY server/requirements.txt ./requirements.txt
RUN pip install -r ./requirements.txt

# add app
COPY server server

USER nobody

ENTRYPOINT ["/bin/bash", "-c", "gunicorn -k uvicorn.workers.UvicornWorker server.main:app --access-logfile - --bind 0.0.0.0:8001 --workers 2 --threads 4 --log-level info "]
