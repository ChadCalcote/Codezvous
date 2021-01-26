from app.models import db, Users_Group

# Adds a demo user, you can add other users here if you want
def seed_users_groups():

    demo_users_group1 = Users_Group(user_id=2, group_id=1)

    db.session.add(demo_users_group1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users_groups():
    db.session.execute('TRUNCATE users_groups;')
    db.session.commit()
