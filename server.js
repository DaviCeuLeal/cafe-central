/* ===============================================
1ª PARTE - CONFIGURAR O SERVIDOR
===============================================
*/

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt"); // Corrigido para "bcrypt" conforme o seu package.json
const pool = require("./db.js");

const app = express();

// Configuração do CORS - Permite que o seu site no GitHub aceda à API
const listOrigins = [
    "http://localhost:5501",
    "http://127.0.0.1:5501",
    "https://daviceuleal.github.io" // Substitua pelo link exato do seu projeto
];

app.use(cors({
    origin: listOrigins,
    credentials: true, // Necessário para cookies de sessão
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Confiança no Proxy (Essencial para quando subir o site para o Render/Railway)
if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}

// Configuração da Sessão
app.use(session({
    secret: process.env.SESSION_SECRET || "uma_chave_muito_segura",
    resave: false,
    saveUninitialized: false,
    name: "cafecentral.sid",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1 hora de duração
        secure: process.env.NODE_ENV === "production", // Apenas via HTTPS em produção
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    }
}));

/* ===============================================
2ª PARTE - ROTAS
===============================================
*/

// ROTA DE LOGIN
app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: "Preencha todos os campos" });
        }

        // Busca o usuário no banco
        const [rows] = await pool.execute(
            "SELECT id, nome, email, senha FROM tb_usuarios WHERE email = ?", 
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ erro: "Usuário não encontrado" });
        }

        const usuario = rows[0];

        // Compara a senha enviada com o hash do banco
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ erro: "Senha inválida" });
        }

        // Salva os dados na sessão
        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };

        res.json({ mensagem: "Login realizado com sucesso!" });

    } catch (error) {
        console.error("Erro no Servidor:", error);
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
});

// ROTA PARA VERIFICAR SE O USUÁRIO ESTÁ LOGADO
app.get("/me", (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ logado: false });
    }

    res.json({
        logado: true,
        usuario: req.session.usuario
    });
});

// ROTA DE LOGOUT
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao sair" });
        }
        res.clearCookie("cafecentral.sid");
        res.json({ mensagem: "Logout realizado com sucesso" });
    });
});

// INICIALIZAÇÃO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});