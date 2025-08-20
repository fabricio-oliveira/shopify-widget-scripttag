import os
from flask import Flask
from flask_cors import CORS


def create_app() -> Flask:
    app = Flask(__name__, static_folder='public')

    # Enable CORS for all origins or restrict it for your Shopify store
    origins = os.environ.get("CORS_ORIGINS", "")
    origins_list = [url.strip() for url in origins.split(",") if url]

    print("* CORS origins: {}".format(origins_list))
    CORS(app, origins=origins_list, supports_credentials=True)

    # Import and register the blueprint
    from .routes.routes import bp
    app.register_blueprint(bp)

    return app
