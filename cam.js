document.addEventListener("DOMContentLoaded", function () {
    const addFileButton = document.getElementById("addFileButton");
    const removeFileButton = document.getElementById("removeFileButton");
    const fileTableBody = document.getElementById("fileTableBody");
    const captureButton = document.getElementById("captureButton");
    const outputElement = document.getElementById("output");

    // Add another file row
    addFileButton.addEventListener("click", function () {
        const row = document.createElement("tr");
        const fileCell = document.createElement("td");
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.name = "file";
        fileInput.required = true;
        fileCell.appendChild(fileInput);
        row.appendChild(fileCell);
        fileTableBody.appendChild(row);
        removeFileButton.style.display = "inline-block";
    });

    // Remove last file row
    removeFileButton.addEventListener("click", function () {
        if (fileTableBody.rows.length > 1) {
            fileTableBody.deleteRow(fileTableBody.rows.length - 1);
        }
        if (fileTableBody.rows.length <= 1) {
            removeFileButton.style.display = "none";
        }
    });

    // Capture and analyze image using Pi Camera
    captureButton.addEventListener("click", async function () {
        try {
            // Capture image from Pi Camera
            const captureResponse = await fetch("http://192.168.252.78:5000/capture");
            if (!captureResponse.ok) throw new Error("Failed to capture image");

            // Analyze the captured image
            const analyzeResponse = await fetch("http://192.168.252.78:5000/analyze", {
                method: "POST",
                body: new URLSearchParams({ prompt: "Whats the major color in this image?" }),
            });
            if (!analyzeResponse.ok) throw new Error("Failed to analyze image");

            // Display AI response
            const result = await analyzeResponse.json();
            outputElement.innerText = result.ai_response || "AI response not available.";
        } catch (error) {
            console.error("Error:", error);
            outputElement.innerText = `Error: ${error.message}`;
        }
    });
});
