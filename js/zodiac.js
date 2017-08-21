var myObjArr = [
	{eng: "chicken", chi: "ji", pin: "ji&#772;" },
	{eng: "cow", chi: "niu", pin: "niu&#769;" },
	{eng: "dog", chi: "gou", pin: "gou&#780;" },
	{eng: "dragon", chi: "long", pin: "lo&#769;ng" },
	{eng: "goat", chi: "yang", pin: "ya&#769;ng" },
	{eng: "horse", chi: "ma", pin: "ma&#780;" },
	{eng: "monkey", chi: "hou", pin: "ho&#769;uzi" },
	{eng: "pig", chi: "zhu", pin: "zhu&#772;" },
	{eng: "rabbit", chi: "tu", pin: "tu&#768;zi" },
	{eng: "rat", chi: "shu", pin: "la&#780;oshu&#780;" },
	{eng: "snake", chi: "she", pin: "she&#769;" },
	{eng: "tiger", chi: "hu", pin: "la&#780;ohu&#780;" }
];

// Global Vars
var thumbsDiv = document.getElementById("thumbnails"); // div that holds thumb images
var charDiv = document.getElementById("char"); // div that holds thumb images
var isQuiz = false; // by default, the application is in "Non-Quiz Mode"--not "Quiz Mode"
var sound = new Audio(); // use this Audio() object for all sounds in application
var randNum = 0; // in Quiz Mode, sounds are played randomly
var wheel = document.getElementById("wheel"); // the Chinese Zodiac Wheel image
//vars for keeping track of total clicks, raw score (correct answers) and avg score
var clicks = 0; // tracks total thumb clicks
var rawScore = 0; // tracks total correct thumb clicks
var avgScore = 0; // tracks scoring average (pct of correct thumb clicks)
var scoreReport = "";
var scoreBox = document.getElementById("score"); // the div that displays score
var tempObjArr = new Array();
tempObjArr = myObjArr.slice(); // make a copy the obj array, so that we can splice (remove) items without disturbing original objArr, which we need intact for Game Restart 
var scoreCookie = document.cookie;

function init() { // function runs on page load and also when Restart button is clicked
    sound.pause(); // stop any sound that may be playing
    // reset the score to zero
    isQuiz = false; // reset the default (NOT in Quiz Mode)
    thumbsDiv.innerHTML = ""; // empty thumbs div on restart
    charDiv.innerHTML = ""; // empty char div (removes Chinese character) on restart
    // output the 12 thumbs by looping through the object array
    for(i=0; i<myObjArr.length; i++) {
        // images are JS Image() Objects, so they can take properties: eng, chi and pin, etc
        var thumb = new Image();
        thumb.src = "images/" + myObjArr[i].eng + ".jpg";
        thumb.eng = myObjArr[i].eng;
        thumb.chi = myObjArr[i].chi;
        thumb.pin = myObjArr[i].pin;
        thumb.style.backgroundColor = "white";
        thumb.style.marginTop = "10px";
        thumb.addEventListener("click", swapPicOrQuiz);
        thumbsDiv.appendChild(thumb);
    } // end for
    
    // if this is Restart, the Score will need to be Reset to zero, all around
    clicks = 0;
    rawScore = 0;
    avgScore = 0;
    scoreReport = "High Score: " + scoreCookie + "<br>Total Clicks: " + clicks + "<br>" + "Raw Score: " + rawScore + "<br>" + "Avg Score: " + avgScore.toFixed(3);
    scoreBox.innerHTML = scoreReport;
    
} // end function init()

