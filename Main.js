//תאי טבלת המשחק
var td1 = document.getElementById("td1");
var td2 = document.getElementById("td2");
var td3 = document.getElementById("td3");
var td4 = document.getElementById("td4");
var td5 = document.getElementById("td5");
var td6 = document.getElementById("td6");
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

var gametable = document.getElementById("gametable");
var score = document.getElementById("Score");

var timeUp = false;
var allHoles = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
var count = 0;
var points = 0;

function resetHoles() {
    for (var i = 0; i <= 8; i++) {
        allHoles[i].setAttribute('src', 'Images/hole.png');
    }
}

function ClickToScore(object) {
    var source = object.src;
    if (source.search("Images/Logo.png") != -1) //מחפש את הסטרינג ומחזיר את האינדקס שהוא מתחיל בו בסטרינג שבו חיפשתי
    //-1 במקרה שלי הוא false
    {
        count++;
        score.innerHTML = count;
        object.src = "Images/hole.png";
    }
}

function GenerateHoles() {
    resetHoles();
    var randomHole = Math.floor(Math.random() * 8);
    allHoles[randomHole].setAttribute('src', 'Images/Logo.png');
}

function resetGame() {
    count = 0;
    score.innerHTML = count;
}

var time = setInterval("GenerateHoles();", 750);


console.info("All rights saved to Ori Cohen.");
