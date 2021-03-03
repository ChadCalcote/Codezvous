from .db import db
from .user import User


class Group(db.Model):

    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    # Discuss with Dan and Chris about length of strings
    group_name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    image_url = db.Column(
        db.String, default='https://picsum.photos/600/337')
    # May cause errors, Do we need to import users table here?
    leader_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Group has many Events
    events = db.relationship('Event', back_populates='group')
    # Group has a Single User (leader_id)
    leader = db.relationship('User', back_populates='lead_group')
    # Group has many Users_Groups
    members = db.relationship(
        'User', secondary='users_groups', back_populates='groups')

    def to_dict(self):
        return {
            'id': self.id,
            'group_name': self.group_name,
            'description': self.description,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'is_active': self.is_active,
            'image_url': self.image_url,
            'leader_id': self.leader_id
        }
