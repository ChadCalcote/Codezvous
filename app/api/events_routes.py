from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required
from app.models import User, Event, Comment, RSVP, db
from app.forms import EventForm, CommentForm


events_routes = Blueprint('events', __name__)


# Retrieve all events
@events_routes.route('/')
def events():
    # events = Event.query.all()
    events = db.session.query(Event).order_by(Event.start_time)
    return jsonify([event.to_dict() for event in events])


# Retrieve a single event
@events_routes.route('/<int:id>')
def event(id):
    event = Event.query.get(id)
    return event.to_dict()


# Retrieve a event leader (group leader)
# @events_routes.route('/<int:id>/leader') # this is event id
# def event_leader(id):
#     event_leader = User.query.join(Group).join(Event).filter(Group.id == Event.group_id).filter(User.id == Group.leader_id).all()


# Create an event
@events_routes.route('/', methods=["POST"])
@login_required
def post():
    form = EventForm()
    print(form.event_name.data)
    if form.validate_on_submit():
        new_event = Event()
        new_event.group_id = request.json["group_id"]
        form.populate_obj(new_event)
        print(new_event.to_dict())
        db.session.add(new_event)
        db.session.commit()
        return new_event.to_dict()
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


#================== COMMENTS ==================#
# Retrieve all comments by event id
@events_routes.route('/<int:id>/comments')
# @login_required
def comments(id):
    comments = Comment.query.filter(Comment.event_id == id)
    return jsonify([comment.to_dict() for comment in comments])


# Posts a comment on an event
@events_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def post_comments(id):
    form = CommentForm()
    if form.validate_on_submit():
        new_comment = Comment()
        new_comment.user_id = request.json["user_id"]
        new_comment.event_id = id
        form.populate_obj(new_comment)
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return 'Bad Data'


# Remove comment for an event
@events_routes.route('/<int:id>/comments/<int:id2>', methods=['DELETE'])
@login_required
def delete_user_comments(id, id2):
    # need to be able to verify user's Id
    user_comment = Comment.query.get(id2)
    db.session.delete(user_comment)
    db.session.commit()
    return {"message": "success"}


# Edits a comment for an event
@events_routes.route('/<int:id>/comments/<int:id2>', methods=['PUT'])
@login_required
def edit_user_comment(id, id2):
    user_comment = Comment.query.get(id2)

    if "body" in request.json:
        user_comment.body = request.json["body"]
    db.session.commit()
    return {"message": "success"}


#================== RSVP ==================#
# Retrieve attendees for an event
@events_routes.route('/<int:id>/attendees')
# @login_required
def attendees(id):
    attendees = User.query.join(RSVP).filter(RSVP.event_id == id).all()
    return jsonify([attendee.to_dict() for attendee in attendees])


# Post RSVP for an event
@events_routes.route('/<int:id>/rsvps', methods=['POST'])
@login_required
def post_rsvp(id):
    new_rsvp = RSVP(event_id=id, user_id=request.json['user_id'])
    db.session.add(new_rsvp)
    db.session.commit()
    return new_rsvp.to_dict()


# Delete RSVP for an event
@events_routes.route('/<int:id>/rsvps/<int:id2>', methods=['DELETE'])
@login_required
def delete_user_rsvp(id, id2):
    user_rsvp = RSVP.query.get(id2)
    db.session.delete(user_rsvp)
    db.session.commit()
    return {"message": "success"}
