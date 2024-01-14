$(document).ready(function() {
  refresh();
  if (localStorage.getItem("items") == null) localStorage.setItem("items","");
  if (localStorage.getItem("points") == null) localStorage.setItem("points","");
  if (localStorage.getItem("truefalse") == null) localStorage.setItem("truefalse","");
  if (localStorage.getItem("currpoints") == null) localStorage.setItem("currpoints",0);
  if (localStorage.getItem("maxPoints") == null) localStorage.setItem("maxPoints",0);
});
function refresh() {
  let currPts = localStorage.getItem("currpoints") - 0;
  let maxPts = localStorage.getItem("maxPoints") - 0;
  let percentage = currPts / maxPts * 100;
  document.querySelector(".mainbg").innerHTML = "<b>Points: " + currPts + "/" + maxPts + " (" + Math.round(percentage) + "%)</b><div class='progress'></div><div class=\"edit\" onclick=\"edit()\"><svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" style=\" fill:#000000;\"><path d=\"M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z\"></path></svg></div><div class=\"refresh\" onclick=\"settings()\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z\"/></svg></div>";
  $("body").get(0).style.setProperty("--percentage-width", percentage + "%");
  let items = localStorage.getItem("items").split("¯");
  let truefalse = localStorage.getItem("truefalse").split("¯");
  let checkboxes = '';
  if (items.length == 1 && truefalse[0] == "") {

  } else {
    for (let i = 0; i < items.length; i++) {
      let checked = "";
      if (truefalse[i] == "true") {
        checked = " checked"
      }
      checkboxes += '<div class="contain-individual-checkbox"><input' + checked + ' type="checkbox" onclick="ShowHideDiv(' + i + ')"><div class="checkboxText">' + items[i].replaceAll('<',"&lt").replaceAll('>',"&gt") + '</div></div>';
    }
  }
  if (percentage >= 100) {
    startConfetti();
  } else {
    stopConfetti();
  }
  if (checkboxes != "") {
    checkboxes = '<div style="text-align:center;font-size: 40px;font-family: Arial, Helvetica, sans-serif;border-radius: 10px;margin-bottom: 10px;">Your Checklist</div>' + checkboxes;
  }
  document.getElementsByClassName("checklist")[0].innerHTML = checkboxes;
}
function edit() {
  stopConfetti();
  $('.popup').removeClass('unanimate');
  $(".popup").css("display","block");
  let items = localStorage.getItem("items").split("¯");
  let points = localStorage.getItem("points").split("¯");
  if (items.length == 1 && points[0] == "") {
    
  } else {
    document.querySelector(".currEdit").innerHTML = "";
    for (var i = 0; i < items.length; i++) {
      document.querySelector(".currEdit").innerHTML += "<div class='currEditEntry'><input value='" + items[i].replaceAll("'","&apos;") + "' class='currEditEntryText'><input value='" + points[i] + "' class='currEditEntryPoints' type='number'><svg onclick='this.parentElement.style.display = `none`;' class='entryClose' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='40' height='40' viewBox='0 0 30 30' style='fill:#000000;'><path d='M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z'></path></svg></div>"
    }
  }
}
function settings() {
  stopConfetti();
  $('.popup').removeClass('unanimate');
  $(".popup").css("display","block");
  document.querySelector(".currEdit").innerHTML = "<div class=\"notif-settings\"><div class=\"notif-setting\"><input type=\"checkbox\" id=\"notifs\" onclick=\"toggleNotifs()\"> Notifications On</div><div class=\"notif-setting\">A Notification every&nbsp;<input type=\"number\" id=\"numsec\"> seconds</div><div class=\"notif-setting\"><input type=\"radio\" name=\"question1\" onclick=\"nsst(1)\" id=\"q1a\">Random Un-checked item</div><div class=\"notif-setting\"><input type=\"radio\" name=\"question1\" onclick=\"nsst(2)\" id=\"q1b\">First Un-checked item</div></div>" ;
  exTN();
  if (localStorage.notif == "true") {
    document.getElementById("notifs").checked = true;
  }
  if (localStorage.notifsettings == 1) {
    document.getElementById("q1a").checked = true;
  }
  if (localStorage.notifsettings == 2) {
    document.getElementById("q1b").checked = true;
  }
  document.getElementById("numsec").value = localStorage.exseconds;
  if (Notification.permission == "granted") {
  } else {
    document.getElementById("notifs").checked = false;
    localStorage.notif = "false";
  }
}
function nsst(num) {
  localStorage.notifsettings = num;
}
function toggleNotifs() {
  if (localStorage.getItem("notif") == null || localStorage.getItem("notif") == "false") {
    Notification.requestPermission().then(perm => {
      if (perm == "granted") {
        localStorage.notif = "true";
        exTN();
      } else {
        document.getElementById("notifs").checked = false;
      }
    })
  } else {
    localStorage.notif = "false";
    exTN();
  }
}
function exTN() {
  if (localStorage.notif == "false" || localStorage.notif == null) {
    $("#numsec").attr("disabled"," ");
    $("#q1a").attr("disabled"," ");
    $("#q1b").attr("disabled"," ");
  } else {
    $("#numsec").removeAttr("disabled");
    $("#q1a").removeAttr("disabled");
    $("#q1b").removeAttr("disabled");
  }
}
function submit() {
  if (document.getElementsByClassName("notif-settings")[0]) {
    localStorage.exseconds = document.getElementById("numsec").value;
    $('.popup').addClass('unanimate');
    refresh();
    if (localStorage.notif == "true") {
      setInterval(function() {
        console.log("Shoulda got a notif?")
        let things = localStorage.truefalse.split("¯");
        let nums = [];
        for (let i = 0; i < localStorage.truefalse.split("¯").length; i++) {
          if (localStorage.truefalse.split("¯")[i] == "false") {
            nums.push(i);
          }
        }
        let todo = "";
        if (localStorage.notifsettings == 1) {
          todo = localStorage.items.split("¯")[choice(nums)];
        } else if (localStorage.notifsettings == 2) {
          todo = localStorage.items.split("¯")[nums[0]];
        }
        let title = "It's time to...";
        let body = todo;
        let tag = "dosomething";
        var notification = new Notification(title, { body });
      }, localStorage.exseconds * 1000);
    }
  } else {
    let types = [];
    let truefalse = [];
    $(".currEditEntryText:visible").each(function() {
      types.push($(this).val());
      truefalse.push("false");
    });
    let pts = [];
    $(".currEditEntryPoints:visible").each(function() {
      pts.push($(this).val());
    });
    let maxpt = 0;
    for (i = 0; i < pts.length; i++) {
      let o = pts[i] - 0;
      maxpt = maxpt + o;
    }
    localStorage.setItem("truefalse",truefalse.join("¯"));
    localStorage.setItem("maxPoints",maxpt);
    localStorage.setItem("currpoints",0);
    localStorage.setItem("items",types.join('¯'));
    localStorage.setItem("points",pts.join('¯'));
    $('.popup').addClass('unanimate');
    refresh();
  }
}
function choice(array) {
  return array[Math.floor(Math.random() * array.length)]
}
function plus() {
  let types = [];
  $(".currEditEntryText:visible").each(function() {
    types.push($(this).val().replaceAll("'","&apos;"));
  });
  let pts = [];
  $(".currEditEntryPoints:visible").each(function() {
    pts.push($(this).val());
  });
  let set = ""
  for (var i = 0; i < types.length; i++) {
    set += "<div class='currEditEntry'><input value='" + types[i] + "' class='currEditEntryText'><input value='" + pts[i] + "' class='currEditEntryPoints' type='number'><svg onclick='this.parentElement.style.display = `none`;' class='entryClose' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='40' height='40' viewBox='0 0 30 30' style='fill:#000000;'><path d='M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z'></path></svg></div>"
  }
  document.querySelector(".currEdit").innerHTML = set + "<div class='currEditEntry'><input class='currEditEntryText'><input value='1' class='currEditEntryPoints' type='number'><svg onclick='this.parentElement.style.display = `none`;' class='entryClose' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='40' height='40' viewBox='0 0 30 30' style='fill:#000000;'><path d='M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z'></path></svg></div>"
}
function entryClose() {
  this.style.display = 'none';
}
function ShowHideDiv(num) {
  let currPoints = localStorage.getItem("currpoints");
  currPoints = currPoints - 0;
  let truefalse = localStorage.getItem("truefalse");
  let tf = truefalse.split("¯");
  let pts = localStorage.getItem("points");
  let points = pts.split("¯");
  console.log(tf[num]);
  if (tf[num] == "false") {
    let point = points[num] - 0;
    currPoints += point;
    tf[num] = "true";
  } else if (tf[num] == "true") {
    let point = points[num] - 0;
    currPoints -= point;
    tf[num] = "false";
  }
  localStorage.setItem("truefalse",tf.join("¯"));
  console.log(localStorage.getItem("truefalse"));
  localStorage.setItem("currpoints",currPoints);
  refresh();
}