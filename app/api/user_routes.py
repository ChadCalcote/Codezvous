from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Group, Event, Users_Group, RSVP

user_routes = Blueprint('users', __name__)

# Retrieve all users


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()  # returns a list of users
    # <== this is the way.
    return jsonify([user.to_dict() for user in users])
    # return jsonify(([user.to_dict() for user in users]))


# Retrieve single user
@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()  # a single object


# Retrieve user groups
@user_routes.route('/<int:id>/groups')
@login_required
def user_groups(id):
    groups = Group.query.join(Users_Group).filter(
        Users_Group.user_id == id).all()
    return jsonify([group.to_dict() for group in groups])


# Retrieve user groups
@user_routes.route('/<int:id>/user-groups')
@login_required
def user_group_memberships(id):
    groups = Users_Group.query.filter(Users_Group.user_id == id).all()
    return jsonify([group.group_id for group in groups])


# Retrieve if user is a member of a certain group
@user_routes.route('/<int:userId>/groups/<int:groupId>')
@login_required
def user_is_member(groupId, userId):
    group = Users_Group.query.filter(
        Users_Group.user_id == userId, Users_Group.group_id == groupId).first()
    return jsonify(bool(group))


# Retrieve user events
@user_routes.route('/<int:id>/events')
@login_required
def user_events(id):
    user_events = Event.query.join(RSVP).filter(RSVP.user_id == id).all()
    return jsonify([event.to_dict() for event in user_events])


@user_routes.route('/<int:id>/rsvps')
# @login_required
def user_rsvps(id):
    user_RSVPs = RSVP.query.filter(RSVP.user_id == id).all()
    return jsonify([rsvp.to_dict() for rsvp in user_RSVPs])

    # initial approach (for future reference):
    # 1. grabbing user RSVPs where user's id matches RSVP user's id
    # user_RSVPs = RSVP.query.join(Event).filter(RSVP.user_id == id).all()
    # 2. grabbing iterables of user_RSVP, then for each user_RSVP, we're keying into our relationship.
    # user_RSVP.event is taking that instance, finding the
    # events = [user_RSVP.event for user_RSVP in user_RSVPs]
