function LogOut() {
    localStorage.removeItem("Player1");
    localStorage.removeItem("Player2");
    window.location = "index.html";
}

function Load() {
    let Width = 0;
    let ProgressInterval = setInterval(Progress, 75);
    function Progress() {
        if (Width >= 100) {
            clearInterval(ProgressInterval);
        } else {
            Width++;
            document.getElementById("Color").style.width = Width + "%";
            document.getElementById("Percent").innerHTML = Width + "%";
        }
    }
    setTimeout(() => {
        document.getElementById("Load").style.display = "none";
        document.getElementById("Game").style.display = "block";
        Start();
    }, 8000);
}

function Start() {
    Number1 = "";
    Number2 = "";

    User1Name = localStorage.getItem("Player1");
    User2Name = localStorage.getItem("Player2");

    User1Lives = 3;
    User2Lives = 3;

    PlayerQuestion = "Player1";
    PlayerAnswer = "Player2";

    document.getElementById("User1Name").innerHTML = User1Name + " - ";
    document.getElementById("User2Name").innerHTML = User2Name + " - ";

    document.getElementById("PlayerQuestion").innerHTML = "Question - " + User1Name;
    document.getElementById("PlayerAnswer").innerHTML = "Answer - " + User2Name;

    document.getElementById("User1Lives").innerHTML = "<i class='glyphicon glyphicon-heart'></i><i class='glyphicon glyphicon-heart'></i><i class='glyphicon glyphicon-heart'></i>";
    document.getElementById("User2Lives").innerHTML = "<i class='glyphicon glyphicon-heart'></i><i class='glyphicon glyphicon-heart'></i><i class='glyphicon glyphicon-heart'></i>";

    document.getElementById("Results").innerHTML = "";
    document.getElementById("ResultsDiv").style.display = "none";

    QuestionOperation = "";
    QuestionOperator = "";

    Equation = "";
    EquationShortcut = true;

    localStorage.setItem("EquationShortcut", EquationShortcut);

    Questionable = false;
}

function AddNumber(Number) {
    document.getElementById("Equation").innerHTML += Number;
    Equation = document.getElementById("Equation").innerHTML;
    EquationArray = Equation.split(" ");
    if (EquationArray[0] != null && EquationArray[1] != null && EquationArray[2] != null) {
        document.getElementById("Send").disabled = false;
    }
}

function Operation(Operation, Operator) {
    QuestionOperation = Operation;
    QuestionOperator = Operator;
    document.getElementById("Equation").innerHTML += " " + Operator + " ";
    Equation = document.getElementById("Equation").innerHTML;
    EquationArray = Equation.split(" ");
    if (EquationArray[0] != null && EquationArray[1] != null && EquationArray[2] != null) {
        document.getElementById("Send").disabled = false;
    }
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
            Questionable = true;
            break;
        case "Subtraction":
            Answer = parseInt(Number1) - parseInt(Number2);
            Questionable = true;
            break;
        case "Multiplication":
            Answer = parseInt(Number1) * parseInt(Number2);
            Questionable = true;
            break;
        case "Division":
            Answer = +(Math.round(parseInt(Number1) / parseInt(Number2) + "e+2") + "e-2");
            console.log(Answer);
            Questionable = true;
            break;
        default:
            Questionable = false;
    }
    if (Questionable == true) {
        Question = "<h4>" + Equation + "</h4>";
        Input = "<br><input type='text' id='InputCheck' class='form-control' placeholder='Answer'>";
        Check = "<br><button id='Check' class='btn btn-info' onclick='CheckAnswer()'> Check </button>"
        Row = Question + Input + Check;
        document.getElementById("Output").innerHTML = Row;
        document.getElementById("Output").style.display = "block";
        document.getElementById("EquationDiv").style.display = "none";
        document.getElementById("Equation").innerHTML = "";
        Equation = "";
    }
    document.getElementById("Send").disabled = true;
    EquationShortcut = false;
    localStorage.setItem("EquationShortcut", EquationShortcut);
}

function CheckAnswer() {
    GetAnswer = document.getElementById("InputCheck").value;

    if (GetAnswer != Answer) {
        if (PlayerAnswer == "Player1") {
            User1Lives--;
            if (User1Lives == 0) {
                document.getElementById("User1Lives").innerHTML = "";
                document.getElementById("ResultsDiv").style.display = "block";
                document.getElementById("Results").innerHTML = "Results: <br><br>" + User1Name + " lost! <br><br>" + User2Name + " won!";
            } else if (User1Lives == 1) {
                document.getElementById("Wrong").style.display = "block";
                document.getElementById("Wrong").setAttribute("class", "Animate");
                setTimeout(() => {
                    document.getElementById("Wrong").style.display = "none";
                    document.getElementById("Wrong").removeAttribute("class", "Animate");
                }, 5000);
                document.getElementById("User1Lives").innerHTML = "<i class='glyphicon glyphicon-heart'>";
            } else if (User1Lives == 2) {
                setTimeout(() => {
                    document.getElementById("Wrong").style.display = "none";
                    document.getElementById("Wrong").removeAttribute("class", "Animate");
                }, 5000);
                document.getElementById("User1Lives").innerHTML = "<i class='glyphicon glyphicon-heart'><i class='glyphicon glyphicon-heart'>";
            }
        } else {
            User2Lives--;
            if (User2Lives == 0) {
                document.getElementById("User2Lives").innerHTML = "";
                document.getElementById("ResultsDiv").style.display = "block";
                document.getElementById("Results").innerHTML = "Results: <br><br>" + User2Name + " lost! <br><br>" + User1Name + " won!";
            } else if (User2Lives == 1) {
                setTimeout(() => {
                    document.getElementById("Wrong").style.display = "none";
                    document.getElementById("Wrong").removeAttribute("class", "Animate");
                }, 5000);
                document.getElementById("User2Lives").innerHTML = "<i class='glyphicon glyphicon-heart'>";
            } else if (User2Lives == 2) {
                setTimeout(() => {
                    document.getElementById("Wrong").style.display = "none";
                    document.getElementById("Wrong").removeAttribute("class", "Animate");
                }, 5000);
                document.getElementById("User2Lives").innerHTML = "<i class='glyphicon glyphicon-heart'><i class='glyphicon glyphicon-heart'>";
            }
        }
    } else if (GetAnswer == Answer) {
        document.getElementById("Correct").style.display = "block";
        document.getElementById("Correct").setAttribute("class", "Animate");
        setTimeout(() => {
            document.getElementById("Correct").style.display = "none";
            document.getElementById("Correct").removeAttribute("class", "Animate");
        }, 5000);
    }

    if (PlayerQuestion == "Player1") {
        PlayerQuestion = "Player2";
        document.getElementById("PlayerQuestion").innerHTML = "Question - " + User2Name;
    } else if (PlayerQuestion == "Player2") {
        PlayerQuestion = "Player1";
        document.getElementById("PlayerQuestion").innerHTML = "Question - " + User1Name;
    }
    if (PlayerAnswer == "Player1") {
        PlayerAnswer = "Player2";
        document.getElementById("PlayerAnswer").innerHTML = "Answer - " + User2Name;
    } else if (PlayerAnswer == "Player2") {
        PlayerAnswer = "Player1";
        document.getElementById("PlayerAnswer").innerHTML = "Answer - " + User1Name;
    }

    document.getElementById("Output").innerHTML = "";
    document.getElementById("Output").style.display = "none";
    document.getElementById("EquationDiv").style.display = "block";
    EquationShortcut = true;
    localStorage.setItem("EquationShortcut", EquationShortcut);
}
