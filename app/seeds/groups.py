from app.models import db, Group

# Adds a demo user, you can add other users here if you want
def seed_groups():

    demo_group1 = Group(group_name='javascript group', description='We are passionate about Javascript!',
                city='Austin', state='Texas', zip_code=78704, leader_id=2)

    db.session.add(demo_group1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_groups():
    db.session.execute('TRUNCATE groups;')
    db.session.commit()
