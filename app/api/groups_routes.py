from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required
from app.models import User, Group, Event, RSVP, db, Users_Group


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

# Create a group
@groups_routes.route('/', methods=["POST"])
@login_required
def post():
    form = CreateNewGroupForm()  # need to create a form
    if form.validate_on_submit():
        new_group = Group()
        form.populate_obj(new_group)
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

    # attempted resolving: null value in column "group_id" of relation "events" violates not-null constraint
    # db.session.delete(events) # Class 'builtins.list' is not mapped ? mapping error
    db.session.delete(group)
    db.session.commit()

    return {"message": "success"}


# Delete a group
# @groups_routes.route('/groups/<int:id>', methods=['DELETE'])
# def delete_group():
#     group = Group.query.get_or_404(id)
#     db.session.delete(group)
#     db.session.commit()
#     return "success"  # {'message': 'success'} per api?
