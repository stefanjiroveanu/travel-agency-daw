from flask import Flask, request, jsonify

from src.middlewares.auth_validator import check_auth_with_claims
from src.models.Location import Location

from flask import Blueprint

from src.models.ReservationDate import ReservationDate
from src.models.Reservation import Reservation

from src.models.Room import Room

location = Blueprint("location", __name__)

import uuid


@location.route('/places', methods=['POST'])
@check_auth_with_claims({'admin': True})
def create_place():
    data = request.get_json()  # Make sure to use get_json() to properly parse the JSON body
    place_dict, status = create_new_place(data)
    return jsonify(place_dict), status


def create_new_place(data):
    data['uuid'] = str(uuid.uuid4())
    try:
        new_place = Location(**data).save()
        place_dict = new_place.to_mongo().to_dict()
        place_dict['_id'] = str(place_dict['_id'])
        return place_dict, 201
    except Exception as e:
        return {"error": str(e)}, 400


from flask import jsonify


@location.route('/places', methods=['GET'])
def get_places():
    places_list = Location.objects()
    places = []

    for place in places_list:
        # Convert the place document to a dictionary
        place_dict = place.to_mongo().to_dict()
        place_dict['id'] = str(place_dict['_id'])
        del place_dict['_id']

        # Find associated rooms for this place using the place's uuid
        rooms_list = Room.objects(placeUuid=place_dict['uuid'])
        rooms = []
        for room in rooms_list:
            room_dict = room.to_mongo().to_dict()
            room_dict['id'] = str(room_dict['_id'])
            del room_dict['_id']
            # Add any additional room transformation or cleanup here
            rooms.append(room_dict)

        # Add the list of room dictionaries to the place dictionary
        place_dict['rooms'] = rooms

        places.append(place_dict)

    return jsonify(places), 200


# Get a single place by UUID
@location.route('/places/<uuid>', methods=['GET'])
@check_auth_with_claims(role_required='admin')
def get_place(uuid):
    place = Location.objects(uuid=uuid).first()
    if not place:
        return jsonify(error="Place not found"), 404
    place_dict = place.to_mongo().to_dict()
    place_dict['id'] = str(place_dict['_id'])
    del place_dict['_id']
    return jsonify(place_dict), 200


# Update a place
@location.route('/places/<uuid>', methods=['PUT'])
@check_auth_with_claims(role_required='admin')
def update_place(uuid):
    data = request.json
    place = Location.objects(uuid=uuid).first()
    if not place:
        place_dict, status = create_new_place(data)
        return jsonify(place_dict), status
    place.update(**data)
    return jsonify(message="Place updated"), 200


# Delete a place
@location.route('/places/<uuid>', methods=['DELETE'])
@check_auth_with_claims(role_required='admin')
def delete_place(uuid):
    place = Location.objects(uuid=uuid).first()
    if not place:
        return jsonify(error="Place not found"), 404
    place.delete()
    return jsonify(message="Place deleted"), 200


@location.route('/places/<uuid>/reservations', methods=['GET'])
@check_auth_with_claims(role_required='admin')
def get_reservations_for_place(uuid):
    place = Location.objects(uuid=uuid).first()
    if not place:
        return jsonify({'error': 'Place not found'}), 404

    rooms_list = Room.objects(placeUuid=uuid)
    all_reservations = []

    for room in rooms_list:
        reservations_list = Reservation.objects(room=room)
        for reservation in reservations_list:
            reservation_dict = {
                'id': str(reservation.id),
                'occupiedFrom': reservation.startDate,
                'occupiedUntil': reservation.endDate,
                'roomUuid': str(room.placeUuid),
                'userId': reservation.userId,
                'price': reservation.price,
                'reservationTimestamp': reservation.reservationTimestamp
            }
            all_reservations.append(reservation_dict)

    # Return a list of all reservations for all rooms of the given place
    return jsonify(all_reservations), 200
