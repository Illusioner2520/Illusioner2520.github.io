$(document).ready(function() {
  let questions = localStorage.questions.split("¯");
  let info = localStorage.info.split("¯");
  let stuff = "";
  for (let i = 0; i < questions.length; i++) {
    stuff += "<div class='question-oa'><input onkeydown='onKeyDown()' class='question' placeholder='Question' value='" + questions[i] + "'><div class='daanswer'><input onkeydown='onKeyDown()' placeholder='Answer' class='answer' value='" + info[i] + "'></div><svg onclick=\"if (localStorage.inLesson != 1) { this.parentElement.style.display = `none`;onKeyDown(); }\" class=\"entryClose\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"40\" height=\"40\" style=\"fill:#000000;\"><path d=\"M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z\"></path></svg></div>"
  }
  if (localStorage.questionst != "" && localStorage.inLesson != 1 && localStorage.questionst != localStorage.question && localStorage.infot != localStorage.info && localStorage.infot != "") {
    $(".revert").css("display","flex");
  }
  document.getElementsByClassName("cont-e")[0].innerHTML = "<div class='qs'>" + stuff + "</div><hr><div class='submit' onclick='submit()'>Submit</div>";
  if (localStorage.inLesson == 1) {
    $("input").attr("disabled","");
    $(".entryClose").css("cursor","context-menu");
    $(".submit").css("cursor","context-menu");
    $(".submit").css("background","#111111");
    $(".submit").css("border-color","#111111");
    $(".plus").css("cursor","unset");
    $(".plus").css("background","#111111");
    $(".quizlet").css("cursor","unset");
    $(".quizlet").css("background","#111111");
    $(".reset").css("cursor","unset");
    $(".reset").css("background","#111111");
    $(".swap").css("cursor","unset");
    $(".swap").css("background","#111111");
  }
});
function submit() {
  if (localStorage.inLesson != 1) {
    let qs = [];
    let as = [];
    let hi = [];
    $(".question:visible").each(function() {
      qs.push($(this).val().replaceAll("'","&apos;"));
      hi.push(0);
    });
    $(".answer:visible").each(function() {
      as.push($(this).val().replaceAll("'","&apos;"));
    });
    localStorage.questions = qs.join("¯");
    localStorage.info = as.join("¯");
    localStorage.numcorrect = hi.join("¯");
    localStorage.numincorrect = hi.join("¯");
    localStorage.lessonPts = hi.join("¯");
    localStorage.questionst = "";
    localStorage.infot = "";
    window.location.href = "/y/";
  } else {
    onKeyDown();
  }
}
function plus() {
  if (localStorage.inLesson != 1) {
    $(".question:visible").each(function() {
      $(this).attr("value",$(this).val());
    });
    $(".answer:visible").each(function() {
      $(this).attr("value",$(this).val());
    });
    document.getElementsByClassName("qs")[0].innerHTML += "<div class='question-oa'><input onkeydown='onKeyDown()' class='question' placeholder='Question'><div class='daanswer'><input onkeydown='onKeyDown()' placeholder='Answer' class='answer'></div><svg onclick=\"if (localStorage.inLesson != 1) { this.parentElement.style.display = `none`;onKeyDown(); }\" class=\"entryClose\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"40\" height=\"40\" style=\"fill:#000000;\"><path d=\"M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z\"></path></svg></div>";
    onKeyDown();
  }
}
function onKeyDown() {
  setTimeout(function() {
    let qs = [];
    let as = [];
    $(".question:visible").each(function() {
      qs.push($(this).val());
    });
    $(".answer:visible").each(function() {
      as.push($(this).val().replace("'","&apos;"));
    });
    localStorage.questionst = qs.join("¯");
    localStorage.infot = as.join("¯");
    console.log("Key pressed!")
  },100);
}
function repop() {
  if (localStorage.inLesson != 1) {
    $(".revert").css("display","none");
    let questionst = localStorage.questionst.split("¯");
    let infot = localStorage.infot.split("¯");
    let stufft = "";
    for (let i = 0; i < questionst.length; i++) {
      stufft += "<div class='question-oa'><input onkeydown='onKeyDown()' class='question' placeholder='Question' value='" + questionst[i] + "'><div class='daanswer'><input onkeydown='onKeyDown()' placeholder='Answer' class='answer' value='" + infot[i] + "'></div><svg onclick=\"if (localStorage.inLesson != 1) { this.parentElement.style.display = `none`;onKeyDown(); }\" class=\"entryClose\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"40\" height=\"40\" style=\"fill:#000000;\"><path d=\"M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z\"></path></svg></div>"
    }
    document.getElementsByClassName("cont-e")[0].innerHTML = "<div class='qs'>" + stufft + "</div><hr><div class='submit' onclick='submit()'>Submit</div>";
  }
}
function norepop() {
  $(".revert").css("display","none");
  localStorage.questionst = "";
  localStorage.infot = "";
}
function quizlet() {
  if (localStorage.inLesson != 1) {
    $(".quizlet-i").css("display","flex");
  }
}
function importQuizlet() {
  let quiz =  document.getElementsByClassName("quizlet-imp")[0].value.replaceAll("'","&apos;");
  let objs = quiz.split("\n");
  let stuff = "";
  let j = "";
  for (let i = 0; i < objs.length; i++) {
    j = objs[i].split("\t")[1];
    if (j == null) {
      j = "";
    }
    stuff += "<div class='question-oa'><input onkeydown='onKeyDown()' class='question' placeholder='Question' value='" + objs[i].split("\t")[0] + "'><div class='daanswer'><input onkeydown='onKeyDown()' placeholder='Answer' class='answer' value='" + j + "'></div><svg onclick=\"if (localStorage.inLesson != 1) { this.parentElement.style.display = `none`;onKeyDown(); }\" class=\"entryClose\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" width=\"40\" height=\"40\" style=\"fill:#000000;\"><path d=\"M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z\"></path></svg></div>";
  }
  document.getElementsByClassName("cont-e")[0].innerHTML = "<div class='qs'>" + stuff + "</div><hr><div class='submit' onclick='submit()'>Submit</div>";;
  $(".quizlet-i").css("display","none");
  onKeyDown();
}
function swap() {
  if (localStorage.inLesson != 1) {
    let answer = "";
    for (let i = 0; i < document.getElementsByClassName("question-oa").length; i++) {
      answer = document.getElementsByClassName("answer")[i].value;
      document.getElementsByClassName('answer')[i].value = document.getElementsByClassName('question')[i].value;
      document.getElementsByClassName('question')[i].value = answer;
    }
    onKeyDown();
    document.getElementsByClassName("qs").innerHTML += "<div style='display:none'></div>";
  }
}
function reset() {
  if (localStorage.inLesson != 1) {
    document.getElementsByClassName("qs")[0].innerHTML = "";
  }
}
function settings() {
  $('.settings').removeClass('unanimate');
  $(".settings").css("display","flex");
  document.getElementById("max").value = localStorage.max;
  document.getElementById("numtimes").value = localStorage.numtimes;
  document.getElementById("nummultiple").value = localStorage.nummultiple;
}
function submitsettings() {
  setTimeout(function() {
    localStorage.max = document.getElementById("max").value;
    localStorage.numtimes = document.getElementById("numtimes").value;
    localStorage.nummultiple = document.getElementById("nummultiple").value;
  },100);
}
function resetsettings() {
  localStorage.max = 50;
  localStorage.numtimes = 4;
  localStorage.nummultiple = 3;
  document.getElementById("max").value = 50;
  document.getElementById("numtimes").value = 4;
  document.getElementById("nummultiple").value = 3;
}
