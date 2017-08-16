var database = firebase.database().ref();
var score = 0;
function updateDatabase(button){
    var answer = button.value;
    var compAnswer = compChoose();
    var userAnswer = answer;
    var newValue = {
        USERANSWER: userAnswer,
        COMPANSWER: compAnswer,
        SCORE: score
    }
    run(userAnswer, compAnswer, score);

    database.push(newValue, function(){
        console.log("success");
       
    });
}

database.on("child_added", function(data){
    var row = data.val();
    var userAnswer = row.USERANSWER;
    var compAnswer = row.COMPANSWER;
    var score = row.SCORE;

    $("chat-frame").append(userAnswer);
    $("chat-frame").append(compAnswer);
    
});

function userChoose(button){
    var choice = button.value;
    return choice;
}

function compChoose(){
    var possibleAnswers = ["Rock", "Paper", "Scissors"];
    var compAnswer = possibleAnswers[Math.floor(Math.random() * 3)];
    return compAnswer;
}

function filter(word){
    var keywords = ["rock", "paper", "scissors"];
    for(var i = 0; i < keywords.length; i++){
       if(word.toLowerCase() === keywords[i]){
            return true;
       }
    }
   
    return false;
}

function run(userAnswer, compAnswer, updatedScore){
    calculateResult(compAnswer, userAnswer);
    updateScoreboard();
}

function updateLeaderboard(scoreToUpdate){
    scoreToUpdate = score;
    var leaderboardIndex = 0;
    var leaderboard = document.getElementById("leaderboard-scores");
    var scores = [];
    var nums = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
    for(var i = 0; i < 10; i++){
        scores.push(document.getElementById(nums[i] + "-place"));
    }
    $( "#first-place").replaceWith("<li " + nums[leaderboardIndex] +"-place>" + scoreToUpdate +"</li>");
}

function updateScoreboard(){

}

function updateScore(){
    score+=1;
    $("#score").replaceWith("<h2 class='titles' id='score'>" + score + "</h2>");
}

function calculateResult(compAnswer, userAnswer){
    if(compAnswer == "Rock"){
        switch(userAnswer.toLowerCase()){
            case "rock":
                $("#chat-frame").prepend("<p>It was a tie</p>");
                $("#chat-frame").prepend("<p>Rock vs Rock</p>");
                break;
            case "paper":
                $("#chat-frame").prepend("<p>You won this round</p>");
                $("#chat-frame").prepend("<p>Paper vs Rock</p>");
                updateScore();
                break;
            case "scissors":
                $("#chat-frame").prepend("<p>You have lost this round</p>");
                $("#chat-frame").prepend("<p>Scissors vs Rock</p>");
                break;
        }
    } else if(compAnswer == "Paper"){
        switch(userAnswer.toLowerCase()){
            case "paper":
                $("#chat-frame").prepend("<p>It was a tie</p>");
                 $("#chat-frame").prepend("<p>Rock vs Paper</p>");
                break;
            case "scissors":
                $("#chat-frame").prepend("<p>You won this round</p>");
                 $("#chat-frame").prepend("<p>Scissors vs Paper</p>");
                updateScore();
                break;
            case "rock":
                $("#chat-frame").prepend("<p>You have lost this round</p>");
                 $("#chat-frame").prepend("<p>Rock vs Paper</p>");
                break;
        }
    } else if(compAnswer == "Scissors"){
        switch(userAnswer.toLowerCase()){
            case "scissors":
                $("#chat-frame").prepend("<p>It was a tie</p>");
                 $("#chat-frame").prepend("<p>Scissors vs Scissors</p>");
                break;
            case "rock":
                $("#chat-frame").prepend("<p>You won this round</p>");
                 $("#chat-frame").prepend("<p>Rock vs Scissors</p>");
                updateScore();
                break;
            case "paper":
                $("#chat-frame").prepend("<p>You have lost this round</p>");
                 $("#chat-frame").prepend("<p>Paper vs Scissors</p>");
                break;
    }
    
}
}

 function resetUserData(){
    database.remove();
    window.location.reload();
}




    
