document.addEventListener("DOMContentLoaded", function () {
  const fieldImage1Input = document.getElementById("fieldImage1");
  const fieldImage2Input = document.getElementById("fieldImage2");
  const imagePreviewContent1 = document.getElementById("imagePreviewContent1");
  const imagePreviewContent2 = document.getElementById("imagePreviewContent2");

  // Function to handle image preview
  function handleImagePreview(inputElement, previewElement) {
    // Clear previous preview
    previewElement.innerHTML = "";

    const file = inputElement.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = "Image Preview";
        img.style.maxWidth = "100%";
        img.style.height = "auto";
        img.style.border = "1px solid #ddd";
        img.style.padding = "5px";
        previewElement.appendChild(img);
      };

      reader.readAsDataURL(file);
    } else {
      // Show placeholder if no file is selected
      previewElement.innerHTML = `
          <div class="image-preview-placeholder">
            <i class="bi bi-image" style="font-size: 3rem"></i>
            <p>Image Preview</p>
          </div>
        `;
    }
  }

  // Event listeners for file inputs
  fieldImage1Input.addEventListener("change", function () {
    handleImagePreview(fieldImage1Input, imagePreviewContent1);
  });

  fieldImage2Input.addEventListener("change", function () {
    handleImagePreview(fieldImage2Input, imagePreviewContent2);
  });
});
