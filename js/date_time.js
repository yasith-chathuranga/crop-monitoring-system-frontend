// Live date and time update
function updateDateTime() {
  const now = new Date();
  const dateTimeString =
    now.toLocaleDateString() + " " + now.toLocaleTimeString();
  document.getElementById("currentDateTime").textContent = dateTimeString;
}

updateDateTime();
setInterval(updateDateTime, 1000);
