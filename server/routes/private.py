import logging
from typing import List

from server import models
from server import mongo

from server.utils import catch_exceptions
from fastapi import APIRouter

router = APIRouter(prefix='/api_private')
logger = logging.getLogger(__name__)


@router.post('/data/')
@catch_exceptions
async def create_data(body: List[models.Data]) -> List[str]:
    return [await mongo.insert_data(data) for data in body]
