""" Article model  """
from db import db
from datetime import datetime

class Article(db.Model):
    """Article model class"""
    __tablename__  = 'article'
    sku = db.Column(db.Integer, primary_key= True)
    article_name = db.Column(db.String(15), nullable=False)
    brand = db.Column(db.String(15), nullable=False)
    model = db.Column(db.String(20), nullable=False)
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'),nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('class.id'),nullable=False)
    family_id = db.Column(db.Integer, db.ForeignKey('family.id'),nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    deleted_ad = db.Column(db.DateTime, nullable=True)
    departments = db.relationship('department', backref='article')
    classs = db.relationship('class', backref='article')
    familys = db.relationship('family', backref='article')
    
