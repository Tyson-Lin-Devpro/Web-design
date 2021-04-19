$(document).ready(function () { //Jquery起手式
    // ==$(function (){})
    // ==$(()=>{})
    $(window).scroll(() => {
        var scrollVal = $(this).scrollTop()
        if (scrollVal > 100) {
            $("#navbar").addClass("navfix")
        } else {
            $("#navbar").removeClass("navfix")
        }
    })
    $("#top").click(() => {
        $("#menu-bar").slideUp()
        $("#black").fadeOut()
    })

    $(".btnmenu,#black").click(() => {
        $("#menu-bar").slideToggle()
        $("#black").fadeToggle()
    })
})
// XMLHttpRequest 物件專門用來和伺服器連線
const showPanel = (pageName, panelIndex, colorCode) => {
    $(function () {
        $.get("https://gn00667340.github.io/Web-design/" + pageName, function (data) {
            var tabs = $(".tabs")
            $(tabs).each((clearAll) => {
                $(tabs[clearAll]).css("background-color", "")
                $(tabs[clearAll]).css("color", "")
            })
            $("#tabcontent").html(data)
            $("#tabcontent").css("background-color", colorCode)
            $(tabs[panelIndex]).css({ "background-color": colorCode, "color": "white" })
        })
    })
}
function formcheck() {
    $(function () {
        var fname = $("#firstname");
        var lname = $("#lastname");
        var phone = $("#phone");
        var email = $("#email");
        var comm = $("#comment");
// 表單全為空時執行提示
        if (
            fname.val().trim() === '' && lname.val().trim() === '' &&
            email.val().trim() === '' && phone.val().trim() === '' &&
            comm.val().trim() === ''
        ) {
            alert("請輸入您的建議與資料");
        }
//檢查名字是否符合格式
        var namepattern = /^([\u4e00-\u9fa5]+)([\u4e00-\u9fa5])?$|^([a-zA-Z]+)([a-zA-Z])?$/;
        if (!namepattern.test(fname.val())) {
            $("#fn").html("請輸入中文或英文，且不含有空格");
            fname.css("border", "solid 3px red");
        } else {
            $("#fn").html("");
            fname.css("border", "");
        }
        // // 檢查姓氏是否符合格式
        if (!namepattern.test(lname.val())) {
            $("#ln").html("請輸入中文或英文，且不含有空格")
            lname.css("border", "solid 3px red");
        } else {
            $("#ln").html("");
            lname.css("border", "");
        }
//檢查名字姓氏為同一語言
        var english = /^([a-zA-Z]+)([a-zA-Z])?$/;
        var chinese = /^([\u4e00-\u9fa5]+)([\u4e00-\u9fa5])?$/;
        if (
            lname.css("border") == "2px inset rgb(118, 118, 118)" &&
            fname.css("border") == "2px inset rgb(118, 118, 118)"
        ) {
            if (
                chinese.test(fname.val()) && english.test(lname.val()) ||
                english.test(fname.val()) && chinese.test(lname.val())
            ) {
                fname.css("border", "solid 3px red");
                lname.css("border", "solid 3px red");
                $("#fn").html("First name與Last name須為同一種語言");
                $("#ln").html("First name與Last name須為同一種語言");
            } else {
                fname.css("border", "");
                lname.css("border", "");
                $("#fn").html("");
                $("#ln").html("");
            }
        }
//檢查電話格式
        var phonecheck = /^([0])([2-9]+)+([0-9]{7,8})/;
        if (!phonecheck.test(phone.val())) {
            $("#ph").html("請輸入您的連絡電話(包含區碼)或手機，共9-10碼");
            phone.css("border", "solid 3px red");
        } else {
            $("#ph").html("");
            phone.css("border", "");
        }
//檢查E-mail格式
        var emailpattern = /^([a-z 0-9_.-]+)@([a-z0-9-]+)\.([a-z]{2,4})(\.[a-z]{2,4})?$/;
        if (!emailpattern.test(email.val())) {
            $("#em").html("請輸入您的電子信箱,使用小寫字母並包含@符號");
            email.css("border", "solid 3px red");
        } else {
            $("#em").html("");
            email.css("border", "");
        }
        //檢查是否有輸入內容
        if (comm.val() === '' || comm.val() == null) {
            $("#ctext").html("請輸入文字內容")
            comm.css("border", "solid 3px red");
        } else {
            $("#ctext").html("")
            comm.css("border", "");
        }
//最後送出前檢查
        var forml = document.getElementById("forminfo");
        if (
            lname.css("border") == "2px inset rgb(118, 118, 118)" &&
            fname.css("border") == "2px inset rgb(118, 118, 118)" &&
            phone.css("border") == "2px inset rgb(118, 118, 118)" &&
            email.css("border") == "2px inset rgb(118, 118, 118)" &&
            comm.css("border") == "1px solid rgb(118, 118, 118)"
        ) {
            forml.submit()
            alert('感謝您的留言，我們會盡快回覆您!!')
        }
    })
}
