from app.models import db, Event
from faker import Faker
from random import random
import datetime

# Adds a demo user, you can add other users here if you want


def seed_events():

    fakes = Faker()

    programming_languages = [
        'ABAP',
        'ActionScript',
        'Ada',
        'ALGOL',
        'Alice',
        'APL',
        'ASP / ASP.NET',
        'Assembly Language',
        'Awk',
        'BBC Basic',
        'C',
        'C++',
        'C#',
        'COBOL',
        'Cascading Style Sheets',
        'D',
        'Delphi',
        'Dreamweaver',
        'Erlang and Elixir',
        'F#',
        'FORTH',
        'FORTRAN',
        'Functional Programming',
        'Go',
        'Haskell',
        'HTML',
        'IDL',
        'INTERCAL',
        'Java',
        'Javascript',
        'jQuery',
        'LabVIEW',
        'Lisp',
        'Logo',
        'MetaQuotes Language',
        'ML',
        'Modula-3',
        'MS Access',
        'MySQL',
        'NXT-G',
        'Object-Oriented Programming',
        'Objective-C',
        'OCaml',
        'Pascal',
        'Perl',
        'PHP',
        'PL/I',
        'PL/SQL',
        'PostgreSQL',
        'PostScript',
        'PROLOG',
        'Pure Data',
        'Python',
        'R',
        'RapidWeaver',
        'RavenDB',
        'Rexx',
        'Ruby on Rails',
        'S-PLUS',
        'SAS',
        'Scala',
        'Sed',
        'SGML',
        'Simula',
        'Smalltalk',
        'SMIL',
        'SNOBOL',
        'SQL',
        'SQLite',
        'SSI',
        'Stata',
        'Swift',
        'Tcl/Tk',
        'TeX and LaTeX',
        'Unified Modeling Language',
        'Unix Shells',
        'Verilog',
        'VHDL',
        'Visual Basic',
        'Visual FoxPro',
        'VRML',
        'WAP/WML',
        'XML',
        'XSL'
    ]

    adjectives = [
        'adaptable',
        'adventurous',
        'affable',
        'affectionate',
        'agreeable',
        'ambitious',
        'amiable',
        'amicable',
        'amusing',
        'brave',
        'bright',
        'broad-minded',
        'calm',
        'careful',
        'charming',
        'communicative',
        'compassionate',
        'conscientious',
        'considerate',
        'convivial',
        'courageous',
        'courteous',
        'creative',
        'decisive',
        'determined',
        'diligent',
        'diplomatic',
        'discreet',
        'dynamic',
        'easygoing',
        'emotional',
        'energetic',
        'enthusiastic',
        'exuberant',
        'fair-minded',
        'faithful',
        'fearless',
        'forceful',
        'frank',
        'friendly',
        'funny',
        'generous',
        'gentle',
        'good',
        'gregarious',
        'hard-working',
        'helpful',
        'honest',
        'humorous',
        'imaginative',
        'impartial',
        'independent',
        'intellectual',
        'intelligent',
        'intuitive',
        'inventive',
        'kind',
        'loving',
        'loyal',
        'modest',
        'neat',
        'nice',
        'optimistic',
        'passionate',
        'patient',
        'persistent',
        'pioneering',
        'philosophical',
        'placid',
        'plucky',
        'polite',
        'powerful',
        'practical',
        'pro-active',
        'quick-witted',
        'quiet',
        'rational',
        'reliable',
        'reserved',
        'resourceful',
        'romantic',
        'self-confident',
        'self-disciplined',
        'sensible',
        'sensitive',
        'shy',
        'sincere',
        'sociable',
        'straightforward',
        'sympathetic',
        'thoughtful',
        'tidy',
        'tough',
        'unassuming',
        'understanding',
        'versatile',
        'warmhearted',
        'willing',
        'witty'
    ]

    events = [
        'Talk',
        'Film',
        'Meetup',
        'Hackathon',
        'Meet and Greet',
        'AMA',
        'Interview',
        'Panel',
        'Conference',
        'Seminar',
        'Hang',
        'Mixer',
        'Social',
        'Workshop',
        'Info Session',
        'Networking Event',
        'Dance'
    ]

    demo_event1 = Event(event_name='javascripting-only', description='Don\'t forget the semicolons!',
                        address='208 Barton Springs Rd', city='Austin', state='TX', zip_code=78704, 
                        type='Workshop', start_time='2021-02-02 11:45:00', end_time='2020-02-02 12:30:00', group_id=1)

    db.session.add(demo_event1)

    db.session.commit()
    # =====================================================

    demo_event2 = Event(event_name='python-only-bbq', description='No, we\'re not cooking snakes. We have good indentions with this event.',
                        address='3853 N St Mary\'s S', city='San Antonio', state='TX', zip_code=78212, 
                        type='Social', start_time='2021-02-03 11:45:00', end_time='2020-02-03 12:30:00',group_id=1)

    db.session.add(demo_event2)

    db.session.commit()

    # =====================================================

    demo_event3 = Event(event_name='slightly above average', description='Ted Talk by Alfredo',
                        address='480 E Broad St', city='Columbus', state='OH', zip_code=43215, 
                        type='Info Session', start_time='2021-02-02 08:45:00', end_time='2020-02-02 10:30:00', group_id=2)

    db.session.add(demo_event3)

    db.session.commit()

    num = 0
    for _ in range (400):
        adjective = adjectives[int(random() * 98)]
        programming_language = programming_languages[int(random() * 83)]
        event = events[int(random() * 15)]
        event_name = f'{adjective} {programming_language} {event}'
        start_date = fakes.date_this_year(before_today=False, after_today=True)
        hours = int(random() * 3 ) + 1
        random_group= int(random() * 50 ) + 1
        state_abbr = fakes.state_abbr()

        demo_event = Event(event_name=event_name, description=fakes.paragraph(nb_sentences=5),
                            address=fakes.address(), city=fakes.city(), state=state_abbr, zip_code=fakes.postalcode_in_state(state_abbr=state_abbr),
                            type=event, start_time=start_date, 
                            end_time=(start_date + datetime.timedelta(hours)), group_id=random_group)

        db.session.add(demo_event)

        db.session.commit()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_events():
    db.session.execute('TRUNCATE events CASCADE;')
    db.session.commit()
