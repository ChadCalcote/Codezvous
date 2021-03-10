from .db import db


class Event(db.Model):

    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    address = db.Column(db.String(100))
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    virtual = db.Column(db.Boolean, default=False)
    type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(30), default='pending')
    image_url = db.Column(
        db.String, default='https://picsum.photos/600/337')
    group_id = db.Column(db.Integer, db.ForeignKey(
        'groups.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

    # Event has a single Group
    group = db.relationship('Group', back_populates='events')
    # Event has many RSVPs
    rsvps = db.relationship('RSVP', back_populates='event')
    # Event has many comments
    comments = db.relationship('Comment', back_populates='event')

    def to_dict(self):
        return {
            'id': self.id,
            'event_name': self.event_name,
            'description': self.description,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'virtual': self.virtual,
            'type': self.type,
            'status': self.status,
            'image_url': self.image_url,
            'group_id': self.group_id,
            'start_time': self.start_time,
            'end_time': self.end_time
        }
