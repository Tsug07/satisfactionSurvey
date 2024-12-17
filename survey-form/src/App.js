import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import EmojiRating from "./EmojiRating";
import emailjs from "emailjs-com";
import Thanks from "./Thanks";

// Estilos atualizados com breakpoints específicos para mobile
const styles = {
    container: {
      padding: "10px",
      maxWidth: "800px",
      margin: "0 auto",
      "@media (max-width: 425px)": {
        padding: "8px",
      },
      "@media (max-width: 320px)": {
        padding: "5px",
      }
    },
    section: {
      backgroundColor: "#F7E9EC",
      padding: "15px 5px",
      marginBottom: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      "@media (max-width: 425px)": {
        padding: "10px 3px",
        marginBottom: "10px",
      },
      "@media (max-width: 320px)": {
        padding: "8px 2px",
        marginBottom: "8px",
      }
    },
    sectionTitle: {
      textAlign: "center",
      fontSize: "1.5rem",
      margin: "10px 0",
      "@media (max-width: 425px)": {
        fontSize: "1.2rem",
        margin: "8px 0",
      },
      "@media (max-width: 375px)": {
        fontSize: "1.1rem",
      },
      "@media (max-width: 320px)": {
        fontSize: "1rem",
      }
    },
    feedbackTitle: {
      fontSize: "1.1rem",
      margin: "10px 0",
      padding: "0 10px",
      "@media (max-width: 425px)": {
        fontSize: "1rem",
        padding: "0 5px",
      },
      "@media (max-width: 375px)": {
        fontSize: "0.9rem",
      },
      "@media (max-width: 320px)": {
        fontSize: "0.85rem",
      }
    },
    textarea: {
      width: "90%",
      margin: "10px auto",
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      display: "block",
      boxSizing: "border-box",
      "@media (max-width: 425px)": {
        width: "95%",
        padding: "8px",
        fontSize: "0.9rem",
      },
      "@media (max-width: 375px)": {
        width: "98%",
        padding: "6px",
        fontSize: "0.85rem",
      },
      "@media (max-width: 320px)": {
        width: "98%",
        padding: "5px",
        fontSize: "0.8rem",
      }
    },
    submitButton: {
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      padding: "12px 24px",
      fontSize: "1rem",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      "@media (max-width: 425px)": {
        width: "95%",
        padding: "10px",
        fontSize: "0.9rem",
      },
      "@media (max-width: 375px)": {
        width: "98%",
        padding: "8px",
        fontSize: "0.85rem",
      },
      "@media (max-width: 320px)": {
        width: "98%",
        padding: "8px",
        fontSize: "0.8rem",
      },
      ":hover": {
        backgroundColor: "#45a049",
      }
    }
  };

function App() {
    const [feedback1, setFeedback1] = useState("");
    const [feedback2, setFeedback2] = useState("");
    const [ratings, setRatings] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Pesquisa de Satisfação - Canella & Santos";
    }, []);

    const handleRatingChange = (title, rating) => {
        setRatings((prev) => ({
            ...prev,
            [title]: rating,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailContent = {
            subject: "Pesquisa de Satisfação - Respostas do Cliente",
            to_name: "Equipe Canella & Santos",
            from_name: "Pesquisa de Satisfação",
            tempo_entrega: ratings["Tempo de Entrega dos Serviços"] || "Não avaliado",
            qualidade_entregas: ratings["Qualidade das Entregas"] || "Não avaliado",
            tempo_resposta: ratings["Tempo de Resposta"] || "Não avaliado",
            qualidade_atendimento: ratings["Qualidade do Atendimento"] || "Não avaliado",
            relacionamento: ratings["Como Avalia Nosso Relacionamento"] || "Não avaliado",
            servicos_valor: ratings["Nossos Serviços Agregam Valor ao Seu Negócio"] || "Não avaliado",
            feedback1: feedback1 || "Nenhum feedback fornecido.",
            feedback2: feedback2 || "Nenhum feedback fornecido.",
        };
        const emailContentSql = {
            // Convertendo os valores das avaliações para inteiros ou null
            tempo_entrega: parseInt(ratings["Tempo de Entrega dos Serviços"], 10) || null,
            qualidade_entregas: parseInt(ratings["Qualidade das Entregas"], 10) || null,
            tempo_resposta: parseInt(ratings["Tempo de Resposta"], 10) || null,
            qualidade_atendimento: parseInt(ratings["Qualidade do Atendimento"], 10) || null,
            relacionamento: parseInt(ratings["Como Avalia Nosso Relacionamento"], 10) || null,
            servicos_valor: parseInt(ratings["Nossos Serviços Agregam Valor ao Seu Negócio"], 10) || null,
        
            // Os feedbacks podem ser texto
            feedback1: feedback1 || null,
            feedback2: feedback2 || null,
        };
        try {
            // // 1. Envia os dados para o backend
            // const response = await fetch("https://api-feedback-y5d9.onrender.com", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(emailContentSql),
            // });

            // if (!response.ok) {
            //     throw new Error("Erro ao enviar os dados para o banco de dados.");
            // }

            // 2. Envia o email via EmailJS
            await emailjs.send(
                "service_mp1or57", // Substitua pelo seu ID do serviço
                "template_2mhlnrm", // Substitua pelo ID do template
                emailContent,
                "o0sumI06EDLRXZoOe" // Substitua pelo ID do usuário
            );

            // 3. Redireciona para a página de agradecimento
            navigate("/thanks");
        } catch (error) {
            console.error("Erro durante o envio:", error);
            alert("Erro ao enviar os dados. Tente novamente mais tarde.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>ENTREGA</h3>
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

            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>ATENDIMENTO</h3>
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

            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>RELACIONAMENTO</h3>
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

            <div style={styles.feedbackSection}>
                <h4 style={styles.feedbackTitle}>Em uma palavra, como você descreveria nossa contabilidade?</h4>
                <textarea
                    value={feedback1}
                    onChange={(e) => setFeedback1(e.target.value)}
                    placeholder="Deixe seu feedback sobre o atendimento"
                    style={{ ...styles.textarea, height: "30px" }}
                />
                <h4 style={styles.feedbackTitle}>Fique à vontade para fazer sugestões ou observações!</h4>
                <textarea
                    value={feedback2}
                    onChange={(e) => setFeedback2(e.target.value)}
                    placeholder="Deixe sugestões ou comentários adicionais"
                    style={{ ...styles.textarea, height: "80px" }}
                />
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={handleSubmit} style={styles.submitButton}>
                    Enviar Feedback
                </button>
            </div>
        </div>
    );
}

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