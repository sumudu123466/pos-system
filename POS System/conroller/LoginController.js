$("#btnLogin").click(function() {
    let username = $("#usernameField").val();
    let password = $("#passwordField").val();

    // Verification logic
    if (username === "Sh" && password === "123") {
        alert("Login Successful! ☕");
        // POS System ekata switch wenna (index.html eke logic anuwa)
        $("#login-section").fadeOut(500, function() {
            $("#pos-system").fadeIn(500);
        });
    } else {
        alert("Invalid Username or Password!");
        $("#passwordField").val(""); // Password field clear karanna
    }
});