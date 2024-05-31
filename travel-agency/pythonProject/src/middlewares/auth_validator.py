from functools import wraps
from flask import request, jsonify
import firebase_admin
from firebase_admin import auth


def check_auth_with_claims(role_required=None):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            # Check for authorization header
            auth_header = request.headers.get('Authorization')
            if not auth_header:
                return jsonify({'error': 'Authorization header is missing'}), 401

            # Extract the token
            parts = auth_header.split()
            if parts[0].lower() != 'bearer':
                return jsonify({'error': 'Authorization header must start with Bearer'}), 401
            elif len(parts) == 1:
                return jsonify({'error': 'Token not found'}), 401
            elif len(parts) > 2:
                return jsonify({'error': 'Authorization header must be Bearer token'}), 401

            token = parts[1]
            try:
                # Verify the token
                decoded_token = auth.verify_id_token(token)
                user_role = decoded_token.get('role', 'undefined')

                if not isinstance(role_required, dict) and role_required != user_role:
                    return jsonify({'error': 'Insufficient permissions'}), 403
                elif isinstance(role_required, dict) and role_required and not role_required[user_role]:
                    return jsonify({'error': 'Insufficient permissions'}), 403

                # Token is valid, and required claims are present
                return f( *args, **kwargs)
            except ValueError as e:
                return jsonify({'error': str(e)}), 403

        return wrapper

    return decorator
