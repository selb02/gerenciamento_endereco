function mostrarSenha() {
    let inputPass = document.getElementById('senha');
    let btnShowPass = document.getElementById('btn-senha');

    if (inputPass.type === 'password') {
        inputPass.setAttribute('type', 'text'); 
        btnShowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill'); 
    } else {
        inputPass.setAttribute('type', 'password'); 
        btnShowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill'); 
    }
}

const url = "https://go-wash-api.onrender.com/api/login"; 

async function login() {
    const email = document.getElementById('Email').value.trim();
    const password = document.getElementById('senha').value.trim();

    if (!email || !password) {
        return mostrarMensagemErro("Preencha todos os campos!");
    }

    try {
        const api = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, "user_type_id": 1 })
        });

        const resposta = await api.json();

        if (api.ok && resposta.user.is_active) {
            localStorage.setItem("access_token", resposta.access_token);
            localStorage.setItem("user", JSON.stringify(resposta.user));
            alert("Login feito com sucesso!");
            window.location = "./home.html";
        } else {
            const errorMsg = resposta.data?.errors || "Usuário não está ativo.";
            mostrarMensagemErro(errorMsg);
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        mostrarMensagemErro("Erro de conexão com o servidor.");
    }
}

function mostrarMensagemErro(mensagem) {
    document.getElementById("msgError").innerHTML = mensagem;
    alert(mensagem);
}