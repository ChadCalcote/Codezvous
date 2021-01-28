from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    image_url = db.Column(db.String(1000), nullable=False)
    zip_code = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # User has many RSVPs
    rsvps = db.relationship('RSVP', back_populates='user')
    # User has many comments
    comments = db.relationship('Comment', back_populates='user')
    # User has one lead_Groups
    lead_group = db.relationship('Group', back_populates='leader')
    # User has many Groups
    groups = db.relationship(
        'Group', secondary='users_groups', back_populates='members')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "zip_code": self.zip_code,
            "image_url": self.image_url
        }
