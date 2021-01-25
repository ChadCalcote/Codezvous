from .db import db


class Users_Group(db.Model):
    __tablename__ = 'users_groups'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)


    #Users_Groups has a single User
    #Users_Groups has a single Group
    #Don't need to write these out most likely
