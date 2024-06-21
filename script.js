const form = document.getElementById("forms");
const nome = document.getElementById("username");
const email = document.getElementById("email");
const cpf = document.getElementById("cpf");
const matricula = document.getElementById("matricula");
const arquivo = document.getElementById("file-upload");
const check = document.getElementById("checkbox");
let isValid = true;

document.getElementById("close").addEventListener("click", function () {
    document.getElementById("pop-up").style.display = "none";
});

form.addEventListener("submit", (event) => {
    //event.preventDefault();
    checkInputNome();
    checkInputEmail();
    checkInputCpf();
    checkInputArquivo();
    checkInputCheck();
    // checkInputMatricula();

    // Prevenir envio do formulário se inválido
    if (!isValid) {
        event.preventDefault();
    } else {
        event.preventDefault();
        submitForm();
    }
});

// Verifica se o campo "nome" está preenchido:
function checkInputNome() {
    const nameValue = nome.value;

    if (nameValue === "") {
        isValid = false;
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
        isValid = false;
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
        isValid = false;
        errorView(cpf, "Preencha com o seu cpf");
    } else {
        const formItem = cpf.parentElement;
        formItem.className = "form-content";
    }
}

// Verifica se o campo "arquivo" está preenchido:
function checkInputArquivo() {
    const arquivoValue = arquivo.value;

    if (arquivoValue.length === 0) {
        isValid = false;
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
        isValid = false;
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

/* Enviando os dados para o Power Automate */
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

            const popUp = document.getElementById("pop-up");
            const modalContent = document.getElementById("modal-content");
            const icon = document.getElementById("icon");
            const message = modalContent.querySelector("p");

            if (responseData.message === "Cadastro já existente !") {
                icon.innerHTML = "&#9888;"; // Ícone de aviso
                message.innerText = "Cadastro já existente !";
            } else {
                icon.innerHTML = "&#10004;"; // Ícone de sucesso
                message.innerText = "Currículo cadastrado com sucesso !";
            }

            popUp.style.display = "block";

            if (responseData.message !== "Cadastro já existente !") {
                // Resetar o formulário após sucesso
                form.reset();
                // Resetar a exibição de erros
                const formItems = document.querySelectorAll(".form-content");
                formItems.forEach((item) => {
                    item.className = "form-content";
                });
            }

        } catch (error) {
            alert(error.message);
        }
    };
    reader.readAsDataURL(file);
}