// this function has a big if-else part, because the same thumb click must do different things in Quiz Mode vs. Non-Quiz Mode
// this function runs every time the user clicks a thumb, regardless of game mode
function swapPicOrQuiz() {
   
    clearInterval(wheelInterval); // stop the spinning wheel interval, since wheel is gone
   
    if(isQuiz==false) { // if we are NOT in Quiz Mode, serve up pic, character, text and sound
        
        sound.pause(); // if a sound is playing already, stop it before playing new sound
        sound.src = "audio/" + this.eng + ".mp3"; // set sound source using thumb's eng property
        sound.play(); // play the sound
        //concatenate image and output the bigPic that matches the thumbnail clicked
        var bigPic = '<img src="images/' + this.eng + '.jpg" width="100%" height="auto">';
        // output the English and Pinyin under the bigPic image
        bigPic += '<br>' + this.eng + " - " + this.pin;
        document.getElementById("bigPic").innerHTML = bigPic; 
        // concatenate Chinese character img tag and output the character
        var charPic = '<img src="images/char-' + this.chi + '.jpg" width="65%" height="auto">';
        charDiv.innerHTML = charPic;
        // make visible the div that holds the Chinese character image
        document.getElementById("char").style.display="block";
    
    } else { // isQuiz==true we are not in the default mode, but rather in Quiz Mode
        
        // in quiz mode we need to keep track of total clicks to calculate avg score
        // every time the user clicks a thumb, increment clicks by one
        clicks++;
        scoreBox.innerHTML = ""; // clear out the score box
        
        // check IF the user's response (thumb click) was correct
        // "this" is the thumb that was clicked to call the quiz() function 
        // if user clicked correct thumb, this.chi = tempObjArr[randNum].chi
        if(this.chi == tempObjArr[randNum].chi) {    
            
            // output Good Job to the bigPic div, since the correct thumb was clicked
            document.getElementById("bigPic").innerHTML = "Correct! Good Job!";
            thumbnails.removeChild(this); // remove the thumb from the thumbnails div
            tempObjArr.splice(randNum, 1); // remove thumb from obj array, don't repeat
            
            // answer was correct so increment rawScore by one
            rawScore++;
            avgScore = rawScore / clicks; // calculate score avg
            avgScore.toFixed(2); // round avg score to 2 decimal points
            // concatenate a score report and output it to the score div
            scoreReport = "High Score: " + scoreCookie + "<br>Total Clicks: " + clicks + "<br>" + "Raw Score: " + rawScore + "<br>" + "Avg Score: " + avgScore.toFixed(3);
            scoreBox.innerHTML = scoreReport;
            
             var charPic = '<img src="images/char-' + this.chi + '.jpg" width="65%" height="auto">';
        charDiv.innerHTML = charPic;
            
            quiz();  // play another sound    
            
        } else { // if user clicked incorrect thumb pic  
            
            // output the Sorry message since the user clicked the wrong thumb
            document.getElementById("bigPic").innerHTML = "Sorry! Try again!";
            // replay the sound so the user can try again
            sound.src = 'audio/' + tempObjArr[randNum].chi + '.mp3';
            sound.play();
            
            // raw score has not gone up after another click, so avg score goes down
            avgScore = rawScore / clicks; // calculate score avg
            avgScore.toFixed(2); // round avg score to 2 decimal points
            // concatenate a score report and output it to the score div
            scoreReport = "High Score: " + scoreCookie + "<br>Total Clicks: " + clicks + "<br>" + "Raw Score: " + rawScore + "<br>" + "Avg Score: " + avgScore.toFixed(3);
            scoreBox.innerHTML = scoreReport;
                    
        } // end inner if-this
        
    } // end outer if-else
    
} // function swapPicOrQuiz()

function quiz() {
    
    isQuiz = true; // switch to Quiz Mode--the else part of the swapPicOrQuiz() function
    sound.pause(); // stop any sound that may be playing already
    randNum = Math.floor(Math.random()*tempObjArr.length); // random int from 0-array length
    sound.src = 'audio/' + tempObjArr[randNum].chi + '.mp3'; // set source of random sound
    sound.play(); // play the random MP3 file
    document.getElementById("bigPic").innerHTML = "What animal name did I say in Chinese?<br>Click the correct thumb pic!";
    // output the Chinese character for that sound
    var charPic = '<img src="images/char-' + tempObjArr[randNum].chi + '.jpg">';
    document.getElementById("char").innerHTML = charPic; 
    document.getElementById("score").style.display = "block"; // show the score box
    
} // end quiz()

function saveScore() {
    document.cookie = "myScore=avgScore";
}

function spinWheel() {
    
    wheel.style.transform += "rotate(1deg)"; // rotate the wheel image by 1 degree
    
} // end spinWheel()

var wheelInterval = setInterval(spinWheel, 25); // call the spinWheel() func every 25ms
