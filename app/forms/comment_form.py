from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class CommentForm(FlaskForm):
    body = TextAreaField('Body', validators=[DataRequired()])
