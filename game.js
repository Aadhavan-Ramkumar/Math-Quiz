function LogOut() {
    window.location = "index.html";
}

User1Name = localStorage.getItem("Player1");
User2Name = localStorage.getItem("Player2");

User1Score = 0;
User2Score = 0;

document.getElementById("User1Name").innerHTML = User1Name + " - ";
document.getElementById("User2Name").innerHTML = User2Name + " - ";

document.getElementById("User1Score").innerHTML = User1Score;
document.getElementById("User2Score").innerHTML = User2Score;

document.getElementById("PlayerQuestion").innerHTML = "Question - " + User1Name;
document.getElementById("PlayerAnswer").innerHTML = "Answer - " + User2Name;

QuestionOperation = "";
QuestionOperator = "";

function Operation(Operation, Operator) {
    console.log("Current Operation: " + Operation);
    document.getElementById("CurrentOperation").innerHTML = "Current Operation: " + Operation
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
    Input = "<br> Answer: <input type='text' id='InputCheck'>";
    Check = "<br><br><button class='btn btn-info' onclick='CheckAnswer()'> Check </button>";
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

    if (GetAnswer == Answer) {
        if (PlayerAnswer == "Player1") {
            User1Score = User1Score + 1;
            document.getElementById("User1Score").innerHTML = User1Score;
        } else {
            User2Score = User2Score + 1;
            document.getElementById("User2Score").innerHTML = User2Score;
        }
    } else {
        if (PlayerAnswer == "Player1") {
            User2Score = User2Score + 1;
            document.getElementById("User2Score").innerHTML = User2Score;
        } else {
            User1Score = User1Score + 1;
            document.getElementById("User1Score").innerHTML = User1Score;
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