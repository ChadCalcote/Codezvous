from app.models import db, Group
from faker import Faker
from random import random

# Adds a demo user, you can add other users here if you want


def seed_groups():

    fakes = Faker()

    fake_group_names = [
        'Abstract Connoisseurs',
        'Hypertext Assassins',
        'Callback Cats',
        'Boolean Autocrats',
        'Runtime Terror',
        'CAMA Chronicles',
        'FrontPage Freebirds',
        'Hoard Warriors',
        'Daemon Demons',
        'Thrift Torrent Talisman',
        'Software Chasers',
        'Gob Geeklords',
        'Celestial Interface',
        'Open Source Pundits',
        'Data Pirates',
        'FastCAD Stormtroopers',
        'Goo Goo Gnomes',
        'DBMS Hoodlums',
        'Firmware Rebels',
        'Multiprocessing Moguls',
        'Identity Imbalance',
        'Emulation Nerds',
        'Hex Clan',
        'Code Poltergeists',
        'Robust Routine',
        'Debug Entity',
        'Glueware Gremlins',
        'Epic Virtual Boost',
        'Mind Optimizers',
        'Sweep Collider',
        'Query Language Spies',
        'Zip Demons',
        'Peephole Slayers',
        'Shoutcast Hoppers',
        'Lint Whoppers',
        'Elementary Power Hack',
        'Trigger Mindscape',
        'Retrieval Sages',
        'Sinister Rewind',
        'Paradox Code Synchronicity',
        'Java Dalia',
        'Static Startup',
        'Indie Profilers',
        'Search Engine Bandits',
        'Mindwrap Error',
        'Life Cycle Thugs',
        'Karma Passion Molecules',
        'Sequel Extract',
        'Memory Inject Lamas',
        'Integrated Mind Herd',
        'Pipeline Predators',
        'Binary Beasts',
        'Hack Inversion',
        'Rational Register',
        'Data Structure Deadheads',
        'Spiral Forge',
        'Keygen Catastrophe',
        'Port Manifest',
        'Smalltalk Dribble',
        'App Monsters',
        'Fourier Mirage',
        'Ghost Zen',
        'Second Generation Technerds',
        'Light Wave Empire',
        'Parallel Inertia',
        'Kylix Medusa',
        'Pseudo Program Nerds',
        'Server Monks',
        'Adaptive Moorheads',
        'Bytecode Velocity',
        'Outsource Magnets',
        'Jade Magnesia',
        'Heterogeneous Raiders',
        'Acrobat Aztecs',
        'Script Railoth',
        'Cyclomatic Cylops',
        'Lan Blast',
        'Joomla Germicide',
        'Dread Goto',
        'Terragen Trip',
        'Explode Legacy',
        'Hyper Hydro Breed',
        'Kazaa Conquerors',
        'Bypass Space',
        'Oath Tentacles',
        'Mind Map Orbs',
        'Scheduling Drones',
        'Bot Interpreters',
        'Adobe Priests',
        'Turbo Dynamics',
        'Forbidden Linkers',
        'Interprocedural Hybrids',
        'Knobot Roadies',
        'Algo Messiahs',
        'Javadoc Juveniles',
        'Lava Matter',
        'Kernel Ponies',
        'Algorithm Unlock',
        'Object Grind',
        'Symbolic Share Demons',
        ]

    demo_group1 = Group(group_name='javascript group', description='We are passionate about Javascript!',
                        city='Austin', state='TX', zip_code=78704, leader_id=2)

    db.session.add(demo_group1)

    db.session.commit()
    num = 0
    for _ in range (70):
        random_number = int(random() *10) + 1
        current_group_name = fake_group_names[num]
        num += 1
        fake_group = Group(group_name=current_group_name, description=fakes.paragraph(nb_sentences=5),
                        city=fakes.city(), state=fakes.state(), zip_code=fakes.postcode(), image_url='https://picsum.photos/seed/picsum/600/337/?blur=2', leader_id=random_number)

        db.session.add(fake_group)

        db.session.commit()

    # =====================================================

    # demo_group3 = Group(group_name='python group2', description='COBRAAAAA!',
    #                     city='San Antonio', state='Texas', zip_code=78154, leader_id=1)

    # db.session.add(demo_group3)

    # db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_groups():
    db.session.execute('TRUNCATE groups CASCADE;')
    db.session.commit()
