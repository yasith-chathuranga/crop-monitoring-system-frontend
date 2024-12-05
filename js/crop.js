$(document).ready(function () {
  clearFields(); // Clear input fields on page load
  getAllCrops(); // Load all crops into the table
});

// Save Crop
function saveCrop() {
  let cropCommonName = $("#cropCommonName").val();
  let cropScientificName = $("#cropScientificName").val();
  let cropImage = $("#cropImage")[0].files[0];
  let category = $("#category").val();
  let cropSeason = $("#cropSeason").val();

  // Create form data for image upload
  let formData = new FormData();
  formData.append("cropCommonName", cropCommonName);
  formData.append("cropScientificName", cropScientificName);
  formData.append("category", category);
  formData.append("cropSeason", cropSeason);
  formData.append("cropImage", cropImage);

  $.ajax({
    method: "POST",
    url: "http://localhost:8080/greenshadow/api/v1/crops",
    async: true,
    processData: false,
    contentType: false,
    data: formData,
    success: function (data) {
      alert("Crop saved successfully!");
      getAllCrops();
      clearFields();
      $("#cropAddModal").modal("hide");
    },
    error: function (xhr, exception) {
      alert("Error while saving crop: " + (xhr.responseText || exception));
    },
  });
}

// Get All Crops
function getAllCrops() {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/greenshadow/api/v1/crops/allCrops",
    async: true,
    success: function (data) {
      if (Array.isArray(data)) {
        $("#cropTableBody").empty();
        for (let crop of data) {
          let cropCode = crop.cropCode;
          let cropCommonName = crop.cropCommonName;
          let category = crop.category;
          let cropSeason = crop.cropSeason;
          let fieldCode = crop.fieldCode || "N/A";

          var actionButtons = `
            <td>
                <button class="btn btn-success" onclick="viewCrop('${cropCode}')" data-bs-toggle="modal" data-bs-target="#cropAddModal"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="updateCrop('${cropCode}')" data-bs-toggle="modal" data-bs-target="#cropAddModal"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteCrop('${cropCode}')"><i class="bi bi-trash"></i></button>
            </td>`;

          var row = `
                <tr>
                  <td>${cropCode}</td>
                  <td>${cropCommonName}</td>
                  <td>${category}</td>
                  <td>${cropSeason}</td>
                  <td>${fieldCode}</td>
                  ${actionButtons}
                </tr>`;

          $("#cropTableBody").append(row);
        }
      }
    },
  });
}

// View Crop Details
function viewCrop(cropCode) {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/greenshadow/api/v1/crops/${cropCode}`,
    success: function (data) {
      if (data && data.cropCode) {
        $("#cropCode").val(data.cropCode).prop("disabled", true);
        $("#cropCommonName").val(data.cropCommonName).prop("disabled", true);
        $("#cropScientificName")
          .val(data.cropScientificName)
          .prop("disabled", true);
        $("#category").val(data.category).prop("disabled", true);
        $("#cropSeason").val(data.cropSeason).prop("disabled", true);

        $(".modal-title").text("View Crop Details");
        $("#saveBtn").hide();
        $("#clearBtn").hide();
        $("#updateBtn").hide();
      } else {
        alert(`Crop details not found for Crop Code: ${cropCode}`);
      }
    },
    error: function (xhr, status, error) {
      alert(`Error while fetching crop details: ${xhr.responseText || error}`);
    },
  });
}

// Update Crop Details
function updateCrop(cropCode) {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/greenshadow/api/v1/crops/${cropCode}`,
    success: function (data) {
      if (data && data.cropCode) {
        $("#cropCode").val(data.cropCode).prop("disabled", true);
        $("#updateCropCommonName")
          .val(data.updateCropCommonName)
          .prop("disabled", false);
        $("#updateCropScientificName")
          .val(data.updateCropScientificName)
          .prop("disabled", false);
        $("#updateCategory").val(data.updateCategory).prop("disabled", false);
        $("#updateCropSeason")
          .val(data.updateCropSeason)
          .prop("disabled", false);
        $("#updateCropImage").val(data.updateCropImage).prop("disabled", false);
        $("#fieldCode").val(data.fieldCode).prop("disabled", false);

        $(".modal-title").text("Update Crop Details");
        $("#saveBtn").hide();
        $("#clearBtn").hide();
        $("#updateBtn").show();
      } else {
        alert(`Crop details not found for Crop Code: ${cropCode}`);
      }
    },
    error: function (xhr, status, error) {
      alert(
        `Error while fetching crop details for update: ${
          xhr.responseText || error
        }`
      );
    },
  });
}

// Update Crop on Server
function updateCropDetails() {
  let cropCode = $("#cropCode").val();
  let updateCropCommonName = $("#updateCropCommonName").val();
  let updateCropScientificName = $("#updateCropScientificName").val();
  let updateCategory = $("#updateCategory").val();
  let updateCropSeason = $("#updateCropSeason").val();
  let updateCropImage = $("#updateCropImage").val();
  let fieldCode = $("#fieldCode").val();

  $.ajax({
    method: "PATCH",
    contentType: "application/json",
    url: `http://localhost:8080/greenshadow/api/v1/crops/${cropCode}`,
    async: true,
    data: JSON.stringify({
      cropCode: cropCode,
      updateCropCommonName: updateCropCommonName,
      updateCropScientificName: updateCropScientificName,
      updateCategory: updateCategory,
      updateCropSeason: updateCropSeason,
      updateCropImage: updateCropImage,
      fieldCode: fieldCode,
    }),
    success: function (data) {
      alert("Crop updated successfully!");
      getAllCrops();
      clearFields();
      $("#cropAddModal").modal("hide");
    },
    error: function (xhr, exception) {
      alert("Error while updating crop: " + (xhr.responseText || exception));
    },
  });
}

// Delete Crop
function deleteCrop(cropCode) {
  if (
    confirm(`Are you sure you want to delete crop with Crop Code: ${cropCode}?`)
  ) {
    $.ajax({
      method: "DELETE",
      url: `http://localhost:8080/greenshadow/api/v1/crops/${cropCode}`,
      success: function (response) {
        alert(`Crop with code ${cropCode} deleted successfully!`);
        getAllCrops();
      },
      error: function (xhr, status, error) {
        alert("Error while deleting crop: " + (xhr.responseText || error));
      },
    });
  }
}

// Clear Fields
function clearFields() {
  $("#cropCode").val("");
  $("#cropCommonName").val("");
  $("#cropScientificName").val("");
  $("#category").val("");
  $("#cropSeason").val("");
}

// Reset modal when opened
$("#cropAddModal").on("show.bs.modal", function () {
  clearFields();

  // Default modal title and button visibility
  $(".modal-title").text("Add Crop");
  $("#saveBtn").show();
  $("#clearBtn").show();
  $("#updateBtn").hide();
});
