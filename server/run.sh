#!/usr/bin/env bash

gunicorn -k uvicorn.workers.UvicornWorker server.main:app --bind 0.0.0.0:8001 --access-logfile - --workers 2 --threads 4
