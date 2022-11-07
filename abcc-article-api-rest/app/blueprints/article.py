"""Articule module"""
from hashlib import new
import json
from flask import Blueprint, request
from datetime import datetime
from models.article_model import Article
from schemas.article_schema import ArticleSchema
from response.generic_response import Responses

article_bp = Blueprint('article', __name__,url_prefix="/articles")

@article_bp.get("")
def index():
    """Get all article that are not deleted"""
    params = request.args
    article_list = Article().get_all(params)
    articles = ArticleSchema(many=True).dump(article_list)
    return Responses.index_response(articles)
@article_bp.get("/<article_id>")
def show(article_id):
    """get an article by the given id"""
    article = Article().get_one_by({"sku": article_id})
    article = ArticleSchema(many=False).dump(article)
    if article:
        return Responses.show_response(article)
    return Responses.not_found_response(article)
@article_bp.post("")
def create():
     """create a new article"""       
     params = json.loads(request.data)
     article = Article(**params)
     article.create()
     new_supp = Article.get_one_by(params)
     return Responses.create_response(ArticleSchema(many=False).dump(new_supp))
@article_bp.put("/<article_id>")
def update(article_id):
    """Update the article according to the given id"""
    body = json.loads(request.data)
    updated_emp = Article().update(article_id, body)
    if updated_emp:
        article = ArticleSchema(many=False).dump(updated_emp)
        return Responses.update_response(article)
    return Responses.not_found_response({"id": article_id})

@article_bp.delete("/<article_id>")
def logic_delete(article_id):
    """Make a logical delete of an article"""
    deleted_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    article = Article().update(article_id, {"deleted_at": deleted_at})
    if article:
        article = ArticleSchema(many=False).dump(article)
        return Responses.logical_delete(article)
    return Responses.not_found_response({"id": article_id})

@article_bp.delete("/<article_id>/destroy")
def destroy(article_id):
    """Make a permanent delete of an article"""
    response = Article().destroy(article_id)
    if response:
        return Responses.destroy_resource()
    return Responses.not_found_response({"id": article_id})