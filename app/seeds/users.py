from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
from random import random

# Adds a demo user, you can add other users here if you want
def seed_users():
    imageUrls =[
      'http://www.thispersondoesnotexist.com/image',
      "http://placebeard.it/640x480",
      "https://www.placecage.com/c/200/300",
      "https://www.fillmurray.com/300/200",
      "https://www.placecage.com/g/200/300",
      "http://placeimg.com/640/480/people/45",
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1521310192545-4ac7951413f0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1568226940395-d125946a2bb5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHVzZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1563237023-b1e970526dcb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fHVzZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1509668521827-dd7d42a587e2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fHVzZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDd8fHVzZXJ8ZW58MHx8MHw%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1550082849-c4603c163b37?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTl8fHVzZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1585913161203-695a3ac93b33?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODB8fHVzZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1599110364868-364162848518?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA0fHx1c2VyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1599110906885-b024c90c2773?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA2fHx1c2VyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1598346762291-aee88549193f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA4fHx1c2VyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1494192785370-e91e091d544f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA1fHx1c2VyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ]
    fakes = Faker()
    state_abbr = 'TX'

    demo = User(username='Demo', image_url='http://www.thispersondoesnotexist.com/image', 
                zip_code=fakes.postalcode_in_state(state_abbr=state_abbr), 
                email='demo@aa.io', password='password')
    db.session.add(demo)
    db.session.commit()

    num=1
    for _ in range(300):
        random_number = int(random() * 21) + 1
        username = f'{fakes.last_name()}{fakes.state_abbr()}{int(random() * 50 ) + 1960}'
        fakeUser = User(username=username, image_url=imageUrls[random_number], 
                        zip_code=fakes.postalcode_in_state(state_abbr=state_abbr), 
                        email=fakes.email(), password=fakes.password())
        db.session.add(fakeUser)
        db.session.commit()
        num+=1


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
