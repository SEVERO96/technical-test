""" Schema for ARTICLE"""
from ma import ma

class ArticleSchema(ma.Schema):
  """ Article Schema class """
  class Meta:
    """ Meta class for Article Schema """
    fields = (
      "sku",
      "article_name",
      "brand",
      "model",
      "department_id",
      "class_id",
      "family_id",
      "stock",
      "amount",
      "discontinued",
      "created_at",
      "deleted_at"
    )
