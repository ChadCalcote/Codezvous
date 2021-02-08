from app.models import db, Comment
from faker import Faker
from random import random

# Adds a demo user, you can add other users here if you want


def seed_comments():
    fakes = Faker()

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
        user_id=1, event_id=2, body='Testing comment seed data.')

    db.session.add(demo_comment3)

    db.session.commit()

    # =====================================================

    demo_comment4 = Comment(
        user_id=3, event_id=1, body='Testing comment seed data.')

    db.session.add(demo_comment4)

    db.session.commit()

    for _ in range (500):
        random_length = int(random() * 5 ) + 1
        random_user = int(random() * 299 ) + 1
        random_event = int(random() * 99 ) + 1

        random_comment = Comment( user_id=random_user, event_id=random_event, 
                                body=fakes.paragraph(nb_sentences=random_length, variable_nb_sentences=True))
        db.session.add(random_comment)

        db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_comments():
    db.session.execute('TRUNCATE comments CASCADE;')
    db.session.commit()
