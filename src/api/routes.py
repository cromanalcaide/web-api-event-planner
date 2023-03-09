"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Events, Contacts, Event_Guests, Comments
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from api.encripted import compare_pass, encripted_pass
import json
import cloudinary
import cloudinary.uploader
import cloudinary.api


api = Blueprint('api', __name__)

#USER

@api.route('/users', methods=['GET'])
def get_users():
    active_users = User.query.filter_by(is_active=True).all()
    results = [user.serialize() for user in active_users]
    response_body = {'message': 'OK',
                     'total_records': len(results),
                     'results': results}
    return jsonify(response_body), 200   # Modificado y funciona, me trae solo los usuarios que estan activos 


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.filter_by(id=user_id, is_active=True).first()
    if user:
        result = user.serialize()
        response_body = {'message': 'OK',
                     'result': result}
        return jsonify(response_body), 200  
    else:
        return jsonify({'message': 'User not found or not active'}), 404     # Modificado y probado, trae correctamente el usuario solo si es is_active : true


@api.route('/register', methods=['POST'])
def create_user():
    body = json.loads(request.data)
    user = User(email = body["email"],
                password= encripted_pass(body["password"]),
                name= body["name"],
                city= body["city"], 
                country=body["country"], 
                phone=body["phone"],
                )
    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": " The new user has been created correctly "
    }

    return jsonify(response_body), 200             # Probado registra los usuarios sin errores 


@api.route("/login", methods=["POST"])
def user_login():
    body = request.get_json(force=True)
    email = request.json.get("email", None)
    print(body['password'])
    print(request.json.get("password", None))
    user = User.query.filter(User.email == body['email']).first()
    if user is None:
        return jsonify({"msg": "El usuario no existe"}), 404
    if not user.is_active:
        return jsonify({"msg": "El usuario no está activo"}), 401
    id = user.id
    compare = compare_pass(body['password'], user.password )
    if compare == False :
        return jsonify({"msg": "Nombre de usuario o contraseña incorrectos"}), 401
    else:    
        access_token = create_access_token(identity=email)
        response_body = { "id": id, 
                     "access_token": access_token}    
    return jsonify(response_body), 200                          # Modificado y comprobado me deja ingresar solo si el usuario esta activo 


@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    user.is_active = False
    db.session.commit()
    response_body = {
        "message": "User deactivated correctly"}          # Modificado y comprobado me deja desactivar el usuario  
    return jsonify(response_body), 200



@api.route('/users/<int:user_id>', methods=['PUT'])
def modify_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)

    user.name = request.json.get('name', user.name)
    user.email = request.json.get('email', user.email)
    new_password = request.json.get('password', None)
    if new_password is not None and new_password != user.password:
        user.password = encripted_pass(new_password)
    user.phone = request.json.get('phone', user.phone)
    user.city = request.json.get('city', user.city)
    user.country = request.json.get('country', user.country)
    user.avatar_url = request.json.get('avatar_url', user.avatar_url)
    db.session.commit()

    response_body = {'name': user.name,
                     'phone': user.phone,
                     'email': user.email,
                     'password': user.password,
                     'city': user.city,
                     'country': user.country}

    return jsonify(response_body), 200
    

# EVENTS


@api.route('/events', methods=['GET'])
def get_all_events():
    active_events = Events.query.filter_by(is_active=True).all()
    results = [event.serialize() for event in active_events]
    response_body = {'message': 'OK',
                     'total_records': len(results),
                     'results': results}
    return jsonify(response_body), 200    # Modificado y comprobado solo trae los eventos activos 
 

@api.route('/event/<event_id>', methods=['GET'])
def get_event_by_id(event_id):
    event = Events.query.filter_by(id=event_id, is_active=True).first()
    if event:
        result = event.serialize()
        response_body = {'message': 'OK',
                     'result': result}
        return jsonify(response_body), 200  
    else:
        return jsonify({'message': 'Event not found or not active'}), 404    # Modificado y comprobado solo trae los eventos activos por su id 


@api.route('/event/register', methods=['POST'])
def create_event():
    body = request.get_json()
    image = None
    if 'image' in request.files:
        image_file = request.files['image']
        if image_file.filename != '':
            upload_result = cloudinary.uploader.upload(image_file)
            image = Images(cloud_id=upload_result['public_id'], url=upload_result['url'])
            db.session.add(image)
            db.session.commit()

    new_event = Events(title=body["title"], date=body["date"], description=body["description"], location=body["location"],  image=body["image"], lati=body["lati"], longi=body["longi"], user_id=body["user_id"])
    if image is not None:
        new_event.image = image.url
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
                     'lati': event.lati,
                     'longi': event.longi,
                     'image': event.image,
                     'user_id': event.user_id
                     }

    return jsonify(response_body), 200


@api.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Events.query.get(event_id)
    if event is None:
        raise APIException('Event not found', status_code=404)
    event.is_active = False
    db.session.commit()
    response_body = {
        "message": "Event deactivated correctly"}    
    return jsonify(response_body), 200                     # Modificado y correcto, desactiva el evento por su id 


# CONTACTS


@api.route('/contacts', methods=['GET'])
def get_all_contacts():
    active_contacts = Contacts.query.filter_by(is_active=True).all()
    results = [contact.serialize() for contact in active_contacts]
    response_body = {'message': 'OK',
                     'total_records': len(results),
                     'results': results}
    return jsonify(response_body), 200            # Modificado y probado trae todos los contactos activos 


