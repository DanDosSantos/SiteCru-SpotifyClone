document.addEventListener('DOMContentLoaded', async function() {
    const enderecoContainer = document.getElementById('endereco-container');
    const weatherElement = document.getElementById('weather');

    // Função para buscar a temperatura
    async function buscarTemperatura() {
        try {
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=brasilia,BR&appid=3dd01cba99a2a948f957f3e66677d03e&units=metric');
            if (!response.ok) {
                throw new Error('Erro ao obter os dados do clima. Código de status: ' + response.status);
            }
            const data = await response.json();
            const temperatura = data.main.temp;
            weatherElement.textContent = `Temperatura: ${temperatura}°C`;
        } catch (error) {
            console.error('Erro ao buscar a temperatura:', error);
            weatherElement.textContent = 'Erro ao obter a temperatura';
        }
    }

    // Chamada inicial para buscar a temperatura
    buscarTemperatura();

    // Função para renderizar os endereços
    function renderizarEnderecos() {
        enderecoContainer.innerHTML = ''; // Limpa o conteúdo atual

        // Recupera os endereços salvos no localStorage
        const enderecos = JSON.parse(localStorage.getItem('enderecos')) || [];

        enderecos.forEach(function(endereco, index) {
            const enderecoItem = document.createElement('div');
            enderecoItem.classList.add('endereco-item');
            enderecoItem.innerHTML = `
                <p><strong>Título:</strong> ${endereco.titulo}</p>
                <p><strong>Endereço:</strong> ${endereco.endereco}</p>
                <p><strong>Número:</strong> ${endereco.numero}</p>
                <p><strong>Complemento:</strong> ${endereco.complemento || 'N/A'}</p>
                <p><strong>CEP:</strong> ${endereco.cep}</p>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="editarEndereco(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="removerEndereco(${index})">Remover</button>
                </div>
            `;
            enderecoContainer.appendChild(enderecoItem);
        });
    }

    // Chamada inicial para renderizar os endereços
    renderizarEnderecos();

    // Função para remover um endereço
    window.removerEndereco = function(index) {
        const enderecos = JSON.parse(localStorage.getItem('enderecos')) || [];
        enderecos.splice(index, 1); // Remove o endereço do array
        localStorage.setItem('enderecos', JSON.stringify(enderecos)); // Atualiza o localStorage
        renderizarEnderecos(); // Renderiza novamente os endereços atualizados
    };

    // Função para editar um endereço
    window.editarEndereco = function(index) {
        // Implemente a lógica para editar um endereço de acordo com sua necessidade
        alert('Funcionalidade de edição ainda não implementada.');
    };
});