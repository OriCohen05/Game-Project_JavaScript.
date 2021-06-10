//אלמנטים חיצוניים
var modalWrapper = document.getElementById("modal-wrapper");
var modalElement = document.getElementById("modal-content");
var modalTimer = document.getElementById("modal-timer");
var gametable = document.getElementById("gametable1");
var score = document.getElementById("Score");
var startGameButton = document.getElementById("playbutton");
var timer = document.getElementById("timer");
var hard = document.getElementById("hard");
var medium = document.getElementById("medium");
var easy = document.getElementById("easy");
var gamediv = document.getElementById("GameDiv");
var elemBestScore = document.getElementById('bestScore');
var elemRecentScore = document.getElementById('recentscore');
var popUp = document.getElementById('popUp');
var resetGameButton = document.getElementById('resetGameButton');
var alertText = document.createElement('h2');
var alertCount = document.createElement('h1');
var bonus = document.getElementById("bonus");
//משתנים גלובליים
var gameStreak = 0; //משתנה המונה את מספר המשחקים ששוחקו ברצף
var backCount = 3; //ספירה לאחור של 3 שניות
var bestScore; // שיא הנקודות
var allHoles = []; //מערך כל התמונות של החורים
var gcount = 0; //טיימר המשחק
var timeUp; //משתנה אינטרבל המייצג את הספירה לאחור של טיימר המשחק
var points = 0; //נקודות שהמשתמש השיג
var time; //אינטרבל שמגריל חורים לחפרפרת
var gBoardSize = 0; //גודל הלוח לפי רמת הקושי
var gFlag = false; //האם המשתמש בחר לוח
var counter; //ספירה לאחור לפני המשחק
var gPlayTime; //זמן התגובה לפי רמת הקושי
var countDownInterval; //ספירה לאחור לפני המשחק אינטרבל
var recentHole; // החור האחרון שהחפרפת הייתה בו
var recentScore; // הניקוד של משחק לפני המשחק המשוחק
var gameMode = ''; // מציין את רמת הקושי
var gameOverFlag = false; // אם המשחק יסתיים

function saveToStorage(key, val) {
    /*
    פונקציה השומרת לאחסון המקומי
    */
    localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
    /*
    פונקציה המוציאה מידע מהאחסון
    */
    var val = localStorage.getItem(key);
    return JSON.parse(val);
}

function resetHoles() {
    /*
    פונקצייה המחזירה את כל החורים למצבם הרגיל )רק חורים(.
מזומנת ב: GenerateHoles, resetGame
פרמטרים: לא מקבלת
ערך מוחזר: לא מחזירה
    */
    for (var i = 0; i < allHoles.length; i++) {
        document.getElementById(`img${i}`).setAttribute('src', './Images/hole.png'); //מחזיר את התמונה ההספציפית להיות חור
    }
}

