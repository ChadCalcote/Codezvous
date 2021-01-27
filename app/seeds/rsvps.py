from app.models import db, RSVP

# Adds a demo user, you can add other users here if you want


def seed_rsvps():

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
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_rsvps():
    db.session.execute('TRUNCATE rsvps CASCADE;')
    db.session.commit()
