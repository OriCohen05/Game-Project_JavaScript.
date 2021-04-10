//תמונות המשחק

var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
var img3 = document.getElementById("img3");
var img4 = document.getElementById("img4");
var img5 = document.getElementById("img5");
var img6 = document.getElementById("img6");
var img7 = document.getElementById("img7");
var img8 = document.getElementById("img8");
var img9 = document.getElementById("img9");
var img10 = document.getElementById("img9");
var img11 = document.getElementById("img11");
var img12 = document.getElementById("img12");
var img13 = document.getElementById("img13");
var img14 = document.getElementById("img14");
var img15 = document.getElementById("img15");
var img16 = document.getElementById("img16");
var img17 = document.getElementById("img17");
var img18 = document.getElementById("img18");
var img19 = document.getElementById("img19");
var img20 = document.getElementById("img20");
var img21 = document.getElementById("img21");

/*
var imgArray = Array();
for (i = i; i < 22; i++) {
  imgArray.push(document.getElementById(`img` + i));
}
*/

//טבלאות המשחק
var table1 = document.getElementById("gametable1");
var table2 = document.getElementById("gametable2");
var table3 = document.getElementById("gametable3");
//אלמנטים חיצוניים
var modalWrapper = document.getElementById("modal-wrapper");
var modalElement = document.getElementById("modal-content");
var modalTimer = document.getElementById("modal-timer");
var gametable = document.getElementById("gametable");
var score = document.getElementById("Score");
var startGameButton = document.getElementById("playbutton");
var timer = document.getElementById("timer");
var hard = document.getElementById("hard");
var medium = document.getElementById("medium");
var easy = document.getElementById("easy");
//משתנים גלובליים
var gcount = 0;
var timeUp;
var allHoles = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21];
var count = 0;
var points = 0;
var time;
var gBoardSize = 0;
var gFlag = false;
//פונקציה שמחזירה את כל החורים למצב הרגיל (רק חורים)
function resetHoles() {
    for (var i = 0; i <= gBoardSize; i++) {
        allHoles[i].setAttribute('src', 'Images/hole.png');
    }
}
//פונקציה שמעלה את הניקוד על פי סורס
function ClickToScore(object) {
    var source = object.src;
    if (source.search("Images/Logo.png") != -1) //מחפש את הסטרינג ומחזיר את האינדקס שהוא מתחיל בו בסטרינג שבו חיפשתי
    //-1 במקרה שלי הוא false
    {
        count++;
        score.innerHTML = "Your score: " + count;
        object.src = "Images/hole.png";
    }
}
//פונקציה שמגרילה חור רנדומלי
function GenerateHoles() {
    resetHoles();
    var randomHole = Math.floor(Math.random() * gBoardSize);
    console.log(randomHole);
    allHoles[randomHole].setAttribute('src', 'Images/Logo.png');
}

function resetGame() {
    count = 0;
    gBoardSize = 0;
    score.innerHTML = "";
    startGameButton.disabled = false;
    resetHoles();
    clearInterval(time);
    clearInterval(timeUp);
    gcount = 0;
    timer.innerHTML = "";
    table1.style.display = "none";
    table2.style.display = "none";
    table3.style.display = "none";
    gFlag = false;
}

function roundTimer() {
    timer.innerHTML = "game timer: " + gcount;
    gcount += 1;
    if (gcount === 31) {
        alert("Time's up");
        resetHoles();
        resetGame();
        timer.innerHTML = ' ';
    }

}

function OnStartGame() {
    // if (!gFlag) {
    //     alert("Choose board before start!");
    //     easy.disabled = false;
    //     medium.disabled = false;
    //     hard.disabled = false;
    //     gFlag = true;
    //     resetGame();        
    // } else {
        startGameButton.disabled = true;
        var counter = 5;
        modalElement.classList.toggle("hide");
        time = setInterval(GenerateHoles, 2000);
        var countDown = setInterval(function() {
            modalElement.innerHTML = counter;
            counter--;
            if (counter === -1) {
                clearInterval(countDown);
                modalElement.style.display = "none";
                timeUp = setInterval(roundTimer, 1000);
            }
        }, 1000);
    //}
}

function onStartEasy() {
    table1.style.display = "block";
    table2.style.display = "none"
    table3.style.display = "none";
    gBoardSize = 8;
}

function onStartMedium() {
    table2.style.display = "block";
    table3.style.display = "none";
    table1.style.display = "none";
    gBoardSize = 11;
}

function onStartHard() {
    table3.style.display = "block";
    table1.style.display = "none";
    table2.style.display = "none";
    gBoardSize = 20;
}

function OnInit() {

    modalElement.classList.toggle("hide");
}
console.info("All rights saved to Ori Cohen.");
