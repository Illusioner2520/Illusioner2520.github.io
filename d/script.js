const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let date = new Date();
let daysoff = [];
let enddates = [];
let daysleft = 0;
let maxdays = 0;
let mondaysleft = 0;
let tuesdaysleft = 0;
let wednesdaysleft = 0;
let thursdaysleft = 0;
let fridaysleft = 0;
let beforedate = "";

$(document).ready(function() {
  if (localStorage.getItem("grade") == null) {
    localStorage.setItem("grade", "high");
  }
  if (localStorage.getItem("goto") == null) {
    localStorage.setItem("goto", "y");
  }
  $.getJSON("/d/days.json", function(data) {
    enddates = data;
    update();
  });
  $("#the-grade").val(localStorage.getItem("grade"));
  $("#goto").val(localStorage.getItem("goto"));
  $("#the-grade").on('change', function() {
    var el = $(this);
    localStorage.setItem("grade", el.val());
    update();
  });
  $("#goto").on('change', function() {
    var el = $(this);
    localStorage.setItem("goto", el.val());
    update();
  });
});
function update() {
  document.getElementsByClassName("monday")[0].innerHTML = "<div><span class='weekday-num'>?</span><br>Mondays</div>";
    document.getElementsByClassName("tuesday")[0].innerHTML = "<div><span class='weekday-num'>?</span><br>Tuesdays</div>";
    document.getElementsByClassName("wednesday")[0].innerHTML = "<div><span class='weekday-num'>?</span><br>Wednesdays</div>";
    document.getElementsByClassName("thursday")[0].innerHTML = "<div><span class='weekday-num'>?</span><br>Thursdays</div>";
    document.getElementsByClassName("friday")[0].innerHTML = "<div><span class='weekday-num'>?</span><br>Fridays</div>";
      document.getElementsByClassName("hours")[0].innerHTML = "<div><span class='weekday-num'>?</span><br>Hours</div>";
    document.getElementsByClassName("minutes")[0].innerHTML = "<div><span class='weekday-num'>?</span><br>Minutes</div>";
    document.getElementsByClassName("number")[0].innerHTML = "?";
  $("body").css("--progress-percentage", "100%")
    $(".progress").attr("percent","?")
  daysleft = 0;
  maxdays = 0;
  mondaysleft = 0;
  tuesdaysleft = 0;
  wednesdaysleft = 0;
  thursdaysleft = 0;
  fridaysleft = 0;
  let file = "/days_off.json";
  let file2 = "";
  if (localStorage.getItem("grade") == "staff") {file = "/d/staff_days_off.json"; file2 = "/d/staff_schedule.json" }
  if (localStorage.getItem("grade") == "elementary") {file2 = "/d/elementary_schedule.json"}
  if (localStorage.getItem("grade") == "middle") {file2 = "/d/middle_schedule.json"}
  if (localStorage.getItem("grade") == "high") {file2 = "/d/high_schedule.json"}
  let ldate = "";
  console.log(enddates);
  if (localStorage.getItem("goto") == "y") {
    ldate = enddates[4];
    beforedate = enddates[0];
  }
  if (localStorage.getItem("goto") == "s") {
    if (isAfter(enddates[2], date)) {
      ldate = enddates[2];
      beforedate = enddates[0];
    } else {
      ldate = enddates[4]
      beforedate = enddates[2];
    }
  }
  if (localStorage.getItem("goto") == "q") {
    if (isAfter(enddates[1], date)) {
      ldate = enddates[1];
      beforedate = enddates[0];
    } else if (isAfter(enddates[2], date)) {
      ldate = enddates[2]
      beforedate = enddates[1];
    } else if (isAfter(enddates[3], date)) {
      ldate = enddates[3]
      beforedate = enddates[2];
    } else if (isAfter(enddates[4], date)) {
      ldate = enddates[4]
      beforedate = enddates[3];
    }
  }
  console.log("BEFORE DATE: " + beforedate)
let mondayminutes = 0
  let tuesdayminutes = 0
  let wednesdayminutes = 0;
  let thursdayminutes= 0;
  let fridayminutes = 0;
  console.log(file2)
  
  console.log(mondayminutes);
  $.getJSON(file, function(data) {
    $.getJSON(file2, function(data2) {
    let numdfg = 0
    if (localStorage.getItem("goto") == "d") {
      console.log(data)
      console.log(data.length)
      for (let i = 0; i < data.length; i++) {
        console.log("i: " + i)
        console.log(isAfter(data[i], date))
        if (isAfter(data[i], date)) {
          numdfg++;
          console.log(numdfg)
          if (numdfg == 1) {
            console.log("LDATE is " + data[i])
            ldate = data[i];
            beforedate = data[i - 1];
            console.log("BEFOREDATE is " + beforedate)
          }
        } else {
          console.log(data[i] + " is not after " + months[date.getMonth()] + " " + date.getDate())
        }
      }
    }
    console.log(data2)
    console.log("Hello")
    mondayminutes = data2[0].Monday - 0;
tuesdayminutes = data2[0].Tuesday - 0;
    wednesdayminutes=data2[0].Wednesday - 0;
    thursdayminutes = data2[0].Thursday - 0;
    fridayminutes = data2[0].Friday - 0;
    daysoff = data;
    var dt = date;
    console.log(ldate);
    var daylist = getDaysArray(date, new Date(ldate));
    daylist.map((v) => v.toISOString().slice(0, 10)).join("");
    console.log(daylist);
    var compldayslist = getDaysArray(new Date(beforedate), new Date(ldate));
    compldayslist.map((v) => v.toISOString().slice(0, 10)).join("");
    for (let i = 0; i < daylist.length; i++) {
      dt = new Date(daylist[i]);
      if (dt.getDay() != 0 && dt.getDay() != 6 && !daysoff.includes(months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear())) {
        console.log("Found day: " + months[dt.getMonth()] + " " + dt.getDate());
        daysleft++;
        if (dt.getDay() == 1) mondaysleft++;
        if (dt.getDay() == 2) tuesdaysleft++;
        if (dt.getDay() == 3) wednesdaysleft++;
        if (dt.getDay() == 4) thursdaysleft++;
        if (dt.getDay() == 5) fridaysleft++;
      }
    }
    for (let j = 0; j < compldayslist.length; j++) {
      dt = new Date(compldayslist[j]);
      if (dt.getDay() != 0 && dt.getDay() != 6 && !daysoff.includes(months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear())) {
        console.log(months[dt.getMonth()] + " " + dt.getDate() + " is part of max days")
        maxdays++;
      }
    }
    if ((((date.getHours() == 14 && date.getMinutes() >= 30) || date.getHours() >= 15) && date.getDay() != 0 && date.getDay() != 6 && !daysoff.includes(months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear())) || (((date.getHours() == 14 && date.getMinutes() >= 45) || date.getHours() >= 15) && date.getDay() == 3 && !daysoff.includes(months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()))) {
      daysleft--;
      if (date.getDay() == 1) mondaysleft--;
      if (date.getDay() == 2) tuesdaysleft--;
      if (date.getDay() == 3) wednesdaysleft--;
      if (date.getDay() == 4) thursdaysleft--;
      if (date.getDay() == 5) fridaysleft--;
    }
    document.getElementsByClassName("monday")[0].innerHTML = "<div><span class='weekday-num'>" + mondaysleft + "</span><br>Mondays</div>";
    document.getElementsByClassName("tuesday")[0].innerHTML = "<div><span class='weekday-num'>" + tuesdaysleft + "</span><br>Tuesdays</div>";
    document.getElementsByClassName("wednesday")[0].innerHTML = "<div><span class='weekday-num'>" + wednesdaysleft + "</span><br>Wednesdays</div>";;
    document.getElementsByClassName("thursday")[0].innerHTML = "<div><span class='weekday-num'>" + thursdaysleft + "</span><br>Thursdays</div>";;
    document.getElementsByClassName("friday")[0].innerHTML = "<div><span class='weekday-num'>" + fridaysleft + "</span><br>Fridays</div>";

    let totalminutes = (mondayminutes * mondaysleft) + (tuesdayminutes * tuesdaysleft) + (wednesdayminutes * wednesdaysleft) + (thursdayminutes * thursdaysleft) + (fridayminutes * fridaysleft);
    let totalhours = Math.round(totalminutes / 60 * 100) / 100;
      if (localStorage.getItem("grade") == "staff") {
        $(".minutes").css("display","none")
      } else {
        $(".minutes").css("display","flex")
      }
      if (localStorage.getItem("grade") == "staff") {
        $(".hours").css("display","none")
      } else {
        $(".hours").css("display","flex")
      }
    document.getElementsByClassName("hours")[0].innerHTML = "<div><span class='weekday-num small'>" + totalhours + "</span><br>Hours</div>";
    document.getElementsByClassName("minutes")[0].innerHTML = "<div><span class='weekday-num small'>" + totalminutes + "</span><br>Minutes</div>";
    document.getElementsByClassName("number")[0].innerHTML = daysleft;
    console.log("Max: " + maxdays + "\nCurrent: " + daysleft + "\nPercent done: " + Math.round(((maxdays - daysleft) / maxdays) * 100));
      let percentdone = ((maxdays - daysleft) / maxdays);
      if (isNaN(percentdone)) percentdone = 1
      console.log(percentdone)
    $("body").css("--progress-percentage", (percentdone * 100) + "%")
    $(".progress").attr("percent", Math.round(percentdone * 100) + "%")
  });
  });
}
var getDaysArray = function(start, end) {
  for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};
function isAfter(date1, date2) {
  let d1 = new Date(date1);
  let d2 = new Date(date2);
  return d1 > d2;
}
