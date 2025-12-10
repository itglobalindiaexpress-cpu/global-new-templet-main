/// <reference path="BlockUI.js" />
/// <reference path="jquery-ui.js" />
var getUrl = window.location;
var BlockUIStatus = 0;
//var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1] + "/";
//var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";

if (getUrl.host.indexOf("beta55.") >= 0) {
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1] + "/";;
}
else {
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
}
var CommonURL = baseUrl;// + "web/";
var CommonURLAdmin = baseUrl + "Admin/";
$(document).ready(function () {
    ResetFocus();
    $("input[type=text]").attr("autocomplete", "off");
    $(".Number").keyup(function (e) {
        if (/\D/g.test(this.value)) this.value = this.value.replace(/[^0-9]/g, '');
    });
    $(".Phone").keyup(function (e) {
        if (/\D/g.test(this.value)) this.value = this.value.replace(/[^0-9]/g, '');
    });

});

(function (a) {
    a.fn.A_Pager = function (b) {
        var c = {};
        var b = a.extend(c, b);
        return this.each(function () {
            Pager(a(this), b)
        })
    }
})(jQuery);

function Pager(a, b) {
    var c = '<a style = "cursor:pointer" class="page" onclick="BindData({1});" page = "{1}">{0}</a>';
    var d = "<span>{0}</span>";
    var e, f, g;
    var g = 5;
    var h = Math.ceil(b.RecordCount / b.PageSize);
    if (b.PageIndex > h) { b.PageIndex = h }
    var i = "";
    if (h > 1) {
        f = h > g ? g : h; e = b.PageIndex > 1 && b.PageIndex + g - 1 < g ? b.PageIndex : 1;
        if (b.PageIndex > g % 2) {
            if (b.PageIndex == 2) f = 5;
            else f = b.PageIndex + 2
        }
        else {
            f = g - b.PageIndex + 1
        }
        if (f - (g - 1) > e) {
            e = f - (g - 1)
        }
        if (f > h) {
            f = h; e = f - g + 1 > 0 ? f - g + 1 : 1
        }
        var j = (b.PageIndex - 1) * b.PageSize + 1;
        var k = j + b.PageSize - 1;
        if (k > b.RecordCount) {
            k = b.RecordCount
        }
        i = ""; // "<b>Records " + (j == 0 ? 1 : j) + " - " + k + " of " + b.RecordCount + "</b> ";
        if (b.PageIndex > 1) {
            i += c.replace("{0}", "<<").replace("{1}", "1");
            i += c.replace("{0}", "<").replace("{1}", b.PageIndex - 1)
        }
        for (var l = e; l <= f; l++) {
            if (l == b.PageIndex) {
                i += d.replace("{0}", l)
            }
            else {
                i += c.replace("{0}", l).replace("{1}", l)
            }
        }
        if (b.PageIndex < h) {
            i += c.replace("{0}", ">").replace("{1}", b.PageIndex + 1);
            i += c.replace("{0}", ">>").replace("{1}", h)
        }
    } a.html(i);
    try {
        a[0].disabled = false
    }
    catch (m) { }
}

function BlockUI() {//Must Use BlockUI.js on Page---------------->>>>>
    BlockUIStatus = 1;
    $(document).ready(function () {
        $.blockUI({
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });
    });
}

function UnBlockUI() {
    BlockUIStatus = 0;
    $(document).ready(function () {
        setTimeout($.unblockUI, 0);

    });
}
//function BlockUI(btn) {
//    $("#" + btn).attr("disabled", true);
//}

//function UnBlockUI(btn) {
//    $("#" + btn).removeAttr("disabled", false);
//}

