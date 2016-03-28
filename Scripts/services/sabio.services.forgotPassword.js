if (!sabio.services.forgotPassword)
    sabio.services.forgotPassword = {};

sabio.services.forgotPassword.sendPasswordResetEmail = function (email, onSuccess, onError) {
    var url = "/Api/Public/GetUserGenerateToken"
    var myData = {
        "UserEmail": email
    };
    var settings = {
        cache: false,
        data: myData,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        type: "GET"
    };
    $.ajax(url, settings);
};


sabio.services.forgotPassword.resetPassword = function (password, confirmPassword, token, onSuccess, onError) {
    var url = "/Api/Public/ResetPassword";
    var myData = {
        "Password": password,
        "ConfirmPassword": confirmPassword,
        "ResetPasswordToken": token
    };
    var settings = {
        cache: false,
        data: myData,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        type: "PUT"
    };
    $.ajax(url, settings);
};