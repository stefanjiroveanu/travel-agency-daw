from mongoengine import Document, StringField, IntField, FloatField, ListField, EmbeddedDocument, EmbeddedDocumentListField, DateField, URLField

class Location(Document):
    uuid = StringField(required=True, unique=True)
    title = StringField(required=True)
    description = StringField(required=True)
    location = StringField(required=True)
    country = StringField(required=True)
    pricePerNight = FloatField(required=True)
    numberOfGuests = StringField(required=True)
    numberOfRoomsFree = IntField(required=True)
    tripDeal = FloatField()  # Optional field for a special deal price

    meta = {'collection': 'places'}
