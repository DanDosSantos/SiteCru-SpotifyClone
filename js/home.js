// URL da API para obter os endereços
const addressUrl = 'https://go-wash-api.onrender.com/api/auth/address';

// Função para buscar e exibir os endereços
async function fetchAndDisplayAddresses() {
    try {
        // Faz uma requisição GET para a API de endereços
        let response = await fetch(addressUrl);

        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        // Converte a resposta da API para JSON
        let addresses = await response.json();

        // Renderiza os endereços na página
        renderAddresses(addresses);
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para renderizar os endereços na página
function renderAddresses(addresses) {
    // Seleciona o elemento onde os endereços serão exibidos
    let addressListElement = document.getElementById('address-list');

    // Limpa o conteúdo atual da lista de endereços
    addressListElement.innerHTML = '';

    // Verifica se há endereços para exibir
    if (addresses.length === 0) {
        addressListElement.innerHTML = '<p>Nenhum endereço cadastrado.</p>';
    } else {
        // Cria uma lista não ordenada para os endereços
        let ul = document.createElement('ul');

        // Itera sobre cada endereço e cria um item de lista para cada um
        addresses.forEach(address => {
            let li = document.createElement('li');
            li.textContent = `${address.title}: ${address.address}, ${address.number}, ${address.complement}, ${address.cep}`;
            ul.appendChild(li);
        });

        // Adiciona a lista de endereços ao elemento pai
        addressListElement.appendChild(ul);
    }
}

// Chama a função para buscar e exibir os endereços quando a página carregar
window.onload = fetchAndDisplayAddresses;