const API_KEY = "AIzaSyDHbqUhvx18fShdHL12cCCrtnJ8Dd7bA44";

// API Key declared as a variable

document.getElementById("sendButton").addEventListener("click", async () => {
    const imageInput = document.getElementById("imageUpload").files[0];

    if (!imageInput) {
        alert("Please upload an image.");
        return;
    }

    // Prepare the form data to send to the backend
    const formData = new FormData();
    formData.append("image", imageInput); // Add the image file

    try {
        // Send the form data to the backend
        const response = await fetch('/process-request', { // Your backend endpoint
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response content received.";

            // Clear previous content
            const responseTextElement = document.getElementById("responseText");
            responseTextElement.textContent = "";  // Clear previous text

            // Simulate the typing effect
            typeResponse(result, responseTextElement);
        } else {
            document.getElementById("responseText").textContent = `Error: ${response.status}`;
        }
    } catch (error) {
        document.getElementById("responseText").textContent = `Error: ${error.message}`;
    }
});

// Function to simulate typing effect
const typeResponse = (text, element) => {
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(interval);
        }
    }, 50); // Adjust speed of the typing effect (in milliseconds)
};

// Image Preview Functionality
document.getElementById("imageUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.createElement("img");
            imagePreview.src = e.target.result;
            imagePreview.style.maxWidth = "300px"; // Adjust size if needed
            imagePreview.style.marginTop = "20px"; // Add some space above the image
            const previewContainer = document.getElementById("imagePreviewContainer");
            previewContainer.innerHTML = ''; // Clear any previous preview
            previewContainer.appendChild(imagePreview);
        };
        reader.readAsDataURL(file); // Show image preview
    }
});
