async function listagem_id() {
    const params = new URLSearchParams(window.location.search);
    const IDS = params.get('id');
    const token = localStorage.getItem('access_token');
    const url = `https://go-wash-api.onrender.com/api/auth/address/${IDS}`;

    const api = await fetch(url, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (api.ok) {
        const resposta = await api.json();
        document.getElementById("title").value = resposta.data.title;
        document.getElementById("address").value = resposta.data.address;
        document.getElementById("cep").value = resposta.data.cep;
        document.getElementById("number").value = resposta.data.number;
        document.getElementById("complement").value = resposta.data.complement;

    } else {
        console.error("Erro ao buscar endereço:", api.status);
    }
}
listagem_id()



async function Atualizar_endereco() {
    let titulo = document.getElementById("title").value;
    let cep = document.getElementById("cep").value;
    let endereco = document.getElementById("address").value;
    let numero = document.getElementById("number").value;
    let complemento = document.getElementById("complement").value;

    const params = new URLSearchParams(window.location.search);
    const IDS = params.get('id');
    const token = localStorage.getItem('access_token');
    const url = `https://go-wash-api.onrender.com/api/auth/address/${IDS}`;
    const api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            title: titulo,
            cep: cep,
            address: endereco,
            number: numero,
            complement: complemento
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        });

        let resposta = await api.json();

        if (api.ok) {
        alert("Endereço atualizado");
        window.location = "./home.html";
        } else {
        console.error('Erro na requisição:', api.statusText);
        
        if (resposta.data && resposta.data.errors) {
            if (resposta.data.errors.cep) {
            alert(resposta.data.errors.cep[0]);
            }
            if (resposta.data.errors.address) {
            alert(resposta.data.errors.address[0]);
            }
            if (resposta.data.errors.title) {
            alert(resposta.data.errors.title[0]);
            }
        }
    
}}