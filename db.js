/* ===============================================
CONFIGURAÇÃO DO BANCO DE DADOS CORRIGIDA
===============================================
*/

// Importa as variáveis do .env
require("dotenv").config();

// Importa o mysql2 com promise
const mysql = require("mysql2/promise");

// Cria o pool de conexões
const pool = mysql.createPool({  
    //  CORREÇÃO: Agora puxando corretamente do seu arquivo .env
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    
    // Configurações para o Aiven (Cloud)
    ssl: { rejectUnauthorized: false },    
    waitForConnections: true, 
    connectionLimit: 10 
});

// Exporta o pool para usar no server.js
module.exports = pool;