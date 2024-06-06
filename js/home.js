// URL da API para obter os endereços
const addressUrl = 'https://go-wash-api.onrender.com/api/auth/address';

function exibirEnderecoSalvo() {
    // Verifica se há dados salvos no local storage com o ID "endereco"
    if(localStorage.getItem('endereco')) {
      // Recupera os dados salvos do local storage
      const enderecoData = JSON.parse(localStorage.getItem('endereco'));
      // Exibe os dados na div com o ID "endereco"
      document.getElementById('endereco').innerHTML = `
        <p>Título: ${enderecoData.titulo}</p>
        <p>CEP: ${enderecoData.cep}</p>
        <p>Endereço: ${enderecoData.endereco}</p>
        <p>Número: ${enderecoData.numero}</p>
      `;
    } else {
      // Se não houver dados salvos, exibe uma mensagem indicando isso
      document.getElementById('endereco').innerHTML = '<p>Nenhum endereço cadastrado.</p>';
    }
  }

  // Chama a função para exibir os dados salvos quando a página carrega
  window.onload = exibirEnderecoSalvo;
