""" class model  """
from db import db
from datetime import datetime

class Class(db.Model):
    """class model class"""
    __tablename__  = 'class'
    id = db.Column(db.Integer, primary_key= True)
    class_name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=True)
    articles= db.relationship('article', backref='class')