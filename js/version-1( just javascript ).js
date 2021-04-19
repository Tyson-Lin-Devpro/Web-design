//Version 1 just use javascript no jQuery


//點擊跳出選單，點擊黑幕取消頁面
function menuFunction() {
    var mobilemenu = document.getElementById("menu-bar");
    var blackscreen = document.getElementById("black");
    var logo = document.getElementById('top');
    if (mobilemenu.className.indexOf("show") == -1) {
        mobilemenu.classList.add("show");
        blackscreen.style.display = "block";
        logo.onclick = function () { menuFunction(); scrolll('black'); };
    } else {
        mobilemenu.classList.remove("show");
        blackscreen.style.display = 'none';
        logo.onclick = function () { scrolll('black'); };
    }
}
//向下滾動改變跳出navbar
window.onscroll = function () { navscroll(); };
function navscroll() {
    var topbar = document.getElementById("navbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        topbar.className = " navfix";
    } else {
        topbar.className = topbar.className.replace("navfix", "flex-container");
    }
}
//information tab選單切換
function showPanel(panelIndex, colorCode) {
    var tabButtons = document.querySelectorAll(".tabcontainer .buttoncontainer button");
    var tabPanel = document.querySelectorAll(".tabcontainer .tabpanel");

    tabButtons.forEach(function (nodi) {//將未選取的tabButtons回復成未選取的顏色
        nodi.style.backgroundColor = "";
        nodi.style.color = "";
    });
    tabButtons[panelIndex].style.backgroundColor = colorCode;//選取的tabButtons的背景色為輸入色碼
    tabButtons[panelIndex].style.color = "white";//選取的tabButtons文字顏色為白色

    tabPanel.forEach(function (nodi) {//隱藏未選取的tab分頁內容
        nodi.style.display = "none";
    });
    tabPanel[panelIndex].style.display = "block";//Panel修改為顯示
    tabPanel[panelIndex].style.backgroundColor = colorCode;//Panel背景色修改為輸入色碼
}

window.onload = function () {//預設點擊開啟information tabPanel
    document.getElementById("defaultOpen").click();
}
//smooth scroll function
function scrolll(elementId) {
    var speed = 30;
    var scroller = null;
    var idpos = document.getElementById(elementId).offsetTop;
    var webpos = document.body.scrollTop + document.documentElement.scrollTop;
    var bodybottom = document.body.scrollHeight - document.body.offsetHeight;
    if (idpos > bodybottom) {
        scroller = setTimeout(function () {
            scrolll(elementId);
        }, 1)
        webpos = webpos + speed;
        if (webpos >= bodybottom) {
            clearTimeout(scroller);
            webpos = bodybottom;
        }
        window.scroll(0, webpos);
    } else if (idpos > webpos) {
        scroller = setTimeout(function () {
            scrolll(elementId);
        }, 1)
        webpos = webpos + speed;
        if (webpos >= idpos) {
            clearTimeout(scroller);
            webpos = idpos;
        }
        window.scroll(0, webpos);
    } else if (idpos < webpos) {
        scroller = setTimeout(function () {
            scrolll(elementId);
        }, 1)
        webpos = webpos - speed;
        if (webpos <= idpos) {
            clearTimeout(scroller);
            webpos = idpos;
        }
        window.scroll(0, webpos);
    } else {
        console.log("match!");
    }
}
//表單確認填寫
function formcheck() {
    var fname = document.getElementById("firstname");
    var lname = document.getElementById("lastname");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");
    var comm = document.getElementById("comment");
    var emailpattern = /^([a-z 0-9_.-]+)@([a-z0-9-]+)\.([a-z]{2,4})(\.[a-z]{2,4})?$/;
    var namepattern = /^([\u4e00-\u9fa5]+)([\u4e00-\u9fa5])?$|^([a-zA-Z]+)([a-zA-Z])?$/;
    var chinese = /^([\u4e00-\u9fa5]+)([\u4e00-\u9fa5])?$/;
    var english = /^([a-zA-Z]+)([a-zA-Z])?$/;
    var phonecheck = /^([0])([2-9]+)+([0-9]{7,8})/;
    var forml = document.getElementById('formcheck');
    //表單全為空時執行提示
    if (
        fname.value.trim() === '' && lname.value.trim() === '' &&
        email.value.trim() === '' && phone.value.trim() === '' &&
        comm.value.trim() === ''
    ) {
        alert("請輸入您的聯絡方式與建議");
    }
    //檢查名字是否符合格式
    if (!namepattern.test(fname.value)) {
        document.getElementById("fn").innerHTML = "請輸入中文或英文，且不含有空格";
        fname.style.border = "solid 3px red";
    } else {
        document.getElementById("fn").innerHTML = "";
        fname.style.border = "";
    }
    //檢查姓氏是否符合格式
    if (!namepattern.test(lname.value)) {
        document.getElementById("ln").innerHTML = "請輸入中文或英文，且不含有空格";
        lname.style.border = "solid 3px red";
    } else {
        lname.setCustomValidity("");
        document.getElementById("ln").innerHTML = "";
        lname.style.border = "";
    }
    //檢查名字姓氏為同一語言
    if (lname.style.border == "" && fname.style.border == "") {
        if (
            chinese.test(fname.value) && english.test(lname.value) ||
            english.test(fname.value) && chinese.test(lname.value)
        ) {
            fname.style.border = "solid 3px red";
            lname.style.border = "solid 3px red";
            document.getElementById("fn").innerHTML = "First name與Last name須為同一種語言";
            document.getElementById("ln").innerHTML = "First name與Last name須為同一種語言";
        } else {
            fname.style.border = "";
            lname.style.border = "";
            document.getElementById("fn").innerHTML = "";
            document.getElementById("ln").innerHTML = "";
        }
    }
    if (!phonecheck.test(phone.value)) {
        document.getElementById("ph").innerHTML = "請輸入您的連絡電話(包含區碼)或手機，共9-10碼";
        phone.style.border = "solid 3px red";
    } else {
        document.getElementById("ph").innerHTML = "";
        phone.style.border = "";
    }

    if (!emailpattern.test(email.value)) {
        document.getElementById("em").innerHTML = "請輸入您的電子信箱,使用小寫字母並包含@符號";
        email.style.border = "solid 3px red";
    } else {
        document.getElementById("em").innerHTML = "";
        email.style.border = "";
    }


    if (comm.value === '' || comm.value == null) {
        document.getElementById("ctext").innerHTML = "請輸入文字內容";
        comm.style.border = "solid 3px red";
    } else {
        document.getElementById("ctext").innerHTML = "";
        comm.style.border = "";
    }
    if (fname.style.border == "" && lname.style.border == "" &&
        phone.style.border == "" && email.style.border == "" &&
        comm.style.border == ""
    ) {
        forml.submit();
        alert('感謝您的留言，我們會盡快回覆您!!');
    }

}
