const defRainbow = [
    "red",
    "gold",
    "yellow",
    "green",
    "aqua",
    "light_purple"
]

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
        document.getSelection().rangeCount > 0 ?
        document.getSelection().getRangeAt(0) :
        false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
};

var color1 = `white`;
var color2 = `white`;

var invalid = false;


function generateCommand() {
    var globalstats = {
        "text": $("#textToCommand").val(),
        "colors": $("input[name=options][value='1']").prop("checked") ? defRainbow : $("input[name=options][value='2']").prop("checked") ? custom2Colors() : stringArrToJSON($("#customJSONArray").val()),
        "type": $("input[name=types][value='1']").prop("checked") ? `title` : $("input[name=types][value='2']").prop("checked") ? `tellraw` : `raw`,
        "to": $("#toText").val() == "" ? `@a` : $("#toText").val()
    }
    if(invalid == true) {
        toast("Ongeldige JSON")
    } else {
        console.log(globalstats)
        copyToClipboard(generator(globalstats.text, globalstats.type, globalstats.to, globalstats.colors))
        toast("Commando Gekopi\xEBerd")
    }
}

function toast(text) {
    'use strict';
    window['counter'] = 0;
    var toastElement = document.querySelector('#toast');
    var data = { message: text };
    toastElement.MaterialSnackbar.showSnackbar(data);
}

function stringArrToJSON(string) {
    try {
        invalid = false;
        return JSON.parse(string)
    } catch (error) {
        invalid = true;
        return;
    }
}

function custom2Colors() {
    return [color1, color2]
}


//colors instellen

function changeColorLabel1(text) {
    document.getElementById('color1Element').innerHTML = text
}

function changeColorLabel2(text) {
    document.getElementById('color2Element').innerHTML = text
}

function setColor1_Dark_Red() {  color1 = `dark_red`; changeColorLabel1("Dark Red") }
function setColor1_Red() {  color1 = `red`; changeColorLabel1("Red") }
function setColor1_Gold() {  color1 = `gold`; changeColorLabel1("Gold") }
function setColor1_Yellow() {  color1 = `yellow`; changeColorLabel1("Yellow") }
function setColor1_Dark_Green() {  color1 = `dark_green`; changeColorLabel1("Dark Green") }
function setColor1_Green() {  color1 = `green`; changeColorLabel1("Green") }
function setColor1_Aqua() {  color1 = `aqua`; changeColorLabel1("Aqua") }
function setColor1_Dark_Aqua() {  color1 = `dark_aqua`; changeColorLabel1("Dark Aqua") }
function setColor1_Dark_Blue() {  color1 = `dark_blue`; changeColorLabel1("Dark Blue") }
function setColor1_Blue() {  color1 = `blue`; changeColorLabel1("Blue") }
function setColor1_Light_Purple() {  color1 = `light_purple`; changeColorLabel1("Light Purple") }
function setColor1_Dark_Purple() {  color1 = `dark_purple`; changeColorLabel1("Dark Purple") }
function setColor1_White() {  color1 = `white`; changeColorLabel1("White") }
function setColor1_Gray() {  color1 = `gray`; changeColorLabel1("Gray") }
function setColor1_Dark_Gray() {  color1 = `dark_gray`; changeColorLabel1("Dark Gray") }
function setColor1_Black() {  color1 = `black`; changeColorLabel1("Black") }
function setColor2_Dark_Red() {  color2 = `dark_red`; changeColorLabel1("Dark Red") }
function setColor2_Red() {  color2 = `red`; changeColorLabel2("Red") }
function setColor2_Gold() {  color2 = `gold`; changeColorLabel2("Gold") }
function setColor2_Yellow() {  color2 = `yellow`; changeColorLabel2("Yellow") }
function setColor2_Dark_Green() {  color2 = `dark_green`; changeColorLabel2("Dark Green") }
function setColor2_Green() {  color2 = `green`; changeColorLabel2("Green") }
function setColor2_Aqua() {  color2 = `aqua`; changeColorLabel2("Aqua") }
function setColor2_Dark_Aqua() {  color2 = `dark_aqua`; changeColorLabel2("Dark Aqua") }
function setColor2_Dark_Blue() {  color2 = `dark_blue`; changeColorLabel2("Dark Blue") }
function setColor2_Blue() {  color2 = `blue`; changeColorLabel2("Blue") }
function setColor2_Light_Purple() {  color2 = `light_purple`; changeColorLabel2("Light Purple") }
function setColor2_Dark_Purple() {  color2 = `dark_purple`; changeColorLabel2("Dark Purple") }
function setColor2_White() {  color2 = `white`; changeColorLabel2("White") }
function setColor2_Gray() {  color2 = `gray`; changeColorLabel2("Gray") }
function setColor2_Dark_Gray() {  color2 = `dark_gray`; changeColorLabel2("Dark Gray") }
function setColor2_Black() {  color2 = `black`; changeColorLabel2("Black") }



//command definition
var rainbowPhase = 0;

function incrementRainbowPhase(colors) {
    rainbowPhase++
    if (rainbowPhase >= colors.length) {
        rainbowPhase = 0;
    }
}

function generator(text, type, to, colors) {
    rainbowPhase = 0;
    var tempCommandObject
    var command = []
    for (let i = 0; i < text.length; i++) {
        tempChar = text[i]
        if (tempChar != " ") {
            tempCommandObject = `{"text":"${tempChar}", "color":"${colors[rainbowPhase]}"},`;
            incrementRainbowPhase(colors);
        } else {
            tempCommandObject = `{"text":"${tempChar}"},`;
        }
        command.push(tempCommandObject);
    }
    command[command.length - 1] = command[command.length - 1].substr(0, command[command.length - 1].length - 1)
    if (type == 'tellraw') {
        command.unshift(`tellraw ${to} [`)
    }
    if (type == 'title') {
        command.unshift(`title ${to} title [`)
    }
    if (type == 'raw') {
        command.unshift(`[`)
    }
    command.push(`]`)
    let finalCommand = command.join("")
    return finalCommand
}