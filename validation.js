const cpfInput = document.getElementById("cpf");

cpfInput.addEventListener("keypress", () => {
    let inputLength = cpfInput.value.length;

    if (inputLength === 3 || inputLength === 7) {
        cpfInput.value += ".";
    } else if (inputLength === 11) {
        cpfInput.value += "-";
    }
});
