/* 
===============================================
CONFIGURAÇÃO DO BANCO DE DADOS
===============================================
*/

// Importa as variáveis do .env
require("dotenv").config();

// Importa o mysql2 com promise
const mysql = require("mysql2/promise");

// Cria o pool de conexões
const pool = mysql.createPool({  
    host: cafecentral-ea-ddb1.g.aivencloud.com,  
    port: process.env.DB_PORT, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    ssl: { rejectUnauthorized: false },    
  // habilita conexão segura com o Aiven via SSL

    waitForConnections: true, 
        //se todas conexões tiverem ocupadas, aguarda na fila

    connectionLimit: 10 
          // máximo de 10 conexões abertas ao mesmo tempo
});

// Exporta o pool para usar no server.js
module.exports = pool;