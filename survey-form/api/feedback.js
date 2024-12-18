const { neon } = require("@neondatabase/serverless");

// Criar pool de conexão fora da função handler
const sql = neon(process.env.DATABASE_URL);

module.exports = async (req, res) => {
    // Headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Responder a requisições OPTIONS
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        try {
            // Log para debug
            console.log('Recebendo requisição POST:', req.body);

            // Verificar se req.body existe
            if (!req.body) {
                return res.status(400).json({
                    error: 'Corpo da requisição vazio'
                });
            }

            // Desestruturar e validar dados
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

            // Converter valores para números e validar
            const dados = {
                tempo_de_entrega: parseInt(tempo_de_entrega) || 0,
                qualidade_da_entrega: parseInt(qualidade_da_entrega) || 0,
                tempo_de_resposta: parseInt(tempo_de_resposta) || 0,
                qualidade_do_atendimento: parseInt(qualidade_do_atendimento) || 0,
                nosso_relacionamento: parseInt(nosso_relacionamento) || 0,
                agregar_valor: parseInt(agregar_valor) || 0,
                palavra: palavra?.toString() || '',
                observacoes: observacoes?.toString() || ''
            };

            // Log dos dados processados
            console.log('Dados processados:', dados);

            // Inserir no banco
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
                    ${dados.tempo_de_entrega},
                    ${dados.qualidade_da_entrega},
                    ${dados.tempo_de_resposta},
                    ${dados.qualidade_do_atendimento},
                    ${dados.nosso_relacionamento},
                    ${dados.agregar_valor},
                    ${dados.palavra},
                    ${dados.observacoes}
                )
                RETURNING id
            `;

            // Log do resultado
            console.log('Resultado da inserção:', result);

            return res.status(200).json({
                success: true,
                message: "Feedback enviado com sucesso!",
                id: result[0].id
            });

        } catch (error) {
            // Log detalhado do erro
            console.error('Erro detalhado:', error);

            return res.status(500).json({
                success: false,
                error: "Erro ao salvar feedback",
                details: error.message,
                stack: error.stack
            });
        }
    }

    // Método não permitido
    return res.status(405).json({
        error: "Método não permitido"
    });
};