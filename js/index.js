$("#loginForm").on("submit", async function (event) {
  event.preventDefault();

  // Form data
  const email = $("#email").val().trim();
  const password = $("#password").val();
  const feedback = $("#loginFeedback");
  feedback.text("");

  if (!email || !password) {
    feedback.text("Please fill out all fields.").css("color", "red");
    return;
  }

  feedback.text("Processing...").css("color", "blue");

  try {
    const response = await $.ajax({
      url: "http://localhost:8080/greenshadow/api/v1/auth/signin",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email, password }),
    });

    if (response.token) {
      feedback.text("Login successful! Redirecting...").css("color", "green");
      setTimeout(() => (window.location.href = "/pages/dashboard.html"), 2000);
    } else {
      feedback.text("Invalid credentials.").css("color", "red");
    }
  } catch (error) {
    feedback.text("An error occurred. Please try again.").css("color", "red");
    console.error("Error:", error);
  }
});
