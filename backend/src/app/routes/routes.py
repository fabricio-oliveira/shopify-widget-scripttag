from flask import Blueprint, jsonify, request
from repository.base import get_session
from repository.optin_repository import OptInRepository

bp = Blueprint("routes", __name__)


# Endpoint GET - returns carbon offset value
@bp.route("/api/carbonoffset/value", methods=["POST"])
def get_value():
    data = request.json
    print("carbon offset payload received:", data, flush=True)

    if not isinstance(data.get('total'), int):
        return jsonify({"error": "invalid data"}), 422

    price = data.get('total') / 100
    print("carbon offset price:", price, flush=True)

    return jsonify({"value": round(price * 0.02, 2)})


# Endpoint POST -  track optin
@bp.route("/api/optin/track", methods=["POST"])
def enable_offset():
    data = request.json
    print("OptIn payload received:", data, flush=True)

    data = request.json
    if not data:
        return jsonify({"error": "Empty request"}), 400

    merchant_url = data.get("merchant_url")
    user_email = data.get("user_email")
    cart_token = data.get("cart_token")
    carbon_offset_value = data.get("value")

    if not all([merchant_url, user_email, cart_token, carbon_offset_value]):
        return jsonify({"error": "Missing required fields"}), 422

    session = get_session()
    repo = OptInRepository(session)

    record = repo.add(
            merchant_url=str(merchant_url),
            user_email=str(user_email),
            cart_token=str(cart_token),
            carbon_offset_value=float(carbon_offset_value),
        )

    print("OptIn data created:", record, flush=True)
    return '', 204
