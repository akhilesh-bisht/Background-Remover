const removeBtn = document.querySelector("#removeBgButton");
const finalImage = document.querySelector("#outputContainer");
const loadingElement = document.querySelector("#loadingElement");

removeBtn.addEventListener("click", async () => {
  const fileInput = document.querySelector("#imageInput");
  const files = fileInput.files;

  if (files.length === 0) {
    alert("Please select an image.");
    return;
  }

  const file = files[0];
  const imageReader = new FileReader();

  imageReader.onload = async () => {
    const formData = new FormData();
    formData.append("image_file", file);
    loadingElement.classList.remove("hidden");

    try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": "ywYAqjL72qicR3Tw4vYdfpSR",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to remove background`);
      }
      console.log(response);

      const blob = await response.blob();
      console.log(blob);

      const url = URL.createObjectURL(blob);

      finalImage.innerHTML = `
            <img src="${url}" alt="Processed Image" class="max-w-full rounded mb-4">
            <a href="${url}" download="processed-image.png" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Download Image
            </a>
          `;
    } catch (error) {
      console.error("Error:", error);
      alert(`Error processing image: ${error.message}`);
    } finally {
      loadingElement.classList.add("hidden");
    }
  };

  imageReader.readAsDataURL(file);
});
