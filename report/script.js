$(document).ready(function() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
  });
  points = params.points.split("¯");
  correct = params.correct.split("¯");
  incorrect = params.incorrect.split("¯");
  let code = "<div class='cont-e-s'>"
  for (let i = 0; i < points.length; i++) {
    console.log("Correct: " + correct[i] + "---Incorrect: " + incorrect[i])
    if (correct[i] != "0" || incorrect[i] != "0") {
      let total = (correct[i] - 0) + (incorrect[i] - 0)
      let perccorrect = Math.round(((correct[i] - 0) / (total)) * 10000) / 100;
      let percincorrect = Math.round(((incorrect[i] - 0) / (total)) * 10000) / 100;
      console.log(total + '   ' + perccorrect + "   " + percincorrect)
      let wrongcont = (incorrect[i] - 0) + "/" + total + " (" + percincorrect + "%)"
      let rightcont = (correct[i] - 0) + "/" + total + " (" + perccorrect + "%)"
      let a = "0px"
      let b = "0px"
      if (perccorrect == 0) {
        rightcont = "";
        b = "20px"
      }
      if (percincorrect == 0) {
        wrongcont = "";
        a = "20px"
      }
      code += "<div style='--a:" + a + ";--b:" + b + ";--percentage-right:" + perccorrect +  "%;--percentage-wrong:" + percincorrect + "%' class='report-item'><div class='item-title' style='height:130px'>" + localStorage.questions.split("¯")[i] + "</div><div class='progress-report' rightcont='" + rightcont + "' wrongcont='" + wrongcont + "'></div></div>";
    }
  }
  code += "</div>"
  document.getElementsByTagName("body")[0].innerHTML += code;
  shrinkToFit();
});
function shrinkToFit() {
  for (let i = 0; i < document.getElementsByClassName("item-title").length; i++) {
    var divo = document.getElementsByClassName('item-title')[i];
    var fontSizeo = 100;
    do {
      fontSizeo--;
      $(divo).css('font-size', fontSizeo + 'px');
      if (fontSizeo <= 0) {
        break;
      }
    } while (document.getElementsByClassName("item-title")[i].scrollWidth > document.getElementsByClassName("item-title")[i].offsetWidth || document.getElementsByClassName("item-title")[i].scrollHeight - 8 > document.getElementsByClassName("item-title")[i].offsetHeight);
    fontSizeo = fontSizeo - 1;
    $(divo).css('font-size', fontSizeo + 'px');
  }
}
$(window).resize(function() {
  shrinkToFit();
});