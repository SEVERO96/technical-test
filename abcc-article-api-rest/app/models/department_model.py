""" department model  """
from db import db
from datetime import datetime

class Department(db.Model):
    """Department model class"""
    __tablename__  = 'department'
    id = db.Column(db.Integer, primary_key= True)
    department_name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=True)
    articles= db.relationship('article', backref='department')