from .db import db


class Event(db.Model):

    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(100), nullable=False, unique=True)   
    description = db.Column(db.Text, nullable=False)
    address = db.Column(db.String(100))
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    virtual = db.Column(db.Boolean, default=False)
    type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(30), default='pending')
    group_id = db.Column(db.Integer, nullable=False, db.ForeignKey('groups.id'))
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
