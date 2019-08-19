var finalText = ["Hello,", "I'm Drew", "Enjoy"];
var currentText = "";
var currentDelay = 0;
var currentLine = 0;
var textFinished = false;
var skipPressed = false;
var muted = false;

/* Starts running the animation once the page is loaded */
function loaded() {
    resetVars();
    mouseBlink();
    createLine(currentLine);
}

/* Displays a "line", aka a string index of the finalText array */
function createLine(lineNum){
    sleep(1000).then(async function (){
        for(var i = 0; i < finalText[lineNum].length; i++){
            setTextDelay(i, lineNum);
        }
    });
}

/* Controls the cursor blinkage. Switches on and off every 530ms */
async function mouseBlink(){
    var visible = false;
    while(!textFinished){
        if(visible){
            $('.typetext')[0].innerHTML = currentText + "&nbsp;";
            visible = false;
        }
        else{
            $('.typetext')[0].innerHTML = currentText + "|";
            visible = true;
        }
        await sleep(530);
    }
    $('.typetext')[0].innerHTML = currentText;
}

async function setTextDelay(charIndex, lineNum) {
    var audio = new Audio("resources/keypress.mp3");
    var delay = ((Math.floor(Math.random() * 8) + 3) * 50);
    currentDelay += delay;
    setTimeout(function(){
        currentText = currentText.concat(finalText[lineNum].substring(charIndex, charIndex + 1));
        var inner = $('.typetext')[0].innerHTML;
        if(inner.substring(inner.length - 1, inner.length) == "|"){
            $('.typetext')[0].innerHTML = currentText + "|";
        }
        else if(currentText.substring(currentText.length - 1, currentText.length) == " "){
            $('.typetext')[0].innerHTML = currentText + "&nbsp;";
        }
        else{
            $('.typetext')[0].innerHTML = currentText;
        }
        audio.play();
        if(charIndex + 1 == finalText[lineNum].length && lineNum != finalText.length - 1){
            currentDelay = 0;
            setTimeout(function(){
                clearText(finalText[lineNum].length)
            }, 1250);
        }
        else if(charIndex + 1 == finalText[lineNum].length && lineNum == finalText.length - 1){
            textFinished = true;
            sleep(200).then(function(){
                $('.typetext').css("display", "none");
                $('.typetext').fadeIn(1800);
                $('.replayicon').css("display", "none");
                $('.replayicon').fadeIn(1800);
                $('.replayicon').css("z-index", 1);
                if(!skipPressed){
                    sleep(1500).then(function(){
                        $("body,html").animate(
                            {
                            scrollTop: $('#main').offset().top
                            },
                            800,
                        );
                    });
                }
            });
        }
    }, currentDelay);
}

async function clearText(charsToClear){
    for(var i = charsToClear; i > 0; i--){
        var inner = $('.typetext')[0].innerHTML;
        if(inner.substring(inner.length - 1, inner.length) == "|"){
            currentText = inner.substring(0, inner.length - 2);
            $('.typetext')[0].innerHTML = currentText + "|";
        }
        else{
            currentText = inner.substring(0, inner.length - 7);
            $('.typetext')[0].innerHTML = currentText + "&nbsp;";
        }
        await sleep(230);
        if(i == 1){
            currentLine++;
            createLine(currentLine);
        }
    }
}

function resetVars(){
    $('.replayicon').css("z-index", -1);
    currentText = "";
    currentDelay = 0;
    currentLine = 0;
    textFinished = false;
    skipPressed = false;
}

function replayButtonPressed(){
    loaded();
}

function skipButtonPressed(){
    skipPressed = true;
    $("body,html").animate(
        {
        scrollTop: $('#main').offset().top
        },
        800,
    );
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

loaded();