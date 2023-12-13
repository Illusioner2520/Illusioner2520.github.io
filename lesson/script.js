$(document).ready(function() {
  localStorage.inLesson = 1;
  let hi2 = 0;
  for (let i = 0; i < localStorage.lessonPts.split("¯").length; i++) {
    hi2 -= localStorage.lessonPts.split("¯")[i];
  }
  let percentage = (hi2 / Math.min((localStorage.lessonPts.split("¯").length * localStorage.numtimes),localStorage.max)) * 100;
  $("body").css("--percentage",percentage + "%");
  updateQuestion();
});
let congratulations = ["Good Job!","Awesome!","You're doing great!","Keep it up!","Amazing!","Stunning!","Fantastic!","Congrats!", "Excellent!","Way to go!","Well Done!","Great Job!","Outstanding!"]
function updateQuestion() {
  stopConfetti();
  $("body").attr("onkeydown","");
  $(".zeanswer").css("background-color","unset");
  let nums = localStorage.lessonPts.split("¯");
  let num = 0;
  let num2 = 0;
  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] - 0;
    if (nums[i] <= -localStorage.numtimes) {
      num++;
    }
    num2 -= nums[i] - 0;
  }
  if (num == nums.length || num2 >= localStorage.max) {
    $(".zeanswer").css("background-color","green");
    document.getElementsByClassName("zeanswer")[0].innerHTML = "<div class='aftertext'>You finished this practice!</div><div onclick='leave()' class='continue' style='background:#005000'>Continue</div>";
    shrinkToFit();
    localStorage.coinslvl = (localStorage.coinslvl - 0) + (4 * (localStorage.multiplier - 0));
    localStorage.coins = (localStorage.coins - 0) + (localStorage.coinslvl - 0);
    setTimeout(function() {
      $("body").attr("onkeydown","leave()");
    },100);
    return;
  }
  let qs = localStorage.questions.split("¯");
  qs.sort(function(a, b) {
    return nums[qs.indexOf(b)] - nums[qs.indexOf(a)];
  });
  nums.sort(function(a, b) {
    return b - a;
  });;
  let randopick = [];
  let j = nums[0];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > -localStorage.numtimes) {
      randopick.push(qs[i]);
    }
  }
  let dachoice = choice(randopick);
  let skip = "";
  if (localStorage.skips > 0) {
    skip = "<div onclick='localStorage.skips--;submitAnswer(" + localStorage.questions.split("¯").indexOf(dachoice) + ",`right`);$(`.skip`).css(`display`,`none`)' class='skip'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAfklEQVRIie3TsQ0CMRAAweFBdEMNlEQhRLTEixjpySmDkCfBZJyxwURe6aK1tJLPptP5NSssv/AnjFHggiu2lX5+zlvSgTsOWFf6bCDNhE2F/zgw44YdFgW+KJBmX+BfDFGtBX+/omZLbvZMz+KPlPPZwCBefM6POEaBTqecBxApZ5D0FUFeAAAAAElFTkSuQmCC'></div>";
  }
  document.getElementsByClassName("daquestion")[0].innerHTML = dachoice + skip;
  let danum = localStorage.questions.split("¯").indexOf(dachoice)
  let type = "text";
  if (localStorage.numcorrect.split("¯")[danum] - localStorage.numincorrect.split("¯")[danum] * 2 <= localStorage.nummultiple - 1) {
    type = "multi-choice";
  }
  let gotoanswer = "";
  if (type == "multi-choice") {
    let a1 = "";
    let a2 = "";
    let a3 = "";
    let a4 = "";
    let nums = [];
    let max = 4;
    if (localStorage.questions.split("¯").length < 4) {
      max = localStorage.questions.split("¯").length;
    }
    let where = randint(1,max);
    if (where == 1) {
      a1 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`right`)'>" + localStorage.info.split("¯")[danum] + "</div>"
    } else if (where == 2) {
      a2 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`right`)'>" + localStorage.info.split("¯")[danum] + "</div>"
    } else if (where == 3) {
      a3 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`right`)'>" + localStorage.info.split("¯")[danum] + "</div>"
    } else if (where == 4) {
      a4 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`right`)'>" + localStorage.info.split("¯")[danum] + "</div>"
    }
    for (let i = 0; i < localStorage.questions.split("¯").length; i++) {
      if (i != danum) {
        nums.push(i);
      }
    }
    let j = 0;
    shuffle(nums);
    for (let i = 0; i < 4; i++) {
      if (i != where - 1) {
        if (nums.length >= 3) {
          if (i + 1 == 1) {
            a1 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`wrong`)'>" + localStorage.info.split("¯")[nums[j]] + "</div>"
          } else if (i + 1 == 2) {
            a2 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`wrong`)'>" + localStorage.info.split("¯")[nums[j]] + "</div>"
          } else if (i + 1 == 3) {
            a3 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`wrong`)'>" + localStorage.info.split("¯")[nums[j]] + "</div>"
          } else if (i + 1 == 4) {
            a4 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`wrong`)'>" + localStorage.info.split("¯")[nums[j]] + "</div>"
          }
        } else if (nums.length == 2) {
          if (j < 2) {
            if (i + 1 == 1) {
              a1 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`wrong`)'>" + localStorage.info.split("¯")[nums[j]] + "</div>"
            } else if (i + 1 == 2) {
              a2 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`wrong`)'>" + localStorage.info.split("¯")[nums[j]] + "</div>"
            } else if (i + 1 == 3) {
              a3 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`wrong`)'>" + localStorage.info.split("¯")[nums[j]] + "</div>"
            } else if (i + 1 == 4) {
              a4 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`wrong`)'>" + localStorage.info.split("¯")[nums[j]] + "</div>"
            }
          }
        } else if (nums.length == 1) {
          if (j < 1) {
            if (i + 1 == 1) {
              a1 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`wrong`)'>" + localStorage.info.split("¯")[nums[j]] + "</div>"
            } else if (i + 1 == 2) {
              a2 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`wrong`)'>" + localStorage.info.split("¯")[nums[j]] + "</div>"
            } else if (i + 1 == 3) {
              a3 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`wrong`)'>" + localStorage.info.split("¯")[nums[j]] + "</div>"
            } else if (i + 1 == 4) {
              a4 = "<div class='multiple-choice' onclick='submitAnswer(" + danum + ",`wrong`)'>" + localStorage.info.split("¯")[nums[j]] + "</div>"
            }
          }
        }
        j++;
      }
    }
    gotoanswer = a1 + a2 + a3 + a4;
  } else if (type == "text") {
    gotoanswer = "<input question='" + danum + "' correctanswer='" + fix(localStorage.info.split("¯")[danum]) + "' placeholder='Type Answer Here' class='text-answer' onkeydown='if (event.key == `Enter`) { checkTextAnswer() }'>";
  }
  document.getElementsByClassName("zeanswer")[0].innerHTML = gotoanswer;
  if (type == "text") {
    document.getElementsByClassName("text-answer")[0].focus();
  }
  shrinkToFit();
}
function shrinkToFit() {
  var div = $('.daquestion');
  var fontSize = 100;
  do {
    fontSize--;
    div.css('font-size', fontSize + 'px');
    if (fontSize <= 0) {
      break;
    }
  } while (document.getElementsByClassName("daquestion")[0].scrollWidth > document.getElementsByClassName("daquestion")[0].offsetWidth || document.getElementsByClassName("daquestion")[0].scrollHeight > document.getElementsByClassName("daquestion")[0].offsetHeight);
  div.css('font-size', fontSize + 'px');
  for (let i = 0; i < document.getElementsByClassName("multiple-choice").length; i++) {
    var divo = document.getElementsByClassName('multiple-choice')[i];
    var fontSizeo = 100;
    do {
      fontSizeo--;
      $(divo).css('font-size', fontSizeo + 'px');
      if (fontSizeo <= 0) {
        break;
      }
    } while (document.getElementsByClassName("multiple-choice")[i].scrollWidth > document.getElementsByClassName("multiple-choice")[i].offsetWidth || document.getElementsByClassName("multiple-choice")[i].scrollHeight - 8 > document.getElementsByClassName("multiple-choice")[i].offsetHeight);
    fontSizeo = fontSizeo - 1;
    $(divo).css('font-size', fontSizeo + 'px');
  }
  if (document.getElementsByClassName("text-input")[0]) {
    var divoo = document.getElementsByClassName('text-input')[0];
    var fontSizeoo = 100;
    do {
      fontSizeoo--;
      $(divoo).css('font-size', fontSizeoo + 'px');
      if (fontSizeoo <= 0) {
        break;
      }
    } while (document.getElementsByClassName("text-input")[0].scrollWidth > document.getElementsByClassName("text-input")[0].offsetWidth || document.getElementsByClassName("text-input")[0].scrollHeight > document.getElementsByClassName("text-input")[0].offsetHeight);
    fontSizeoo = fontSizeoo - 10;
    $(divoo).css('font-size', fontSizeoo + 'px');
  }
  if (document.getElementsByClassName("continue")[0]) {
    var divooo = document.getElementsByClassName('aftertext')[0];
    var fontSizeooo = 100;
    do {
      fontSizeooo--;
      $(divooo).css('font-size', fontSizeooo + 'px');
      if (fontSizeooo <= 0) {
        break;
      }
    } while (document.getElementsByClassName("aftertext")[0].scrollWidth > document.getElementsByClassName("aftertext")[0].offsetWidth || document.getElementsByClassName("aftertext")[0].scrollHeight > document.getElementsByClassName("aftertext")[0].offsetHeight);
    fontSizeooo = fontSizeooo - 10;
    $(divooo).css('font-size', fontSizeooo + 'px');
  }
}
$(window).resize(function() {
  shrinkToFit();
});
function choice(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function randint(min, max) {
  return Math.floor(Math.random() * max) + min;
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
function submitAnswer(q,row) {
  if (row == "right") {
    let hi = localStorage.numcorrect.split("¯");
    let hi2 = localStorage.lessonPts.split("¯");
    hi2[q] = hi2[q] - 1;
    localStorage.lessonPts = hi2.join("¯");
    hi[q] = hi[q] - 0;
    hi[q]++;
    localStorage.numcorrect = hi.join("¯");
    localStorage.coinslvl = (localStorage.coinslvl - 0) + (1 * localStorage.multiplier);
    $(".zeanswer").css("background-color","green");
    document.getElementsByClassName("zeanswer")[0].innerHTML = "<div class='aftertext'>" + choice(congratulations) + "</div><div onclick='updateQuestion()' class='continue' style='background:#005000'>Continue</div>";
    if (localStorage.confetti == 1) {
      startConfetti();
    }
    shrinkToFit();
  } else if (row == "wrong") {
    let hi = localStorage.numincorrect.split("¯");
    let hi2 = localStorage.lessonPts.split("¯");
    localStorage.coinslvl = (localStorage.coinslvl - 0) - (3 * localStorage.multiplier);
    hi2[q] = hi2[q] - 0;
    hi2[q] = hi2[q] + 2;
    localStorage.lessonPts = hi2.join("¯");
    hi[q] = hi[q] - 0;
    hi[q]++;
    localStorage.numincorrect = hi.join("¯");
    $(".zeanswer").css("background-color","#aa0000");
    document.getElementsByClassName("zeanswer")[0].innerHTML = "<div class='aftertext'>You got this question wrong! The correct answer was: " + localStorage.info.split("¯")[q] + "</div><div onclick='updateQuestion()' class='continue' style='background:#880000'>Continue</div>";
    shrinkToFit();
  }
  let hi2 = 0;
  for (let i = 0; i < localStorage.lessonPts.split("¯").length; i++) {
    hi2 -= localStorage.lessonPts.split("¯")[i];
  }
  let percentage = (hi2 / Math.min((localStorage.lessonPts.split("¯").length * localStorage.numtimes),localStorage.max)) * 100;
  $("body").css("--percentage",percentage + "%");
  setTimeout(function() {
    $("body").attr("onkeydown","if (event.key == 'Enter') { updateQuestion() }");
  },100);
}
function checkTextAnswer() {
  let thing = document.getElementsByClassName("text-answer")[0].value;
  thing = fix(thing);
  console.log(thing + " and " + $(".text-answer").attr("correctanswer"));
  let diffs = "";
  for (let i = 0; i < thing.split("").length; i++) {
    if (thing.split("")[i] == $(".text-answer").attr("correctanswer").split("")[i]) {
      diffs += $(".text-answer").attr("correctanswer").split("")[i];
    } else {
      diffs += " -" + $(".text-answer").attr("correctanswer").split("")[i];
    }
  }
  console.log(diffs);
  if (thing == $(".text-answer").attr("correctanswer")) {
    submitAnswer($(".text-answer").attr("question") - 0,"right");
  } else {
    submitAnswer($(".text-answer").attr("question") - 0,"wrong");
  }
}
function fix(text) {
  return text.toLowerCase().trim().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-z0-9 ]/gu, '').replaceAll(" ","").replaceAll("apos","").replaceAll("1st","first").replaceAll("2nd","second").replaceAll("3rd","third").replaceAll("4th","fourth").replaceAll("5th","fifth").replaceAll("6th","sixth").replaceAll("7th","seventh").replaceAll("8th","eighth").replaceAll("9th","ninth").replaceAll("10th","tenth").replaceAll("0","zero").replaceAll("1","one").replaceAll("2","two").replaceAll("3","three").replaceAll("4","four").replaceAll("5","five").replaceAll("6","six").replaceAll("7","seven").replaceAll("8","eight").replaceAll("9","nine").replaceAll("&","and")
}
function leave() {
  localStorage.multiplier = 1;
  localStorage.inLesson = 0;
  localStorage.confetti = 0;
  localStorage.coinslvl = 0;
  let qs = localStorage.questions.split("¯");
  let o = [];
  for (let i = 0; i < qs.length; i++) {
    o.push(0);
  }
  ptstemp = localStorage.lessonPts
  corrtemp = localStorage.numcorrect
  incorrtemp = localStorage.numincorrect
  localStorage.lessonPts = o.join("¯");
  localStorage.numcorrect = o.join("¯");
  localStorage.numincorrect = o.join("¯");
  window.location.href=`/report/?points=` + ptstemp + `&correct=` + corrtemp + `&incorrect=` + incorrtemp;
}
function generateReport() {
  report = "";
  for (let i = 0; i < localStorage.questions.split("¯").length; i++) {
    report += `<div class='q-report'><div class='q-in-q-report'></div><div class='stat'></div></div>`
  }
  return "<div class='yes-revert' onclick='window.location.href=`/`'>Click to go home, Stats coming soon!</div>"
}