const addFileButton = document.getElementById("addFileButton");
const removeFileButton = document.getElementById("removeFileButton");
const fileTableBody = document.getElementById("fileTableBody");
const uploadForm = document.getElementById("uploadForm");

const fixedPrompt = `Whats the major color in this image?`;

addFileButton.addEventListener('click', function () {
    const row = document.createElement("tr");
    const fileCell = document.createElement("td");
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "file[]";
    fileInput.required = true;
    fileCell.appendChild(fileInput);
    row.appendChild(fileCell);
    fileTableBody.appendChild(row);
    removeFileButton.style.display = "inline-block";
});

removeFileButton.addEventListener('click', function () {
    if (fileTableBody.rows.length > 1) {
        fileTableBody.deleteRow(fileTableBody.rows.length - 1);
    }
    if (fileTableBody.rows.length <= 1) {
        removeFileButton.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById("uploadForm");

    uploadForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent form from submitting normally
        const formData = new FormData(uploadForm);

        // Add fetch logic here
        try {
            const response = await fetch("http://15.206.26.65:5000/upload", {
                method: "POST",
                body: formData,
            });            

            if (!response.ok) throw new Error("Failed to upload files to the server");

            const result = await response.json();
            document.getElementById("output").innerText = result.ai_response || "AI response not available.";
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("output").innerText = `Error: ${error.message}`;
        }
    });
});
