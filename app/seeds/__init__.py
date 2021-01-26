from flask.cli import AppGroup
from .users import seed_users, undo_users
from .groups import seed_groups, undo_groups
from .events import seed_events, undo_events
from .rsvps import seed_rsvps, undo_rsvps
from .comments import seed_comments, undo_comments
from .users_groups import seed_users_groups, undo_users_groups

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_groups()
    seed_events()
    seed_rsvps()
    seed_comments()
    seed_users_groups()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_groups()
    undo_events()
    undo_rsvps()
    undo_comments()
    undo_users_groups()
    # Add other undo functions here
