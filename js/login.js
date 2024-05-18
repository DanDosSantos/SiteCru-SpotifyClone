function redirectToLogin() {
    // Verificar se os campos de e-mail e senha estão preenchidos
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (email !== "" && password !== "") {
      // Adicionar console.log para verificar os dados antes de enviar a solicitação
      console.log("Dados a serem enviados para a API:", { email, password, user_type_id: 1 });
  
      const url = 'https://go-wash-api.onrender.com/api/login';
  
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
          user_type_id: 1
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(responseApi => {
        if (responseApi.success) {
          // Verificar se o usuário está ativo pela GoWash
          if (responseApi.data === true) {
            localStorage.setItem('token', responseApi.token); // Salvar o token no localStorage
            console.log(responseApi);
            alert('Login feito com sucesso');
            // Verificar se o usuário ativou o login
            if (responseApi.userActivated === true) {
              window.location.href = 'endereco.html'; // Redirecionar para a página de endereço
            } else {
              alert('Ative o login para prosseguir');
            }
          } else {
            alert('Usuário não encontrado. Verifique suas credenciais e tente novamente.');
          }
        } else {
          alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
      })
      .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Por favor, tente novamente.');
      });
    } else {
      alert("Por favor, preencha os campos de e-mail e senha.");
    }
  }