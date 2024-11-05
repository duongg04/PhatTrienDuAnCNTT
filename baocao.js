function openFolder(folderName) {
    document.getElementById("fileList").innerHTML = `<p>Contents of ${folderName}:</p>`;
}

function addFolder() {
    const folderName = prompt("Enter the new folder name:");
    if (folderName) {
        const newFolder = document.createElement("div");
        newFolder.className = "folder";
        newFolder.textContent = folderName;
        newFolder.onclick = () => openFolder(folderName);
        document.getElementById("folderList").appendChild(newFolder);
    }
}

function deleteFolder() {
    const folderList = document.getElementById("folderList");
    if (folderList.children.length > 0) {
        folderList.removeChild(folderList.lastChild);
    }
}

function triggerFileInput() {
    document.getElementById("fileInput").click();
}

function addFiles(event) {
    const fileList = document.getElementById("fileList");
    const files = event.target.files;

    for (const file of files) {
        const fileDiv = document.createElement("div");
        fileDiv.className = "file";
        fileDiv.textContent = file.name;
        
        // Event listener to view file content when clicked
        fileDiv.onclick = () => viewFileContent(file);

        const deleteButton = document.createElement("span");
        deleteButton.textContent = "X";
        deleteButton.style.cursor = "pointer";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = (e) => {
            e.stopPropagation();  // Prevent triggering viewFileContent
            fileDiv.remove();
        };

        fileDiv.appendChild(deleteButton);
        fileList.appendChild(fileDiv);
    }
}

function deleteFile() {
    const fileList = document.getElementById("fileList");
    if (fileList.children.length > 1) { // Ensures at least the header stays
        fileList.removeChild(fileList.lastChild);
    }
}

// Function to view file content in the preview area
function viewFileContent(file) {
    const filePreview = document.getElementById("filePreview");
    const fileContent = document.getElementById("fileContent");
    const pdfViewer = document.getElementById("pdfViewer");

    // Reset display
    fileContent.style.display = "none";
    pdfViewer.style.display = "none";

    if (file.type === "application/pdf") {
        // Show the PDF in iframe
        const pdfUrl = URL.createObjectURL(file);
        pdfViewer.src = pdfUrl;
        pdfViewer.style.display = "block";
    } else if (file.type.startsWith("text/")) {
        // Show text content in <pre> element
        const reader = new FileReader();
        reader.onload = function(event) {
            fileContent.textContent = event.target.result;
            fileContent.style.display = "block";
        };
        reader.onerror = function() {
            fileContent.textContent = "Unable to read file content.";
            fileContent.style.display = "block";
        };
        reader.readAsText(file);
    } else {
        alert("Unsupported file type. Only text and PDF files are supported.");
    }
}
