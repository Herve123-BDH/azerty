let number1 = 1;
let number2 = 1;
let userInput = 0;
let result = 0;
let expression = "";
let level = 0;
let randomRange = 0;
let counter = 0;
let score = 0;
document.getElementById("diff").innerHTML=  `<div style="border: 1px solid black; padding: 10px; display: flex; justify-content: center; flex-direction: column; align-items: center;">
<h3 style="background-color: black; padding: 5px;">
    expression
</h3>
<div style="display: flex;">
    <button value="+" onclick="setExpression(this)"  class="btn btn-success" style="margin: 5px;">
        +
    </button>
    <button value="-" onclick="setExpression(this)"  class="btn btn-success" style="margin: 5px;">
        -
    </button>
    <button value="/" onclick="setExpression(this)"  class="btn btn-success" style="margin: 5px;">
        /
    </button>
    <button value="*" onclick="setExpression(this)"  class="btn btn-success" style="margin: 5px;">
        *
    </button>
</div>
</div>
<div style="border: 1px solid black; padding: 10px; display: flex; justify-content: center; flex-direction: column; align-items: center;">
<h3 style="background-color: black; padding: 5px; width: 200px; text-align: center;">
    difficulté
</h3>
<div style="display: flex;">
    <button value="facile" onclick="setLevel(this)"  class="btn btn-success" style="margin: 5px;">
        facile
    </button>
    <button value="normal" onclick="setLevel(this)" class="btn btn-success" style="margin: 5px;">
        normal
    </button>
    <button value="difficile" onclick="setLevel(this)" class="btn btn-success" style="margin: 5px;">
        difficile
    </button>
</div>
</div>`;


function setExpression(ex){
    expression = ex.value;
    starTestQuestion();
}
function setLevel(lev){
    level = lev.value;
    switch(level){
        case "facile":
            randomRange = 10;
            break;
        case "normal":
            randomRange = 1000;
            break;
        case "difficile":
        randomRange = 10000;
        break;
    }
    starTestQuestion(); 
}
function starTestQuestion(){
    if(expression !="" && level !=""){
        calculateTest();
    }
    showScoreInformation();
}
function calculateTest(){
    document.getElementById("fin").innerHTML="";
    document.getElementById("diff").innerHTML="";
    number1 = Math.floor(Math.random()*randomRange);
    number2 = Math.floor(Math.random()*randomRange);
    switch(expression){
        case "+":
            result = number1 + number2;
            break;
        case "*":
            result = number1 * number2;
            break;
        case "-":
            result = number1 - number2;
            break;
        case "/":
            if(number2===0){
                number2+=1;
                result = number1 / number2;
            }
            else{
                result = number1 / number2;
            }
            
        break;
    }
    TestQuestion();
}
function  TestQuestion(){
    document.getElementById("calcul").innerHTML = `<div style=" background-color:#DDD;">
    <h2 style="color: black; padding: 5px;">
        ${number1} ${expression} ${number2}
    </h2>
</div>
<input type="number" name="number" id="number" class="input" style="width: 30vw; border: none; color:black; font-size:25px">
<button class="btn btn-success" style="margin: 5px;" onclick="setUserInput()">Valider</button>`
}
function setUserInput(){
    let inputResult = parseFloat(document.getElementById("number").value);
    if(!isNaN(inputResult)){
        userInput = inputResult;
        checkAnswer();
    }
    else{
        alert("Oups, valeur incorrect");
    }

}
function checkAnswer(){

    if(userInput == result){
        document.getElementById("fin").innerHTML= `<div class="bg-success" style="text-align: center; font-size:20px; width: 300px; margin: 0 auto;">
    ${number1} ${expression} ${number2} = ${userInput} Bien joué😊
    </div>`;
    score++;
    }else{
    document.getElementById("fin").innerHTML= `<div class="bg-danger" style="text-align: center; width: 300px; font-size:20px; margin: 0 auto;">
    ${number1} ${expression} ${number2} = ${userInput} Vous avez raté!😥 le resultat devrait etre ${result}
    </div>`;
    }
    counter++;
    showScoreInformation();
    if(counter<20){
        setTimeout(calculateTest,2000);
    }
    else{
        document.getElementById("score").innerHTML="";
        document.getElementById("diff").innerHTML="";
        document.getElementById("fin").innerHTML= `<div class="bg-warning" style="text-align: center; width: 300px; font-size:20px; margin: 0 auto;">
    Bien Terminé ton score est ${score}/20
    </div>`;
        
    }
    
};

function showScoreInformation(){
    document.getElementById("score").innerHTML=`
<div>
<p>
    score: ${score}/20
</p>
<p>
    expression: ${expression}
</p>
<p>
    niveau: ${level}
</p>
</div>`;
}
