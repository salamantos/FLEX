from typing import List, Union

from fastapi import APIRouter, HTTPException

from server import models
from server import mongo
from server.utils import catch_exceptions

router = APIRouter(prefix='/api')


@router.get('/data/{type}/{star_name}/')
@catch_exceptions
async def get_data(
        star_name: str, type: str,
) -> Union[models.Data, models.DataVALC]:
    data = await mongo.get_data(star_name, type)

    if data is None:
        raise HTTPException(detail='Star data not found', status_code=404)

    return data


@router.get('/names/')
@catch_exceptions
async def get_all_names() -> List[str]:
    return await mongo.get_all_names('FULU')


@router.get('/names-valc/')
@catch_exceptions
async def get_all_names() -> List[str]:
    return await mongo.get_all_names('VALC')
