function LogOut() {
    window.location = "index.html";
}

function Start() {
    User1Name = localStorage.getItem("Player1");
    User2Name = localStorage.getItem("Player2");

    User1Lives = 3;
    User2Lives = 3;

    document.getElementById("User1Name").innerHTML = User1Name + " - ";
    document.getElementById("User2Name").innerHTML = User2Name + " - ";

    document.getElementById("PlayerQuestion").innerHTML = "Question - " + User1Name;
    document.getElementById("PlayerAnswer").innerHTML = "Answer - " + User2Name;

    document.getElementById("User1Lives").innerHTML = "<i class='glyphicon glyphicon-heart'></i><i class='glyphicon glyphicon-heart'></i><i class='glyphicon glyphicon-heart'></i>";
    document.getElementById("User2Lives").innerHTML = "<i class='glyphicon glyphicon-heart'></i><i class='glyphicon glyphicon-heart'></i><i class='glyphicon glyphicon-heart'></i>";

    QuestionOperation = "";
    QuestionOperator = "";

    document.getElementById("Results").innerHTML = "";
    document.getElementById("Overlay").style.display = "none";
}

function Operation(Operation, Operator) {
    console.log("Current Operation: " + Operation);
    document.getElementById("CurrentOperation").innerHTML = "Current Operation: " + Operation;
    QuestionOperator = Operator;
    QuestionOperation = Operation;
}

function Send() {
    Number1 = document.getElementById("Number1").value;
    Number2 = document.getElementById("Number2").value;
    switch (QuestionOperation) {
        case "Addition":
            Answer = parseInt(Number1) + parseInt(Number2);
            break;
        case "Subtraction":
            Answer = parseInt(Number1) - parseInt(Number2);
            break;
        case "Multiplication":
            Answer = parseInt(Number1) * parseInt(Number2);
            break;
        case "Division":
            Answer = parseInt(Number1) / parseInt(Number2);
            break;
        default:
            console.log("Operation not selected");
    }
    console.log(Answer);

    Question = "<h4>" + Number1 + " " + QuestionOperator + " " + Number2 + "</h4>";
    Input = "<br> Answer: <input style='box-shadow: 5px 5px 5px black;' type='text' id='InputCheck'>";
    Check = "<br><br><button style='box-shadow: 5px 5px 5px black;' class='btn btn-info' onclick='CheckAnswer()'> Check </button>";
    Row = Question + Input + Check;
    document.getElementById("Output").innerHTML = Row;
    document.getElementById("Number1").value = "";
    document.getElementById("Number2").value = "";
    document.getElementById("CurrentOperation").innerHTML = "";
}

PlayerQuestion = "Player1";
PlayerAnswer = "Player2";

function CheckAnswer() {
    GetAnswer = document.getElementById("InputCheck").value;

    if (GetAnswer != Answer) {
        if (PlayerAnswer == "Player1") {
            User1Lives--;
            if (User1Lives == 0) {
                document.getElementById("User1Lives").innerHTML = "";
                document.getElementById("Overlay").style.display = "block";
                document.getElementById("Results").innerHTML = "Results: " + "<br><br>" + User1Name + " lost! <br><br>" + User2Name + " won!";
            } else if (User1Lives == 1) {
                document.getElementById("User1Lives").innerHTML = "<i class='glyphicon glyphicon-heart'></i>";
            } else if (User1Lives == 2) {
                document.getElementById("User1Lives").innerHTML = "<i class='glyphicon glyphicon-heart'></i><i class='glyphicon glyphicon-heart'></i>";
            }
        } else {
            User2Lives--;
            if (User2Lives == 0) {
                document.getElementById("User2Lives").innerHTML = "";
                document.getElementById("Overlay").style.display = "block";
                document.getElementById("Results").innerHTML = "Results: " + "<br><br>" + User2Name + " lost! <br><br>" + User1Name + " won!";
            } else if (User2Lives == 1) {
                document.getElementById("User2Lives").innerHTML = "<i class='glyphicon glyphicon-heart'></i>";
            } else if (User2Lives == 2) {
                document.getElementById("User2Lives").innerHTML = "<i class='glyphicon glyphicon-heart'></i><i class='glyphicon glyphicon-heart'></i>";
            }
        }
    }
    
    if (PlayerQuestion == "Player1") {
        PlayerQuestion = "Player2";
        document.getElementById("PlayerQuestion").innerHTML = "Question - " + User2Name;
    } else {
        PlayerQuestion = "Player1";
        document.getElementById("PlayerQuestion").innerHTML = "Question - " + User1Name;
    }

    if (PlayerAnswer == "Player1") {
        PlayerAnswer = "Player2";
        document.getElementById("PlayerAnswer").innerHTML = "Answer - " + User2Name;
    } else {
        PlayerAnswer = "Player1";
        document.getElementById("PlayerAnswer").innerHTML = "Answer - " + User1Name;
    }

    document.getElementById("Output").innerHTML = "";
}