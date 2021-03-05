from app.models import db, Users_Group
from random import random

# Adds a demo user, you can add other users here if you want
def seed_users_groups():


## populates demo user as a member of 9 random groups in the range 2-20(total of 10)
    for _ in range (9):
        random_group = int(random() * 18 ) + 2
        demo_users_group = Users_Group(user_id=1, group_id=random_group)
        db.session.add(demo_users_group)
        db.session.commit()


# populates users 2-20 to be members of groups 1-20 (leader assignments)
        num = 1
    for _ in range (20):
        demo_users_group = Users_Group(user_id=num, group_id=num)
        db.session.add(demo_users_group)
        db.session.commit()
        num += 1


# populates 500 additional group memberships among 300 users and 20 groups at random
    for _ in range (500):
        random_user = int(random() * 300 ) +1
        random_group = int(random() * 20 ) + 1
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
