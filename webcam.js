document.addEventListener("DOMContentLoaded", function () {
    const cameraSelect = document.getElementById("cameraSelect");
    const webcam = document.getElementById("webcam");
    const canvas = document.getElementById("canvas");
    const output = document.getElementById("output");

    let currentStream = null;
    let captureInterval = null;

    // Get list of available cameras
    async function getCameras() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === "videoinput");

            if (videoDevices.length === 0) {
                output.innerText = "No video devices found.";
                return;
            }

            videoDevices.forEach(device => {
                const option = document.createElement("option");
                option.value = device.deviceId;
                option.textContent = device.label || `Camera ${cameraSelect.length + 1}`;
                cameraSelect.appendChild(option);
            });

            // Automatically select the first camera
            if (cameraSelect.length > 0) {
                cameraSelect.selectedIndex = 0;
                startCamera(videoDevices[0].deviceId); // Use the first available camera
            }

        } catch (error) {
            output.innerText = `Error getting camera list: ${error.message}`;
        }
    }

    // Start camera stream based on selected camera
    async function startCamera(deviceId) {
        try {
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop()); // Stop previous stream
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { deviceId: { exact: deviceId } }
            });

            webcam.srcObject = stream;
            currentStream = stream;

            // Start auto-capture process
            if (captureInterval) {
                clearInterval(captureInterval);
            }
            captureInterval = setInterval(() => {
                captureAndUpload();
            }, 30000); // Capture and upload every 10 seconds
        } catch (error) {
            output.innerText = `Error accessing camera: ${error.message}`;
        }
    }

    // Capture image from the webcam and upload it
    async function captureAndUpload() {
        if (!currentStream) {
            output.innerText = "No camera stream available.";
            return;
        }

        // Capture the image
        canvas.width = webcam.videoWidth;
        canvas.height = webcam.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(webcam, 0, 0, canvas.width, canvas.height);

        // Convert canvas to Blob and upload
        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append("file", blob, "captured_image.jpg");

            try {
                const response = await fetch("http://15.206.26.65:5000/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("Failed to upload captured image.");

                const result = await response.json();

                if (result.ai_response) {
                    formatAIResponse(result.ai_response); // Pass the response to a formatting function
                } else {
                    output.innerText = "AI response not available.";
                }
            } catch (error) {
                console.error("Error:", error);
                output.innerText = `Error: ${error.message}`;
            }
        }, "image/jpeg");
    }

    function formatAIResponse(responseText) {
        // Clear previous content
        output.innerHTML = "";

        // Split the response into lines (assuming newlines separate sections)
        const lines = responseText.split("\n");

        lines.forEach(line => {
            // Identify bold patterns based on example: "**Some Text**"
            const formattedLine = line.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

            // Wrap each line in a paragraph for readability
            const paragraph = document.createElement("p");
            paragraph.innerHTML = formattedLine;
            output.appendChild(paragraph);
        });
    }

    // Handle camera selection change
    cameraSelect.addEventListener("change", () => {
        const selectedDeviceId = cameraSelect.value;
        startCamera(selectedDeviceId);
    });

    // Initialize the camera list
    getCameras();
});
