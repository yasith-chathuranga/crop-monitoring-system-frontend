$(document).ready(function () {
  clearFields(); // Clear input fields on page load
  getAllEquipments(); // Load all equipment into the table
});

// Save Equipment
function saveEquipment() {
  let name = $("#name").val();
  let type = $("#type").val();
  let status = $("#status").val();

  $.ajax({
    method: "POST",
    contentType: "application/json",
    url: "http://localhost:8080/greenshadow/api/v1/equipments",
    async: true,
    data: JSON.stringify({
      equipmentId: "",
      name: name,
      type: type,
      status: status,
    }),
    success: function (data) {
      alert("Equipment saved successfully!");
      getAllEquipments();
      clearFields();
      $("#equipmentAddModal").modal("hide");
    },
    error: function (xhr, exception) {
      alert("Error while saving equipment: " + (xhr.responseText || exception));
    },
  });
}

// Get All Equipments
function getAllEquipments() {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/greenshadow/api/v1/equipments/allEquipments",
    async: true,
    success: function (data) {
      if (Array.isArray(data)) {
        $("#equipmentTableBody").empty();
        for (let equip of data) {
          let equipmentId = equip.equipmentId;
          let name = equip.name;
          let type = equip.type;
          let status = equip.status;

          var actionButtons = `
              <td>
                  <button class="btn btn-success" onclick="viewEquipment('${equipmentId}')" data-bs-toggle="modal" data-bs-target="#equipmentAddModal"><i class="bi bi-eye"></i></button>
                  <button class="btn btn-primary" onclick="updateEquipment('${equipmentId}')" data-bs-toggle="modal" data-bs-target="#equipmentAddModal"><i class="bi bi-pencil-square"></i></button>
                  <button class="btn btn-danger" onclick="deleteEquipment('${equipmentId}')"><i class="bi bi-trash"></i></button>
              </td>`;

          var row = `
                  <tr>
                    <td>${equipmentId}</td>
                    <td>${name}</td>
                    <td>${type}</td>
                    <td>${status}</td>
                    ${actionButtons}
                  </tr>`;

          $("#equipmentTableBody").append(row);
        }
      }
    },
  });
}

// View Equipment Details
function viewEquipment(equipmentId) {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/greenshadow/api/v1/equipments/${equipmentId}`,
    success: function (data) {
      if (data && data.equipmentId) {
        $("#equipmentId").val(data.equipmentId).prop("disabled", true);
        $("#name").val(data.name).prop("disabled", true);
        $("#type").val(data.type).prop("disabled", true);
        $("#status").val(data.status).prop("disabled", true);

        $(".modal-title").text("View Equipment Details");
        $("#saveBtn").hide();
        $("#clearBtn").hide();
        $("#updateBtn").hide();
      } else {
        alert(`Equipment details not found for Equipment ID: ${equipmentId}`);
      }
    },
    error: function (xhr, status, error) {
      alert(
        `Error while fetching equipment details: ${xhr.responseText || error}`
      );
    },
  });
}

// Update Equipment Details
function updateEquipment(equipmentId) {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/greenshadow/api/v1/equipments/${equipmentId}`,
    success: function (data) {
      if (data && data.equipmentId) {
        $("#equipmentId").val(data.equipmentId).prop("disabled", true);
        $("#name").val(data.name).prop("disabled", false);
        $("#type").val(data.type).prop("disabled", false);
        $("#status").val(data.status).prop("disabled", false);

        $(".modal-title").text("Update Equipment Details");
        $("#saveBtn").hide();
        $("#clearBtn").hide();
        $("#updateBtn").show();
      } else {
        alert(`Equipment details not found for Equipment ID: ${equipmentId}`);
      }
    },
    error: function (xhr, status, error) {
      alert(
        `Error while fetching equipment details for update: ${
          xhr.responseText || error
        }`
      );
    },
  });
}

// Update Equipment on Server
function updateEquipmentDetails() {
  let equipmentId = $("#equipmentId").val();
  let name = $("#name").val();
  let type = $("#type").val();
  let status = $("#status").val();

  $.ajax({
    method: "PATCH",
    contentType: "application/json",
    url: `http://localhost:8080/greenshadow/api/v1/equipments/${equipmentId}`,
    async: true,
    data: JSON.stringify({
      equipmentId: equipmentId,
      name: name,
      type: type,
      status: status,
    }),
    success: function (data) {
      alert("Equipment updated successfully!");
      getAllEquipments();
      clearFields();
      $("#equipmentAddModal").modal("hide");
    },
    error: function (xhr, exception) {
      alert(
        "Error while updating equipment: " + (xhr.responseText || exception)
      );
    },
  });
}

// Delete Equipment
function deleteEquipment(equipmentId) {
  if (
    confirm(
      `Are you sure you want to delete equipment with Equipment ID: ${equipmentId}?`
    )
  ) {
    $.ajax({
      method: "DELETE",
      url: `http://localhost:8080/greenshadow/api/v1/equipments/${equipmentId}`,
      success: function (response) {
        alert(`Equipment with ID ${equipmentId} deleted successfully!`);
        getAllEquipments();
      },
      error: function (xhr, status, error) {
        alert("Error while deleting equipment: " + (xhr.responseText || error));
      },
    });
  }
}

// Clear Fields
function clearFields() {
  $("#equipmentId").val("");
  $("#name").val("");
  $("#type").val("");
  $("#status").val("");
}

// Reset modal when opened
$("#equipmentAddModal").on("show.bs.modal", function () {
  clearFields();

  // Reset visibility and states
  $("#equipmentId").prop("disabled", false);
  $("#name").prop("disabled", false);
  $("#type").prop("disabled", false);
  $("#status").prop("disabled", false);

  // Default modal title and button visibility
  $(".modal-title").text("Add Equipment");
  $("#saveBtn").show();
  $("#clearBtn").show();
  $("#updateBtn").hide();
});
