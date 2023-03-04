from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(220), nullable=False)
    phone = db.Column(db.Integer, unique=False)
    city = db.Column(db.String(120), nullable=False)
    country = db.Column(db.String(120), nullable=False)
    avatar_url = db.Column(db.String(300), nullable=True, default="https://res.cloudinary.com/dkcoownwg/image/upload/v1677503257/avatar_knpmj6.png" ) 
    accept_news = db.Column(db.Boolean, nullable=True)
    is_active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'<User: {self.id}>'  
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'city': self.city,
            'country': self.country,
            'avatar_url': self.avatar_url,
            'accept_news': self.accept_news,
            'is_active' : self.is_active
           
    }


class Events(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    date = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(360), nullable=False)
    location = db.Column(db.String(240), nullable=False)
    image = db.Column(db.String(360), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)
    is_active = db.Column(db.Boolean, default=True)
    
    def __repr__(self):
        return f'<Events {self.id}>'  

    def serialize(self):
        return {
        "id": self.id,
        "title": self.title,
        "date": self.date,
        "description": self.description,
        "location": self.location,
        "image": self.image,
        "user_id": self.user_id,
        "is_active": self.is_active
    }


class Contacts(db.Model):
    __tablename__ = 'contacts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User)
    avatar_url = db.Column(db.String(300), nullable=True, default="https://res.cloudinary.com/dkcoownwg/image/upload/v1677503257/avatar_knpmj6.png" ) 
    is_active = db.Column(db.Boolean, default=True)
    

    def __repr__(self):
        return f'<Contacts {self.id}>'  

    def serialize(self):
        return {
        "id": self.id,
        "name": self.name,
        "email": self.email,
        "user_id": self.user_id,
        "avatar_url": self.avatar_url,
        "is_active": self.is_active
    } 


class Event_Guests(db.Model):
    __tablename__ = 'event_guests'
    id = db.Column(db.Integer, primary_key=True)
    contact_id = db.Column(db.Integer, db.ForeignKey('contacts.id'))
    contact = db.relationship(Contacts)
    email = db.Column(db.String(120))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    event = db.relationship(Events)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  
    user = db.relationship(User)
    is_active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'<Event_Guests {self.id}>'  

    def serialize(self):
        return {
        "id": self.id,
        "contact_id": self.contact_id,
        "email": self.email,
        "event_id": self.event_id,
        "user_id": self.user_id,
        "is_active": self.is_active
        }


class Comments(db.Model):
    __tablename__='comments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship(User)
    event_id =  db.Column(db.Integer, db.ForeignKey('events.id'))
    event = db.relationship(Events)
    content = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    

    def __repr__(self):
        return f'<Comments {self.id}>'  

    def serialize(self):
        return {
        "id": self.id,
        "user_id": self.user_id,
        "event_id": self.event_id,
        "content": self.content,
        "is_active": self.is_active
        }

