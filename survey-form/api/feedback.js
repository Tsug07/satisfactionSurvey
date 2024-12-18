const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

module.exports = async (req, res) => {
    // Configuração CORS mais permissiva
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Responder imediatamente às requisições OPTIONS
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            const {
                tempo_de_entrega,
                qualidade_da_entrega,
                tempo_de_resposta,
                qualidade_do_atendimento,
                nosso_relacionamento,
                agregar_valor,
                palavra,
                observacoes
            } = req.body;

            const result = await sql`
                INSERT INTO feedback (
                    tempo_de_entrega,
                    qualidade_da_entrega,
                    tempo_de_resposta,
                    qualidade_do_atendimento,
                    nosso_relacionamento,
                    agregar_valor,
                    palavra,
                    observacoes
                ) 
                VALUES (
                    ${tempo_de_entrega},
                    ${qualidade_da_entrega},
                    ${tempo_de_resposta},
                    ${qualidade_do_atendimento},
                    ${nosso_relacionamento},
                    ${agregar_valor},
                    ${palavra || ''},
                    ${observacoes || ''}
                )
                RETURNING id
            `;

            return res.status(200).json({
                success: true,
                message: "Feedback enviado com sucesso!",
                id: result[0].id
            });

        } catch (error) {
            console.error("Erro ao inserir feedback:", error);
            return res.status(500).json({
                success: false,
                error: "Erro ao salvar feedback",
                details: error.message
            });
        }
    }

    return res.status(405).json({ error: "Método não permitido" });
};