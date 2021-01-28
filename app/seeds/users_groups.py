from app.models import db, Users_Group
from random import random

# Adds a demo user, you can add other users here if you want
def seed_users_groups():
    for _ in range (500):
        random_user = int(random() * 300 ) + 1
        random_group = int(random() * 70 ) + 1
        demo_users_group = Users_Group(user_id=random_user, group_id=random_group)

        db.session.add(demo_users_group)

        db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users_groups():
    db.session.execute('TRUNCATE users_groups CASCADE;')
    db.session.commit()
