$(document).ready(function () {
  clearFields(); // Clear input fields on page load
  getAllStaff(); // Load all staff into the table
});

// Save Staff
function saveStaff() {
  let firstName = $("#firstName").val();
  let lastName = $("#lastName").val();
  let designation = $("#designation").val();
  let role = $("#role").val();
  let gender = $("#gender").val();
  let dob = $("#dob").val();
  let joinedDate = $("#joinedDate").val();
  let addressName = $("#addressName").val();
  let addressLane = $("#addressLane").val();
  let addressCity = $("#addressCity").val();
  let addressState = $("#addressState").val();
  let addressCode = $("#addressCode").val();
  let contactNo = $("#contactNo").val();
  let email = $("#email").val();

  $.ajax({
    method: "POST",
    contentType: "application/json",
    url: "http://localhost:8080/greenshadow/api/v1/staffs",
    async: true,
    data: JSON.stringify({
      id: "",
      firstName: firstName,
      lastName: lastName,
      designation: designation,
      role: role,
      gender: gender,
      dob: dob,
      joinedDate: joinedDate,
      addressName: addressName,
      addressLane: addressLane,
      addressCity: addressCity,
      addressState: addressState,
      addressCode: addressCode,
      contactNo: contactNo,
      email: email,
    }),
    success: function (data) {
      alert("Staff saved successfully!");
      getAllStaff();
      clearFields();
      $("#staffAddModal").modal("hide");
    },
    error: function (xhr, exception) {
      alert("Error while saving staff: " + (xhr.responseText || exception));
    },
  });
}

// Get All Staff
function getAllStaff() {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/greenshadow/api/v1/staffs/allStaffs",
    async: true,
    success: function (data) {
      if (Array.isArray(data)) {
        $("#staffTableBody").empty();
        for (let staff of data) {
          let id = staff.id;
          let name = `${staff.firstName} ${staff.lastName}`;
          let designation = staff.designation;
          let role = staff.role;
          let contactNo = staff.contactNo;
          let email = staff.email;
          let joinedDate = staff.joinedDate;

          var actionButtons = `
            <td>
                <button class="btn btn-success" onclick="viewStaff('${id}')" data-bs-toggle="modal" data-bs-target="#staffAddModal"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="updateStaff('${id}')" data-bs-toggle="modal" data-bs-target="#staffAddModal"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteStaff('${id}')"><i class="bi bi-trash"></i></button>
            </td>`;

          var row = `
                <tr>
                  <td>${id}</td>
                  <td>${name}</td>
                  <td>${designation}</td>
                  <td>${role}</td>
                  <td>${contactNo}</td>
                  <td>${email}</td>
                  <td>${joinedDate}</td>
                  ${actionButtons}
                </tr>`;

          $("#staffTableBody").append(row);
        }
      }
    },
  });
}

// View Staff Details
function viewStaff(id) {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/greenshadow/api/v1/staffs/${id}`,
    success: function (data) {
      if (data && data.id) {
        $("#id").val(data.id).prop("disabled", true);
        $("#firstName").val(data.firstName).prop("disabled", true);
        $("#lastName").val(data.lastName).prop("disabled", true);
        $("#designation").val(data.designation).prop("disabled", true);
        $("#role").val(data.role).prop("disabled", true);
        $("#gender").val(data.gender).prop("disabled", true);
        $("#dob").val(data.dob).prop("disabled", true);
        $("#joinedDate").val(data.joinedDate).prop("disabled", true);
        $("#addressName").val(data.addressName).prop("disabled", true);
        $("#addressLane").val(data.addressLane).prop("disabled", true);
        $("#addressCity").val(data.addressCity).prop("disabled", true);
        $("#addressState").val(data.addressState).prop("disabled", true);
        $("#addressCode").val(data.addressCode).prop("disabled", true);
        $("#contactNo").val(data.contactNo).prop("disabled", true);
        $("#email").val(data.email).prop("disabled", true);

        $(".modal-title").text("View Staff Details");
        $("#saveBtn").hide();
        $("#clearBtn").hide();
        $("#updateBtn").hide();
      } else {
        alert(`Staff details not found for Staff ID: ${id}`);
      }
    },
    error: function (xhr, status, error) {
      alert(`Error while fetching staff details: ${xhr.responseText || error}`);
    },
  });
}

// Update Staff Details
function updateStaff(id) {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/greenshadow/api/v1/staffs/${id}`,
    success: function (data) {
      if (data && data.id) {
        $("#id").val(data.id).prop("disabled", true);
        $("#firstName").val(data.firstName).prop("disabled", false);
        $("#lastName").val(data.lastName).prop("disabled", false);
        $("#designation").val(data.designation).prop("disabled", false);
        $("#role").val(data.role).prop("disabled", false);
        $("#gender").val(data.gender).prop("disabled", false);
        $("#dob").val(data.dob).prop("disabled", false);
        $("#joinedDate").val(data.joinedDate).prop("disabled", false);
        $("#addressName").val(data.addressName).prop("disabled", false);
        $("#addressLane").val(data.addressLane).prop("disabled", false);
        $("#addressCity").val(data.addressCity).prop("disabled", false);
        $("#addressState").val(data.addressState).prop("disabled", false);
        $("#addressCode").val(data.addressCode).prop("disabled", false);
        $("#contactNo").val(data.contactNo).prop("disabled", false);
        $("#email").val(data.email).prop("disabled", false);

        $(".modal-title").text("Update Staff Details");
        $("#saveBtn").hide();
        $("#clearBtn").hide();
        $("#updateBtn").show();
      } else {
        alert(`Staff details not found for Staff ID: ${id}`);
      }
    },
    error: function (xhr, status, error) {
      alert(
        `Error while fetching staff details for update: ${
          xhr.responseText || error
        }`
      );
    },
  });
}

