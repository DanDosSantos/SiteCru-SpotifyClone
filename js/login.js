// URL da API de autenticação
const loginUrl = 'https://go-wash-api.onrender.com/api/login';

// Função para fazer login
async function loginUser() {
    // Obtém os valores dos campos de email, senha e user_type_id
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let userTypeId = document.getElementById('user_type_id').value; // Novo campo

    // Verifica se os campos estão preenchidos
    if (email === '') {
        alert('Preencha o seu Email');
        return;
    }

    if (password === '') {
        alert('Preencha a sua Senha');
        return;
    }

    if (userTypeId === '') {
        alert('Preencha o Tipo de Usuário');
        return;
    }

    // Faz uma requisição POST para a API de login
    try {
        let response = await fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify({ 
                email: email, 
                password: password, 
                user_type_id: userTypeId // Inclui user_type_id no corpo da requisição
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verifica se a resposta contém erros
        if (!response.ok) {
            let errorData = await response.json();
            handleLoginError(response.status, errorData);
            return;
        }

        // Converte a resposta da API para JSON
        let data = await response.json();

        // Salva o token de autenticação (se necessário)
        localStorage.setItem('authToken', data.token);

        // Redireciona para a página home.html após o login bem-sucedido
        alert('Login feito com sucesso');
        window.location.href = 'home.html';
    } catch (error) {
        console.error('Erro:', error);
        alert(`Erro ao fazer login: ${error.message}`);
    }
}

// Função para lidar com erros de login
function handleLoginError(status, errorData) {
    let errorMessage = `Erro ${status}: `;
    if (status === 422) {
        errorMessage += 'Dados de login inválidos. Verifique suas credenciais.';
        if (errorData.errors) {
            for (let field in errorData.errors) {
                errorMessage += `\n${field}: ${errorData.errors[field].join(', ')}`;
            }
        }
    } else if (errorData.message) {
        errorMessage += errorData.message;
    } else {
        errorMessage += 'Erro desconhecido ao fazer login.';
    }
    console.error('Detalhes do erro:', errorData); // Loga os detalhes do erro no console
    alert(errorMessage);
}