function GetMsgBox(Msg, Type) {
    if (Type == "S") {
        $(".ErrorMsg").show();
        $(".lblErrorMsg").css("color", "green");
        $(".divicon").removeClass("ace-icon fa fa-ban danger");
        $(".divicon").addClass("fa fa-check").css("color", "green");
        $(".ErrorMsg").addClass("alert-success");
        $(".ErrorMsg").removeClass("alert-warning");
    }
    else if (Type == "E") {
        $(".ErrorMsg").show();
        $(".lblErrorMsg").css("color", "red");
        $(".divicon").removeClass("fa fa-check");
        $(".divicon").addClass("ace-icon fa fa-ban danger").css("color", "red");
        $(".ErrorMsg").addClass("alert-warning");
        $(".ErrorMsg").removeClass("alert-success");
    }
    $(".lblErrorMsg").html(Msg);
}
function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function SessionExpire() {
    alert("Your session has been expired!\nSystem is redirecting you to login page, Please login again.");
    $(parent.window.location).attr("href", CommonURL + "/Index");
}

AddAntiForgeryToken = function (data) {
    data.Token = $("#_Token").val();
    data.__RequestVerificationToken = $("input[name=__RequestVerificationToken]").val();
    return data;
};

function AjaxError(jqXHR, exception) {
    if (jqXHR == 0 && exception == 0) {
        return ("There is unexpected error perform by application, Please clear the cache of browser and try again.!");
    } else if (jqXHR.status === 0) {
        return ('Not connected.\nPlease verify your network connection.');
    } else if (jqXHR.status == 404) {
        return ('The requested page not found. [404]');
    } else if (jqXHR.status == 500) {
        return ('Internal Server Error [500].');
    } else if (exception === 'parsererror') {
        return ('Requested JSON parse failed.');
    } else if (exception === 'timeout') {
        return ('Time out error.');
    } else if (exception === 'abort') {
        return ('Ajax request aborted.');
    } else {
        return ('Uncaught Error.\n' + jqXHR.responseText);
    }
}

function AutoComplete(ID, Type, contextKey) {
    $("#" + ID).autocomplete({
        autoFocus: true,
        select: function (event, ui) {
            //alert(ui.item.value);
            $("#" + ID).val(ui.item.value)
            var e = $.Event('keypress');
            e.which = 13;//Enter Key
            $("#" + ID).trigger(e);
        },
        source: function (request, response) {
            $.ajax({
                url: CommonURL + "/AutoComplete/Index",
                type: "POST",
                dataType: "json",
                data: { Prefix: request.term, Type: Type, contextKey: $("#" + contextKey).val() },
                success: function (data) {
                    response(data);
                }
            })
        },
        messages: {
            noResults: "", results: ""
        }
    });
}

function ResetFocus() {
    var inputs = $(':not(textarea):input:visible:enabled,img,button').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            var nextInput = inputs.get(inputs.index(this) + 1);
            if (nextInput) {
                nextInput.focus();

            }
        }
    });
}

//function setTimemask(id) {
//    $(document).ready(function () {
//        $("#" + id).mask("99:99");
//    });
//}

function CheckValidTime(id) {
    try {
        var event = $("#" + id);
        if (event.val() == "" || event.val() == "__:__") {
            return true;
        }
        $.post(CommonURL + "Web/IsValidTime",
          {
              thetime: event.val()
          }, function (data) {
              if (data == "False") {
                  alert("Invalid Time");
                  // $("#" + id).focus();
                  //$("#" + id).select();
                  $("#" + id).val("");
                  $("#" + id).focus();
                  return false;
              }
          }).fail(function (xhr, err) {
              var responseTitle = $(xhr.responseText).filter('title').get(0);
              alert($(responseTitle).text() + "\n" + AjaxError(xhr, err));
          });
    }
    catch (e) {
        alert("Error In CheckValidTime: " + e.message);
    }
}


function ShowNotification() {
    try {
        $.post(CommonURL + "ShowNotification",
          {

          }, function (data) {
              if (data.Result != "") {
                  $("#Notification").html(data.Result);
              }
          }).fail(function (xhr, err) {
              var responseTitle = $(xhr.responseText).filter('title').get(0);
              alert($(responseTitle).text() + "\n" + AjaxError(xhr, err));
          });
    }
    catch (e) {
        alert("Error In ShowNotification: " + e.message);
    }
}
