$(document).ready(function () {
  function getAllMonitoringLogs() {
    $.ajax({
      url: "http://localhost:8080/greenshadow/api/v1/monitoringLogs/allMonitoringLogs",
      type: "GET",
      dataType: "json",
      success: function (data) {
        populateMonitoringLogTable(data);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching monitoring logs:", error);
        alert("Error fetching monitoring logs. Please try again later.");
      },
    });
  }

  // Function to populate the monitoring logs table
  function populateMonitoringLogTable(data) {
    const tableBody = $("#monitoringLogTableBody");
    tableBody.empty(); // Clear any existing table rows
  
    // Loop through the data and create rows for each monitoring log
    data.forEach(function (log) {
      const row = `
        <tr>
          <td>${log.logCode}</td>
          <td>${log.logDetails}</td>
          <td>${log.logDate}</td>
          <td>${log.staffId}</td>
          <td>${log.fieldCode}</td>
          <td>${log.cropCode}</td>
          <td>
            <button class="btn btn-success" onclick="viewMonitoringLog('${log.logCode}')" data-bs-toggle="modal" data-bs-target="#logViewModal"><i class="bi bi-eye"></i></button>
            <button class="btn btn-primary" onclick="editMonitoringLog('${log.logCode}')" data-bs-toggle="modal" data-bs-target="#logEditModal"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger" onclick="deleteMonitoringLog('${log.logCode}')"><i class="bi bi-trash"></i></button>
          </td>
        </tr>
      `;
      tableBody.append(row);
    });
  }  

  getAllMonitoringLogs();
});
