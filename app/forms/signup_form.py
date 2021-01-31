from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    """
        "Checking if user exits"
    """
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(),  user_exists])
    password = StringField('password', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired()])
    zip_code = StringField('zip_code', validators=[DataRequired()])
