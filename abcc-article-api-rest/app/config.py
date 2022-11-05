""" Config Module to environment variables"""
import os

class Config:
    def __init__(self):
        self.__user = os.environ.get("MYSQL_USER")
        self.__pass = os.environ.get("MYSQL_PASSWORD")
        self.__host = os.environ.get("MYSQL_HOST")
        self.__port = os.environ.get("MYSQL_PORT")
        self.__db = os.environ.get("MYSQL_DATABASE")
        self.SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{self.__user}:{self.__pass}@{self.__host}:{self.__port}/{self.__db}"
        self.SQLALCHEMY_TRACK_MODIFICATIONS = False
