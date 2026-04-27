/* 
===============================================
1 PARTE - CAPTURAR OS DADOS DO FORM NO HTML
===============================================
*/

// 1. Pega o formulário pelo ID
const form = document.getElementById("formContato");

// 2. Evento de envio
if(form){
form.addEventListener("submit", async function(event){

    event.preventDefault(); 

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    const novaMensagem = {nome, email, mensagem};

    /* 
    ===============================================
    2 PARTE - ENVIAR PARA O SERVIDOR
    ===============================================
    */

    try{
        const resposta = await fetch(fetch("https://cafe-central-koge.onrender.com/mensagem"),{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(novaMensagem)
        });
        
        const dados = await resposta.text();
        
        alert(dados);
        
        form.reset();
        
    }catch(erro){
        alert(`Erro: ${erro}`);
    };
    
});
}