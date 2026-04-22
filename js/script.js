document.addEventListener("DOMContentLoaded", () => {

    
    document.querySelectorAll(".fade").forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }, i * 200);
    });


    window.abrirMenu = function () {
        const menu = document.getElementById("menu-lateral");
        menu.style.right = (menu.style.right === "0px") ? "-200px" : "0px";
    };

    fetch("../data/cursos.json")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("lista-produtos");
            if (!container) return;

            data.forEach(p => {
                container.innerHTML += `
                <div class="card">
                    <img src="${p.imagem}">
                    <h3>${p.nome}</h3>
                    <p>${p.descricao}</p>
                    <strong>${p.preco}</strong>
                </div>`;
            });
        })
        .catch(() => {});
});

document.addEventListener("DOMContentLoaded", () => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const logado = localStorage.getItem("logado");

    const area = document.getElementById("area-usuario");
    const areaMobile = document.getElementById("area-usuario-mobile");

    function render(areaElemento) {
        if (!areaElemento) return;

        if (logado === "true" && usuario) {
            areaElemento.innerHTML = `
                <span style="color:#ff4da6;">Olá, ${usuario.nome}</span>
                <a href="#" onclick="logout()">Sair</a>
            `;
        } else {
            areaElemento.innerHTML = `
                <a href="login.html">Login</a>
                <a href="cadastro.html">Cadastro</a>
            `;
        }
    }

    render(area);
    render(areaMobile);

});

function logout() {
    localStorage.removeItem("logado");
    alert("Você saiu!");
    location.reload();
}