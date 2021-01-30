from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class CommentForm(FlaskForm):
    body = TextAreaField('Body', validators=[DataRequired()])
    # user_id = IntegerField('user_id', validators=[DataRequired()])
    # event_id = IntegerField('event_id', validators=[DataRequired()])
