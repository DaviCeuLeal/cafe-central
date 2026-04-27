const formCadastro = document.getElementById("formCadastro");
const formLogin = document.getElementById("formLogin");

// URL da API
//const API_URL = "http://localhost:3000"
const API_URL = "https://cafe-central-koge.onrender.com"


/* 
===============================================
CADASTRO
===============================================
*/

if(formCadastro){
    formCadastro.addEventListener("submit", async function(event){

        event.preventDefault();
        
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmasenha = document.getElementById("confirmasenha").value;
        
        const mensagem = document.getElementById("mensagemCadastro");
        mensagem.textContent="";
        
        if(!nome || !email || !senha || !confirmasenha){
            mensagem.textContent = "Preencha os campos";
            return
        }

        if(senha !== confirmasenha){
            mensagem.textContent = "As senhas não coincidem";
            return
        }

        try{
            const resposta = await fetch(`${API_URL}/cadastro`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({nome,email,senha})
            });

            const dados = await resposta.json();

            if(!resposta.ok){
                mensagem.textContent = dados.mensagem || dados.erro;
                return
            }

            mensagem.textContent = dados.mensagem

            formCadastro.reset();

        }catch(error){
            console.error(error);
            mensagem.textContent = "Erro ao conectar com o servidor";
        }
        
    })
}


/* 
===============================================
LOGIN
===============================================
*/

if(formLogin){
    formLogin.addEventListener("submit", async function(event){

        event.preventDefault();
        
        const email = document.getElementById("emailLogin").value.trim();
        const senha = document.getElementById("senhaLogin").value;
      
        const mensagem = document.getElementById("mensagemLogin");
        mensagem.textContent="";
        
        if(!email || !senha){
            mensagem.textContent = "Preencha os campos";
            return
        }

        try{
            const resposta = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                credentials: "include",
                body: JSON.stringify({email,senha})
            });

            const dados = await resposta.json();

            mensagem.textContent = dados.mensagem || dados.erro;

            if(resposta.ok){
                window.location.href = "../pages/cursos.html";
            }

        }catch(error){
            console.error(error);
            mensagem.textContent = "Erro ao conectar com o servidor"
        }
        
    })
}