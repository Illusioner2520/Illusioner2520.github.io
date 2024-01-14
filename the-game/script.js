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
let lockMovement = "N/A"
var audio = new Audio('jump.mp3');
audio.volume = 0.5
var failure = new Audio('fail.mp3');
var success = new Audio("success.mp3")
var pressedKeys = {};
if (localStorage.highscore == null) localStorage.highscore = 0;
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; console.log(pressedKeys) }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; console.log(pressedKeys) }
function newLevel() {
  for(i=0; i<20; i++){
    window.clearInterval(i + storedNum);
  }
  storedNum++;
  begin();
}
function begin() {
      $(".trophy").css("background","transparent")
      $(".character").css("background","transparent")
  xval = -16;
  yval = 0;
  cheight = 64;
  document.getElementsByTagName("body")[0].innerHTML = "<img src='/the-game/character.png' class='character'><div class='block topbar'></div><div class='block rightbar'></div><div class='block leftbar'></div><div class='block bottombar'></div>";
  $(".topbar").text("Score: " + score + "; High Score: " + localStorage.highscore)

  let height = $(window).height()
  let width = $(window).width()
  let numberofotherbars = Math.floor(Math.random() * 20)
  let numberofenemies = Math.floor(Math.random() * score / 4)
  for (let i = 0; i<numberofotherbars; i++) {
    let rorlnum = Math.floor(Math.random() * 2)
    let rorl = "right"
    if (rorlnum == 0) rorl = "left"
    document.getElementsByTagName("body")[0].innerHTML += "<div class='block otherbar" + i + "' style='top:" + ((Math.random() * (100 / numberofotherbars)) + (i * (100 / numberofotherbars))) + "%;width:" + Math.random() * (60) + "%;height:32px;" + rorl + ":32px;'></div>"
  }
  document.getElementsByTagName("body")[0].innerHTML += "<img class='trophy' style='height:32px;width:32px;position:absolute;top:" + (Math.random() * (height - 96) + 32) + "px;left:" + (Math.random() * (width - 96) + 32) + "px;image-rendering:pixelated' src='/the-game/cat.png'>"
  for (let i = 0; i < numberofenemies; i++) {
    let topval = (Math.random() * (height - 32)) - ((height - 32) / 2);
    let leftval = (Math.random() * (width - 32)) - ((width - 32) / 2); 
    document.getElementsByTagName("body")[0].innerHTML += "<div class='enemy' topval='" + topval + "' leftval='" + leftval + "' style='top:calc(50% - " + topval + "px);left:calc(50% + " + leftval + "px);'></div>"
  }

  document.getElementsByTagName("body")[0].innerHTML += "<div onclick='newLevel()' class='impossible'>Reset Level</div>"
  let theint = setInterval(function() {
    dontgetstuckininfiniteloops = 0
    let enemylist = document.getElementsByClassName("enemy");
    for (let i = 0; i < enemylist.length; i++) {
      let enemyxval = enemylist[i].getAttribute("leftval");
      let enemyyval = enemylist[i].getAttribute("topval");
      let xdiff  = enemyxval - xval;
      let ydiff = enemyyval - yval;
      enemyxval = enemyxval - xdiff / 100
      enemyyval = enemyyval - ydiff / 100
      enemylist[i].setAttribute("leftval",enemyxval)
      enemylist[i].setAttribute("topval",enemyyval)
      enemylist[i].setAttribute("style","top:calc(50% - " + enemyyval + "px);left:calc(50% + " + enemyxval + "px);")
    }
    if (yval > ($(window).height() / 2)) {
      yval = 0
    }
    if (Math.abs(xSpeed) < 2) {
      lockMovement = "n/a"
    }
    if ((pressedKeys[39] || pressedKeys[68]) && !(lockMovement == "r")) {
      xSpeed += 1.24;
    }
    if ((pressedKeys[37] || pressedKeys[65]) && !(lockMovement == "l")) {
      xSpeed -= 1.24;
    }
    xSpeed = xSpeed * 0.87
    ySpeed -= 2.45
    yval += ySpeed
    if (ySpeed < 0) {
      while (collide()) {
        dontgetstuckininfiniteloops++;
      console.log(dontgetstuckininfiniteloops)
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
      while (collide()) {
        dontgetstuckininfiniteloops++;
      console.log(dontgetstuckininfiniteloops)
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
      ySpeed = 32 * (cheight / 64);
      canJump = 0;
      falling = "Y";
      audio.cloneNode(true).play();
    }
    if (pressedKeys[88]) {
      console.log("triggered")
      cheight = cheight - 1;
    }
    if (pressedKeys[67]) {
      console.log("triggered")
      cheight = cheight + 1;
    }
    if (pressedKeys[90] && canJump == 1) {
      ySpeed = 48 * (cheight / 64);
      canJump = 0;
      falling = "Y";
      audio.cloneNode(true).play();
    }
    while (!(slope == 8 || !collide())) {
      dontgetstuckininfiniteloops++;
      console.log(dontgetstuckininfiniteloops)
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
    if (xval > $(window).width() / 2 - 32) {
      xval = $(window).width() / 2 - 32
    }
    if (xval < -($(window).width() / 2)) {
      xval = -($(window).width() / 2)
    }
    if (gotTrophy()) {
      success.cloneNode(true).play()
      console.log("Got Trophy");
      score++;
      clearInterval(theint);
      storedNum++;
      begin();
    };
    if (hitEnemy()) {
      failure.volume = 1;
      failure.play()
      if (score > localStorage.highscore) {
        localStorage.highscore = score;
      }
      document.getElementsByTagName("body")[0].innerHTML += "<div class='goc'><div class='game-over'><div>Game Over!<div><div class='score'>Score: " + score + "; High Score: " + localStorage.highscore + "</div></div></div>";
      clearInterval(theint);
    }
    if (pressedKeys[70]) {
      $(".trophy").css("background","yellow")
      $(".character").css("background","lime")
    }
    updateLoc();
  }, 20);
}
function triggerError() {
  document.getElementsByTagName("body")[0].innerHTML += "<div class='goc'><div class='error-found'><div>Uhh, Ohh!<div><div class='score'>It seems that something went wrong!<br><a class='click-me' onclick='begin()' href='javascript: ;'>Click here</a> to regenerate the previous level.</div></div></div>";
}
function updateLoc() {
  $(".character").css("left","calc(50% + " + xval + "px)");
  $(".character").css("top","calc(50% - " + yval + "px)");
  $(".character").css("height",cheight + "px");
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
function gotTrophy() {
  let list = [];
  let el2 = document.getElementsByClassName("trophy");
  for (let i = 0; i < el2.length; i++) {
    const domRect2 = el2[i].getBoundingClientRect();
  
    list.push(!(
      ($(window).height() / 2) - yval > domRect2.bottom ||
      xval + ($(window).width() / 2) + 32 < domRect2.left ||
      ($(window).height() / 2) + cheight - yval < domRect2.top ||
      xval + ($(window).width() / 2) > domRect2.right
    ));
  }
  return list.includes(true);
}
function hitEnemy() {
  let list = [];
  let el2 = document.getElementsByClassName("enemy");
  for (let i = 0; i < el2.length; i++) {
    const domRect2 = el2[i].getBoundingClientRect();
  
    list.push(!(
      ($(window).height() / 2) - yval > domRect2.bottom ||
      xval + ($(window).width() / 2) + 32 < domRect2.left ||
      ($(window).height() / 2) + cheight - yval < domRect2.top ||
      xval + ($(window).width() / 2) > domRect2.right
    ));
  }
  return list.includes(true);
}
function newOverlap() {
  let list = [];
  let el2 = document.getElementsByClassName("block");
  for (let i = 0; i < el2.length; i++) {
    const domRect2 = el2[i].getBoundingClientRect();
  
    list.push(!(
      ($(window).height() / 2) - yval > domRect2.bottom ||
      xval + ($(window).width() / 2) + 32 < domRect2.left ||
      ($(window).height() / 2) + cheight - yval < domRect2.top ||
      xval + ($(window).width() / 2) > domRect2.right
    ));
  }
  return list.includes(true);
}
function collide() {
  return (newOverlap() || yval <= -($(window).height() / 2 - cheight));
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
      $(elmnt).attr("style","transform:translateX(" + (-pos1) + "px) translateY(" + (-pos2) + "px)");
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
