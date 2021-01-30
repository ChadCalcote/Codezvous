from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, DateTimeField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Event


class EventForm(FlaskForm):
    event_name = StringField('Event Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    address = StringField('Address')
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    zip_code = IntegerField('Zip Code', validators=[DataRequired()])
    virtual = BooleanField('Virtual Event?')
    type = StringField('Type', validators=[DataRequired()])
    status = StringField('Status')
    group_id = IntegerField('Group_Id', validators=[DataRequired()])
    image_url = StringField('Image_Url')
