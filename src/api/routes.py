"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Events, Contacts, Event_Guests
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from api.encripted import compare_pass, encripted_pass
import json


api = Blueprint('api', __name__)

#USER

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    results = [user.serialize() for user in users]
    response_body = {'message': 'OK',
                     'total_records': len(results),
                     'results': results}
    return jsonify(response_body), 200


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    result = user.serialize()
    response_body = {'message': 'OK',
                     'result': result}
    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def create_user():
    body = json.loads(request.data)
    user = User(email = body["email"],
                password= encripted_pass(body["password"]),
                name= body["name"],
                city= body["city"], 
                country=body["country"], 
                phone=body["phone"],
                avatar_url=body["avatar_url"],
                accept_news=body["accept_news"]
                )
    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": " The new user has been created correctly "
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def user_login():
    body = request.get_json()
    email = request.json.get("email", None)
    # password = request.json.get("password", None)
    user = User.query.filter(User.email == body['email']).first()
    
    if user is None:
        return jsonify({"msg": "El usuario no existe"}), 404
    
    compare = compare_pass(body['password'], user.password )
    if compare == False :
        return jsonify({"msg": "Nombre de usuario o contraseña incorrectos"}), 401

    else:    
        access_token = create_access_token(identity=email)
        response_body = {"email": email,
                     "access_token": access_token}    
    return jsonify(response_body), 200


@api.route('/users/<int:user_id>', methods=['PUT'])
def modify_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)

    user.name = request.json.get('name', user.name)
    user.email = request.json.get('email', user.email)
    user.password = request.json.get('password', user.password)
    user.phone = request.json.get('phone', user.phone)
    user.city = request.json.get('city', user.city)
    user.country = request.json.get('country', user.country)
    user.avatar_url = request.json.get('avatar_url', user.avatar_url)
    user.accept_news = request.json.get('accept_news', user.accept_news)
    db.session.commit()

    response_body = {'name': user.name,
                     'phone': user.phone,
                     'email': user.email,
                     'password': user.password,
                     'city': user.city,
                     'country': user.country,
                     'avatar_url': user.country,
                     'accept_news' : user.accept_news}

    return jsonify(response_body), 200
    

@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    db.session.delete(user)
    db.session.commit()
    response_body = {
        "message": "User deleted correctly"}    
    return jsonify(response_body), 200

# EVENTS


@api.route('/events', methods=['GET'])
def get_all_events():
    events = Events.query.all()
    results = [event.serialize() for event in events]
    response_body = {'message': 'OK',
                     'total_records': len(results),
                     'results': results}
    return jsonify(response_body), 200


@api.route('/event/<event_id>', methods=['GET'])
def get_event_by_id(event_id):
    print(event_id)
    event = Events.query.get(event_id)
    print(event)
    return jsonify(event.serialize()), 200

@api.route('/event/register', methods=['POST'])
def create_event():
    body = request.get_json()
    new_event = Events(title=body["title"], date=body["date"], description=body["description"], location=body["location"], image=body["image"], lati=body["lati"], longi=body["longi"],user_id=body["user_id"] )
    print(new_event)
    db.session.add(new_event)
    db.session.commit()
    return jsonify(new_event.serialize()), 200


@api.route('/events/<int:event_id>', methods=['PUT'])
def modify_event(event_id):
    event = Events.query.get(event_id)
    if event is None:
        raise APIException('Event not found', status_code=404)

    event.title = request.json.get('title', event.title)
    event.date = request.json.get('date', event.date)
    event.description = request.json.get('description', event.description)
    event.location = request.json.get('location', event.location)
    event.image = request.json.get('image', event.image)
    event.lati = request.json.get('lati', event.lati)
    event.longi = request.json.get('longi', event.longi)
    event.user_id = request.json.get('user_id', event.user_id)
    db.session.commit()

    response_body = {'title': event.title,
                     'date': event.date,
                     'description': event.description,
                     'location': event.location,
                     'image': event.image,
                     'lati': event.lati,
                     'longi': event.longi,
                     'user_id': event.user_id
                     }

    return jsonify(response_body), 200


