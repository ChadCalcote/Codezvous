from .db import db
from .user import User


class Group(db.Model):

    __tablename__= 'groups'

    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(100), nullable=False, unique=True)   # Discuss with Dan and Chris about length of strings
    description = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    leader_id = db.Column(db.Integer, nullable=False, db.ForeignKey('users.id'))  # May cause errors, Do we need to import users table here?