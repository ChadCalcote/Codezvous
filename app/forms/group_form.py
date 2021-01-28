from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, DateTimeField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Event


class GroupForm(FlaskForm):
    group_name = StringField('Group Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    zip_code = IntegerField('Zip Code', validators=[DataRequired()])
    is_active = BooleanField('Active?')
    image_url = StringField('Image_Url')