function OnStartGame() {

    /**
     פונקציה המטפלת בתחילת המשחק.
מזומנת ב: עמוד ה HTML 
פרמטרים: לא מקבלת
ערך מוחזר: לא מחזירה
     */
    
    gameStreak++; // כל תחילת משחק מונה המשחקים יקודם באחד
    resetGameButton.style.display = "block"; //מוצג כפתור הריסט גיים
     // יוצר את הטבלה
    document.getElementById('gametable1').innerHTML = BuildGameTable(gameMode);
    score.innerHTML = `Your score: ${points} !`; //מציג את הניקוד
    timer.innerHTML = `Game timer: ${gcount}`; //מציג את הטיימר
    document.getElementById('streak').innerHTML = `Game streak: ${gameStreak}` //מציג את רצף המשחקים
    gamediv.style.visibility = "visible" //מציג את לוחות המשחק
    startGameButton.style.display = "none"; //מבטל את האופציה של ללחוץ על כפתור תחילת המשחק בזמן שהמשחק רץ
    counter = 5; //5 שניות לפני תחילת המשחק
    modalElement.classList.toggle("hide"); //מסתיר את המודל על פי הגדרות הקלאס ב css
    countDownInterval = setInterval('countDown()', 1000); //טיימר שיורד כל שניה
}
function GenerateHoles() {
    /*
    פונקציה המגרילה חור רנדומלי בלוח ומציגה אותו.
מזומנת ב: countDown
פרמטרים: לא מקבלת
ערך מוחזר: לא מחזירה
    */ 
    resetHoles(); //מחזיר את כל החורים למצב הרגיל (רק חורים)
    var randomHole = Math.floor(Math.random() * gBoardSize); //הגרלת מיקום ספציפי בטבלה
    recentHole = randomHole; // מגדיר שהחור האחרון היה החור הספציפי
    while (recentHole == randomHole) { //אם החור הקודם הוא החור הספציפי מגריל מחדש
        randomHole = Math.floor(Math.random() * gBoardSize); 
    }
        document.getElementById(`img${randomHole}`).setAttribute('src', './Images/Logo.png');//שם את המספר הרנדומלי על מיקום בלוח
    if(points > 3){ //אם המשתמש עשה מעל לשלוש נקודות
        if(Math.floor(Math.random() * 6) == 1) //סיכוי של אחד לשש
            document.getElementById(`img${randomHole}`).setAttribute('src', './Images/BOMB.png');//תוגרל פצצה
    }
    if(points > 1){
        if(Math.floor(Math.random() * 8) == 1) //סיכוי של אחד לשמונה
            document.getElementById(`img${randomHole}`).setAttribute('src', './Images/STAR.png'); //יוגרל כוכב
    }
    
}
function ClickToScore(object)
{
    /**
     פונקציה המעלה את הנקודות במידה והשחקן לחץ על החור הנכון.
מזומנת ב: BuildGameTable
פרמטרים: object - מטיפוס אובייקט HTML שניגש לתמונה שנלחצה.
ערך מוחזר: לא מחזירה
      
     */
    var source = object.src; // הסורס של התמונה שנלחצה
    if (source.search("./Images/Logo.png") != -1) //מחפש את הסטרינג ומחזיר את האינדקס שהוא מתחיל בו בסטרינג שבו חיפשתי
    //-1 במקרה שלי הוא false
    {
        points++; //קידום הנקודות
        score.innerHTML = `Your score: ${points} !`; // שינוי צג הנקודות
        object.src = "./Images/hole.png"; //החזרה לחור לאחר לחיצה
    }
    else if(source.search("./Images/BOMB.png") != -1){ //אם זו פצצה
        if (points >= bestScore) { //בודק אם נשבר השיא
            saveToStorage("bestScore", points); //מעלה לאחסון את השיא שנשבר
            elemBestScore.innerHTML = points; //שינוי השיא בתצוגה
        }
        popUp.appendChild(alertText); //הצגה בחלון הקופץ
        popUp.appendChild(alertCount); //""
        popUp.style.visibility = "visible"; //הצגת החלון
        alertText.setAttribute('style', 'color: red;'); //הטקטס בחלון אדום
        alertText.innerHTML = "BOOM! </br> GAME OVER!"; // הצגת הטקסט בחלון
        alertCount.setAttribute('style','color: red;'); 
        var alertIntv = setInterval(function(){ //ספירה לאחור לסגירת החלון
            alertCount.innerHTML = backCount;
            backCount--;
            if(backCount === -1){
                clearInterval(alertIntv);
                popUp.style.visibility = "hidden";
                popUp.innerHTML = "";
                backCount = 3; //החזרת משתנה הספירה לאחור לערכו המקורי
            }
        },1000)
        recentScore = points; //שינוי הניקוד האחרון בתום המשחק
        elemRecentScore.innerHTML = `recent score: ${recentScore}`; //שינוי התצוגה של הניקוד האחרון
        resetGame();//איפוס המשחק
         
    }
    else if(source.search("./Images/STAR.png") != -1){ //אם זה כוכב
        points += 5; // קידום הנקודות בחמש
        score.innerHTML = `Your score: ${points} !`; // שינוי צג הנקודות
        object.src = "./Images/hole.png"; // החזרה לחור לאחר לחיצה
    }
}
function BuildGameTable(rows)
/* 
פונקציה הבונה את טבלת המשחק באופן דינאמי לפי רמות הקושי, והגדלים הנזקקים.
מזומנת ב:OnStartGame 
פרמטרים: לא מקבלת
ערך מוחזר: לא מחזירה
*/
{
    var modalC = document.createElement('div'); // יצירת אלמנט דיב
    modalC.setAttribute('id', 'modal-content'); // נותן איידי לדיב שיצרנו
    var count = 0; //מונה בשביל מערך התמונות
    var src = './Images/hole.png'; // מיקום התמונה של החור
    var strHtml = ''; //רינדור לקוד html
        for (var i = 0; i < rows; i++) { //לולאה שבונה את השורות והתוכן שלהן
            strHtml += `<tr>`; //הוספת שורה לרינדור על מנת לא להשתמש יותר מדי בדום 
            //גודל שונה לכל רמת קושי
            for (var j = 0; j < rows; j++) {
                strHtml += `<td class="gametds"><img id=img${count} draggable="false" src=${src} onclick="ClickToScore(this)"></td>`;
                allHoles.push(count); //הוספת תא למערך עם הערך של קאונט
                count++; //מונה כמה תמונות יש על מנת להשתמש במערך בפונקציות שונות
            }
            strHtml += `</tr>`;
        }
                
        return strHtml;
}
    




