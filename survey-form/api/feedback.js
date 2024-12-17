const sql = require("mssql");

// Carrega variáveis do ambiente
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: false, // Azure ou conexões seguras
        trustServerCertificate: true, // Para conexões locais
    },
};

module.exports = async (req, res) => {
    if (req.method === "POST") {
        const { tempo_entrega, qualidade_entregas, tempo_resposta, qualidade_atendimento, relacionamento, servicos_valor, feedback1, feedback2 } = req.body;

        try {
            let pool = await sql.connect(dbConfig);

            const query = `
                INSERT INTO feedback (tempo_de_entrega, qualidade_da_entrega, tempo_de_resposta, qualidade_do_atendimento, nosso_relacionamento, agregar_valor, palavra, observacoes)
                VALUES (@tempo_entrega, @qualidade_entregas, @tempo_resposta, @qualidade_atendimento, @relacionamento, @servicos_valor, @feedback1, @feedback2)
            `;

            await pool.request()
                .input("tempo_entrega", sql.Int, tempo_entrega)
                .input("qualidade_entregas", sql.Int, qualidade_entregas)
                .input("tempo_resposta", sql.Int, tempo_resposta)
                .input("qualidade_atendimento", sql.Int, qualidade_atendimento)
                .input("relacionamento", sql.Int, relacionamento)
                .input("servicos_valor", sql.Int, servicos_valor)
                .input("feedback1", sql.NVarChar, feedback1)
                .input("feedback2", sql.NVarChar, feedback2)
                .query(query);

            res.status(200).json({ message: "Dados enviados com sucesso!" });
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            res.status(500).json({ error: "Erro ao enviar os dados para o banco." });
        }
    } else {
        res.status(405).json({ error: "Método não permitido" });
    }
};
