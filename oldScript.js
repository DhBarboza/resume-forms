/*form.addEventListener("submit", function (event) {
    let isValid = true;

    // Verificar campo nome
    if (nome.value.trim() === "") {
        isValid = false;
        showError(nome, "Nome não pode estar em branco");
    } else {
        hideError(nome);
    }

    // Verificar campo email
    if (email.value.trim() === "") {
        isValid = false;
        showError(email, "E-mail não pode estar em branco");
    } else {
        hideError(email);
    }

    // Verificar campo CPF
    if (cpf.value.trim() === "") {
        isValid = false;
        showError(cpf, "CPF não pode estar em branco");
    } else {
        hideError(cpf);
    }

    // Verificar campo Matricula
    if (cpf.value.trim() === "") {
        isValid = false;
        showError(matricula, "Matricula não pode estar em branco");
    } else {
        hideError(matricula);
    }

    // Verificar campo arquivo
    if (arquivo.files.length === 0) {
        isValid = false;
        showError(arquivo, "É necessário anexar um arquivo");
    } else {
        hideError(arquivo);
    }

    // Verificar checkbox
    if (!check.checked) {
        isValid = false;
        showError(check, "Você deve aceitar os termos");
    } else {
        hideError(check);
    }

    // Prevenir envio do formulário se inválido
    if (!isValid) {
        event.preventDefault();
    } else {
        event.preventDefault();
        submitForm();
    }
});*/

/*function showError(input, message) {
    const formContent = input.parentElement;
    const errorElement = formContent.querySelector("a");
    errorElement.textContent = message;
    errorElement.style.visibility = "visible";
    formContent.classList.add("error");
}

function hideError(input) {
    const formContent = input.parentElement;
    const errorElement = formContent.querySelector("a");
    errorElement.textContent = "";
    errorElement.style.visibility = "hidden";
    formContent.classList.remove("error");
}*/
