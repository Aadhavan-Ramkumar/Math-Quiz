function LogOut() {
    window.location = "index.html";
}

function Start() {
    Number1 = "";
    Number2 = "";

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

    document.getElementById("Results").innerHTML = "";
    document.getElementById("Overlay").style.display = "none";

    QuestionOperation = "";
    QuestionOperator = "";

    Equation = "";
    EquationShortcut = "On";

    Questionable = "";
}

function AddNumber(Number) {
    document.getElementById("Equation").innerHTML += Number;
}

function Operation(Operation, Operator) {
    QuestionOperation = Operation;
    QuestionOperator = Operator;
    document.getElementById("Equation").innerHTML += " " + Operator + " ";
}

function ClearAll() {
    document.getElementById("Equation").innerHTML = "";
}

function Send() {
    Equation = document.getElementById("Equation").innerHTML;
    EquationArray = Equation.split(" " + QuestionOperator + " ");
    Number1 = EquationArray[0];
    Number2 = EquationArray[1];
    switch (QuestionOperation) {
        case "Addition":
            Answer = parseInt(Number1) + parseInt(Number2);
            Questionable = "True";
            break;
        case "Subtraction":
            Answer = parseInt(Number1) - parseInt(Number2);
            Questionable = "True";
            break;
        case "Multiplication":
            Answer = parseInt(Number1) * parseInt(Number2);
            Questionable = "True";
            break;
        case "Division":
            Answer = parseInt(Number1) / parseInt(Number2);
            Questionable = "True";
            break;
        default:
            console.log("Operation Not Selected");
            Questionable = "False";
    }
    if (Questionable != "False") {
        Question = "<h4>" + Equation + "</h4>";
        Input = "<br> Answer: <input style='box-shadow: 5px 5px 5px black;' type='text' id='InputCheck'>";
        Check = "<br><br><button style='box-shadow: 5px 5px 5px black;' class='btn btn-info' onclick='CheckAnswer()'> Check </button>";
        Row = Question + Input + Check;
        document.getElementById("Output").innerHTML = Row;
        PlayerQuestion = "Player1";
        PlayerAnswer = "Player2";
        Equation = "";
        document.getElementById("Equation").innerHTML = "";
        EquationShortcut = "Off";
    } else {
        document.getElementById("Equation").innerHTML = "Try Again";
        setTimeout(function () {
            document.getElementById("Equation").innerHTML = Equation;
        }, 2500);
    }
}

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
    EquationShortcut = "On";
}

window.addEventListener("keydown", MyKeyDown);

function MyKeyDown(e) {
    KeyPressed = e.keyCode;
    if (EquationShortcut == "On") {
        switch (KeyPressed) {
            case 48:
                AddNumber("0");
                break;
            case 49:
                AddNumber("1");
                break;
            case 50:
                AddNumber("2");
                break;
            case 51:
                AddNumber("3");
                break;
            case 52:
                AddNumber("4");
                break;
            case 53:
                AddNumber("5");
                break;
            case 54:
                AddNumber("6");
                break;
            case 55:
                AddNumber("7");
                break;
            case 56:
                AddNumber("8");
                break;
            case 57:
                AddNumber("9");
                break;
            case 8:
                ClearAll();
                break;
            case 187:
                Operation("Addition", "+");
                break;
            case 189:
                Operation("Subtraction", "-");
                break;
            case 88:
                Operation("Multiplication", "x");
                break;
            case 191:
                Operation("Division", "÷");
                break;
        }
    }
    switch (KeyPressed) {
        case 83:
            Send();
            break;
        case 67:
            CheckAnswer();
            break;
        case 76:
            LogOut();
    }
}