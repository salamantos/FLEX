from pydantic import BaseSettings


class Config(BaseSettings):
    MONGO_URI: str


config = Config()
