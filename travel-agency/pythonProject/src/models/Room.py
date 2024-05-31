from mongoengine import Document, StringField, IntField, FloatField, ListField, EmbeddedDocument, \
    EmbeddedDocumentListField, DateField, URLField, BooleanField


class Room(Document):
    roomUuid = StringField(required=True, unique=True)
    placeUuid = StringField(required=True)
    numberOfBeds = IntField(required=True)
    capacity = IntField(required=True)
    pricePerNight = FloatField(required=True)
    images = ListField(URLField())
    reservationDates = EmbeddedDocumentListField('ReservationDate')
    occupied = BooleanField(required=True)

    meta = {'collection': 'rooms'}  # Specifies the collection name in MongoDB