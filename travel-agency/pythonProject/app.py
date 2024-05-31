import time

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from mongoengine import connect
from src.controllers.location_controller import location
from src.controllers.reservation_controller import reservation_controller
from src.controllers.room_controller import room_controller

uri = "mongodb+srv://sjiroveanu:1234@cluster0.zaxvv4z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
connect(host=uri)

client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
time.sleep(1)


class FlaskIntializerApp(Flask):
    def run(self, host=None, port=None, debug=None, load_dotenv=None, **options):
        super(FlaskIntializerApp, self).run(host=host, port=port, debug=debug, load_dotenv=load_dotenv, **options)


app = FlaskIntializerApp("BACKEND")
app.register_blueprint(location)
app.register_blueprint(room_controller)
app.register_blueprint(reservation_controller)

db = client['Account']['Auth']

import firebase_admin
from firebase_admin import credentials, auth

# Initialize Firebase Admin
cred = credentials.Certificate(
    "/home/stefan_jiroveanu/react-travel-agency/travel-agency/pythonProject/proiect-daw-62898-firebase-adminsdk-1st9l-d0b59fcea1.json")
firebase_admin.initialize_app(cred)

CORS(app)


@app.route('/set-custom-claims', methods=['POST'])
def set_custom_claims():
    print(request.get_json())
    request_data = request.get_json()

    uid = request_data.get('uid')
    claims = request_data.get('claims')

    print(uid, claims)

    if not uid or not claims:
        return jsonify({'error': 'Missing uid or claims'}), 400

    try:
        user_record = auth.get_user(uid)
        if user_record.custom_claims:
            return jsonify({'message': f'User already has claims'}), 200

        auth.set_custom_user_claims(uid, claims)
        user = auth.get_user(uid)
        print(user.custom_claims)
        return jsonify({'message': f'Custom claims set for user {uid}'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
