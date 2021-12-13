import logging

from server import models
from server import mongo

from server.utils import catch_exceptions
from fastapi import APIRouter

router = APIRouter(prefix='/api_private')
logger = logging.getLogger(__name__)


@router.post('/data/')
@catch_exceptions
async def create_data(body: models.Data) -> str:
    return await mongo.do_insert(body)
