var finalText = ["hey dud", "welcome"];
var currentText = "";
var currentDelay = 0;

function loaded() {
    mouseBlink();
    createLine(0);
}

function createLine(lineNum){
    sleep(1000).then(async function (){
        for(var i = 0; i < finalText[lineNum].length; i++){
            setTextDelay(i, lineNum);
        }
    });
}

async function mouseBlink(){
    var visible = false;
    while(true){
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
}

async function setTextDelay(charIndex, lineNum) {
    var delay = ((Math.floor(Math.random() * 12) + 3) * 50);
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
        if(charIndex + 1 == finalText[lineNum].length){
            setTimeout(function(){
                console.log("deleting now");
                clearText(finalText[lineNum].length)
            }, 1250);
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
        await sleep(325);
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

loaded();