document.addEventListener("DOMContentLoaded", function() {
    var acc = document.getElementsByClassName("accordion");
    var header = document.querySelector(".bg");
    var body = document.body;
    var defaultHeaderHeight = 110;
    var expandedHeaderHeight = 200;

    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;

            if (panel.style.display === "block") {
                panel.style.display = "none";
                header.style.height = defaultHeaderHeight + "px";
                body.style.paddingTop = defaultHeaderHeight + "px";
            } else {
                panel.style.display = "block";
                header.style.height = expandedHeaderHeight + "px";
                body.style.paddingTop = expandedHeaderHeight + "px";
            }
        });
    }
});
async function deletar(id) {
    const token = localStorage.getItem('access_token');
    const url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;

    const resposta = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  
        }
    });
    
    if (resposta.ok){
        alert("Endereço exluido com sucesso")
        listagem()
    }
}
async function listagem() {
    const token = localStorage.getItem('access_token');
    const url = 'https://go-wash-api.onrender.com/api/auth/address';
    const addressList = document.getElementById('address-list');

    if (!addressList) {
        console.error("Elemento 'address-list' não encontrado.");
        return;
    }

    addressList.innerHTML = '';

    const api = await fetch(url, { 
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (api.ok) {
        const resposta = await api.json();

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        thead.innerHTML = `

            <tr>
                <th>Title</th>
                <th>Endereço</th>
                <th>Numero</th>
                <th>Complemento</th>
                <th>Cep</th>
                <th>Ações</th>
            </tr>
        `;

        resposta.data.forEach(address => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${address.title}</td>
                <td>${address.address}</td>
                <td>${address.number}</td>
                <td>${address.complement}</td>
                <td>${address.cep}</td>
                <td>${address.id}</td>
                <td><input type="button" id = "preenchimento" value="Editar" onclick="window.location.href='../123.html?id=${address.id}'"></td>
                <td><input type="button" id = "preenchimento" value="Deletar" onclick="deletar(${address.id})"></td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        addressList.appendChild(table);

        addressList.style.display = 'block';

    } else {
        alert("Erro ao listar endereços: " + api.status);
    }

}

async function logout() {
    const token = localStorage.getItem('access_token');
    const url = 'https://go-wash-api.onrender.com/api/auth/logout';


        const api = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            }
        });

        if(api.ok){
            localStorage.removeItem('access_token');
            window.location.href('/login.html')
        }
}

const token = localStorage.getItem('access_token');
if (!token){
    history.pushState(null, null, '/login.html');

    window.onpopstate = () => {
        window.location.href = '/login.html';
    };
}



