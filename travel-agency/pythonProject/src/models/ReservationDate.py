from mongoengine import Document, StringField, IntField, FloatField, ListField, EmbeddedDocument, EmbeddedDocumentListField, DateField, URLField


class ReservationDate(EmbeddedDocument):
    occupiedFrom = DateField(required=True)
    occupiedUntil = DateField(required=True)