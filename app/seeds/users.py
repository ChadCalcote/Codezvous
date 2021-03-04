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
      "https://images.unsplash.com/photo-1494192785370-e91e091d544f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA1fHx1c2VyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1614533708409-fdad0805a4fa?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8dG93SlpGc2twR2d8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1611233361051-6020330b649f?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1515130166460-532bc0777f50?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8dG93SlpGc2twR2d8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1484684096794-03e03b5e713e?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8dG93SlpGc2twR2d8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1614247521228-d4184c975eff?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8dG93SlpGc2twR2d8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1598848146417-96dca2d094c5?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1614676367564-32341390913f?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1609505018208-2f1c473e8e63?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1589734004813-166e485dc89d?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1614449203851-926c8509ebe2?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1597862743728-62091839f54d?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1614247484197-9c6164bb532f?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDI3fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1507126117511-e87526de90e2?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDM0fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1571423706737-c7146b6e4ad2?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1614492052748-7c182718eaa0?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDQyfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1573072886302-dcf5319bd217?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ5fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1601511086638-a6d6946ed7fd?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ2fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1500832333538-837287aad2b6?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDUzfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1579529547132-6093b5da10fe?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDU1fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1544124094-8aea0374da93?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDU3fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1535129219082-ba638579daa1?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDY3fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1551108168-229956dd31bf?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDY1fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1544737593-0e686eaeb328?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDc1fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1589317621382-0cbef7ffcc4c?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDI1fHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"

    
    
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
        random_number = int(random() * 45) + 1
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
