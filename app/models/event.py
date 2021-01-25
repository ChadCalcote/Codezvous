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
    image_url = db.Column(db.String, default='https://www.cambridgebrewingcompany.com/wp-content/uploads/generic-banner.jpg')
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)


    #Event has a single Group
    group = db.relationship('Group', back_populates='events')
    #Event has many RSVPs
    rsvps = db.relationship('RSVP', back_populates='event')
    #Event has many comments
    comments = db.relationship('Comment', back_populates='event')