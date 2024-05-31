from datetime import datetime

from flask import request, jsonify, Blueprint
from mongoengine import DoesNotExist, Q

from src.middlewares.auth_validator import check_auth_with_claims
from src.models.ReservationDate import ReservationDate
from src.models.Reservation import Reservation
from src.models.Room import Room
import json

import firebase_admin.auth as auth

reservation_controller = Blueprint("reservation_controller", __name__)


@reservation_controller.route('/reservations', methods=['POST'])
@check_auth_with_claims({'admin': True, 'client': True})
def create_reservation():
    data = request.get_json()
    room = data['room']
    user_id = data['userId']
    print(data)
    start_date = datetime.fromisoformat(data['startDate'].rstrip('Z'))
    end_date = datetime.fromisoformat(data['endDate'].rstrip('Z'))
    price = ((end_date - start_date).days + 1) * room['pricePerNight']

    # Ensure start_date is before end_date
    if start_date >= end_date:
        return jsonify({'error': 'Start date must be before end date'}), 400

    try:
        room = Room.objects.get(roomUuid=room['roomUuid'])
    except DoesNotExist:
        return jsonify({'error': 'Room not found'}), 404

    # Verify if the user exists in Firebase
    try:
        user_record = auth.get_user(user_id)
        print(f'Successfully fetched user data: {user_record.uid}')
    except auth.AuthError:
        return jsonify({'error': 'User does not exist in Firebase'}), 404

    overlapping_reservations = Reservation.objects(
        Q(room=room) &
        (
                Q(startDate__lte=end_date) & Q(endDate__gte=start_date)
        )
    )

    if overlapping_reservations:
        return jsonify({'error': 'Room is already booked for the given dates'}), 400

    # Create and save the new reservation
    new_reservation = Reservation(userId=user_id, room=room, price=f"{price}", startDate=start_date, endDate=end_date,
                                  reservationTimestamp=f"{datetime.now()}")
    new_reservation.save()

    # Update room's reservation dates to reflect the full booking period
    existing_dates = room['reservationDates']
    print("existing_dates")
    existing_dates.append(ReservationDate(occupiedFrom=start_date, occupiedUntil=end_date))
    room.save()

    # Convert the reservation document to a dictionary
    reservation_dict = new_reservation.to_mongo().to_dict()

    # Convert ObjectId instances to strings directly after document conversion
    reservation_dict['_id'] = str(reservation_dict['_id'])
    del reservation_dict['room']
    del reservation_dict['_id']

    return jsonify({'reservation': reservation_dict}), 201
