function AddUser() {
    Player1 = document.getElementById("Username1").value;
    Player2 = document.getElementById("Username2").value;
    localStorage.setItem("Player1", Player1);
    localStorage.setItem("Player2", Player2);
    window.location = "game.html";
}