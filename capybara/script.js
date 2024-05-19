let xval = -16;
let yval = 0;
let cheight = 64;
let xSpeed = 0;
let ySpeed = 0;
let dontgetstuckininfiniteloops = 0
let canJump = 0;
let storedNum = 0;
let score = 0;
let slope = 0;
let falling = "Y"
let oranges = 0;
let lockMovement = "N/A"
var audio = new Audio('jump.mp3');
audio.volume = 0.5
var failure = new Audio('fail.mp3');
var success = new Audio("success.mp3");
let pointerX = -1;
let pointerY = -1;
const messages = ["HOW DARE YOU BE SO GOOD AT THIS GAME!!","YOU WILL NEVER BEAT YOUR PERSONAL BEST!","I WILL PERSONALLY MAKE SURE YOU WON'T SUCCEED!","THIS GAME WILL BE YOUR WORST GAME.","PLEASE SPARE ME!!!","THIS IS YOUR LAST CHANCE!!","YOU CAN'T TURN BACK NOW!","MWAHAHAHAHAHAHAH","😈😈😈😈😈😈😈😈😈","YOU ARE LITERALLY A CAPYBARA"];
const messagesog5 = ["NO, STOP COLLECTING THOSE ORANGES!!!","ORANGES WILL KILL ME, PLEASE, SPARE ME!!!"]
const messagesog10 = ["I AM SERIOUS! STOP COLLECTING ORANGES!!!","DON'T KILL ME!!"]
const messagesog20 = ["DO YOU EVER LISTEN??","<b>STOP COLLECTING ORANGES!!!!</b>"]
const messagesog25 = ["I AM ALMOST DEAD, THANKS TO YOU!!!!","YOU PAIN ME"]
const messagessg1 = ["STOP WINNING THESE LEVELS!","I AM NOT GOING TO LET YOU WIN!"]
const messagessg5 = ["OH MY HOW ARE YOU SO GOOD AT THIS GAME?!","STOP THIS!!!"]
const messagessg10 = ["I WILL KIDNAP YOUR FAMILY"];
const messagessg20 = ["<b>I SWEAR, IF YOU GET PAST LEVEL 30, I WILL LITERALLY DIE!!</b>"]
function cycleMessage() {
  let m = messages;
  if (oranges >= 5) {
    m = m.concat(messagesog5)
  }
  if (oranges >= 10) {
    m = m.concat(messagesog10)
  }
  if (oranges >= 20) {
    m = m.concat(messagesog20)
  }
  if (oranges >= 25) {
    m = m.concat(messagesog25)
  }
  if (score >= 1) {
    m = m.concat(messagessg1)
  }
  if (score >= 5) {
    m = m.concat(messagessg5)
  }
  if (score >= 10) {
    m = m.concat(messagessg10)
  }
  if (score >= 20) {
    m = m.concat(messagessg20)
  }
  if (document.getElementsByClassName("messages")[0]) {
    document.getElementsByClassName("messages")[0].innerHTML = m[Math.floor(Math.random() * m.length)];
    document.getElementsByClassName("messages")[0].style.opacity = "1";
    setTimeout(function() {
      document.getElementsByClassName("messages")[0].style.opacity = "0";
    },5000);
  }
}
document.onmousemove = function(event) {
  pointerX = event.clientX;
  pointerY = event.clientY;
}
var pressedKeys = {};
if (localStorage.highscore == null) localStorage.highscore = 0;
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; console.log(pressedKeys) }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; console.log(pressedKeys) }
function newLevel() {
  for (i = 0; i < 20; i++) {
    window.clearInterval(i + storedNum);
  }
  storedNum++;
  begin();
}
function begin() {
  $(".trophy").css("background", "transparent")
  $(".character").css("background", "transparent")
  xval = -$(window).width() / 2 + 32;
  yval = $(window).height() / 2;
  cheight = 64;
  document.getElementsByTagName("body")[0].innerHTML = "<img src='/capybara3.png' class='character'><div class='block topbar'></div><div class='block rightbar'></div><div class='block leftbar'></div><div class='block bottombar'></div><div class='messages'></div>";
  $(".topbar").text("Score: " + score + "; High Score: " + localStorage.highscore + "; Oranges: " + oranges)

  let height = $(window).height()
  let width = $(window).width()
  // document.getElementsByTagName("body")[0].innerHTML += "<img class='trophy' style='height:32px;width:32px;position:absolute;top:" + (Math.random() * (height - 96) + 32) + "px;left:" + (Math.random() * (width - 96) + 32) + "px;image-rendering:pixelated' src='/cat.png'>"

  document.getElementsByTagName("body")[0].innerHTML += "<div onclick='newLevel()' class='impossible'>Reset Level</div>"
  generateLevel();
  cycleMessage();
  let theint = setInterval(function() {
    dontgetstuckininfiniteloops = 0
    if (Math.abs(xSpeed) < 2) {
      lockMovement = "n/a"
    }
    if ((pressedKeys[39] || pressedKeys[68]) && !(lockMovement == "r")) {
      xSpeed += 1.24 * localStorage.speed;
    }
    if ((pressedKeys[37] || pressedKeys[65]) && !(lockMovement == "l")) {
      xSpeed -= 1.24 * localStorage.speed;
    }
    xSpeed = xSpeed * 0.87
    if (!onBlock()) {
      ySpeed -= 2.45 * localStorage.speed;
    } else {
      ySpeed = 0;
    }
    yval += ySpeed
    if (ySpeed < 0) {
      while (collision()) {
        dontgetstuckininfiniteloops++;
        if (dontgetstuckininfiniteloops >= 375) {
          clearInterval(theint)
          storedNum++;
          if (!document.getElementsByClassName("error-found")[0]) {
            triggerError();
          }
          break;
        }
        yval += 1
        ySpeed = 1
        canJump = 1
        falling = "Y"
        updateLoc()
      }
    } else {
      while (collision()) {
        dontgetstuckininfiniteloops++;
        if (dontgetstuckininfiniteloops >= 375) {
          clearInterval(theint)
          storedNum++;
          if (!document.getElementsByClassName("error-found")[0]) {
            triggerError();
          }
          break;
        }
        console.log("LOOOPPPPPP! ")
        yval -= 1
        ySpeed = 1
        canJump = 0
        falling = "Y"
        updateLoc()
      }
    }
    xval += xSpeed;
    slope = 0;
    if ((pressedKeys[38] || pressedKeys[87] || pressedKeys[32]) && canJump == 1) {
      ySpeed = 32 * (cheight / 64) * localStorage.speed;
      canJump = 0;
      falling = "Y";
      audio.cloneNode(true).play();
    }
    if (pressedKeys[90] && canJump == 1) {
      ySpeed = 48 * (cheight / 64);
      canJump = 0;
      falling = "Y";
      audio.cloneNode(true).play();
    }
    while (!(slope == 8 || !collision())) {
      dontgetstuckininfiniteloops++;
        if (dontgetstuckininfiniteloops >= 375) {
          clearInterval(theint)
          storedNum++;
          if (!document.getElementsByClassName("error-found")[0]) {
            triggerError();
          }
          break;
        }
      slope += 1
      yval += 1
      updateLoc()
    }
    if (slope == 8) {
      xval -= xSpeed;
      yval -= slope;
      if ((pressedKeys[39] || pressedKeys[37] || pressedKeys[68] || pressedKeys[65]) && ySpeed < 0) {
        ySpeed = -1.7
        if (pressedKeys[38] || pressedKeys[87] || pressedKeys[32] || pressedKeys[90]) {
          ySpeed = 32;
          if (xSpeed > 0) {
            xSpeed = -22
            lockMovement = "r"
          } else {
            xSpeed = 22
            lockMovement = "l"
          }
        }
      }
    }
    if (ySpeed < -50) {
      ySpeed = -50
    }
    if (pressedKeys[70]) {
      $(".trophy").css("background", "yellow")
      $(".character").css("background", "lime")
    }
    if (Math.random() * 100 < 1 && document.getElementsByClassName("messages")[0].style.opacity == "0") {
      cycleMessage();
      if (oranges >= 30) {
        document.getElementsByClassName("messages")[0].remove();
      }
    }
    console.log(ySpeed + "; " + collision());
    if (yval < -450) {
      failure.volume = 1;
      failure.play()
      if (score > localStorage.highscore) {
        localStorage.highscore = score;
      }
      document.getElementsByTagName("body")[0].innerHTML += "<div class='goc'><div class='game-over'><div>Game Over!<div><div class='score'>Score: " + score + "; High Score: " + localStorage.highscore + "; Oranges: " + oranges + "</div></div></div>";
      clearInterval(theint);
    }
    if (collidingWithTrophy()) {
      success.cloneNode(true).play()
      console.log("Got Trophy");
      score++;
      clearInterval(theint);
      storedNum++;
      begin();
    };
    if (collidingWithOrange()) {
      success.cloneNode(true).play()
      collidingWithOrange().remove();
      oranges++;
      $(".topbar").text("Score: " + score + "; High Score: " + localStorage.highscore + "; Oranges: " + oranges);
    }
    updateLoc();
    // console.log("speed: " + ySpeed);
    // console.log("val: " + yval)
  }, 20);
}
function triggerError() {
  document.getElementsByTagName("body")[0].innerHTML += "<div class='goc'><div class='error-found'><div>Uhh, Ohh!<div><div class='score'>It seems that something went wrong!<br><a class='click-me' onclick='begin()' href='javascript: ;'>Click here</a> to regenerate the previous level.</div></div></div>";
}
function updateLoc() {
  $(":root").css("--x-offset", -xval + "px");
  $(":root").css("--y-offset", yval + "px");
  $(".character").css("height", cheight + "px");
}
function elementsOverlap(el1, el2) {
  let list = [];
  const domRect1 = el1.getBoundingClientRect();
  for (let i = 0; i < el2.length; i++) {
    const domRect2 = el2[i].getBoundingClientRect();

    list.push(!(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    ));
  }
  return list.includes(true);
}
function collision() {
  let list = [];
  let el2 = document.querySelectorAll("body>[class*=otherbar]");
  let width = $(window).width();
  let height = $(window).height();
  for (let i = 0; i < el2.length; i++) {
    let domRect2 = el2[i].getBoundingClientRect();
    list.push(!(
      height / 2 - 32 > el2[i].getAttribute("top") - 0 + domRect2.height + yval ||
      width / 2 + 32 < el2[i].getAttribute("left") - 0 - xval ||
      height / 2 + 32 < el2[i].getAttribute("top") - 0 + yval ||
      width / 2 - 32 > el2[i].getAttribute("left") - 0 + domRect2.width - xval
    ));
  }
  return list.includes(true) || yval < -500;
}
function collidingWithTrophy() {
  let list = [];
  let el2 = document.querySelectorAll("body>[class*=trophy]");
  let width = $(window).width();
  let height = $(window).height();
  for (let i = 0; i < el2.length; i++) {
    let domRect2 = el2[i].getBoundingClientRect();
    list.push(!(
      height / 2 - 32 > el2[i].getAttribute("top") - 0 + domRect2.height + yval ||
      width / 2 + 32 < el2[i].getAttribute("left") - 0 - xval ||
      height / 2 + 32 < el2[i].getAttribute("top") - 0 + yval ||
      width / 2 - 32 > el2[i].getAttribute("left") - 0 + domRect2.width - xval
    ));
  }
  return list.includes(true);
}
function collidingWithOrange() {
  let list = [];
  let el2 = document.querySelectorAll("body>[class*=orange]");
  let width = $(window).width();
  let height = $(window).height();
  let orange = null;
  for (let i = 0; i < el2.length; i++) {
    let domRect2 = el2[i].getBoundingClientRect();
    if (!(
        height / 2 - 32 > el2[i].getAttribute("top") - 0 + domRect2.height + yval ||
        width / 2 + 32 < el2[i].getAttribute("left") - 0 - xval ||
        height / 2 + 32 < el2[i].getAttribute("top") - 0 + yval ||
        width / 2 - 32 > el2[i].getAttribute("left") - 0 + domRect2.width - xval
      )) {
        orange = el2[i];
      }
  }
  return orange;
}
function onBlock() {
  let list = [];
  let el2 = document.querySelectorAll("body>[class*=otherbar]");
  let width = $(window).width();
  let height = $(window).height();
  for (let i = 0; i < el2.length; i++) {
    let domRect2 = el2[i].getBoundingClientRect();
    list.push(!(
      height / 2 - 32 > el2[i].getAttribute("top") - 0 + domRect2.height + yval ||
      width / 2 + 32 < el2[i].getAttribute("left") - 0 - xval ||
      height / 2 + 32 - 100 < el2[i].getAttribute("top") - 0 + yval ||
      width / 2 - 32 > el2[i].getAttribute("left") - 0 + domRect2.width - xval
    ));
  }
  return list.includes(true) || yval < -500;
}
function nearBlock() {
  let list = [];
  let el2 = document.getElementsByClassName("block");
  let capybara = document.getElementsByClassName("character")[0]
  let domRectCapybara = capybara.getBoundingClientRect();
  for (let i = 0; i < el2.length; i++) {
    const domRect2 = el2[i].getBoundingClientRect();

    list.push(!(
      domRectCapybara.top - 10 >= domRect2.bottom ||
      domRectCapybara.right <= domRect2.left ||
      domRectCapybara.bottom <= domRect2.top ||
      domRectCapybara.left - 10 >= domRect2.right
    ));
  }
  return list.includes(true);
}
function collide() {
  return (newOverlap() || yval <= -500);
}
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos1 + pos3 - e.clientX;
    pos2 = pos2 + pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    $(elmnt).attr("style", "transform:translateX(" + (-pos1) + "px) translateY(" + (-pos2) + "px)");
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function closePopup() {
  if (document.getElementsByClassName("popup")[0]) {
    $(".popup").removeClass("animate");
    $(".popup").removeClass("animatesearch");
    $(".popup").addClass("unanimate");
    if (document.getElementsByClassName("popup")[0].getAttribute("what") == "news") {
      newsOpen = 0;
    }
    if (document.getElementsByClassName("popup")[0].getAttribute("what") == "album") {
      albumOpen = 0;
      document.getElementsByTagName("title")[0].innerHTML = "Photos | Church of the Beloved"
    }
  }
}
function newsClicked(idnews, from, title, date, text, size, buttons, includeptag) {
  newsOpen = 1;
  let thedate = date;
  let ptagstart = "<p style='margin:0px;'>"
  let ptagend = "</p>"
  if (includeptag == false) {
    ptagstart = "";
    ptagend = "";
  }
  if (date == "undefined") thedate = ""
  if (size == "small") {
    document.getElementsByClassName("smallpopup")[0].innerHTML = "<div><div class='topbarsmallpopup'><div class='containtitlesmallpopup'><div class='titlesmallpopup'><div>" + title.replaceAll("quot;", "&quot;").replaceAll("apos;", "&apos;") + "</div></div><div class='datesmallpopup'><div>" + thedate + "</div></div></div><div class='xsmallpopup' onclick='closeSmallPopup()'><i class='fa-xmark fa-solid'></i></div></div><div class='contentsmallpopup'>" + ptagstart + text.replaceAll("quot;", "&quot;").replaceAll("apos;", "&apos;") + ptagend + "<div class='smallpopupbuttoncontainer'>" + buttons + "</div></div>";
    document.getElementsByClassName("smallpopup")[0].setAttribute("what", "news")
  } else {
    document.getElementsByClassName("popup")[0].innerHTML = "<div><div class='topbarpopup'><div class='titlepopup'><div>" + title.replaceAll("quot;", "&quot;").replaceAll("apos;", "&apos;") + "</div></div><div class='datepopup'><div>" + thedate + "</div></div></div><div class='xpopup' onclick='closePopup()'><i class='fa-xmark fa-solid'></i></div><div class='contentpopup'>" + ptagstart + text.replaceAll("quot;", "&quot;").replaceAll("apos;", "&apos;") + ptagend + "</div></div>";
    document.getElementsByClassName("popup")[0].setAttribute("what", "news")
  }
  $(".popup").css("display", "flex");
  $(".smallpopupcontainer").css("display", "flex");
  if (from == "clicked") {
    if (size == "small") {
      $(".smallpopupcontainer").css("left", pointerX);
      $(".smallpopupcontainer").css("top", pointerY);
      $(".smallpopupcontainer").addClass("animate");
      $(".smallpopupcontainer").removeClass("unanimate");
    } else {
      $(".popup").css("left", pointerX);
      $(".popup").css("top", pointerY);
      $(".popup").addClass("animate");
      $(".popup").removeClass("unanimate");
    }
  } else if (from == "search") {
    if (size == "small") {
      $(".smallpopupcontainer").addClass("animatesearch");
    } else {
      $(".popup").addClass("animatesearch");
    }
  }
}
function settings() {
  newsClicked("I CAN PUT ANYTHING HERE", "clicked", "Settings", "", '<div class="input-group"><label>Max Enemies Increase After:&nbsp;</label><input value="' + localStorage.enemiesIncreaseAfter + '" type="number" name="enemiesIncreaseAfter" class="input-username" placeholder="X Levels"></div><div class="input-group"><label>Max Enemies On Increase:&nbsp;</label><input value="' + localStorage.enemiesOnIncrease + '" type="number" name="enemiesOnIncrease" class="input-username" placeholder="X Enemies"></div><div class="input-group"><label>Min Enemies:&nbsp;</label><input value="' + localStorage.startingEnemies + '" type="number" name="startingEnemies" class="input-username" placeholder="X Enemies"></div><div class="input-group"><label>Fewest Black Boxes:&nbsp;</label><input value="' + localStorage.fewestBlackBoxes + '" type="number" name="fewestBlackBoxes" class="input-username" placeholder="X Boxes"></div><div class="input-group"><label>Most Black Boxes:&nbsp;</label><input value="' + localStorage.mostBlackBoxes + '" type="number" name="mostBlackBoxes" class="input-username" placeholder="X Boxes"></div><div class="input-group"><label>Speed:&nbsp;</label><input type="number" value="' + localStorage.speed + '" name="speed" class="input-username" placeholder="Multiplier"></div><div class="input-group-sub"><div class="submitSettings" onclick="submitSettings()">Submit</div></div>', "large", "", true);
}
if (localStorage.speed == null) {
  defaultSettings();
}
function defaultSettings() {
  localStorage.enemiesIncreaseAfter = 4;
  localStorage.speed = 1;
  localStorage.startingEnemies = 0;
  localStorage.enemiesOnIncrease = 1;
  localStorage.fewestBlackBoxes = 0;
  localStorage.mostBlackBoxes = 20;
}
function submitSettings() {
  localStorage.enemiesIncreaseAfter = document.querySelector("input[name='enemiesIncreaseAfter']").value;
  localStorage.speed = document.querySelector("input[name='speed']").value;
  localStorage.startingEnemies = document.querySelector("input[name='startingEnemies']").value;
  localStorage.enemiesOnIncrease = document.querySelector("input[name='enemiesOnIncrease']").value;
  localStorage.fewestBlackBoxes = document.querySelector("input[name='fewestBlackBoxes']").value;
  localStorage.mostBlackBoxes = document.querySelector("input[name='mostBlackBoxes']").value;
  closePopup();
}
function generateLevel() {
  let currentY = $(window).height() - 32;
  let currentX = 32;
  for (let i = 0; i < Math.random() * 60 + 10; i++) {
    let random = Math.floor(Math.random() * 10);
    if (random == 0) {
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:32px;width:128px' top='" + currentY + "' left='" + currentX + "'></div>";
      currentX = currentX + 256;
    } else if (random == 1) {
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:32px;width:128px' top='" + currentY + "' left='" + currentX + "'></div>";
      currentX += 256;
      currentY -= 32;
    } else if (random == 2) {
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:32px;width:32px' top='" + currentY + "' left='" + currentX + "'></div>";
      currentX += 128 + 64;
      currentY -= 32;
    } else if (random == 3) {
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:32px;width:96px' top='" + currentY + "' left='" + currentX + "'></div>";
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "-2' style='top:calc(" + currentY + "px - 32px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:32px;width:32px' top='" + (currentY - 32) + "' left='" + currentX + "'></div>";
      currentX += 96 + 64;
      currentY -= 96;
    } else if (random == 4) {
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:64px;width:32px' top='" + currentY + "' left='" + currentX + "'></div>";
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "-2' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + 160px + var(--x-offset));height:96px;width:32px' top='" + (currentY) + "' left='" + (currentX + 160) + "'></div>";
      currentX += 320;
      currentY -= 32;
    } else if (random == 5) {
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:32px;width:96px' top='" + currentY + "' left='" + currentX + "'></div>";
      document.getElementsByTagName("body")[0].innerHTML += "<div class='orange orange" + i + "-2' style='top:calc(" + currentY + "px - 32px + var(--y-offset));left:calc(" + currentX + "px + 32px + var(--x-offset));height:32px;width:32px' top='" + (currentY - 32) + "' left='" + (currentX + 32) + "'></div>";
      currentX += 320;
      currentY += 32;
    } else if (random == 6) {
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:32px;width:96px' top='" + currentY + "' left='" + currentX + "'></div>";
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "-2' style='top:calc(" + currentY + "px - 128px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:32px;width:96px' top='" + (currentY - 128) + "' left='" + (currentX) + "'></div>";
      currentX += 256;
      currentY -= 32;
    } else if (random == 7) {
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:32px;width:64px' top='" + currentY + "' left='" + currentX + "'></div>";
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "-2' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + 192px + var(--x-offset));height:32px;width:64px' top='" + (currentY) + "' left='" + (currentX + 192) + "'></div>";
      document.getElementsByTagName("body")[0].innerHTML += "<div class='fakeout fakeout" + i + "-3' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + 96px + var(--x-offset));height:32px;width:64px' top='" + (currentY) + "' left='" + (currentX + 96) + "'></div>";
      currentX += 384;
      currentY -= 0;
    } else if (random == 8) {
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:32px;width:96px' top='" + currentY + "' left='" + currentX + "'></div>";
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "-2' style='top:calc(" + currentY + "px - 128px + var(--y-offset));left:calc(" + currentX + "px - 96px + var(--x-offset));height:32px;width:96px' top='" + (currentY - 128) + "' left='" + (currentX - 96) + "'></div>";
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "-3' style='top:calc(" + currentY + "px - 224px + var(--y-offset));left:calc(" + currentX + "px - 96px + var(--x-offset));height:128px;width:32px' top='" + (currentY - 224) + "' left='" + (currentX - 96) + "'></div>";
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "-4' style='top:calc(" + currentY + "px - 256px + var(--y-offset));left:calc(" + currentX + "px + 32px + var(--x-offset));height:32px;width:96px' top='" + (currentY - 256) + "' left='" + (currentX + 32) + "'></div>";
      currentX += 352;
      currentY -= (6 * 32);
    } else if (random == 9) {
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:32px;width:32px' top='" + currentY + "' left='" + currentX + "'></div>";
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "-2' style='top:calc(" + currentY + "px - 192px + var(--y-offset));left:calc(" + currentX + "px + 32px + var(--x-offset));height:32px;width:32px' top='" + (currentY - 192) + "' left='" + (currentX + 32) + "'></div>";
      document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "-3' style='top:calc(" + currentY + "px - 384px + var(--y-offset));left:calc(" + currentX + "px + 64px + var(--x-offset));height:32px;width:32px' top='" + (currentY - 384) + "' left='" + (currentX + 64) + "'></div>";
      currentX += 128;
      currentY -= 576;
    }
  }
  document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + "final" + "' style='top:calc(" + currentY + "px + var(--y-offset));left:calc(" + currentX + "px + var(--x-offset));height:32px;width:96px' top='" + currentY + "' left='" + currentX + "'></div>";
  document.getElementsByTagName("body")[0].innerHTML += "<div class='trophy trophy" + "final" + "-2' style='top:calc(" + currentY + "px - 32px + var(--y-offset));left:calc(" + currentX + "px + 32px + var(--x-offset));height:32px;width:32px' top='" + (currentY - 32) + "' left='" + (currentX + 32) + "'></div>";
}
