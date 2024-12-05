$(document).ready(function () {
  clearFields(); // Clear input fields on page load
  getAllVehicles(); // Load all vehicles into the table
});

// Save Vehicle
function saveVehicle() {
  let plateNumber = $("#plateNumber").val();
  let vehicleCategory = $("#vehicleCategory").val();
  let fuelType = $("#fuelType").val();
  let status = $("#status").val();
  let remarks = $("#remarks").val();

  $.ajax({
    method: "POST",
    contentType: "application/json",
    url: "http://localhost:8080/greenshadow/api/v1/vehicles",
    data: JSON.stringify({
      plateNumber: plateNumber,
      vehicleCategory: vehicleCategory,
      fuelType: fuelType,
      status: status,
      remarks: remarks,
    }),
    success: function (data) {
      alert("Vehicle saved successfully!");
      getAllVehicles(); // Refresh the vehicle list
      clearFields(); // Clear input fields
      $("#vehicleAddModal").modal("hide"); // Close modal
    },
    error: function (xhr, exception) {
      alert("Error while saving vehicle: " + (xhr.responseText || exception));
    },
  });
}

// Get All Vehicles
function getAllVehicles() {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/greenshadow/api/v1/vehicles/allVehicles",
    success: function (data) {
      if (Array.isArray(data)) {
        $("#vehicleTableBody").empty(); // Clear existing table rows
        data.forEach(function (veh) {
          let vehicleCode = veh.vehicleCode;
          let plateNumber = veh.plateNumber;
          let vehicleCategory = veh.vehicleCategory;
          let fuelType = veh.fuelType;
          let status = veh.status;
          let remarks = veh.remarks;

          let actionButtons = `
            <td>
              <button class="btn btn-success" onclick="viewVehicle('${vehicleCode}')" data-bs-toggle="modal" data-bs-target="#vehicleAddModal"><i class="bi bi-eye"></i></button>
              <button class="btn btn-primary" onclick="updateVehicle('${vehicleCode}')" data-bs-toggle="modal" data-bs-target="#vehicleAddModal"><i class="bi bi-pencil-square"></i></button>
              <button class="btn btn-danger" onclick="deleteVehicle('${vehicleCode}')"><i class="bi bi-trash"></i></button>
            </td>`;

          let row = `
            <tr id="vehicle-row-${vehicleCode}">
              <td>${vehicleCode}</td>
              <td>${plateNumber}</td>
              <td>${vehicleCategory}</td>
              <td>${fuelType}</td>
              <td>${status}</td>
              <td>${remarks}</td>
              ${actionButtons}
            </tr>`;

          $("#vehicleTableBody").append(row);
        });
      }
    },
    error: function (xhr, exception) {
      alert("Error fetching vehicles: " + (xhr.responseText || exception));
    }
  });
}

// View Vehicle Details
function viewVehicle(vehicleCode) {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/greenshadow/api/v1/vehicles/${vehicleCode}`,
    success: function (data) {
      if (data && data.vehicleCode) {
        $("#vehicleCode").val(data.vehicleCode).prop("disabled", true);
        $("#plateNumber").val(data.plateNumber).prop("disabled", true);
        $("#vehicleCategory").val(data.vehicleCategory).prop("disabled", true);
        $("#fuelType").val(data.fuelType).prop("disabled", true);
        $("#status").val(data.status).prop("disabled", true);
        $("#remarks").val(data.remarks).prop("disabled", true);
        $(".staff-id-container").show();
        $("#staffId").val(data.staffId || "").prop("disabled", true);

        $(".modal-title").text("View Vehicle Details");
        $("#saveBtn").hide();
        $("#updateBtn").hide();
        $("#clearBtn").hide();
      }
    },
    error: function (xhr, exception) {
      alert("Error fetching vehicle details: " + (xhr.responseText || exception));
    }
  });
}

// Update Vehicle
function updateVehicle(vehicleCode) {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/greenshadow/api/v1/vehicles/${vehicleCode}`,
    success: function (data) {
      if (data && data.vehicleCode) {
        $("#vehicleCode").val(data.vehicleCode).prop("disabled", true);
        $("#plateNumber").val(data.plateNumber).prop("disabled", false);
        $("#vehicleCategory").val(data.vehicleCategory).prop("disabled", false);
        $("#fuelType").val(data.fuelType).prop("disabled", false);
        $("#status").val(data.status).prop("disabled", false);
        $("#remarks").val(data.remarks).prop("disabled", false);
        $("#staffId").val(data.staffId || "").prop("disabled", false);

        $(".staff-id-container").show();
        $(".modal-title").text("Update Vehicle Details");
        $("#saveBtn").hide();
        $("#updateBtn").show();
        $("#clearBtn").show();
      }
    },
    error: function (xhr, exception) {
      alert("Error fetching vehicle details: " + (xhr.responseText || exception));
    }
  });
}

// Update Vehicle Details
function updateVehicleDetails() {
  let vehicleCode = $("#vehicleCode").val();
  let plateNumber = $("#plateNumber").val();
  let vehicleCategory = $("#vehicleCategory").val();
  let fuelType = $("#fuelType").val();
  let status = $("#status").val();
  let remarks = $("#remarks").val();
  let staffId = $("#staffId").val();

  $.ajax({
    method: "PATCH",
    contentType: "application/json",
    url: `http://localhost:8080/greenshadow/api/v1/vehicles/${vehicleCode}`,
    data: JSON.stringify({
      plateNumber: plateNumber,
      vehicleCategory: vehicleCategory,
      fuelType: fuelType,
      status: status,
      remarks: remarks,
      staffId: staffId,
    }),
    success: function (data) {
      alert("Vehicle updated successfully!");
      getAllVehicles(); // Refresh the vehicle list
      clearFields(); // Clear input fields
      $("#vehicleAddModal").modal("hide"); // Close modal
    },
    error: function (xhr, exception) {
      alert("Error while updating vehicle: " + (xhr.responseText || exception));
    },
  });
}

// Delete Vehicle
function deleteVehicle(vehicleCode) {
  if (confirm(`Are you sure you want to delete vehicle with Vehicle Code: ${vehicleCode}?`)) {
    $.ajax({
      method: "DELETE",
      url: `http://localhost:8080/greenshadow/api/v1/vehicles/${vehicleCode}`,
      success: function () {
        alert(`Vehicle with code ${vehicleCode} deleted successfully!`);
        $(`#vehicle-row-${vehicleCode}`).remove(); // Remove the row from the table
      },
      error: function (xhr, exception) {
        alert("Error while deleting vehicle: " + (xhr.responseText || exception));
      },
    });
  }
}

// Clear Fields
function clearFields() {
  $("#vehicleCode").val("");
  $("#plateNumber").val("");
  $("#vehicleCategory").val("");
  $("#fuelType").val("");
  $("#status").val("");
  $("#remarks").val("");
  $("#staffId").val("");
}

// Reset modal when opened
$("#vehicleAddModal").on("show.bs.modal", function () {
  clearFields();

  // Reset modal elements
  $("#vehicleCode").prop("disabled", false);
  $("#plateNumber").prop("disabled", false);
  $("#vehicleCategory").prop("disabled", false);
  $("#fuelType").prop("disabled", false);
  $("#status").prop("disabled", false);
  $("#remarks").prop("disabled", false);
  $("#staffId").prop("disabled", false);

  $(".staff-id-container").hide();

  // Default modal title and button visibility
  $(".modal-title").text("Add Vehicle");
  $("#saveBtn").show();
  $("#clearBtn").show();
  $("#updateBtn").hide();
});