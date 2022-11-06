""" family model  """
from db import db
from datetime import datetime

class Family(db.Model):
    """family model class"""
    __tablename__  = 'family'
    id = db.Column(db.Integer, primary_key= True)
    family_name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=True)
    articles= db.relationship('article', backref='family')