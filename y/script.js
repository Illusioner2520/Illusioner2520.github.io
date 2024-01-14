$(document).ready(function() {
  if (localStorage.questions != "" && localStorage.questions != null && localStorage.info != "" && localStorage.info != null) {
    document.getElementsByClassName("cont")[0].innerHTML = "<div class='start' onclick='begin()'>Begin</div>";
    if (localStorage.inLesson == 1) {
      document.getElementsByClassName("cont")[0].innerHTML = "<div class='start' onclick='begin()'>Continue</div>";
    }
  }
  if (localStorage.skips == null) localStorage.skips = 0;
  if (localStorage.confetti == null) localStorage.confetti = 0;
  if (localStorage.lessonPts == null) localStorage.lessonPts = "";
  if (localStorage.coins == null) localStorage.coins = 0;
  if (localStorage.coinslvl == null) localStorage.coinslvl = 0;
  if (localStorage.questions == null) localStorage.questions = "";
  if (localStorage.info == null) localStorage.info = "";
  if (localStorage.questionst == null) localStorage.questionst = "";
  if (localStorage.infot == null) localStorage.infot = "";
  if (localStorage.numcorrect == null) localStorage.numcorrect = "";
  if (localStorage.numincorrect == null) localStorage.numincorrect = "";
  if (localStorage.multiplier == null) localStorage.multiplier = 1;
  if (localStorage.max == null) localStorage.max = 50;
  if (localStorage.numtimes == null) localStorage.numtimes = 4;
  if (localStorage.nummultiple == null) localStorage.nummultiple = 3;
  document.getElementsByClassName("coincount")[0].innerHTML = localStorage.coins + " coins";
});
function begin() {
  window.location.href = "/y/lesson";
}
