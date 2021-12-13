from fastapi import FastAPI

from server.routes.public import router as public
from server.routes.private import router as private

app = FastAPI(docs_url='/docs', openapi_url='/docs/openapi.json')
# app = FastAPI()

app.include_router(public)
app.include_router(private)
