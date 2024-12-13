from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from picamera2 import Picamera2, CameraError
import os

app = Flask(__name__)
CORS(app)

# Initialize the USB Camera
try:
    camera = Picamera2()
    print("Configuring camera on /dev/video0...")
    camera.configure(camera.create_still_configuration())
    print("Camera configured successfully.")
except Exception as e:
    camera = None
    print(f"Failed to initialize camera: {e}")

@app.route('/capture', methods=['GET'])
def capture_image():
    if camera is None:
        return jsonify({"error": "Camera not initialized"}), 500

    try:
        camera.start()
        image_path = "captured_image.jpg"
        camera.capture_file(image_path)
        print(f"Image saved to {image_path}")
        return send_file(image_path, mimetype='image/jpeg')
    except Exception as e:
        return jsonify({"error": f"Failed to capture image: {e}"}), 500
    finally:
        camera.stop()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
