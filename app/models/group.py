from .db import db
from .user import User


class Group(db.Model):

    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(100), nullable=False, unique=True)   # Discuss with Dan and Chris about length of strings
    description = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String, default='https://i.dlpng.com/static/png/6914875_preview.png')
    leader_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # May cause errors, Do we need to import users table here?


    #Group has many Events
    events = db.relationship('Event', back_populates='group')
    #Group has a Single User (leader_id)
    leader = db.relationship('User', back_populates='lead_group')
    #Group has many Users_Groups
    members = db.relationship('User', secondary='users_groups', back_populates='groups')
