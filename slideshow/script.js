if (localStorage.slideshows == null) localStorage.slideshows = ""
function addSlideshow() {
  $(".editItem").css("display","flex")
  $(".editItem").attr("slideshowid",makeId())
  $(".plus2").css("display","flex")
}
let paused = false;
let playing = false;
function playSlideshow(ele) {
  playing = true;
  $(".contain-list").css("display","none");
  $(".plus").css("display","none");
  $(".editItem").css("display","none")
  $(".plus2").css("display","none")
  let urls = localStorage.getItem(ele.getAttribute("slideshowid") + "urls").split("||||")
  let captions = localStorage.getItem(ele.getAttribute("slideshowid") + "captions").split("||||")
  let everything = [];
  let tempy = {"url":"","caption":""}
  for (let i = 0; i < urls.length; i++) {
    tempy.url = urls[i];
    tempy.caption = captions[i]
    everything.push(JSON.parse(JSON.stringify(tempy)));
  }
  console.log(everything);
    let randomnumber = randint(0, everything.length)
  $(".image" + 2).html('<div class="image-wrapper" caption="' + everything[randomnumber].caption + '"><img src="' + everything[randomnumber].url + '" class="image"></div>');
  setTimeout(function() {
    makeImageBig(document.getElementsByClassName("image")[0]);
    makeImageBig(document.getElementsByClassName("image")[1]);
  },1000);
  $(".image2").css("display","flex")
  everything.splice(randomnumber, 1);
    let currentnumber = 1;
    let notcurrentnumber = 2;
  let hasitended = 0;
  setInterval(function() {
    if (!paused) {
    if (everything.length == 0) {
      for (let i = 0; i < urls.length; i++) {
        tempy.url = urls[i];
        tempy.caption = captions[i]
        everything.push(JSON.parse(JSON.stringify(tempy)));
      }
      hasitended = 1;
    }
    console.log(everything)
    let randomnumber = randint(0, everything.length)
    $(".image" + currentnumber).html('<div class="image-wrapper" caption="' + everything[randomnumber].caption + '"><img src="' + everything[randomnumber].url + '" class="image"></div>');
    if (hasitended == 1) {
      $(".image" + currentnumber).html('<div class="image-wrapper" caption="' + everything[randomnumber].caption + ' (The slideshow has started over!)"><img src="' + everything[randomnumber].url + '" class="image"></div>');
      hasitended = 0;
    }
  everything.splice(randomnumber, 1);
    setTimeout(function() {
      console.log("notcurrentnumber: " + notcurrentnumber + "\ncurrentnumber: " + currentnumber)
      $(".image" + notcurrentnumber).css("z-index","-1")
      $(".image" + currentnumber).css("z-index","1")
      $(".image" + currentnumber).css("display","flex");
      setTimeout(function() {
        $(".image" + currentnumber).css("display","none")
      },1000);
      makeImageBig(document.getElementsByClassName("image")[0]);
      makeImageBig(document.getElementsByClassName("image")[1]);
      let temp = notcurrentnumber;
      notcurrentnumber = currentnumber;
      currentnumber = temp;
    },2000);
    }
  },4000);
}
function randint(min, max) {
  return Math.floor(Math.random() * max) + min;
}
document.addEventListener("keydown", function(event) {
  if (event.key == " ") {
    console.log("Space key pressed!")
    if (playing) {
      console.log("Slideshow playing!")
      if (paused) {
        console.log("Resumed!")
        paused = false;
        document.getElementsByClassName("image-wrapper")[0].setAttribute("caption",document.getElementsByClassName("image-wrapper")[0].getAttribute("caption").replace("(PAUSED) ",""));
        document.getElementsByClassName("image-wrapper")[1].setAttribute("caption",document.getElementsByClassName("image-wrapper")[1].getAttribute("caption").replace("(PAUSED) ",""));
      } else {
        console.log("Paused!")
        paused = true;
        document.getElementsByClassName("image-wrapper")[0].setAttribute("caption","(PAUSED) " + document.getElementsByClassName("image-wrapper")[0].getAttribute("caption"));
        document.getElementsByClassName("image-wrapper")[1].setAttribute("caption","(PAUSED) " + document.getElementsByClassName("image-wrapper")[1].getAttribute("caption"));
      }
    }
  }
});
function finishEditing(ele) {
  let theid = ele.getAttribute("slideshowid");
  if (!localStorage.slideshows.split("||||").includes(theid)) {
    let ss = localStorage.slideshows.split("||||");
    ss.push(theid)
    localStorage.slideshows = ss.join("||||")
  }
  localStorage.setItem(theid + "title",ele.children[0].value);
  let urls = [];
  let captions = [];
  for (let i = 0; i < ele.children[2].children.length; i++) {
    urls.push(ele.children[2].children[i].children[0].value)
    captions.push(ele.children[2].children[i].children[1].value)
    ele.children[2].children[i].children[0].value = "";
    ele.children[2].children[i].children[1].value = "";
  }
  document.getElementsByClassName("contain-images")[0].innerHTML = ""
  localStorage.setItem(theid + "urls",urls.join("||||"));
  localStorage.setItem(theid + "captions",captions.join("||||"));
  $(".editItem").css("display","none")
  $(".plus2").css("display","none")
  ele.children[0].value = "";
  loadSlideshows()
}
function editSlideshow(ele) {
  $(".editItem").css("display","flex")
  $(".editItem").attr("slideshowid",ele.getAttribute("slideshowid"))
  $(".plus2").css("display","flex")
  document.getElementsByClassName("edit-title")[0].value = localStorage.getItem(ele.getAttribute("slideshowid") + "title");
  let urls = localStorage.getItem(ele.getAttribute("slideshowid") + "urls").split("||||");
  let captions = localStorage.getItem(ele.getAttribute("slideshowid") + "captions").split("||||");
  let code = '';
  for (let i = 0; i < urls.length; i++) {
    code += '<div class="contain-image"><input class="image-url" placeholder="Image URL" value="' + urls[i] + '"><input class="image-caption" placeholder="Image Caption" value="' + captions[i] + '"><div class="remove-image" onclick="this.parentElement.remove()"><svg class="entryClose" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" style="fill:#ffffff;"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path></svg></div></div>'
  }
  document.getElementsByClassName("contain-images")[0].innerHTML = code;
}
function deleteSlideshow(ele) {
  let theid = ele.getAttribute("slideshowid");
  ele.remove();
  localStorage.setItem(theid + "title", null)
  localStorage.setItem(theid + "urls", null)
  localStorage.setItem(theid + "captions", null)
  let theids = localStorage.slideshows.split("||||");
  let numbers = theids.indexOf(theid);
  console.log(theids);
  theids.splice(numbers,1);
  console.log(theids);
  localStorage.slideshows = theids.join("||||")
}
loadSlideshows()
function loadSlideshows() {
  let theids = localStorage.slideshows.split("||||");
  let code = '';
  for (let i = 0; i < theids.length; i++) {
    if (theids[i] != "" && theids[i] != null) {
    code += '<div class="list-item" slideshowid="' + theids[i] + '"><div class="list-title">' + localStorage.getItem(theids[i] + "title") + '</div><div src="" class="play" onclick="playSlideshow(this.parentElement);"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0,0,256,256"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(3.55556,3.55556)"><path d="M56.379,30.904c1.774,1.103 2.833,3.008 2.833,5.096c0,2.088 -1.059,3.993 -2.832,5.096l-34.213,21.266c-0.967,0.602 -2.066,0.904 -3.167,0.904c-1.004,0 -2.008,-0.25 -2.915,-0.755c-1.902,-1.057 -3.085,-3.067 -3.085,-5.244v-42.534c0,-2.177 1.183,-4.187 3.085,-5.245c1.903,-1.057 4.234,-1 6.083,0.149z"></path></g></g></svg></div><div src="" class="edit" onclick="editSlideshow(this.parentElement);"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 24 24" style="fill:#FFFFFF;"><path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"></path></svg></div><div class="share" onclick="shareSlideshow(this.parentElement);"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0,0,256,256"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(3.55556,3.55556)"><path d="M36,12c13.255,0 24,10.745 24,24c0,13.255 -10.745,24 -24,24c-13.255,0 -24,-10.745 -24,-24c0,-13.255 10.745,-24 24,-24zM43,39c1.657,0 3,-1.343 3,-3c0,-1.657 -1.343,-3 -3,-3c-0.329,0 -1.426,0 -4,0c0,-2.574 0,-3.672 0,-4c0,-1.657 -1.343,-3 -3,-3c-1.657,0 -3,1.343 -3,3c0,0.328 0,1.426 0,4c-2.574,0 -3.671,0 -4,0c-1.657,0 -3,1.343 -3,3c0,1.657 1.343,3 3,3c0.329,0 1.426,0 4,0c0,2.574 0,3.672 0,4c0,1.657 1.343,3 3,3c1.657,0 3,-1.343 3,-3c0,-0.328 0,-1.426 0,-4c2.574,0 3.671,0 4,0z"></path></g></g></svg></div><div class="delete" onclick="deleteSlideshow(this.parentElement);"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0,0,256,256"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(3.55556,3.55556)"><path d="M32.5,9c-4.136,0 -7.5,3.364 -7.5,7.5v1.5h-8c-2.209,0 -4,1.791 -4,4c0,2.209 1.791,4 4,4h0.23242l1.43945,25.91602c0.252,4.533 4.00688,8.08398 8.54688,8.08398h17.5625c4.54,0 8.29487,-3.55098 8.54688,-8.08398l1.43945,-25.91602h0.23242c2.209,0 4,-1.791 4,-4c0,-2.209 -1.791,-4 -4,-4h-8v-1.5c0,-4.136 -3.364,-7.5 -7.5,-7.5zM32.5,16h7c0.275,0 0.5,0.224 0.5,0.5v1.5h-8v-1.5c0,-0.276 0.225,-0.5 0.5,-0.5zM36,28c1.104,0 2,0.896 2,2v17.92383c0,1.105 -0.896,2 -2,2c-1.104,0 -2,-0.896 -2,-2v-17.92383c0,-1.104 0.896,-2 2,-2zM27.39258,28.00195c1.067,-0.022 2.02936,0.82569 2.06836,1.92969l0.625,18c0.038,1.104 -0.82764,2.02741 -1.93164,2.06641c-0.023,0.001 -0.04536,0.00195 -0.06836,0.00195c-1.073,0 -1.96005,-0.85164 -1.99805,-1.93164l-0.625,-18c-0.038,-1.104 0.82569,-2.02741 1.92969,-2.06641zM44.60742,28.00195c1.104,0.038 1.96769,0.96241 1.92969,2.06641l-0.625,18c-0.038,1.08 -0.92605,1.93164 -1.99805,1.93164c-0.023,0 -0.04536,-0.00095 -0.06836,-0.00195c-1.104,-0.038 -1.96964,-0.96241 -1.93164,-2.06641l0.625,-18c0.038,-1.104 0.97936,-1.95169 2.06836,-1.92969z"></path></g></g></svg></div></div>'
    }
  }
  document.getElementsByClassName("contain-list")[0].innerHTML = code;
}
function makeId() {
  let list = ["a","b",'c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0','-','_']
  let tempnum = 0;
  let theid = "";
     for (i = 0; i < 20; i++) {
        tempnum = Math.floor(Math.random() * 64);
        theid = theid + list[tempnum];
     }
  return theid;
}
function addImage() {
  let inputs = document.getElementsByTagName("input");
  let inputvalues = [];
  for (let i = 0; i < inputs.length; i++) {
    inputvalues.push(inputs[i].value);
  }
  document.getElementsByClassName("contain-images")[0].innerHTML += '<div class="contain-image"><input class="image-url" placeholder="Image URL"><input class="image-caption" placeholder="Image Caption"><div class="remove-image" onclick="this.parentElement.remove()"><svg class="entryClose" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" style="fill:#ffffff;"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path></svg></div></div>'
  for (let i = 0; i < inputvalues.length; i++) {
    document.getElementsByTagName("input")[i].value = inputvalues[i]
  }
}
function shareSlideshow(ele) {
  let url = "https://illusioner2520.github.io/slideshow/?share=yes&title=" + encodeURIComponent(localStorage.getItem(ele.getAttribute("slideshowid") + "title")) + "&urls=" + encodeURIComponent(localStorage.getItem(ele.getAttribute("slideshowid") + "urls")) + "&captions=" + encodeURIComponent(localStorage.getItem(ele.getAttribute("slideshowid") + "captions")) + "&id=" + encodeURIComponent(ele.getAttribute("slideshowid"));
  navigator.clipboard.writeText(url);
}
if (window.location.href.includes("?")) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let title = params.title;
  let urls = params.urls;
  let captions = params.captions;
  let theid = params.id;
  let theids = localStorage.slideshows.split("||||");
  if (!theids.includes(theid)) {
    theids.push(theid);
    localStorage.slideshows = theids.join("||||");
    localStorage.setItem(theid + "title",title)
    localStorage.setItem(theid + "urls",urls)
    localStorage.setItem(theid + "captions",captions)
    loadSlideshows();
  }
  playSlideshow(document.querySelector(".list-item[slideshowid|='" + theid + "']"));
  history.pushState({}, "", "https://illusioner2520.github.io/slideshow")
}
function makeImageBig(ele) {
  $(ele).css("width","unset");
  $(ele).css("height","unset");
  let elewidth = $(ele).width();
  let eleheight = $(ele).height();
  let width = $(window).width();
  let height = $(window).height();
  let aa = width * (eleheight / elewidth);
  if (aa > height) {
    let ab = aa / height;
    ab = width / ab;
    $(ele).css("width",ab);
    $(ele).css("height",height);
  } else {
    $(ele).css("width",width);
    $(ele).css("height",aa);
  }
}
$(window).resize(function() {
  makeImageBig(document.getElementsByClassName("image")[0]);
  makeImageBig(document.getElementsByClassName("image")[1]);
});
$(document.getElementsByClassName("image")[0]).on("load", function() {
  makeImageBig(document.getElementsByClassName("image")[0]);
  makeImageBig(document.getElementsByClassName("image")[1]);
});
$(document.getElementsByClassName("image")[1]).on("load", function() {
  makeImageBig(document.getElementsByClassName("image")[0]);
  makeImageBig(document.getElementsByClassName("image")[1]);
});
