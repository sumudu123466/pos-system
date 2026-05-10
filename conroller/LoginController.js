import{authenticate} from "../model/LoginModel.js";

$(document).ready(function () {

    $("#btnLogin").click(function () {
        
        let username = $("#usernameField").val();
        let password = $("#passwordField").val();

     
        if (authenticate(username, password)) {
            showSuccess();
        } else {
            showError();
        }
    });

    function showSuccess() {
        alert("Login Successful! ☕");
        
        
        $("#login-section").fadeOut(500, function () {
            $("#pos-system").fadeIn(500);
            
            
            $(".view").hide();
            $("#home-view").show();
        });
    }

    function showError() {
        alert("Invalid Username or Password!");
        $("#passwordField").val(""); 
        $("#usernameField").focus(); 
    }
});