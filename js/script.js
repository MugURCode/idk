var database = firebase.database().ref();

function updateDatabase(){
    var answer = $("#answer").val();

    var newValue = {
        USERANSWER: answer,
        COMPANSWER: compChoose()
    }

    database.push(newValue, function(){
        console.log("success");
    });
}

database.on("child_added", function(data){
    var row = data.val();
    console.log(row);
    var userAnswer = row.USERANSWER;
    if(filter(userAnswer)){
        var displayText = "<p id='userAnswer'> " + userAnswer + " </p>";
        $("#main-frame").append(displayText);
        run(userAnswer, row.COMPANSWER);
    } else {
        $("#main-frame").append("<p> " + userAnswer + " isn't an option</p>")
    }
    
});

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

function run(userAnswer, compAnswer){
    if(compAnswer === "Rock"){
        switch(userAnswer){
            case "rock":
            case "paper":
            case "scissors":
        }
    }
}

function resetUserData(){
    database.remove();
    window.location.reload();
}
    
