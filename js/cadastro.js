async function cadastroUsuario() {
    const url = 'https://go-wash-api.onrender.com/api/user';

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('data_nascimento').value;
    const senha = document.getElementById('senha').value;
    const termos = document.getElementById('termos').checked;

    // Funções de validação
    function validarEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    function validarCPF(cpf) {
        const re = /^\d{11}$/;
        return re.test(cpf);
    }

    function validarNome(nome) {
        return nome.trim().length > 0;
    }

    function validarSenha(senha) {
        return senha.length >= 6;
    }

    // Validar os dados do formulário
    if (!validarNome(nome)) {
        alert('Nome inválido');
        return;
    }

    if (!validarEmail(email)) {
        alert('Email inválido');
        return;
    }

    if (!validarCPF(cpf)) {
        alert('CPF inválido');
        return;
    }

    if (!validarSenha(senha)) {
        alert('Senha deve ter pelo menos 6 caracteres');
        return;
    }

    if (!termos) {
        alert('Você deve concordar com os termos');
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                email,
                cpf,
                dataNascimento,
                senha
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário. Código de status: ' + response.status);
        }

        const data = await response.json();

        if (data.statusCode && data.statusCode === 422) {
            if (data.errors.cpf_cnpj) {
                alert('Erro: CPF inválido ou CPF já cadastrado! ' + data.errors.cpf_cnpj[0]);
            }
            if (data.errors.email) {
                alert('Erro: Email já cadastrado! ' + data.errors.email[0])
            }
            return;
        }

        alert('Cadastro feito com sucesso!');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.');
    }
}