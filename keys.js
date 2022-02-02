EquationShortcut = localStorage.getItem("EquationShortcut");

window.addEventListener("keydown", (e) => {
    let KeyPressed = e.key;
    switch (KeyPressed) {
        case "ArrowUp":
            document.getElementById("Username1").focus();
            break;
        case "ArrowDown":
            document.getElementById("Username2").focus();
            break;
        case "Enter":
            if (e.shiftKey == true) {
                LogIn();
            } else if (e.ctrlKey == true) {
                LogOut();
            }
            break;
        case "s":
            Send();
            break;
        case "c":
            CheckAnswer();
            break;
        case "Backspace":
            ClearAll();
            break;
    }
});

window.addEventListener("keyup", (e) => {
    let KeyPressed = e.key;
    if (EquationShortcut == true) {
        switch (KeyPressed) {
            case "1":
                AddNumber(1);
                break;
            case "2":
                AddNumber(2);
                break;
            case "3":
                AddNumber(3);
                break;
            case "4":
                AddNumber(4);
                break;
            case "5":
                AddNumber(5);
                break;
            case "6":
                AddNumber(6);
                break;
            case "7":
                AddNumber(7);
                break;
            case "8":
                AddNumber(8);
                break;
            case "9":
                AddNumber(9);
                break;
            case "0":
                AddNumber(0);
                break;
            case "+":
                Operation("Addition", "+");
                break;
            case "-":
                Operation("Subtraction", "-");
                break;
            case "x":
                Operation("Multiplication", "x");
                break;
            case "/":
                Operation("Division", "÷");
                break;
        }
    }
});