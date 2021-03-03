from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required
from app.models import User, Group, Event, RSVP, db, Users_Group
from app.forms import GroupForm
from random import random


groups_routes = Blueprint('groups', __name__)


# Retrieve all groups
@groups_routes.route('/')
def groups():
    groups = Group.query.all()
    return jsonify([group.to_dict() for group in groups])


# Retrieve a single group
@groups_routes.route('/<int:id>')
def group(id):
    group = Group.query.get(id)
    return group.to_dict()


# Retrieve all events of a group
@groups_routes.route('/<int:id>/events')
def group_events(id):
    group_events = Event.query.filter(Event.group_id == id)
    return jsonify([group_event.to_dict() for group_event in group_events])


# Retrieve a group leader
@groups_routes.route('/<int:id>/leader')
def get_leader(id):
    leader_id = User.query.join(Group).filter(Group.id == id).filter(User.id == Group.leader_id).all()
    return jsonify([leader.to_dict() for leader in leader_id])


# Retrieve all group members
@groups_routes.route('/<int:id>/members')
def get_members(id):
    members = User.query.join(Users_Group).filter(Users_Group.group_id == id).all()
    return jsonify([member.to_dict() for member in members])


# Retrieve some group members
@groups_routes.route('/<int:id>/members/preview')
def get_members(id):
    members = User.query.join(Users_Group).filter(Users_Group.group_id == id).all()
    members_dict = [member.to_dict() for member in members]
    select_members = [members_dict[int(random() * len(members_dict))], members_dict[int(random() * len(members_dict))], members_dict[int(random() * len(members_dict))]]
    return jsonify(select_members)


# Retrieve number of members in a group
@groups_routes.route('/<int:id>/members/total')
def get_members(id):
    members = User.query.join(Users_Group).filter(Users_Group.group_id == id).all().count()
    return members


# Create a group
@groups_routes.route('/', methods=["POST"])
# @login_required
def post():
    form = GroupForm()  # need to create a form
    if form.validate_on_submit():
        new_group = Group()
        new_group.leader_id = request.json["leader_id"]
        form.populate_obj(new_group)
        db.session.add(new_group)
        db.session.commit()
        return new_group.to_dict()
    return "Bad Data"


# Create a group [TEST]
@groups_routes.route('/test', methods=["POST"])
# @login_required
def postTest():
    form = GroupForm()  # need to create a form
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_group = Group(
            group_name=form.data['group_name'],
            description=form.data['description'],
            city=form.data['city'],
            state=form.data['state'],
            zip_code=form.data['zip_code'],
            image_url=form.data['image_url'],
            leader_id=form.data['leader_id']
        )
        # new_group.leader_id = request.json["leader_id"]
        # form.populate_obj(new_group)
        db.session.add(new_group)
        db.session.commit()
        return new_group.to_dict()
    return "Bad Data"


# Edit a group
@groups_routes.route('/<int:id>', methods=["PUT"])
@login_required
def put(id):
    group = Group.query.get(id)

    if "group_name" in request.json:
        group.group_name = request.json["group_name"]
    if "description" in request.json:
        group.description = request.json["description"]
    if "city" in request.json:
        group.city = request.json["city"]
    if "state" in request.json:
        group.state = request.json["state"]
    if "zip_code" in request.json:
        group.zip_code = request.json["zip_code"]
    if "is_active" in request.json:
        group.state = request.json["is_active"]
    if "image_url" in request.json:
        group.image_url = request.json["image_url"]
    if "leader_id" in request.json:
        group.leader_id = request.json["leader_id"]
    db.session.commit()

    return {"message": "success"}


# Delete a group
@groups_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete(id):
    events = Event.query.filter(Event.group_id == id).all()
    group = Group.query.get(id)

    db.session.delete(group)
    db.session.commit()

    return {"message": "success"}


# Create a user_groups record
@groups_routes.route('/new-user', methods=["POST"])
@login_required
def create():
    new_user_group = Users_Group(
        user_id = request.json["user_id"],
        group_id = request.json["group_id"]
    )

    db.session.add(new_user_group)
    db.session.commit()

    return new_user_group.to_dict()