@api.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Events.query.get(event_id)
    if event is None:
        raise APIException('Event not found', status_code=404)
    db.session.delete(event)
    db.session.commit()
    response_body = {
        "message": "Event deleted correctly"}    
    return jsonify(response_body), 200


# CONTACTS


@api.route('/contacts', methods=['GET'])
def get_all_contacts():
    contacts = Contacts.query.all()
    results = [contact.serialize() for contact in contacts]
    response_body = {'message': 'OK',
                     'total_records': len(results),
                     'results': results}
    return jsonify(response_body), 200


@api.route('/contact/<contact_id>', methods=['GET'])
def get_contacts_by_id(contact_id):
    print(contact_id)
    contact = Contacts.query.get(contact_id)
    print(contact)
    return jsonify(contact.serialize()), 200


@api.route('/contact/register', methods=['POST'])
def create_contact():
    body = request.get_json()
    new_contact = Contacts(email=body["email"], name=body["name"], user_id=body["user_id"])
    print(body)
    print(new_contact)
    db.session.add(new_contact)
    db.session.commit()
    return jsonify(new_contact.serialize()), 200


@api.route('/contacts/<int:contact_id>', methods=['PUT'])
def modify_contact(contact_id):
    contact = Contacts.query.get(contact_id)
    if contact is None:
        raise APIException('Contact not found', status_code=404)

    contact.email = request.json.get('email', contact.email)
    contact.name = request.json.get('name', contact.name)
    contact.user_id = request.json.get('user_id', contact.user_id)
    db.session.commit()

    response_body = {'email': contact.email,
                     'name': contact.name,   
                     'user_id': contact.user_id}

    return jsonify(response_body), 200


@api.route('/contacts/<int:contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    contact = Contacts.query.get(contact_id)
    if contact is None:
        raise APIException('Contact not found', status_code=404)
    db.session.delete(contact)
    db.session.commit()
    response_body = {
        "message": "Contact deleted correctly"}    
    return jsonify(response_body), 200


# EVENTS_GUESTS


@api.route('/events_guests', methods=['GET'])
def get_all_events_guests():
    events_guests = Event_Guests.query.all()
    results = [events_guest.serialize() for events_guest in events_guests]
    response_body = {'message': 'OK',
                     'total_records': len(results),
                     'results': results}
    return jsonify(response_body), 200


@api.route('/events_guest/<events_guest_id>', methods=['GET'])
def get_events_guests_by_id(events_guest_id):
    events_guest = Event_Guests.query.get(events_guest_id)
    return jsonify(events_guest.serialize()), 200


@api.route('/events_guest/register', methods=['POST'])
def create_events_guests():
    body = request.get_json()
    new_events_guest = Event_Guests(email=body["email"], contact_id=body["contact_id"], event_id=body["event_id"], user_id=body["user_id"])
    db.session.add(new_events_guest)
    db.session.commit()
    return jsonify(new_events_guest.serialize()), 200


@api.route('/events_guests/<int:events_guest_id>', methods=['PUT'])
def modify_events_guests(events_guest_id):
    events_guests = Event_Guests.query.get(events_guest_id)
    if events_guests is None:
        raise APIException('Event_Guest not found', status_code=404)

    events_guests.contact_id = request.json.get('contact_id', events_guests.contact_id)
    events_guests.event_id = request.json.get('event_id', events_guests.event_id)
    events_guests.user_id = request.json.get('user_id', events_guests.user_id)
    events_guests.email = request.json.get('email', events_guests.email)
    db.session.commit()

    response_body = {'contact_id': events_guests.contact_id,
                     'event_id': events_guests.event_id,
                     'user_id': events_guests.user_id,
                     'email': events_guests.email}

    return jsonify(response_body), 200


@api.route('/events_guests/<int:events_guest_id>', methods=['DELETE'])
def delete_events_guests(events_guest_id):
    events_guest = Event_Guests.query.get(events_guest_id)
    if events_guest is None:
        raise APIException('Events_guest not found', status_code=404)
    db.session.delete(events_guest)
    db.session.commit()
    response_body = {
        "message": "Events_guest deleted correctly"}    
    return jsonify(response_body), 200

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == "__main__":
    app.run()