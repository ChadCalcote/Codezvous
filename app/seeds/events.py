from app.models import db, Event

# Adds a demo user, you can add other users here if you want
def seed_events():

    demo_event1 = Event(event_name='javascripting-only', description='Don\'t forget the semicolons!', address='208 Barton Springs Rd', city='Austin', state='Texas', zip_code=78704, type='Workshop', group_id=1)

    db.session.add(demo_event1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_events():
    db.session.execute('TRUNCATE events CASCADE;')
    db.session.commit()