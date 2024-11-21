const url = "https://go-wash-api.onrender.com/api/auth/address";

async function endereco() {
  let titulo = document.getElementById("title").value;
  let cep = document.getElementById("cep").value;
  let endereco = document.getElementById("address").value;
  let numero = document.getElementById("number").value;
  let complemento = document.getElementById("complement").value;

  // Recuperar o token do localStorage
  const token = localStorage.getItem('access_token');

  try {
    let api = await fetch(url, {
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
      alert("Endereço cadastrado com sucesso");
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
    }
  } catch (error) {
    console.error('Erro inesperado:', error);
    alert("Ocorreu um erro ao tentar cadastrar o endereço.");
  }
}




