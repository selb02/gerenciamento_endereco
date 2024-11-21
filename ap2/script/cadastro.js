const url = "https://go-wash-api.onrender.com/api/user";

async function cadastro() {
  let name = document.getElementById("name").value;
  let terms = document.getElementById("terms").checked;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let birthday = document.getElementById("birthday").value;
  let cpf_cnpj = document.getElementById("cpf_cnpj").value;


  let api = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      user_type_id: 1,
      password: password,
      cpf_cnpj: cpf_cnpj,
      terms: 1,
      birthday: birthday,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (api.ok) {
    let resposta = await api.json();
    alert(resposta.data);
    return;
  }

  let respostaErro = await api.json();
  
  
  if(respostaErro.data && respostaErro.data.errors.cpf_cnpj){
    alert(respostaErro.data.errors.cpf_cnpj[0]);
    return;
  }
  
  if(respostaErro.data && respostaErro.data.errors.email){
    alert(respostaErro.data.errors.email[0]);
    return;
  }

  if(respostaErro.data && respostaErro.data.errors.email){
    alert(respostaErro.data.errors.name[0]);
    return;
  }

}


// const btnEnviar = document.getElementById('btn-enviar')
// const inputText = document.querySelectorAll('.input-text')
// const span = document.querySelectorAll('.obrigatorio')
// btnEnviar.addEventListener('click', () => {
//     inputText.forEach(function (input, indice) {
//         if (input.value === "") {
//             input.classList.remove('valido')
//             input.classList.add('erro')
//             span[indice].classList.add('campo-obrigatorio')
//         }else {
//             input.classList.remove('erro')
//             input.classList.add('valido')
//             span[indice].classList.remove('campo-obrigatorio')
//         }
//     })
// })