// Napravljeno da radi za bilo koju rec
// Animacija radi zahvaljujuci TweenMax biblioteci
let word = "Posao".toUpperCase();
let newWord = "";
let mainBox = document.querySelector(".main-box");
let btnStart = document.getElementById("btnStart");
let btnAgain = document.getElementById("btnAgain");
let textInfo = document.getElementById("textInfo");
let timer = document.getElementsByTagName("p")[0];
var animation = Power1.easeOut;
var coordinates = [];

let zapocniIgru = () => {
  fillBoxes();
  let boxes = document.querySelectorAll(".box");
  // Proverava da li je desktop ili mobilni uredjaj
  var timeleft = /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 5 : 4;

  setTimeout(() => {
    for (var i = 0; i < boxes.length; i++) {
      var node = boxes[i];
      // Initialize transforms on node
      TweenLite.set(node, { x: 0 });
      coordinates[i] = {
        transform: node._gsTransform,
        x: node.offsetLeft,
        y: node.offsetTop,
        node,
      };
      console.log(coordinates[i]);
    }
    // Funckija za menjanje pozicija sa animacijom
    layout(boxes);
    
    let time = setInterval(function () {
      if (timeleft >= 0 && newWord != word) {
        timer.innerHTML = "Preostalo Vreme: " + timeleft + "s";
      }else {
        textInfo.textContent = "Izgubio si";
        btnAgain.style.visibility = "visible";
        timer.innerHTML = "Vreme isteklo"
        clearInterval(time);
      }
      timeleft -= 1;
    }, 1000);

    let count = 0;
    // Dodavanje click eventa svakom boxu
    boxes.forEach((box) => {
      box.addEventListener("click", function pritisni() {
        if (word[count] == box.innerHTML && timeleft >= 0) {
          newWord += box.innerHTML;
          box.style.background = "green";
          count++;
          if (newWord == word && timeleft >= 0) {
            textInfo.textContent = "Bravo";
            btnAgain.style.visibility = "visible";
            timer.innerHTML = "Stigao si vreme"
            clearInterval(time);
          }
        } else {
          textInfo.textContent = "Izgubio si";
          box.style.background = "red";
          btnAgain.style.visibility = "visible";
          if(timeleft >= 0){
          timer.innerHTML = "Pazi na redosled"
          }
          clearInterval(time);
        }
        box.removeEventListener("click", pritisni);
      });
    });
  }, 2000);
};

// Pravi crvene kutije sa odgovarajucim pocetnim slovima
function fillBoxes() {
  for (let i = 0; i < word.length; i++) {
    mainBox.innerHTML += `<div class="box">${word[i]}</div>`;
  }
  btnStart.style.visibility = "hidden";
}

function layout(item) {
  // Dodeljivanje novih nasumicnih pozicija 
  for (let i = 0; i < word.length; i++) {
    item[i].style.order = Math.round(Math.random() * word.length);
  }

  // Dodela novih kordinata na stare
  for (var i = 0; i < item.length; i++) {
    var box = coordinates[i];
    var lastX = box.x;
    var lastY = box.y;
    box.x = box.node.offsetLeft;
    box.y = box.node.offsetTop;
    console.log(lastX, box.x);


    if (lastX === box.x && lastY === box.y) continue;
    var x = box.transform.x + lastX - box.x;
    var y = box.transform.y + lastY - box.y;

    // Animacija*
    TweenLite.fromTo(box.node, 0.5, { x, y }, { x: 0, y: 0, animation });
  }
}

//restratuj igru
function restratuj() {
  mainBox.innerHTML = "";
  newWord = "";
  textInfo.textContent = "Ponovi redosled slova";
  zapocniIgru();
}

