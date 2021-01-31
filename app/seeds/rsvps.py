from app.models import db, RSVP
from random import random

# Adds a demo user, you can add other users here if you want


def seed_rsvps():
    random_user = int(random() * 300 ) + 1
    random_event = int(random() * 50 ) + 1
    demo_rsvp1 = RSVP(user_id=2, event_id=1)

    db.session.add(demo_rsvp1)

    db.session.commit()

# =====================================================

    demo_rsvp2 = RSVP(user_id=1, event_id=1)

    db.session.add(demo_rsvp2)

    db.session.commit()

# =====================================================

    demo_rsvp3 = RSVP(user_id=3, event_id=2)

    db.session.add(demo_rsvp3)

    db.session.commit()

    num1 = 1
    for _ in range (70):
        user = num1
        num2 = 1
        for _ in range (200):
            event = num2
            demo_rsvp = RSVP(user_id=user, event_id=event)

            db.session.add(demo_rsvp)

            db.session.commit()
            num2 += 1
        num1 += 1

    for _ in range (2000):
        random_user = int(random() * 230 ) + 70
        random_event = int(random() * 200 ) + 1
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