// Update Staff on Server
function updateStaffDetails() {
  let id = $("#id").val();
  let firstName = $("#firstName").val();
  let lastName = $("#lastName").val();
  let designation = $("#designation").val();
  let role = $("#role").val();
  let gender = $("#gender").val();
  let dob = $("#dob").val();
  let joinedDate = $("#joinedDate").val();
  let addressName = $("#addressName").val();
  let addressLane = $("#addressLane").val();
  let addressCity = $("#addressCity").val();
  let addressState = $("#addressState").val();
  let addressCode = $("#addressCode").val();
  let contactNo = $("#contactNo").val();
  let email = $("#email").val();

  $.ajax({
    method: "PATCH",
    contentType: "application/json",
    url: `http://localhost:8080/greenshadow/api/v1/staffs/${id}`,
    async: true,
    data: JSON.stringify({
      id: id,
      firstName: firstName,
      lastName: lastName,
      designation: designation,
      role: role,
      gender: gender,
      dob: dob,
      joinedDate: joinedDate,
      addressName: addressName,
      addressLane: addressLane,
      addressCity: addressCity,
      addressState: addressState,
      addressCode: addressCode,
      contactNo: contactNo,
      email: email,
    }),
    success: function (data) {
      alert("Staff updated successfully!");
      getAllStaff();
      clearFields();
      $("#staffAddModal").modal("hide");
    },
    error: function (xhr, exception) {
      alert("Error while updating staff: " + (xhr.responseText || exception));
    },
  });
}

// Delete Staff
function deleteStaff(id) {
  if (confirm(`Are you sure you want to delete staff with Staff ID: ${id}?`)) {
    $.ajax({
      method: "DELETE",
      url: `http://localhost:8080/greenshadow/api/v1/staffs/${id}`,
      success: function (response) {
        alert(`Staff with ID ${staffId} deleted successfully!`);
        getAllStaff();
      },
      error: function (xhr, exception) {
        alert("Error while deleting staff: " + (xhr.responseText || exception));
      },
    });
  }
}

// Clear input fields
function clearFields() {
  $("#id").val("");
  $("#firstName").val("");
  $("#lastName").val("");
  $("#designation").val("");
  $("#role").val("");
  $("#gender").val("");
  $("#dob").val("");
  $("#joinedDate").val("");
  $("#addressName").val("");
  $("#addressLane").val("");
  $("#addressCity").val("");
  $("#addressState").val("");
  $("#addressCode").val("");
  $("#contactNo").val("");
  $("#email").val("");

  $(".modal-title").text("Add Staff");
  $("#saveBtn").show();
  $("#clearBtn").show();
  $("#updateBtn").hide();
}

// Reset modal when opened
$("#staffAddModal").on("show.bs.modal", function () {
  clearFields();

  // Reset visibility and states
  $("#id").prop("disabled", false);
  $("#firstName").prop("disabled", false);
  $("#lastName").prop("disabled", false);
  $("#designation").prop("disabled", false);
  $("#role").prop("disabled", false);
  $("#gender").prop("disabled", false);
  $("#dob").prop("disabled", false);
  $("#joinedDate").prop("disabled", false);
  $("#addressName").prop("disabled", false);
  $("#addressLane").prop("disabled", false);
  $("#addressCity").prop("disabled", false);
  $("#addressState").prop("disabled", false);
  $("#addressCode").prop("disabled", false);
  $("#contactNo").prop("disabled", false);
  $("#email").prop("disabled", false);

  // Default modal title and button visibility
  $(".modal-title").text("Add Staff");
  $("#saveBtn").show();
  $("#clearBtn").show();
  $("#updateBtn").hide();
});
