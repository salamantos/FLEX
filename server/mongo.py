import dataclasses
import logging
from typing import List
from typing import Optional

import dacite

import motor.motor_asyncio

from server import models
from server import config

logger = logging.getLogger(__name__)


def get_collection():
    client = motor.motor_asyncio.AsyncIOMotorClient(config.config.MONGO_URI)
    db = client.star_data
    return db.light


async def insert_data(document: models.Data) -> str:
    collection = get_collection()
    new_document = dataclasses.asdict(document)

    old_document = await collection.find_one({'name': document.name})
    if old_document:
        old_id = old_document['_id']
        await collection.replace_one({'_id': old_id}, new_document)
        return str(old_id)
    else:
        result = await get_collection().insert_one(new_document)
        return str(result.inserted_id)


async def get_data(name: str) -> Optional[models.Data]:
    data = await get_collection().find_one({'name': name})
    if data is None:
        return None
    return dacite.from_dict(models.Data, data)


async def get_all_names() -> List[str]:
    return await get_collection().distinct('name')
