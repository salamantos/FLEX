import dataclasses
import logging
from typing import List, Union
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


async def insert_data(document: Union[models.Data, models.DataVALC]) -> str:
    collection = get_collection()
    new_document = dataclasses.asdict(document)

    old_document = await collection.find_one(
        {'name': document.name, 'type': document.type},
    )
    if old_document:
        old_id = old_document['_id']
        await collection.replace_one({'_id': old_id}, new_document)
        return str(old_id)
    else:
        result = await get_collection().insert_one(new_document)
        return str(result.inserted_id)


async def get_data(
        name: str, type: str,
) -> Optional[Union[models.Data, models.DataVALC]]:
    data = await get_collection().find_one({'name': name, 'type': type})
    if data is None:
        return None

    if data.get('type') == 'FULU':
        return dacite.from_dict(models.Data, data)
    elif data['type'] == 'VALC':
        return dacite.from_dict(models.DataVALC, data)
    else:
        return None


async def get_all_names(type: str = 'FULU') -> List[str]:
    return await get_collection().find({'type': type}).distinct('name')


async def search_names(type: str, query: str) -> List[str]:
    collection = get_collection()
    # Case-insensitive regex search for names containing the query
    cursor = collection.find({
        'type': type,
        'name': {'$regex': query, '$options': 'i'}
    })
    names = await cursor.distinct('name')
    return sorted(names)
