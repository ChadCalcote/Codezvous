from app.models import db, RSVP
from random import random

# Adds a demo user, you can add other users here if you want


def seed_rsvps():
    demo_rsvp = RSVP(user_id=1, event_id=101)
    db.session.add(demo_rsvp)
    db.session.commit()


    demo_rsvp = RSVP(user_id=1, event_id=102)
    db.session.add(demo_rsvp)
    db.session.commit()

    
    demo_rsvp = RSVP(user_id=1, event_id=103)
    db.session.add(demo_rsvp)
    db.session.commit()

    user = 1
    event = 1
    for _ in range (20):
        for _ in range (5):
            demo_rsvp = RSVP(user_id=user, event_id=event)
            db.session.add(demo_rsvp)
            db.session.commit()
            event += 1

        user += 1

    for _ in range (500):
        random_user = int(random() * 230 ) + 70
        random_event = int(random() * 102 ) + 1
        demo_rsvp = RSVP(user_id=random_user, event_id=random_event)

        db.session.add(demo_rsvp)

        db.session.commit()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_rsvps():
    db.session.execute('TRUNCATE rsvps CASCADE;')
    db.session.commit()
