from mongoengine import Document, StringField, ReferenceField, DateTimeField

from src.models.Room import Room


class Reservation(Document):
    userId = StringField(required=True)  # User's ID from Firebase
    room = ReferenceField(Room, required=True)  # Reference to the Room model
    startDate = DateTimeField(required=True)
    endDate = DateTimeField(required=True)
    price = StringField(required=True)
    reservationTimestamp = StringField(required=True)

    meta = {'collection': 'reservations'}