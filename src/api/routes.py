"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import json

api = Blueprint('api', __name__)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def create_user():
    body = json.loads(request.data)
    user = User(email = body["email"], password= body["password"], name= body["name"], city= body["city"], country=body["country"], phone=body["phone"])
    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": " The new user has been created correctly "
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter(User.email == email, User.password == password).first()
    
    if not user :
        return jsonify({"msg": "Nombre de usuario o contraseña incorrectos"}), 401

    else:    
        access_token = create_access_token(identity=email)
        response_body = {"email": email,
                     "access_token": access_token}    
    return jsonify(response_body), 200


