$(document).ready(function () {
    Clear();
    $("#EnterOTP").hide();
    $("#btnVerifyOTP").hide();
    $("#Message").hide();
    $("#btnSendRequest").hide();

    $("#btnSendOTP").click(function () {
        SendOTP();
        return false;
    });

    $("#btnSendOTP").keydown(function (e) {
        if (e.which == 13) {
            SendOTP();
            return false;
        }
    });
    $("#btnVerifyOTP").click(function () {
        ValidateOTP();
        return false;
    });

    $("#btnVerifyOTP").keydown(function (e) {
        if (e.which == 13) {
            ValidateOTP();
            return false;
        }
    });
    $("#btnSubmitModal").click(function () {
        SendRequest();
        return false;
    });

    $("#btnSubmitModal").keydown(function (e) {
        if (e.which == 13) {
            SendRequest();
            return false;
        }
    });

    $("#btnCloseModal").click(function () {
        window.location.reload();
    });

    $("#btnCloseModal").keydown(function (e) {
        if (e.which == 13) {
            window.location.reload();
        }
    });
});

function SendOTP() {
    BlockUI();
    try {
        $.post(CommonURL + "SendOTP",
            AddAntiForgeryToken({
                EnquiryId: $("#hfEnquiryID").val(),
                Name: $("#txtNameModal").val(),
                EmailID: $("#txtEmailIDModal").val(),
                CompanyName: $("#txtCompanyNameModal").val(),
                PhoneNo: $("#txtPhoneNoModal").val(),
            }), function (data) {
                if (data.Status == "1") {
                    $("#EnterOTP").show();
                    $("#btnVerifyOTP").show();
                    alert(data.Result);
                }
                else if (data.Result != "") {
                    alert(data.Result);
                }
                if (data.Focus != "") {
                    $("#" + data.Focus).focus();
                }
                UnBlockUI();
            }).fail(function (error) {
                alert("Status in call Method SendOTP:" + error.responseText);
                UnBlockUI();
            });
    }
    catch (ex) {
        alert("Status in Method SendOTP: " + ex.message);
        UnBlockUI();
    }
}

function ValidateOTP() {
    BlockUI();
    try {
        $.post(CommonURL + "ValidateOTP",
            AddAntiForgeryToken({
                VerifyOTP: $("#txtEnterOTP").val(),
            }), function (data) {
                if (data.Result == "Success") {
                    alert("OTP Verification Sucessfully.!")
                    $("#Message").show();
                    $("#btnSendRequest").show();
                }
                else if (data.Result != "") {
                    alert(data.Result);
                }
                UnBlockUI();
            }).fail(function (error) {
                alert("Status in call Method ValidateOTP:" + error.responseText);
                UnBlockUI();
            });
    }
    catch (ex) {
        alert("Status in Method ValidateOTP: " + ex.message);
        UnBlockUI();
    }
}

function SendRequest() {
    BlockUI();
    try {
        $.post(CommonURL + "QuickContact",
            AddAntiForgeryToken({
                Name: $("#txtNameModal").val(),
                EmailID: $("#txtEmailIDModal").val(),
                CompanyName: $("#txtCompanyNameModal").val(),
                PhoneNo: $("#txtPhoneNoModal").val(),
                EnterOTP: $("#txtEnterOTP").val(),
                Messages: $("#txtMessageModal").val(),
            }), function (data) {
                if (data.Status == "1") {
                    alert(data.Result);
                    Clear();
                    //window.location.reload();
                    //window.location.href = CommonURL + "thank-you?Enquiry=ContactUs";
                }
                else if (data.Result != "" && data.Status=="0" ) {
                    alert(data.Result);
                   // Clear();
                }
                if (data.Focus != "") {
                    $("#" + data.Focus).focus();
                }
                UnBlockUI();
            }).fail(function (error) {
                alert("Status in call Method SendRequest:" + error.responseText);
                UnBlockUI();
            });
    }
    catch (ex) {
        alert("Status in Method SendRequest: " + ex.message);
        UnBlockUI();
    }
}

function Clear() {
    $("#txtNameModal").val(""),
        $("#txtEmailIDModal").val(""),
        $("#txtCompanyNameModal").val(""),
        $("#txtPhoneNoModal").val(""),
        $("#txtEnterOTP").val(""),
        $("#txtMessageModal").val(""),
        $("#EnterOTP").hide(),
        $("#btnVerifyOTP").hide(),
        $("#Message").hide(),
        $("#btnSendRequest").hide(),
        $("#txtNameModal").focus()
}
