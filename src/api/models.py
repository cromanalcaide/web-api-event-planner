from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    phone = db.Column(db.Integer, unique=False)
    city = db.Column(db.String(120), nullable=False)
    country = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User: {self.id}>'  
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'city': self.city,
            'country': self.country
    }


class Events(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    date = db.Column(db.String(120), nullable=False)
    time = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(360), nullable=False)
    location = db.Column(db.String(240), nullable=False)
    image = db.Column(db.String(360), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)


    
    def __repr__(self):
        return f'<Events {self.id}>'  

    def serialize(self):
        return {
        "id": self.id,
        "title": self.title,
        "date": self.date,
        "time": self.time,
        "description": self.description,
        "location": self.location,
        "image": self.image,
        "user_id": self.user_id
    }

class Contacts(db.Model):
    __tablename__ = 'contacts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)

    def __repr__(self):
        return f'<Contacts {self.id}>'  

    def serialize(self):
        return {
        "id": self.id,
        "name": self.name,
        "email": self.email,
        "user_id": self.user_id,
    } 


class Event_Guests(db.Model):
    __tablename__ = 'event_guests'
    id = db.Column(db.Integer, primary_key=True)
    contact_id = db.Column(db.Integer, db.ForeignKey('contacts.id'))
    contact = db.relationship(Contacts)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    event = db.relationship(Events)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  
    user = db.relationship(User)

    def __repr__(self):
        return f'<Event_Guests {self.id}>'  

    def serialize(self):
        return {
        "id": self.id,
        "contact_id": self.contact_id,
        "event_id": self.event_id,
        "user_id": self.user_id,
    }