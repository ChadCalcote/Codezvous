from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required
from app.models import Event, Comment, RSVP, db


events_routes = Blueprint('events', __name__)


# Retrieve all events
@events_routes.route('/')
def events():
    events = Event.query.all()
    return {"events": [event.to_dict() for event in events]}

# Retrieve a single event


@events_routes.route('/<int:id>')
def event(id):
    event = Event.query.get(id)
    return event.to_dict()

# Create an event


@events_routes.route('/', methods=["POST"])
@login_required
def post():
    form = CreateNewEventForm()
    if form.validate_on_submit():
        new_event = Event()
        form.populate_obj(new_event)
        db.session.add(new_event)
        db.session.commit()
        return redirect('/<int:id>')  # is this the right way?
        # return redirect(f'/<new_event.id>')
    return "Bad Data"

# Edit an event


@events_routes.route('/<int:id>', methods=["PUT"])
@login_required
def put(id):
    event = Event.query.get(id)

    if "event_name" in request.json:
        event.event_name = request.json["event_name"]
    if "description" in request.json:
        event.description = request.json["description"]
    if "address" in request.json:
        event.address = request.json["address"]
    if "city" in request.json:
        event.city = request.json["city"]
    if "state" in request.json:
        event.state = request.json["state"]
    if "zip_code" in request.json:
        event.zip_code = request.json["zip_code"]
    if "virtual" in request.json:
        event.virtual = request.json["virtual"]
    if "type" in request.json:
        event.type = request.json["type"]
    if "status" in request.json:
        event.status = request.json["status"]
    if "image_url" in request.json:
        event.image_url = request.json["image_url"]
    if "group_id" in request.json:
        event.group_id = request.json["group_id"]
    if "start_time" in request.json:
        event.start_time = request.json["start_time"]
    if "end_time" in request.json:
        event.end_time = request.json["end_time"]
    db.session.commit()

    return {"message": "success"}

# Delete an event


@events_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete(id):
    event = Event.query.get(id)
    comments = Comment.query.join(Event).filter(Comment.event_id == id).all()

    db.session.delete(comments)
    db.session.delete(event)
    db.session.commit()

    return {"message": "success"}


@events_routes.route('/<int:id>/comments')
@login_required
def comments(id):
    comments = Comment.query.all()
    return {"comments": [comment.to_dict() for comment in comments]}


# Posts a comment on an event
@events_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def post_comments(id):
    # if form.validate_on_submit():
    new_comment = Comment(body=request.json['body'], user_id=1, event_id=id)
    # user_id, not sure how to find this
    db.session.add(new_comment)
    db.session.commit()
    return redirect(f'/api/events/{id}')
    # return 'Bad Data'


# This deletes a single comment by its comment.id which is id2 here
# Remove comment for an event
@events_routes.route('/<int:id>/comments/<int:id2>', methods=['DELETE'])
@login_required
def delete_user_comments(id, id2):
    #need to be able to verify user's Id
    user_comment = Comment.query.join(User).filter(Comment.user_id == User.id)
    
    db.session.delete(user_comment)
    db.session.commit()
    return redirect(f'/api/events/{id}')

# Edits a comment for an event


@events_routes.route('/<int:id>/comments/<int:id2>', methods=['PUT'])
@login_required
def edit_user_comment(id, id2):
    user_comment = Comment.query.get(id2)

    if "body" in request.json:
        user_comment.body = request.json["body"]
    db.session.commit()
    return {"message": "success"}


@events_routes.route('/<int:id>/rsvps', methods=['POST'])
@login_required
def post_rsvp(id):
    new_rsvp = RSVP(event_id=id, user_id=request.json['user_id'])
    db.session.add(new_rsvp)
    db.session.commit()
    return redirect(f'/api/events/{id}')


@events_routes.route('/<int:id>/rsvps/<int:id2>', methods=['DELETE'])
@login_required
def delete_user_rsvp(id, id2):
    user_rsvp = RSVP.query.get(id2)
    # print(request.data) what does the object look like?

    db.session.delete(user_rsvp)
    db.session.commit()
    return redirect(f'/api/events/{id}')
