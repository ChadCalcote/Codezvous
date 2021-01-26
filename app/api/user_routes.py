from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Group, Event, Users_Group, RSVP

user_routes = Blueprint('users', __name__)

# Retrieve all users
@user_routes.route('/')
# @login_required
def users():
    users = User.query.all() # returns a list of users
    return {"users": [user.to_dict() for user in users]} # wrapped it in obj ==> JSON
    # return jsonify(([user.to_dict() for user in users]))
# Retrieve single user
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict() # a single object

# Retrieve user groups
@user_routes.route('/<int:id>/groups')
# @login_required
def user_groups(id):
    # user_groups = Users_Group.query.filter(Users_Group.user_id == id).all()
    groups = Group.query.filter(Group.leader_id == id).all()
    return jsonify([group.to_dict() for group in groups])

# Retrieve user events
@user_routes.route('/<int:id>/events')
@login_required
def user_events(id):
    user_events = RSVP.query.filter(RSVP.user_id == id).all()
    return user_events.to_dict()
