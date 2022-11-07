""" Article model  """
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy() 

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
    family_id = db.Column(db.Integer, db.ForeignKey('family.id'),nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    discontinued = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    deleted_at = db.Column(db.DateTime, nullable=True)

    def get_all(self, params=None):
        """get all articles that are not deleted"""
        return self.query.filter_by(**params).all()

    def get_one_by(self, params):
        """get the first resource by given params"""
        return self.query.filter_by(**params).first()
    
    def create(self):
        """create a new supplier in DB"""
        self.discontinued = 0
        self.created_at = datetime.now().strftime("%Y-%m-%d")
        self.created_ad = "1900-01-01"
        db.session.add(self)
        db.session.commit()
        
    def update(self, cat_id, params):
        """Update the article data in DB"""
        article = self.get_one_by({"sku": cat_id, "deleted_ad": None})
        if article:
            for param, value in params.items():
                setattr(article, param, value)
            db.session.commit()
            return self.get_one_by({"id": cat_id})
        return None

    def destroy(self, cat_id):
        """Destroy an article in  DB"""
        article = self.get_one_by({"sku": cat_id})
        if article:
            db.session.delete(article)
            db.session.commit()
            return True
        return False


    
