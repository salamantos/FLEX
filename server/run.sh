#!/usr/bin/env bash

gunicorn -k uvicorn.workers.UvicornWorker server.main:app --bind 0.0.0.0:8001 --workers 2 --threads 4
