if (!sabio.services.notifications)
    sabio.services.notifications = {};

sabio.services.notifications.success = function (message) {
    var m;
    if (arguments.length && arguments.length > 0 && typeof message != "object" && typeof message != "undefined") {
        m = message;
    } else {
        m = "This is a successful notification.";
    }
    var unique_id = $.gritter.add({
        title: "Success!",
        text: m,
        image: "/images/success-icon.jpg",
        sticky: false,
        class_name: 'successColor'
    });
    return false;
}

sabio.services.notifications.warning = function (message) {
    var m;
    if (arguments.length && arguments.length > 0 && typeof message != "object" && typeof message != "undefined") {
        m = message;
    } else {
        m = "This is a warning notification.";
    }
    var unique_id = $.gritter.add({
        title: "Warning!",
        text: m,
        image: "/images/warning-icon.jpg",
        sticky: false,
        class_name: 'warningColor'
    });
    return false;
}

sabio.services.notifications.error = function (message) {
    var m;
    if (arguments.length && arguments.length > 0 && typeof message != "object" && typeof message != "undefined") {
        m = message;
    } else {
        m = "This is an error notification.";
    }
    var unique_id = $.gritter.add({
        title: "Error!",
        text: m,
        image: "/images/error-icon.jpg",
        sticky: false,
        class_name: 'errorColor'
    });
    return false;
}

