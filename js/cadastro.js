async function cadastroUsuario(){
    const url = 'https://go-wash-api.onrender.com/api/user';

    let nome = document.getElementById("nome")
    let email = document.getElementById("email")
    let cpf = document.getElementById("cpf")
    let birthday = document.getElementById("data_nascimento")
    let senha = document.getElementById("senha")
    


    let response = await fetch(url,{
        method: 'POST',
        body:JSON.stringify({
            "nome":nome.value,
            "email":email.value,
            "cpf": cpf.value.replace(/[^0-9]/g,''),
            "user_type_id":1,
            "data_nascimento": birthday.value,
            "senha": senha.value,
            "termos": 1
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    let data = await response.json();

    //if (cpf_cnpj.value !=)

    if(data.data?.statusCode && data.data.statusCode != 200){
        alert(data.data.errors);
        return;
    }
    alert("Cadastro feito com sucesso");
    window.location.href = "login.html";


}
