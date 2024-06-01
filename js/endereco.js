async function salvarEndereco(event) {
    event.preventDefault(); // Impede o envio do formulário

    const url = "https://go-wash-api.onrender.com/api/auth/address";

    // Obter valores dos campos do formulário
    let titulo = document.getElementById("titulo").value;
    let cep = document.getElementById("cep").value;
    let endereco = document.getElementById("endereco").value;
    let numero = document.getElementById("numero").value;

    // Obter token de autenticação do localStorage
    let token = localStorage.getItem('authToken');

    // Verificar se o token de autenticação está presente
    if (!token) {
        alert("Token de autorização não encontrado. Faça login novamente.");
        return;
    }

    // Fazer uma requisição POST para a API de endereço
    try {
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": titulo,
                "cep": cep,
                "address": endereco,
                "number": numero
            }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        });

        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        // Extrair a resposta JSON
        let responseData = await response.json();
        console.log(responseData);

        // Mostrar mensagem de sucesso
        alert("Endereço cadastrado com sucesso");

        // Redirecionar para a página home.html
        window.location.href = "home.html";
    } catch (error) {
        console.error('Erro:', error);
        alert(`Erro ao cadastrar endereço: ${error.message}`);
    }
}