@api.route('/contacts/<user_id>', methods=['GET'])
def get_contacts_by_user_id(user_id):
    contacts = Contacts.query.filter(Contacts.user_id == int(user_id)).filter(Contacts.is_active == True).all()
    if contacts:
        results = [contact.serialize() for contact in contacts]
        response_body = {'message': 'OK',
                         'total_records': len(results),
                         'results': results}
        return jsonify(response_body), 200
    else:
        response_body = {'message': 'No active contacts found for that ID'}
        return jsonify(response_body), 404                          # Modificado y probado solo trae los contactos por id de usuario que esten activos 


@api.route('/contact/<contact_id>', methods=['GET'])
def get_contacts_by_id(contact_id):
    contact = Contacts.query.filter_by(id=contact_id, is_active=True).first()
    if contact:
        return jsonify(contact.serialize()), 200
    else:
        return jsonify({'message': 'Contact not found or not active'}), 404   # Modificado y probado, trae correctamente solo si el is_active es True


@api.route('/contact/register', methods=['POST'])
def create_contact():
    body = request.get_json()
    print(body)
    new_contact = Contacts(email=body["email"], name=body["name"], user_id=body["user_id"])
   
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
    contact.is_active = False
    db.session.commit()
    response_body = {
        "message": "Contact deactivated correctly"}    
    return jsonify(response_body), 200                   # Modificado y probado, desactiva correctamente el contacto  


# EVENTS_GUESTS


@api.route('/events_guests', methods=['GET'])
def get_all_events_guests():
    active_events_guests = Event_Guests.query.filter_by(is_active=True).all()
    results = [guests.serialize() for guests in active_events_guests]
    response_body = {'message': 'OK',
                     'total_records': len(results),
                     'results': results}
    return response_body, 200                   # Modificado y probado, trae todos los event_guest activos     


@api.route('/events_guest/<events_guest_id>', methods=['GET'])
def get_events_guests_by_id(events_guest_id):
    events_guest = Event_Guests.query.filter_by(id=events_guest_id, is_active=True).first()
    if events_guest:
        return jsonify(events_guest.serialize()), 200
    else:
        return jsonify({'message': 'Event guest not found or not active'}), 404   # Modificado y probado, trae correctamente solo si el is_active es True


@api.route('/events_guest/register', methods=['POST'])
def create_events_guests():
    body = request.get_json()
    new_events_guest = Event_Guests(contact_id=body["contact_id"], email=body["email"], event_id=body["event_id"], user_id=body["user_id"])
    db.session.add(new_events_guest)
    db.session.commit()
    return jsonify(new_events_guest.serialize()), 200


@api.route('/events_guests/<int:events_guest_id>', methods=['PUT'])
def modify_events_guests(events_guest_id):
    events_guests = Event_Guests.query.get(events_guest_id)
    if events_guests is None:
        raise APIException('Event_Guest not found', status_code=404)
    print(events_guests)
    events_guests.contact_id = request.json.get('contact_id', events_guests.contact_id)
    events_guests.event_id = request.json.get('event_id', events_guests.event_id)
    events_guests.user_id = request.json.get('user_id', events_guests.user_id)
    events_guests.email = request.json.get('email', events_guests.email)
    events_guests.is_active = request.json.get('is_active', events_guests.is_active)

    db.session.commit()

    response_body = {'contact_id': events_guests.contact_id,
                     'event_id': events_guests.event_id,
                     'user_id': events_guests.user_id,
                     'email': events_guests.email,
                     'is_active': events_guests.is_active}

    return jsonify(response_body), 200


@api.route('/events_guests/<int:events_guest_id>', methods=['DELETE'])
def delete_events_guests(events_guest_id):
    events_guest = Event_Guests.query.get(events_guest_id)
    if events_guest is None:
        raise APIException('Events_guest not found', status_code=404)
    events_guest.is_active = False 
    db.session.commit()
    response_body = {
        "message": "Events_guest deactivated correctly"}    
    return jsonify(response_body), 200                       # Modificado y correcto desactiva el event_guest correctamente


@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

#CLOUDINARY

@api.route('/users/<int:user_id>/avatar', methods=['GET', 'POST'])
def user_avatar(user_id):
    if request.method == 'GET':
        user = User.query.get(user_id)
        return user.avatar_url
    elif request.method == 'POST':
        user = User.query.get(user_id)
        file = request.files['file']
        if file is None:
            return {"error": "Ha ocurrido un error"}, 400
        upload_result = cloudinary.uploader.upload(file)
        user.avatar_url = upload_result['url']
        db.session.commit()
        return user.avatar_url, 200

#COMMENTS 

@api.route('/comments/<int:event_id>', methods=['GET'])
def getComments(event_id):
    comments = Comments.query.filter(Comments.event_id == int(event_id))
    return jsonify([{'id': comment.id, 'user_id': comment.user_id, 'content': comment.content} for comment in comments])
    
@api.route('/comment/<int:event_id>', methods=['POST']) 
def postComment(event_id):
    body = request.get_json()
    new_comment = Comments(user_id=body["user_id"], content=body["content"], event_id=body["event_id"] )
    db.session.add(new_comment)
    db.session.commit()
    return jsonify(new_comment.serialize()), 200

# RSVP

@api.route('/actualizar-rsvp', methods=['POST'])
def actualizar_rsvp():
    body = request.get_json()
    email = body["email"]
    rsvp_status = body["rsvp_status"]
    event_id = body["event_id"]
    print(email, rsvp_status, event_id)
    event_guest = Event_Guests.query.filter_by(event_id=event_id, email=email).first()
    print(event_guest)
    if event_guest:
       event_guest.rsvp_status = rsvp_status
       db.session.commit()
       return 'OK', 200
    else:
        return 'Error: invitado no encontrado en el evento', 400

if __name__ == "__main__":
    app.run()



