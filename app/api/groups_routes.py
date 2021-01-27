from flask import Blueprint, jsonify, redirect
from flask_login import login_required
from app.models import Group

groups_routes = Blueprint('groups', __name__)


# Retrieve all groups **Do we need this?**
@groups_routes.route('/')
def groups():
  groups = Group.query.all()
  return {"groups": [group.to_dict() for group in groups]}

# Retrieve a single group
@groups_routes.route('/<int:id>')
def group(id):
  group = Group.query.get(id)
  return group.to_dict()

# Create a group
@groups_routes.route('/', methods=['POST'])
def create_group():
  form = CreateNewGroupForm() # need to create a form
  if form.validate_on_submit():
    new_group = Group() #
    form.populate_obj(new_group)
    db.session.add(new_group)
    db.session.commit()
    return redirect('/<int:id>')
  return "Bad Data"


# Edit a group
@groups_routes.route('/groups/<int:id>', methods=['PATCH'])
def edit_group():


# Delete a group
@groups_routes.route('/groups/<int:id>', methods=['DELETE'])
def delete_group():
  group = Group.
