FROM python:3.8-slim
RUN apt-get update && apt-get install -y gcc build-essential curl cron

# Set working directory
WORKDIR /usr/app

# Service specific requirements
COPY server/requirements.txt ./requirements.txt
RUN pip install -r ./requirements.txt

# add app
COPY server/ server/

USER nobody

ENTRYPOINT ["/bin/bash", "-c", "gunicorn -k uvicorn.workers.UvicornWorker server.main:app --bind 0.0.0.0:8001 --workers 2 --threads 4 --log-level info "]
