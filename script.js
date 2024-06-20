const form = document.getElementById("forms");
const nome = document.getElementById("username");
const email = document.getElementById("email");
const cpf = document.getElementById("cpf");
const matricula = document.getElementById("matricula");
const arquivo = document.getElementById("file-upload");
const check = document.getElementById("checkbox");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkInputNome();
    checkInputEmail();
    checkInputCpf();
    checkInputArquivo();
    checkInputCheck();
    // checkInputMatricula();
});

// Verifica se o campo "nome" está preenchido:
function checkInputNome() {
    const nameValue = nome.value;

    if (nameValue === "") {
        errorView(nome, "Preencha o seu nome");
    } else {
        const formItem = nome.parentElement;
        formItem.className = "form-content";
    }
}

// Verifica se o campo "email" está preenchido:
function checkInputEmail() {
    const emailValue = email.value;

    if (emailValue === "") {
        errorView(email, "Preencha com o seu email");
    } else {
        const formItem = email.parentElement;
        formItem.className = "form-content";
    }
}

// Verifica se o campo "cpf" está preenchido:
function checkInputCpf() {
    const cpfValue = cpf.value;

    if (cpfValue === "") {
        errorView(cpf, "Preencha com o seu cpf");
    } else {
        const formItem = cpf.parentElement;
        formItem.className = "form-content";
    }
}

/*
// Verifica se o campo "matricula" está preenchido:
function checkInputMatricula() {
    const matriculaValue = matricula.value;

    if (matriculaValue === "") {
        errorView(matricula, "Preencha com o seu matricula");
    } else {
        const formItem = matricula.parentElement;
        formItem.className = "form-content";
    }
}
*/

// Verifica se o campo "arquivo" está preenchido:
function checkInputArquivo() {
    const arquivoValue = arquivo.value;

    if (arquivoValue.length === 0) {
        errorView(arquivo, "Preencha com o seu cúrriculo");
    } else {
        const formItem = arquivo.parentElement;
        formItem.className = "form-content";
    }
}

// Verifica se o campo "check" está preenchido:
function checkInputCheck() {
    const checkValue = check.checked;
    console.log(checkValue);
    if (!checkValue) {
        errorView(check, "Concorde com o termo");
    } else {
        const formItem = check.parentElement;
        formItem.className = "form-content";
    }
}

function errorView(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");

    textMessage.innerText = message;
    formItem.className = "form-content error";
}

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

/*
function showError(input, message) {
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

/* Enviando os dados para o Power Automate */
/*
async function submitForm() {
    const form = document.getElementById("forms");
    const formData = new FormData(form);

    const name = formData.get("username");
    const email = formData.get("email");
    const cpf = formData.get("cpf");
    const matricula = formData.get("matricula");
    const file = formData.get("file-upload");

    //Variável que irá ler o arquivo
    const reader = new FileReader();
    reader.onload = async function (e) {
        const fileContent = e.target.result;
        const base64File = fileContent.split(",")[1];

        //objeto que irá armazenar os dados do form e o arquivo em base64
        const payload = {
            name: name,
            email: email,
            cpf: cpf,
            matricula: matricula,
            //file: `data:${file.type};base64,${base64File}`,
            file: base64File,
            fileName: file.name,
        };

        //Armazena a url gerada no Power Automate
        const powerAutomateUrl =
            "https://prod2-00.brazilsouth.logic.azure.com:443/workflows/fc458bc703644c0aad1ce89ed4364ead/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=S-aUojVXjNaHBk4amiybGDeVIb3taHu_RhCuMOjxMkI";

        //Enviando a requisição para o Power Automate
        try {
            const response = await fetch(powerAutomateUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            //Aguarda o retorno do Power Automate
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            alert(responseData.message);
        } catch (error) {
            alert(error.message);
        }
    };
    reader.readAsDataURL(file);
}*/
