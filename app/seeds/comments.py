from app.models import db, Comment

# Adds a demo user, you can add other users here if you want


def seed_comments():

    demo_comment1 = Comment(
        user_id=2, event_id=1, body='This event is wack. This is a workshop happening outdoors...for coding.')

    db.session.add(demo_comment1)

    db.session.commit()

    # =====================================================

    demo_comment2 = Comment(user_id=2, event_id=1, body='Just kidding.')

    db.session.add(demo_comment2)

    db.session.commit()

    # =====================================================

    demo_comment3 = Comment(
        user_id=1, event_id=1, body='Testing comment seed data.')

    db.session.add(demo_comment3)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_comments():
    db.session.execute('TRUNCATE comments CASCADE;')
    db.session.commit()
