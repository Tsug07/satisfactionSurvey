import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import EmojiRating from "./EmojiRating";
import emailjs from "emailjs-com";
import Thanks from "./Thanks"; // Importa a página de agradecimento


function App() {
    const [feedback1, setFeedback1] = useState("");
    const [feedback2, setFeedback2] = useState("");
    const [ratings, setRatings] = useState({}); // Estado para armazenar as avaliações
    const navigate = useNavigate(); // Hook para navegar entre as páginas
    useEffect(() => {
        document.title = "Pesquisa de Satisfação - Canella & Santos"; // Define o título da página inicial
    }, []);
    const handleRatingChange = (title, rating) => {
        setRatings((prev) => ({
            ...prev,
            [title]: rating, // Armazena as avaliações com base no título
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Dados para o template
        const emailContent = {
            subject: "Pesquisa de Satisfação - Respostas do Cliente",
            to_name: "Equipe Canella & Santos", // Substitua pelo destinatário, se necessário
            from_name: "Pesquisa de Satisfação", // Nome do remetente
            tempo_entrega: ratings["Tempo de Entrega dos Serviços"] || "Não avaliado",
            qualidade_entregas: ratings["Qualidade das Entregas"] || "Não avaliado",
            tempo_resposta: ratings["Tempo de Resposta"] || "Não avaliado",
            qualidade_atendimento: ratings["Qualidade do Atendimento"] || "Não avaliado",
            relacionamento: ratings["Como Avalia Nosso Relacionamento"] || "Não avaliado",
            servicos_valor: ratings["Nossos Serviços Agregam Valor ao Seu Negócio"] || "Não avaliado",
            feedback1: feedback1 || "Nenhum feedback fornecido.",
            feedback2: feedback2 || "Nenhum feedback fornecido.",
        };

        // Enviar via EmailJS
        emailjs
            .send(
                "service_mp1or57", // Substitua pelo seu ID do serviço
                "template_2mhlnrm", // Substitua pelo ID do template
                emailContent,
                "o0sumI06EDLRXZoOe" // Substitua pelo ID do usuário
            )
            .then(
                () => {
                     // Redireciona para a página de agradecimento
                     navigate("/thanks");
                },
                (error) => {
                    alert("Erro ao enviar respostas. Tente novamente.");
                    console.error(error);
                }
            );
    };

    return (
        <>
            <div style={{ padding: "20px" }}>
                {/* Avaliações com emojis */}
                <div style={{ backgroundColor: "#F7E9EC", paddingTop: "5px", marginBottom: "20px", paddingBottom: "5px" }}>
                    <h3 style={{ textAlign: "center" }}>ENTREGA</h3>
                    <EmojiRating
                        title="Tempo de Entrega dos Serviços"
                        currentRating={ratings["Tempo de Entrega dos Serviços"] || null}
                        onRatingChange={handleRatingChange}
                    />
                    <EmojiRating
                        title="Qualidade das Entregas"
                        currentRating={ratings["Qualidade das Entregas"] || null}
                        onRatingChange={handleRatingChange}
                    />
                </div>

                <div style={{ backgroundColor: "#F7E9EC", paddingTop: "5px", marginBottom: "20px", paddingBottom: "5px" }}>
                    <h3 style={{ textAlign: "center" }}>ATENDIMENTO</h3>
                    <EmojiRating
                        title="Tempo de Resposta"
                        currentRating={ratings["Tempo de Resposta"] || null}
                        onRatingChange={handleRatingChange}
                    />
                    <EmojiRating
                        title="Qualidade do Atendimento"
                        currentRating={ratings["Qualidade do Atendimento"] || null}
                        onRatingChange={handleRatingChange}
                    />
                </div>

                <div style={{ backgroundColor: "#F7E9EC", paddingTop: "5px", paddingBottom: "5px" }}>
                    <h3 style={{ textAlign: "center" }}>RELACIONAMENTO</h3>
                    <EmojiRating
                        title="Como Avalia Nosso Relacionamento"
                        currentRating={ratings["Como Avalia Nosso Relacionamento"] || null}
                        onRatingChange={handleRatingChange}
                    />
                    <EmojiRating
                        title="Nossos Serviços Agregam Valor ao Seu Negócio"
                        currentRating={ratings["Nossos Serviços Agregam Valor ao Seu Negócio"] || null}
                        onRatingChange={handleRatingChange}
                    />
                </div>

                {/* Campos de feedback */}
                <div style={{ marginTop: "20px", textAlign: "center", backgroundColor: "#F7E9EC", paddingTop: "5px", paddingBottom: "5px" }}>
                    <h4>Em uma palavra, como você descreveria nossa contabilidade?</h4>
                    <textarea
                        value={feedback1}
                        onChange={(e) => setFeedback1(e.target.value)}
                        placeholder="Deixe seu feedback sobre o atendimento"
                        style={textareaStyle}
                    />
                    <h4>Fique à vontade para fazer sugestões ou observações!</h4>
                    <textarea
                        value={feedback2}
                        onChange={(e) => setFeedback2(e.target.value)}
                        placeholder="Deixe sugestões ou comentários adicionais"
                        style={textareaStyle1}
                    />
                </div>

                {/* Botão de envio */}
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button onClick={handleSubmit} style={submitButtonStyle}>
                        Enviar Feedback
                    </button>
                </div>
            </div>
        </>
    );
}

// Estilos para o textarea e botão
const textareaStyle = {
    width: "90%",
    height: "30px",
    margin: "10px auto",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    display: "block",
};

const textareaStyle1 = {
    width: "90%",
    height: "80px",
    margin: "10px auto",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    display: "block",
};

const submitButtonStyle = {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
};


function MainApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/thanks" element={<Thanks />} />
            </Routes>
        </Router>
    );
}

export default MainApp;
