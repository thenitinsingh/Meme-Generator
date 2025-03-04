function openimage() {
    let link = document.getElementById("urlInput").value.trim();
    let fileInput = document.getElementById("imageInput");
    let imgElement = document.getElementById("displayImage");
    let topText = document.getElementById("toptext").value;
    let bottomText = document.getElementById("bottomtext").value;
    let topTextOverlay = document.getElementById("topTextOverlay");
    let bottomTextOverlay = document.getElementById("bottomTextOverlay");
    let fontSize = document.querySelector(".dropbox").value + "px";
    let topColor = document.getElementById("toptext-color").value;
    let bottomColor = document.getElementById("bottomtext-color").value;
    if (link !== "" && fileInput.files.length > 0) {
        alert("Please provide either an image URL or upload a file, not both.");
        return;
    }   
    if (link !== "") {
        if (!link.startsWith("http://") && !link.startsWith("https://")) {
            link = "https://" + link;
        }
        imgElement.src = link;
    } else if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            imgElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please enter a valid URL or upload an image file.");
        return;
    }    
    imgElement.style.display = "block";
    topTextOverlay.textContent = topText;
    topTextOverlay.style.color = topColor;
    topTextOverlay.style.fontSize = fontSize;
    topTextOverlay.style.fontWeight = "bold";
    bottomTextOverlay.textContent = bottomText;
    bottomTextOverlay.style.color = bottomColor;
    bottomTextOverlay.style.fontSize = fontSize;
    bottomTextOverlay.style.fontWeight = "bold";
}
function download() {
    let link = document.getElementById("urlInput").value.trim();
    let fileInput = document.getElementById("imageInput");
    let topText = document.getElementById("toptext").value;
    let bottomText = document.getElementById("bottomtext").value;
    let fontSize = document.querySelector(".dropbox").value + "px";
    let topColor = document.getElementById("toptext-color").value;
    let bottomColor = document.getElementById("bottomtext-color").value;
    let img = new Image();
    img.crossOrigin = "Anonymous";    
    if (link !== "" && fileInput.files.length > 0) {
        alert("Please provide either an image URL or upload a file, not both.");
        return;
    }    
    if (link !== "") {
        img.src = link;
    } else if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please enter an image URL or upload a file.");
        return;
    }
    img.onload = function () {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = `bold ${fontSize} Arial`;
        ctx.textAlign = "center";    
        if (topText) {
            ctx.fillStyle = topColor;
            ctx.fillText(topText, canvas.width / 2, 50);
        }
        if (bottomText) {
            ctx.fillStyle = bottomColor;
            ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
        }      
        let imageURL = canvas.toDataURL("image/png");
        let downloadLink = document.createElement("a");
        downloadLink.href = imageURL;
        downloadLink.download = "meme.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };   
    img.onerror = function () {
        alert("Failed to load image. Please check the URL or uploaded file.");
    };
}
function deletefile() {
    let linkInput = document.getElementById("urlInput");
    let fileInput = document.getElementById("imageInput");    
    let link = linkInput.value.trim();
    let hasFile = fileInput.files.length > 0;   
    if (link !== "" && hasFile) {
        alert("Please provide either an image URL or upload a file, not both.");
        return;
    }   
    if (link !== "") {
        linkInput.value = ""; // Clear the URL input field
    } else if (hasFile) {
        fileInput.value = ""; // Clear the file input field
    } else {
        alert("No image to delete. Please enter an image URL or upload a file first.");
    }
}

