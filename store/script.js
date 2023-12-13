$(document).ready(function() {
  updateCoins();
  updateStore();
  if (localStorage.inLesson == 1) {
    $(".buy").css("cursor","context-menu");
    $(".buy").css("background","#111111");
    $(".buy").attr("onclick","");
    for (let i = 0; i < document.getElementsByClassName("buy").length; i++) {
      document.getElementsByClassName("buy")[i].innerHTML = "You can't buy this while in a level";
    }
  }
});
function buy(what, thing) {
  if (localStorage.coins - $(thing).attr("price") < 0) {
    thing.innerHTML = "You don't have enough coins!";
    $(thing).css("background","red");
    setTimeout(function() {
      thing.innerHTML = "Buy for " + $(thing).attr("price") + " coins";
      $(thing).css("background","green");
    },2500);
  } else {
    localStorage.coins = localStorage.coins - 0 - $(thing).attr("price") - 0;
    if (what == "skip") {
      localStorage.skips++;
    } else if (what == "coin-multiplier") {
      localStorage.multiplier = localStorage.multiplier * 4;
      $(".multiplier").attr("onclick","");
    } else if (what == "confetti") {
      localStorage.confetti = 1;
      $(".confetti").attr("onclick","");
    }
    thing.innerHTML = "Bought!";
    updateCoins()
    setTimeout(function() {
      thing.innerHTML = "Buy for " + $(thing).attr("price") + " coins";
      updateStore();
    },2500);
  }
}
function updateCoins() {
  document.getElementsByClassName("coincount")[0].innerHTML = localStorage.coins + " coins";
}
function updateStore() {
  if (localStorage.multiplier >= 2) {
    document.getElementsByClassName("multiplier")[0].innerHTML = "Already Equipped!";
    $(".multiplier").attr("onclick","");
    $(".multiplier").css("background","yellow");
    $(".multiplier").css("color","black");
  }
  if (localStorage.confetti >= 1) {
    document.getElementsByClassName("confetti")[0].innerHTML = "Already Equipped!";
    $(".confetti").attr("onclick","");
    $(".confetti").css("background","yellow");
    $(".confetti").css("color","black");
  }
}