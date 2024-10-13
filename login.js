document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simple authentication logic (replace with actual authentication)
  if (username === "Admin" && password === "admin123") {
    localStorage.setItem("userRole", "admin");
    window.location.href = "admin.html";
  } else if (username === "Member" && password === "member123") {
    localStorage.setItem("userRole", "member");
    window.location.href = "member.html";
  } else {
    alert("Invalid username or password");
  }
});

