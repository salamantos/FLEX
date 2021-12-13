import dataclasses
import logging
import dacite

import motor.motor_asyncio

from server import models
from server import config

logger = logging.getLogger(__name__)


def get_collection():
    client = motor.motor_asyncio.AsyncIOMotorClient(config.config.MONGO_URI)
    db = client.star_data
    return db.light


async def do_insert(document: models.Data):
    result = await get_collection().insert_one(dataclasses.asdict(document))
    return str(result.inserted_id)


async def get_data(name: str):
    data = await get_collection().find_one({'name': name})
    if data is None:
        return None
    return dacite.from_dict(models.Data, data)
