import uuid

from flask import request, jsonify, Blueprint

from src.middlewares.auth_validator import check_auth_with_claims
from src.models.Room import Room


room_controller = Blueprint("room_controller", __name__)


@room_controller.route('/rooms', methods=['POST'])
@check_auth_with_claims({'admin': True})
def create_room():
    data = request.get_json()
    data['roomUuid'] = str(uuid.uuid4())  # Generate a new UUID for the room
    try:
        new_room = Room(**data).save()
        room_dict = new_room.to_mongo().to_dict()
        room_dict['_id'] = str(room_dict['_id'])  # Convert ObjectId to string
        return jsonify(room_dict), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@room_controller.route('/rooms', methods=['GET'])
@check_auth_with_claims({'admin': True})
def get_rooms():
    rooms = Room.objects()
    rooms_list = [room.to_mongo().to_dict() for room in rooms]
    for room in rooms_list:
        room['_id'] = str(room['_id'])  # Convert ObjectId to string
    return jsonify(rooms_list), 200


@room_controller.route('/rooms/<roomUuid>', methods=['GET'])
@check_auth_with_claims({'admin': True})
def get_room(roomUuid):
    room = Room.objects(roomUuid=roomUuid).first()
    if not room:
        return jsonify({'error': 'Room not found'}), 404
    room_dict = room.to_mongo().to_dict()
    room_dict['_id'] = str(room_dict['_id'])  # Convert ObjectId to string
    return jsonify(room_dict), 200


@room_controller.route('/rooms/<roomUuid>', methods=['PUT'])
@check_auth_with_claims({'admin': True})
def update_room(roomUuid):
    data = request.get_json()
    room = Room.objects(roomUuid=roomUuid).first()
    if not room:
        return jsonify({'error': 'Room not found'}), 404
    room.update(**data)
    return jsonify({'message': 'Room updated successfully'}), 200
