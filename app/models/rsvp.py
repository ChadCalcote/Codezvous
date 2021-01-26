from .db import db


class RSVP(db.Model):
    __tablename__ = 'rsvps'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(
        'events.id'), nullable=False)

    # RSVP has a single event
    event = db.relationship('Event', back_populates='rsvps')
    # RSVP has a single User
    user = db.relationship('User', back_populates='rsvps')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id
        }
