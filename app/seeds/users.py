from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
from random import random

# Adds a demo user, you can add other users here if you want
def seed_users():

    fakes = Faker()

    demo = User(username='Demo', image_url='www.thispersondoesnotexist.com/image', 
                zip_code=fakes.postcode(), email='demo@aa.io', password='password')

    db.session.add(demo)

    db.session.commit()

    for _ in range(300):
        username = f'{fakes.last_name()}{fakes.state_abbr()}{int(random() * 50 ) + 1960}'
        fakeUser = User(username=username, image_url='www.thispersondoesnotexist.com/image', 
                        zip_code=fakes.postcode(), email=fakes.email(), password=fakes.password())
        db.session.add(fakeUser)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
