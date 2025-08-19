import os
from src.app import create_app
from flask import send_from_directory

app = create_app()

if __name__ == "__main__":
    host = os.environ.get("FLASK_HOST", "0.0.0.0")
    port = int(os.environ.get("FLASK_PORT", 5001))
    debug = os.environ.get("FLASK_DEBUG", "1") == "1"

    app.logger.info(f"Starting Flask app on {host}:{port} (debug={debug})")
    app.run(host=host, port=port, debug=debug)


@app.route('/public/<path:filename>')
def serve_public(filename):
    return send_from_directory('public', filename)