function resetGame() {
    /**
     * פונקצייה המאפסת את כל הקשור למשחק ומחזירה את הכל למצב ההתחלתי – לפני התחלת המשחק.
מזומנת ב: OnStartGame ,roundTimer ובעמוד ה HTML . 
פרמטרים: לא מקבלת
ערך מוחזר: לא מחזירה
     */
    /* איפוס מונים ניקוד וזמנים */
    count = 0; 
    points = 0;
    gcount = 0;
    console.log("hi");
    gBoardSize = 0;
    score.innerHTML = "";
    startGameButton.disabled = false; //אפשר להתחיל משחק חדש
    clearInterval(time);
    clearInterval(timeUp);
    allHoles = [];
    timer.innerHTML = "";
    gamediv.style.visibility = "hidden";
    gFlag = false; //בחירת רמת קושי 
    startGameButton.style.display = "none";
    resetGameButton.style.display = "none";
}

function roundTimer() { //קורה בכל שניה
    timer.innerHTML = "game timer: " + gcount; //הצגת הטיימר
    gcount += 1; //קידום הטיימר כל שניה
    if (gcount == 31 || gameOverFlag) { //בדיקה אם המשחק נגמר
        if (points >= bestScore) { //בודק אם נשבר השיא
            saveToStorage("bestScore", points); //מעלה לאחסון את השיא שנשבר
            elemBestScore.innerHTML = points; //שינוי השיא בתצוגה
        }
        popUp.appendChild(alertText); 
        popUp.appendChild(alertCount);
        popUp.style.visibility = "visible";
        alertText.setAttribute('style', 'color: white;')
        alertText.innerHTML = "Game Over. Your score is: " + points; 
        alertCount.setAttribute('style','color: red;')
        var alertIntv = setInterval(function(){ //ספירה לאחור לסגירת החלון
            alertCount.innerHTML = backCount;
            backCount--;
            if(backCount === -1){
                clearInterval(alertIntv);
                popUp.style.visibility = "hidden";
                popUp.innerHTML = "";
                backCount = 3; //החזרת משתנה הספירה לאחור לערכו המקורי
            }
        },1000)
        recentScore = points; //שינוי הניקוד האחרון בתום המשחק
        elemRecentScore.innerHTML = `recent score: ${recentScore}`; //שינוי התצוגה של הניקוד האחרון
        resetGame();//איפוס המשחק
    }

}

function countDown() { //קורה כל שניה
    /**
     * פונקציה המגרילה חור רנדומלי בלוח ומציגה אותו.
מזומנת ב: countDown
פרמטרים: לא מקבלת
ערך מוחזר: לא מחזירה
     */
    modalElement.classList.toggle("show");
    modalElement.innerHTML = `<h2> Game starts in: </br> ${counter} </h2>`; //תצוגה בחלונית
    counter--; 
    console.log(counter);
    if (counter == -1) {
        clearInterval(countDownInterval); //ניקוי ספירה לאחור לפני תחילת המשחק
        modalElement.classList.toggle("hide"); // לא מוצג
        timeUp = setInterval(roundTimer, 1000); ////משתנה אינטרבל המייצג את הספירה לאחור של טיימר המשחק
        time = setInterval(GenerateHoles, gPlayTime);//אינטרבל שמגריל חורים לחפרפרת
        counter = 5;
        modalElement.innerHTML = `<h2> Game starts in: </br> ${counter} </h2>`;
    }
}

/**
 * 
 פונקציות הקובעות את גודל הלוח לפי רמת הקושי.
מזומנות ב עמוד ה HTML
פרמטרים: לא מקבלות
ערך מוחזר: לא מחזירות
 * */ 

function difficulty(mode,playtime,boardsize) {
    startGameButton.style.display = "block";//מראה את כפתור תחילת המשחק לאחר בחירת רמת קושי
    gameMode = mode;
    gFlag = true;
    gBoardSize = boardsize;
    gPlayTime = playtime;
}

function OnInit() {
    /*
    פונקציה המזומנת בעליית העמוד
    */
    modalElement.classList.toggle("hide"); // הסתרת החלון הקופץ
    bestScore = loadFromStorage('bestScore'); //לקבל את השיא מהאחסון
    gamediv.style.visibility = "hidden" //הסתרת טבלת המשחק
    if (!bestScore) { // אם אין לו ערך
        elemBestScore.innerHTML = 0;
    } else elemBestScore.innerHTML = bestScore; //אם יש לו ערך
    popUp.style.visibility = "hidden";  //הסתרת החלון הקופץ של המשחק
    resetGameButton.style.display = "none"; // הסתרת כפתור איפוס המשחק
    startGameButton.style.display = "none"; //הסתרת כפתור תחילת המשחק
}


console.info("All rights saved to Ori Cohen.");
